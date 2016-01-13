# -*- coding:utf-8 -*-
from flask import Flask,jsonify
from app import app
from app import api, Resource
from models import member, rest, vote, voteitem
from bson import json_util

'''
    餐馆
'''
class Members(Resource):
    """用户路由"""
    pass

class Rests(Resource):
    def __init__(self):
        super(Rests, self).__init__()

    def get(self):
        rests = member.Member.objects().to_json()
        print rests
        return rests

api.add_resource(Rests, '/api/v1/rests')
api.add_resource(Members, '/api/v1/members')