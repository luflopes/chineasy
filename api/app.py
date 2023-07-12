from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados PostgreSQL postgresql://user:password@localhost:5432/postgres?currentSchema=chinese_classes

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://chinese:12345@localhost:5432/chinese'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Criação do objeto db e migração
from database import db
db.init_app(app)
migrate = Migrate(app, db)

# Importação das rotas
from views import *

# Para rodar a api: uvicorn app:app --port 5000

if __name__ == "__main__":
    #import uvicorn
    #uvicorn.run(app, host="192.168.0.10", port=8000)
    
    app.run(host="192.168.1.16", port=8000)

