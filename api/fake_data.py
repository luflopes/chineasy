from faker import Faker
from app import app, db
from models import User, Course, Lesson, Caractere, Quiz, Card, Video, DrawingLesson
import random

fake = Faker()


def criar_usuarios(num_usuarios):
    for _ in range(num_usuarios):
        username = fake.user_name()
        password = fake.password()
        email = fake.email()
        avatar = fake.image_url()
        user = User(username=username, password=password, email=email, avatar=avatar)
        db.session.add(user)
    db.session.commit()


def criar_cursos(num_cursos):
    for _ in range(num_cursos):
        name = fake.word()
        description = fake.text()
        hsk_level = random.randint(1, 6)
        course = Course(name=name, description=description, hsk_level=hsk_level)
        db.session.add(course)
    db.session.commit()


def criar_licoes(num_licoes):
    cursos = Course.query.all()
    for _ in range(num_licoes):
        nome = fake.word()
        topic = fake.word()
        description = fake.text()
        course = random.choice(cursos)
        lesson = Lesson(nome=nome, topic=topic, description=description, course=course)
        db.session.add(lesson)
    db.session.commit()


def criar_caracteres(num_caracteres):
    licoes = Lesson.query.all()
    urls_audio = [
        "https://example.com/audio1.mp3",
        "https://example.com/audio2.mp3",
        "https://example.com/audio3.mp3",
        # Adicione mais URLs de áudio fictícias conforme necessário
    ]
    for _ in range(num_caracteres):
        image = fake.image_url()
        sound = random.choice(urls_audio)
        pronunciation = fake.word()
        english = fake.word()
        portuguese = fake.word()
        lesson = random.choice(licoes)
        caractere = Caractere(image=image, sound=sound, pronunciation=pronunciation,
                             english=english, portuguese=portuguese, lesson=lesson)
        db.session.add(caractere)
    db.session.commit()


def criar_quizzes(num_quizzes):
    licoes = Lesson.query.all()
    for _ in range(num_quizzes):
        question = fake.sentence()
        options = [fake.word() for _ in range(4)]
        answer = random.choice(options)
        lesson = random.choice(licoes)
        quiz = Quiz(question=question, options=options, answer=answer, lesson=lesson)
        db.session.add(quiz)
    db.session.commit()


def criar_cards(num_cards):
    licoes = Lesson.query.all()
    for _ in range(num_cards):
        image_path = fake.image_url()
        lesson = random.choice(licoes)
        card = Card(image_path=image_path, lesson=lesson)
        db.session.add(card)
    db.session.commit()


def criar_videos(num_videos):
    licoes = Lesson.query.all()
    for _ in range(num_videos):
        video_path = fake.file_path(extension='mp4')
        lesson = random.choice(licoes)
        video = Video(video_path=video_path, lesson=lesson)
        db.session.add(video)
    db.session.commit()


def criar_drawing_lessons(num_licoes):
    licoes = Lesson.query.all()
    for _ in range(num_licoes):
        prompt = fake.sentence()
        lesson = random.choice(licoes)
        drawing_lesson = DrawingLesson(prompt=prompt, lesson=lesson)
        db.session.add(drawing_lesson)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        criar_usuarios(10)
        criar_cursos(5)
        criar_licoes(20)
        criar_caracteres(50)
        criar_quizzes(30)
        criar_cards(30)
        criar_videos(30)
        criar_drawing_lessons(10)
