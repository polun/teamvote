# -*- coding:utf-8 -*-

from models import rest, member
from mongoengine import *

connect('teamvote')


def initDB():
    rest.Rest(name=u'万达火烧', remark='zanwu').save()
    rest.Rest(name=u'阳光和合谷', remark='zanwu').save()
    rest.Rest(name=u'聚点拉面', remark='zanwu').save()
    rest.Rest(name=u'麻辣烫', remark='zanwu').save()
    rest.Rest(name=u'盖饭', remark='zanwu').save()
    rest.Rest(name=u'有一家板面', remark='zanwu').save()
    rest.Rest(name=u'大盘鸡炒菜', remark='zanwu').save()

    member.Member(name='卢梭', nickname='ls').save()
    member.Member(name='胡玉林', nickname='hyl').save()
    member.Member(name='于莎', nickname='ys').save()
    member.Member(name='梦迪', nickname='lmd').save()
    member.Member(name='张振强', nickname='zzq').save()
    member.Member(name='高鹤鸣', nickname='ghm').save()
    member.Member(name='朱周周', nickname='zhh').save()
    member.Member(name='战博奇', nickname='yg').save()
    member.Member(name='胖哥儿', nickname='yxz').save()
initDB()
