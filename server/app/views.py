# -*- coding:utf-8 -*-
from flask import Flask,jsonify
from app import app
from app import api, Resource
from models import member, rest, vote, voteitem
import json
from bson import json_util
from .forms import VoteCreateForm

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
        json_results = json.loads(rests)
        
        return json_results

class Votes(Resource):
    """投票"""
    def post(self):
        voteForm = VoteCreateForm()

        if not form.validate_on_submit():
            return form.errors, 422
        return { status: 'success' }, 201

        

api.add_resource(Rests, '/api/v1/rests')
api.add_resource(Members, '/api/v1/members')
api.add_resource(Votes, '/api/v1/votes')