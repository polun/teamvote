# -*- coding:utf-8 -*-
from flask import Flask, jsonify
from app import app
from app import api, Resource
from models import member, rest, vote, voteitem
import json
from bson import json_util
from flask import request
from bson.objectid import ObjectId
from mongoengine.queryset import DoesNotExist


class Rests(Resource):

    def __init__(self):
        super(Rests, self).__init__()

    def get(self):
        rests = rest.Rest.objects().to_json()
        json_results = json.loads(rests)

        return json_results


class Votes(Resource):

    def get(self, voteId):
        searched_vote = None
        statusCode = 200

        try:
            searched_vote = json.loads(
                vote.Vote.objects().get(id=voteId).to_json())
            candidateIds = [item['$oid']
                            for item in searched_vote['candidaterests']]
            searchedRests = json.loads(
                rest.Rest.objects(id__in=candidateIds).to_json())
            searched_vote['candidaterests'] = searchedRests
        except DoesNotExist, e:
            statusCode = 204
        return searched_vote, statusCode


class CreateVote(Resource):
    """设计投票"""

    def post(self):
        if not request.json or not 'selectedRestIds' in request.json or \
                not 'title' in request.json:
            return {}, 400
        title = request.json.get('title')
        selectedRestIds = request.json.get('selectedRestIds')
        selectedRestIdList = [ObjectId(item) for item in selectedRestIds]

        newVote = vote.Vote(title=title, candidaterests=selectedRestIdList)
        newVoteId = newVote.save()

        return {'newVoteId': json.loads(newVoteId.to_json())['_id']['$oid']}, 201


class MakeVote(Resource):

    def post(self):
        if not request.json or not 'memberId' in request.json or \
                'voteId' not in request.json or 'restId' not in request.json:
            return {}, 400

        voteId = request.json.get('voteId')
        restId = request.json.get('restId')
        memberId = request.json.get('memberId')

        item = voteitem.VoteItem(vote=voteId, rest=restId, member=memberId)
        item.save()

        return {'voteId': voteId}, 201


class Member(Resource):

    def get(self, nickname):
        if not nickname:
            return '昵称不能为空', 400

        result = None
        statusCode = 200
        try:
            mem = member.Member.objects().get(nickname=nickname).to_json()
            result = json.loads(mem)
        except DoesNotExist, e:
            statusCode = 204

        return result, statusCode


class VoteItem(Resource):

    def get(self, voteId, memberId):
        if not voteId or not memberId:
            return 'voteId或memberId不能为空', 400

        item = voteitem.VoteItem.objects()
        result = {'isVoted': False, 'isVoted': []}
        statusCode = 200
        try:
            tempResult = json.loads(
                item.get(vote=voteId, member=memberId).to_json())
            if tempResult:
                result['voteResult'] = VoteResult.getResult(voteId)
                result['isVoted'] = True

        except DoesNotExist, e:
            statusCode = 204

        return result, statusCode


class VoteResult(Resource):

    @staticmethod
    def getResult(voteId):
        def sortBySum(n):
            return -1 * n['sum']

        result = []
        try:
            aggregationRests = voteitem.VoteItem.objects.filter(vote=ObjectId(voteId)).aggregate(
                {'$group': {'_id': '$rest', 'sum': {'$sum': 1}}})

            for rt in aggregationRests:
                r = json.loads(rest.Rest.objects.only(
                    'name').get(id=rt['_id']).to_json())
                result.append({'rest': r['name'], 'sum': rt['sum']})
            result = sorted(result, key=sortBySum)

        except DoesNotExist, e:
            print e

        return result

    def get(self, voteId):

        if not voteId:
            return '没有voteId', 400

        result = VoteResult.getResult(voteId)
        statusCode = 200
        if len(result) < 0:
            statusCode = 204

        return result, statusCode


class AllVotes(Resource):

    def get(self):
        allVotes = json.loads(
            vote.Vote.objects().order_by('-createtime').to_json())
        return allVotes, 200

api.add_resource(Rests, '/api/v1/rests')
api.add_resource(Votes, '/api/v1/votes/<voteId>')
api.add_resource(AllVotes, '/api/v1/allvotes')
api.add_resource(CreateVote, '/api/v1/votes')
api.add_resource(MakeVote, '/api/v1/voteitem')
api.add_resource(VoteItem, '/api/v1/voteitem/<voteId>/<memberId>')
api.add_resource(Member, '/api/v1/member/<nickname>')
api.add_resource(VoteResult, '/api/v1/voteresult/<voteId>')
