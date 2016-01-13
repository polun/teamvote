from models import rest,member
from mongoengine import *

def initDB():
    connect('teamvote')
    rest.Rest(name='zhangzhenqiang', remark='zanwu').save()
    rest.Rest(name='zhangwanxia', remark='zanwu').save()
    rest.Rest(name='zhangsiyuan', remark='zanwu').save()

    member.Member(name='lusuo', nickname='ls').save()
    member.Member(name='huyulin', nickname='hyl').save()
    member.Member(name='yusha', nickname='ys').save()

# initDB()