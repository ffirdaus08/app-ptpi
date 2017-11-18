from flask import Flask, Response, request, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
import json


def _get_app():
    db_name = 'ptpi'    # database name
    db_uri = 'mysql+pymysql://root:root@localhost:3306/' + db_name

    flask_app = Flask(__name__)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_POOL_SIZE'] = 10
    flask_app.config['SQLALCHEMY_ECHO'] = True
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_db = SQLAlchemy(flask_app)

    return flask_app, flask_db


(application, db) = _get_app()
app = application
dbs = db.session


def now():
    return datetime.now()

