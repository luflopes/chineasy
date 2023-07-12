from database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    avatar = db.Column(db.String(100), nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    courses = db.relationship('Course', secondary='user_course')
    favorites = db.relationship('Lesson', secondary='user_favorite')
    progress = db.relationship('UserProgress', backref='user')


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    lessons = db.relationship('Lesson', backref='course')
    hsk_level = db.Column(db.Integer)


class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    topic = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    caracteres = db.relationship('Caractere', backref='lesson')
    quizzes = db.relationship('Quiz', backref='lesson')
    cards = db.relationship('Card', backref='lesson')
    videos = db.relationship('Video', backref='lesson')
    drawing_lessons = db.relationship('DrawingLesson', backref='lesson')


class Caractere(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.Text, nullable=False)
    sound = db.Column(db.Text, nullable=False)
    pronunciation = db.Column(db.String(50), nullable=False)
    english = db.Column(db.String(120), nullable=False)
    portuguese = db.Column(db.String(120), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), nullable=False)


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    options = db.Column(db.String(500), nullable=False)
    answer = db.Column(db.String(50), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'))


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(200), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'))


class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_path = db.Column(db.String(200), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'))


class DrawingLesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(200), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'))
    user_drawings = db.relationship('UserDrawing', backref='drawing_lesson')


class UserDrawing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    drawing_lesson_id = db.Column(db.Integer, db.ForeignKey('drawing_lesson.id'))
    drawing_path = db.Column(db.String(200), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)


class UserCourse(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), primary_key=True)


class UserFavorite(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), primary_key=True)


class UserProgress(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'), primary_key=True)
    completed = db.Column(db.Boolean, nullable=False)
    progress = db.Column(db.Float, nullable=False)
