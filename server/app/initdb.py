# -*- coding:utf-8 -*-

from models import rest, member
from mongoengine import *

connect('teamvote')


def initDB():
    rest.Rest(name=u'盖饭', remark='zanwu').save()
    rest.Rest(name=u'阳光100', remark='zanwu').save()
    rest.Rest(name=u'拉面', remark='zanwu').save()
    rest.Rest(name=u'三秦', remark='zanwu').save()
    rest.Rest(name=u'板面', remark='zanwu').save()
    rest.Rest(name=u'火烧', remark='zanwu').save()

    member.Member(name='卢梭', nickname='ls').save()
    member.Member(name='胡玉林', nickname='hyl').save()
    member.Member(name='于莎', nickname='ys').save()


# initDB()
