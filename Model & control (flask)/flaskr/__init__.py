import os
from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    
    CORS(app,
     origins=["http://localhost:3000"],
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type"])
    CORS(app, resources={r"/auth/*": {"origins": "http://localhost:3000"}})

    @app.route('/')
    def Home():
        return"<h1> Flask Application Home Page.</h1>"

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'
    
    
    from . import auth
    # register the blueprint with the application
    app.register_blueprint(auth.bp)

    return app 

