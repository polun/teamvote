from mongoengine import *
import datetime


class Vote(Document):
    title = StringField(required=True, max_length=20, unique=True)
    remark = StringField(max_length=100)
    candidaterests = ListField(ReferenceField('Rest'), required=True)
    createtime = DateTimeField(required=True, default=datetime.datetime.utcnow)
