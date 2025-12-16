import pandas as pd
import psycopg2
from rdkit import Chem
from rdkit.Chem import Descriptors
import os
from dotenv import load_dotenv

# Carrega configurações
load_dotenv()
NEON_DB_URL = os.getenv("DATABASE_URL")

if not NEON_DB_URL:
    print("❌ ERRO: Configure o arquivo .env")
    exit()

# --- LÓGICA INTELIGENTE DE ENCONTRAR O ARQUIVO (Sua contribuição!) ---
ARQUIVO_EXCEL = 'dados_bionordis.xlsx'

if not os.path.exists(ARQUIVO_EXCEL):
    # Tenta procurar na pasta 'dados' (estrutura nova)
    ARQUIVO_EXCEL = '../dados/dados_bionordis.xlsx' 
    if not os.path.exists(ARQUIVO_EXCEL):
         # Tenta na pasta raiz (caso esteja rodando de lá)
        ARQUIVO_EXCEL = '../dados_bionordis.xlsx'
        
# ---------------------------------------------------------------------

def tratar_valor(valor):
    if pd.isna(valor): return ""
    return str(valor).strip()

def migrar():
    print(f"🚀 Procurando arquivo...")
    
    if not os.path.exists(ARQUIVO_EXCEL):
        print(f"❌ ERRO CRÍTICO: Não encontrei o arquivo 'dados_bionordis.xlsx' em lugar nenhum.")
        print("Verifique se ele está na pasta 'dados' ou na mesma pasta do script.")
        return

    print(f"📂 Lendo: {ARQUIVO_EXCEL}")
    try:
        df = pd.read_excel(ARQUIVO_EXCEL)
    except Exception as e:
        print(f"❌ Erro ao ler Excel: {e}")
        return

    # --- LIMPEZA DOS NOMES DAS COLUNAS ---
    # Remove espaços extras dos cabeçalhos (ex: 'NOME ' vira 'NOME')
    df.columns = [str(c).strip() for c in df.columns]

    # Debug: Mostra o que achou
    print(f"📋 Colunas lidas: {list(df.columns)}")

    # Tenta pegar a coluna exata do nome
    coluna_nome = 'NOME (QUÍMICO)'
    
    if coluna_nome not in df.columns:
        print(f"⚠️ Aviso: Não achei '{coluna_nome}'. Tentando achar alternativas...")
        # Tenta achar alguma coluna que tenha "NOME" e "QUÍMICO"
        for col in df.columns:
            if "NOME" in col and "QUÍMICO" in col:
                coluna_nome = col
                break
        
        print(f"✅ Usando a coluna: '{coluna_nome}'")

    print("🔌 Conectando ao Neon...")
    
    try:
        conn = psycopg2.connect(NEON_DB_URL)
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
        return

    sucesso = 0
    erros = 0

    print(f"📊 Processando {len(df)} linhas...")

    for index, linha in df.iterrows():
        try:
            # Pega o nome (ou usa genérico se falhar)
            nome = tratar_valor(linha.get(coluna_nome))
            if not nome:
                nome = f"Amostra {index+1}"

            # Tratamento SMILES
            smiles_raw = linha.get('SMILES')
            smiles = None
            peso = None
            logp = None

            if not pd.isna(smiles_raw) and str(smiles_raw).strip() != "" and str(smiles_raw).lower() != 'nan':
                smiles_str = str(smiles_raw).strip()
                try:
                    mol = Chem.MolFromSmiles(smiles_str)
                    if mol:
                        smiles = smiles_str
                        peso = round(Descriptors.MolWt(mol), 3)
                        logp = round(Descriptors.MolLogP(mol), 3)
                except:
                    pass 

            # DADOS COMPLETOS (Verifique se os nomes batem com seu Excel)
            dados = (
                nome, 
                smiles, 
                peso, 
                logp,
                tratar_valor(linha.get('CLASSE')),
                tratar_valor(linha.get('SUBCLASSE')),
                tratar_valor(linha.get('SUBPRODUTO')),
                tratar_valor(linha.get('NOME CIENTÍFICO')),
                tratar_valor(linha.get('FAMÍLIA (PLANTAS)')),
                tratar_valor(linha.get('BIOMAS/ORIGEM')),
                tratar_valor(linha.get('PLANTA: PARTE UTILIZADA')),
                tratar_valor(linha.get('BIODIVERSIDADE')),
                tratar_valor(linha.get('ATIVIDADES REALIZADAS')),
                tratar_valor(linha.get('PROPRIEDADES BIOLÓGICAS')), # Removi o espaço extra aqui, pois limpamos as colunas na linha 49
                tratar_valor(linha.get('LEGENDAS')),
                tratar_valor(linha.get('INSTITUIÇÃO')),
                tratar_valor(linha.get('E-MAIL DOS COLABORADORES')),
                tratar_valor(linha.get('LINK PUBCHEM')),
                tratar_valor(linha.get('DOI/LINK 1')),
                tratar_valor(linha.get('DOI/LINK 2'))
            )

            sql = """
                INSERT INTO moleculas (
                    nome, smiles, peso, logp, 
                    classe, subclasse, subproduto,
                    nome_cientifico, familia, bioma, parte_planta, biodiversidade,
                    atividades, propriedades_bio, legendas,
                    instituicao, colaboradores, link_pubchem, doi_link1, doi_link2
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

            cursor.execute(sql, dados)
            conn.commit()
            sucesso += 1

        except Exception as e:
            conn.rollback()
            print(f"⚠️ ERRO na Linha {index+2}: {e}")
            erros += 1

    cursor.close()
    conn.close()
    
    print("-" * 30)
    print(f"🎉 FIM! Salvos: {sucesso} | Erros: {erros}")

if __name__ == "__main__":
    migrar()