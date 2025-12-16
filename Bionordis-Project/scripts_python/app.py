from flask import Flask, jsonify, send_file, render_template, request
from rdkit import Chem
from rdkit.Chem import Descriptors, Draw
from flask_sqlalchemy import SQLAlchemy
import io
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bionordis.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Molecula(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    # Identificação
    nome = db.Column(db.String(150), nullable=False)
    smiles = db.Column(db.String(500), nullable=True) 
    
    # Dados Químicos
    peso = db.Column(db.Float, nullable=True)
    logp = db.Column(db.Float, nullable=True)
    
    # Classificação e Botânica
    classe = db.Column(db.String(100))
    subclasse = db.Column(db.String(100))
    nome_cientifico = db.Column(db.String(150))
    familia = db.Column(db.String(100))
    bioma = db.Column(db.String(100))
    parte_planta = db.Column(db.String(100))
    
    subproduto = db.Column(db.String(100))  # <--- ADICIONE ESSA LINHA AQUI
    
    biodiversidade = db.Column(db.String(100))

    # Infos Extras
    propriedades_bio = db.Column(db.Text)
    atividades = db.Column(db.Text)
    instituicao = db.Column(db.String(200))
    colaboradores = db.Column(db.String(200))
    link_pubchem = db.Column(db.String(300))
    doi_link1 = db.Column(db.String(300))
    doi_link2 = db.Column(db.String(300))
    legendas = db.Column(db.Text)

    def to_json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "smiles": self.smiles, # Pode vir vazio agora
            "peso": self.peso,
            "logp": self.logp,
            "classe": self.classe,
            "nome_cientifico": self.nome_cientifico,
            "familia": self.familia,
            "bioma": self.bioma,
            "parte_planta": self.parte_planta,
            "atividades": self.atividades,
            "instituicao": self.instituicao,
            "doi_link1": self.doi_link1,
            "doi_link2": self.doi_link2
        }

with app.app_context():
    db.create_all()

# --- ROTAS ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analisar/<path:smiles_input>')
def analisar(smiles_input):
    # Só analisa se tiver SMILES válido
    mol = Chem.MolFromSmiles(smiles_input)
    if mol is None: return jsonify({"erro": "Inválido"}), 400
    return jsonify({
        "propriedades": {
            "peso": round(Descriptors.MolWt(mol), 3),
            "logP": round(Descriptors.MolLogP(mol), 3)
        }
    })

@app.route('/salvar', methods=['POST'])
def salvar_molecula():
    d = request.json
    smiles = d.get('smiles', '').strip() # Pega o smiles ou vazio
    
    peso_calc = None
    logp_calc = None
    
    # LÓGICA HÍBRIDA:
    # Se tiver SMILES, calcula química. Se não, segue só com dados biológicos.
    if smiles:
        mol = Chem.MolFromSmiles(smiles)
        if mol:
            peso_calc = round(Descriptors.MolWt(mol), 3)
            logp_calc = round(Descriptors.MolLogP(mol), 3)
        else:
            # Se o usuário digitou um SMILES errado, avisamos
            return jsonify({"erro": "SMILES inválido. Deixe em branco se for amostra biológica."}), 400
    else:
        smiles = None # Garante que salva como None no banco

    nova_mol = Molecula(
        nome=d.get('nome'),
        smiles=smiles,
        peso=peso_calc,
        logp=logp_calc,
        classe=d.get('classe'),
        nome_cientifico=d.get('nome_cientifico'),
        familia=d.get('familia'),
        bioma=d.get('bioma'),
        parte_planta=d.get('parte_planta'),
        atividades=d.get('atividades'),
        instituicao=d.get('instituicao'),
        doi_link1=d.get('doi_link1')
    )

    db.session.add(nova_mol)
    db.session.commit()
    return jsonify({"mensagem": "Registro salvo com sucesso!"})

@app.route('/listar')
def listar_moleculas():
    todas = Molecula.query.all()
    return jsonify([mol.to_json() for mol in reversed(todas)])

@app.route('/deletar/<int:id_mol>', methods=['DELETE'])
def deletar(id_mol):
    mol = Molecula.query.get(id_mol)
    if mol:
        db.session.delete(mol)
        db.session.commit()
    return jsonify({"ok": True})

@app.route('/imagem/<path:smiles_input>')
def gerar_imagem(smiles_input):
    if not smiles_input or smiles_input == "None": return "Sem imagem", 404
    mol = Chem.MolFromSmiles(smiles_input)
    if mol is None: return "Erro", 400
    img = Draw.MolToImage(mol, size=(400, 300))
    img_io = io.BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)