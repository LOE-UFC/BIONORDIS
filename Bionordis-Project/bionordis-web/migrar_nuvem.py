import pandas as pd
import psycopg2
import os
from dotenv import load_dotenv

# Carrega a URL do banco do seu arquivo .env.local
load_dotenv('.env.local')
load_dotenv('.env')
NEON_DB_URL = os.getenv("DATABASE_URL")

if not NEON_DB_URL:
    print("❌ ERRO: Configure a DATABASE_URL no arquivo .env ou .env.local")
    exit()

# O nome do ficheiro que você acabou de guardar com a lista única
ARQUIVO_EXCEL = 'attInstiuicao.xlsx'

# Tabela alvo
TABELA_ALVO = "moleculas" 

def atualizar_dados():
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

    print("🔌 Conectando ao Neon Database...")
    try:
        conn = psycopg2.connect(NEON_DB_URL, sslmode='require')
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
    except Exception as e:
        print(f"❌ Erro de conexão com o banco: {e}")
        return

    linhas_alteradas_no_banco = 0
    total_regras = len(df)

    print(f"🔄 Lendo {total_regras} regras de correção únicas...")

    try:
        for index, linha in df.iterrows():
            # Lendo os nomes exatamente como estão na sua imagem
            nome_antigo = str(linha.get('INSTITUIÇÃO', '')).strip()
            nome_novo = str(linha.get('INSTITUIÇÃO NOVO', '')).strip()

            # Evita atualizar se a linha estiver vazia ou se o nome novo não tiver sido preenchido
            if nome_antigo and nome_antigo.lower() != 'nan' and nome_novo and nome_novo.lower() != 'nan':
                
                # Comando SQL para atualizar todas as moléculas que tenham o nome antigo
                sql = f"UPDATE {TABELA_ALVO} SET instituicao = %s WHERE instituicao = %s"
                
                cursor.execute(sql, (nome_novo, nome_antigo))
                
                # Conta quantas moléculas sofreram alteração no banco
                linhas_alteradas_no_banco += cursor.rowcount

        # Comita (salva) todas as alterações de uma vez
        conn.commit()
        
        print("\n" + "-" * 50)
        print("🎉 SUCESSO! BANCO DE DADOS ATUALIZADO.")
        print(f"📊 Total de moléculas corrigidas no banco: {linhas_alteradas_no_banco}")
        print("-" * 50)
        
    except Exception as e:
        conn.rollback()
        print(f"❌ ERRO DURANTE A ATUALIZAÇÃO: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    atualizar_dados()