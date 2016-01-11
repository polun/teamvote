# -*- coding:utf-8 -*-
from flask import Flask
from app import app
from app import api, Resource

'''
    餐馆
'''
class Users(Resource):
    """用户路由"""
    def __init__(self):
        super(Users, self).__init__()

    users = [{
            'id': 1,
            'nickname': 'huyulin',
            'name': u'胡玉林'
        }, {
            'id': 2,
            'nickname': 'ls',
            'name': '卢梭'
        }, {
            'id': 3,
            'nickname': 'lmd',
            'name': u'刘梦迪'
        }, {
            'id': 3,
            'nickname': 'zhh',
            'name': '朱周周'
        }, {
            'id': 4,
            'nickname': 'ys',
            'name': '于莎'
        }]

class Rests(Resource):
    def __init__(self):
        super(Rests, self).__init__()

    def get(self):
        rests = [{
            'id': '1',
            'name': '河南'
        }, {
            'id': '2',
            'name': '跳跳'
        }, {
            'id': '3',
            'name': '鹤壁'
        }, {
            'id': '4',
            'name': '四中'
        }, {
            'id': '5',
            'name': '二班'
        }]

        return rests

api.add_resource(Rests, '/api/v1/rests')
api.add_resource(Users, '/api/v1/users')