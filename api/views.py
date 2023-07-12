from app import app
from models import Caractere, Lesson, db
from flask import request, jsonify


# Rota para listar todos os caracteres de uma aula
@app.route('/lessons/<int:lesson_id>/caracteres', methods=['GET'])
def listar_caracteres_aula(lesson_id):
    caracteres = Caractere.query.filter_by(lesson_id=lesson_id).all()
    resultado = []
    for caractere in caracteres:
        resultado.append({
            'image': caractere.image, 'sound': caractere.sound,
            "pronunciation": caractere.pronunciation, 'portuguese': caractere.portuguese,
            "english": caractere.english, "lesson_id": caractere.lesson_id
        })
    print(resultado)
    return jsonify(resultado)


# Rota para listar todas as aulas
@app.route('/lessons', methods=['GET'])
def listar_aulas():
    lessons = Lesson.query.order_by(Lesson.id).all()
    resultado = []
    for lesson in lessons:
        resultado.append({
            'lesson_id': lesson.id, 'lesson_name': lesson.nome,
            'lesson_topic': lesson.topic, 'lesson_description': lesson.description,
        })
    return jsonify(resultado)


# Rota para criar um novo caractere
@app.route('/caracteres', methods=['POST'])
def criar_caractere():
    data = request.get_json()
    novo_caractere = Caractere(
        image=data['image'], sound=data['sound'],
        pronunciation=data['pronunciation'], english=data['english'],
        portuguese=data['portuguese'], lesson_id=data['lesson_id']
    )

    db.session.add(novo_caractere)
    db.session.commit()
    return jsonify({'mensagem': 'Caractere criado com sucesso!'})
