import pandas as pd
import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

# Carrega configurações
load_dotenv('.env.local')
load_dotenv('.env')
NEON_DB_URL = os.getenv("DATABASE_URL")

if not NEON_DB_URL:
    print("❌ ERRO: Configure a DATABASE_URL no arquivo .env ou .env.local")
    exit()

ARQUIVO_EXCEL = 'dados_bionordis.xlsx'

# ==========================================
# 👇👇👇 CONTROLE DA TABELA AQUI 👇👇👇
TABELA_ALVO = "moleculas_v2"
# ==========================================

def tratar_valor(valor):
    if pd.isna(valor): return ""
    return str(valor).strip()

def migrar():
    print(f"🚀 Procurando arquivo: {ARQUIVO_EXCEL}...")
    
    if not os.path.exists(ARQUIVO_EXCEL):
        print(f"❌ ERRO CRÍTICO: Não encontrei '{ARQUIVO_EXCEL}'.")
        return

    print(f"📂 Lendo Excel...")
    try:
        df = pd.read_excel(ARQUIVO_EXCEL)
    except Exception as e:
        print(f"❌ Erro ao ler Excel: {e}")
        return

    df.columns = [str(c).strip() for c in df.columns]

    print("🔌 Conectando ao Neon Database...")
    try:
        conn = psycopg2.connect(NEON_DB_URL, sslmode='require')
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
    except Exception as e:
        print(f"❌ Erro de conexão com o banco: {e}")
        return

    lista_de_moleculas = []
    total = len(df)

    print(f"📊 Empacotando {total} linhas...")

    for index, linha in df.iterrows():
        dados = (
            tratar_valor(linha.get('BIODIVERSIDADE')),
            tratar_valor(linha.get('BIOMA (PLANTA)')),
            tratar_valor(linha.get('NOME CIENTÍFICO (PLANTA)')),
            tratar_valor(linha.get('FAMÍLIA (PLANTA)')),
            tratar_valor(linha.get('SUBPRODUTO (PLANTA)')),
            tratar_valor(linha.get('PARTE UTILIZADA (PLANTA)')),
            tratar_valor(linha.get('CÓDIGO')),
            tratar_valor(linha.get('FORNECEDOR DA AMOSTRA (AUTOR)')),
            tratar_valor(linha.get('REFERÊNCIA DA AMOSTRA (ARTIGO)')),
            tratar_valor(linha.get('NOME (QUÍMICO)')),           
            tratar_valor(linha.get('NOME IUPAC (QUÍMICO)')),
            tratar_valor(linha.get('PUREZA')),
            tratar_valor(linha.get('SUBCLASSE (QUÍMICO)')),
            tratar_valor(linha.get('CLASSE (QUÍMICO)')),
            tratar_valor(linha.get('COD SMILES')),               
            tratar_valor(linha.get('LINK PUBCHEM')),
            tratar_valor(linha.get('PROPRIEDADES BIOLÓGICAS')),  
            tratar_valor(linha.get('ATIVIDADES EXPERIMENTAIS REALIZADAS')), 
            tratar_valor(linha.get('TIPOS DE ENSAIOS BIOLÓGICOS')),
            tratar_valor(linha.get('LINHAGENS UTILIZADAS')),
            tratar_valor(linha.get('IC 50')),
            tratar_valor(linha.get('E-MAIL PARA CONTATO')),      
            tratar_valor(linha.get('AUTORES DO ARTIGO')),
            tratar_valor(linha.get('INSTITUIÇÃO')),
            tratar_valor(linha.get('DOI/LINK 1')),
            tratar_valor(linha.get('ANO DA PUBLICAÇÃO')),
            tratar_valor(linha.get('DOI/LINK 2')),
            tratar_valor(linha.get('ANO DA PUBLICAÇÃO.1')),
            tratar_valor(linha.get('LEGENDAS'))
        )
        lista_de_moleculas.append(dados)

    # O SQL com o f-string para injetar o nome da tabela dinamicamente
    sql = f"""
        INSERT INTO {TABELA_ALVO} (
            biodiversidade, bioma, nome_cientifico, familia, subproduto, parte_planta, 
            codigo, fornecedor, referencia_amostra, nome, nome_iupac, pureza, 
            subclasse, classe, smiles, link_pubchem, propriedades_bio, atividades, 
            tipos_ensaios, linhagens, ic50, colaboradores, autores, instituicao, 
            doi_link1, ano_pub1, doi_link2, ano_pub2, legendas
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    print("\n" + "="*50)
    print(f"⚠️ ATENÇÃO: INJETANDO DADOS NA TABELA ---> [ {TABELA_ALVO.upper()} ] <---")
    print("="*50 + "\n")
    print("🚀 Enviando tudo para a nuvem de uma vez (Bulk Insert)...")
    
    try:
        psycopg2.extras.execute_batch(cursor, sql, lista_de_moleculas, page_size=100)
        conn.commit()
        
        print("-" * 40)
        print(f"🎉 SUCESSO! Todas as moléculas foram salvas na tabela '{TABELA_ALVO}'.")
        print("-" * 40)
        
    except Exception as e:
        conn.rollback()
        print(f"❌ ERRO GRAVE DURANTE O ENVIO: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    migrar()