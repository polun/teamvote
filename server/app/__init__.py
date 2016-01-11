# -*- coding:utf-8 -*-
from flask import Flask
from flask_restful import Resource,Api

app = Flask(__name__)
api = Api(app)
from app import views