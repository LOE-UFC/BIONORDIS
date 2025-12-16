import pandas as pd
import os

# Tenta achar o arquivo na mesma pasta ou na pasta acima
nome_arquivo = 'dados_bionordis.xlsx'
if not os.path.exists(nome_arquivo):
    # Tenta procurar na pasta 'dados' se você organizou as pastas
    nome_arquivo = '../dados/dados_bionordis.xlsx' 
    if not os.path.exists(nome_arquivo):
         # Tenta na pasta raiz
        nome_arquivo = '../dados_bionordis.xlsx'

print(f"📂 Tentando ler: {nome_arquivo}")

try:
    df = pd.read_excel(nome_arquivo)
    print("\n--- ✅ SUCESSO! AS COLUNAS SÃO: ---")
    for col in df.columns:
        print(f"'{col}'")
    print("-----------------------------------")
except FileNotFoundError:
    print("❌ ERRO: Não encontrei o arquivo Excel. Coloque ele na mesma pasta deste script.")