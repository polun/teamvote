# -*- coding:utf-8 -*-

from models import rest,member
from mongoengine import *

def initDB():
    connect('teamvote')
    rest.Rest(name=u'盖饭', remark='zanwu').save()
    rest.Rest(name=u'阳光100', remark='zanwu').save()
    rest.Rest(name=u'拉面', remark='zanwu').save()

    member.Member(name='lusuo', nickname='ls').save()
    member.Member(name='huyulin', nickname='hyl').save()
    member.Member(name='yusha', nickname='ys').save()

initDB()