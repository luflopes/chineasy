from datetime import timedelta

class Config:
    DEBUG = False
    TESTING = False
    JWT_SECRET_KEY = 'secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql://user:password@localhost/api'

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
