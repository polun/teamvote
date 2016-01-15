# -*- coding:utf-8 -*-
from flask import Flask,jsonify
from app import app
from app import api, Resource
from models import member, rest, vote, voteitem
import json
from bson import json_util
from flask import request
from bson.objectid import ObjectId

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
        rests = rest.Rest.objects().to_json()
        json_results = json.loads(rests)

        return json_results

class Votes(Resource):
    def get(self, voteId):
        searched_vote  = json.loads(vote.Vote.objects().get(id=voteId).to_json())
        candidateIds = [item['$oid'] for item in searched_vote['candidaterests']]
        searchedRests = json.loads(rest.Rest.objects(id__in=candidateIds).to_json())
        print '-'*10
        print searchedRests
        searched_vote['candidaterests'] = searchedRests
        return searched_vote, 201


class CreateVote(Resource):
    """设计投票"""
    def post(self):
        if not request.json or not 'selectedRestIds' in request.json or \
            not 'title' in request.json:
            return {}, 400
        title = request.json.get('title')
        selectedRestIds = request.json.get('selectedRestIds')
        selectedRestIdList = [ObjectId(item) for item in selectedRestIds]
        # selectedRests = rest.Rest.objects(id__in=selectedRestIdList)

        newVote = vote.Vote(title=title, candidaterests=selectedRestIdList)
        newVoteId = newVote.save()

        return { 'newVoteId': json.loads(newVoteId.to_json())['_id']['$oid'] }, 201

class MakeVote(Resource):
    def post(self):
        if not request.json or not 'memberId' in request.json or \
            'voteId' not in request.json or 'restId' not in request.json:
            return {}, 400

        voteId = request.json.get('voteId')
        restId = request.json.get('restId')
        memberId = request.json.get('memberId');

        item = voteitem.VoteItem(vote=voteId,rest=restId,member=memberId)
        item.save()

        return { 'voteId': voteId }, 201

class Member(Resource):
    def get(self, nickname):
        if not nickname:
            return {}, 400

        mem = member.Member.objects().get(nickname=nickname).to_json()
        return { 'member': json.loads(mem)}

api.add_resource(Rests, '/api/v1/rests')
api.add_resource(Members, '/api/v1/members')
api.add_resource(Votes, '/api/v1/votes/<voteId>')
api.add_resource(CreateVote, '/api/v1/votes')
api.add_resource(MakeVote, '/api/v1/voteitem')
api.add_resource(Member, '/api/v1/member/<nickname>')