import pandas as pd
from app import app, db, Molecula
from rdkit import Chem
from rdkit.Chem import Descriptors

# Nome do arquivo Excel na mesma pasta do projeto
NOME_ARQUIVO = 'dados_bionordis.xlsx'

def importar_dados():
    print(f"📂 Lendo arquivo: {NOME_ARQUIVO}...")
    
    try:
        # Lê o Excel e substitui células vazias (NaN) por texto vazio ""
        df = pd.read_excel(NOME_ARQUIVO).fillna("")
    except FileNotFoundError:
        print(f"❌ Erro: O arquivo '{NOME_ARQUIVO}' não foi encontrado na pasta.")
        return

    total_sucesso = 0
    total_biologicos = 0
    total_quimicos = 0

    # Entra no contexto do Flask para acessar o Banco de Dados
    with app.app_context():
        print("🚀 Iniciando importação ao Banco de Dados...")

        for index, linha in df.iterrows():
            # --- 1. TRATAMENTO DO SMILES ---
            # Pega o valor, remove espaços extras e converte para string
            raw_smiles = str(linha.get('SMILES', '')).strip()
            nome = str(linha.get('NOME (QUÍMICO)', f'Amostra {index}')).strip()

            # Verifica se o SMILES é vazio ou "nan"
            smiles_final = None
            peso_calc = None
            logp_calc = None
            
            if raw_smiles and raw_smiles.lower() != 'nan':
                # Tenta validar com RDKit
                mol = Chem.MolFromSmiles(raw_smiles)
                if mol:
                    # É UM REGISTRO QUÍMICO VÁLIDO
                    smiles_final = raw_smiles
                    peso_calc = round(Descriptors.MolWt(mol), 3)
                    logp_calc = round(Descriptors.MolLogP(mol), 3)
                    total_quimicos += 1
                else:
                    # Tem texto no SMILES, mas não é química válida -> Vira Biológico
                    print(f"⚠️ Linha {index+2}: SMILES inválido para '{nome}'. Importando como biológico.")
                    total_biologicos += 1
            else:
                # Não tem SMILES -> É Biológico
                total_biologicos += 1

            # --- 2. MAPEAMENTO (Excel -> Banco de Dados) ---
            nova_mol = Molecula(
                # Dados Identificação
                nome = nome,
                smiles = smiles_final,
                peso = peso_calc,
                logp = logp_calc,

                # Dados da Planilha (Colunas exatas que você passou)
                classe           = str(linha.get('CLASSE', '')),
                subclasse        = str(linha.get('SUBCLASSE', '')),
                nome_cientifico  = str(linha.get('NOME CIENTÍFICO', '')),
                familia          = str(linha.get('FAMÍLIA (PLANTAS)', '')),
                bioma            = str(linha.get('BIOMAS/ORIGEM', '')),
                parte_planta     = str(linha.get('PLANTA: PARTE UTILIZADA', '')),
                subproduto       = str(linha.get('SUBPRODUTO', '')),
                biodiversidade   = str(linha.get('BIODIVERSIDADE', '')),
                
                # Textos longos
                propriedades_bio = str(linha.get('PROPRIEDADES BIOLÓGICAS', '')),
                atividades       = str(linha.get('ATIVIDADES REALIZADAS', '')),
                legendas         = str(linha.get('LEGENDAS', '')),

                # Links e Referências
                instituicao      = str(linha.get('INSTITUIÇÃO', '')),
                colaboradores    = str(linha.get('E-MAIL DOS COLABORADORES', '')),
                link_pubchem     = str(linha.get('LINK PUBCHEM', '')),
                doi_link1        = str(linha.get('DOI/LINK 1', '')),
                doi_link2        = str(linha.get('DOI/LINK 2', ''))
            )

            # Adiciona na fila
            db.session.add(nova_mol)
            total_sucesso += 1

            # Barra de progresso simples
            if total_sucesso % 10 == 0:
                print(f"   ... processando linha {index+2}")

        # --- 3. SALVAR TUDO ---
        db.session.commit()
        
        print("-" * 40)
        print("✅ IMPORTAÇÃO CONCLUÍDA!")
        print(f"📊 Total Importado: {total_sucesso}")
        print(f"🧪 Químicos (com estrutura): {total_quimicos}")
        print(f"🌿 Biológicos (sem estrutura): {total_biologicos}")
        print("-" * 40)

if __name__ == "__main__":
    importar_dados()