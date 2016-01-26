from mongoengine import *
import datetime

class Rest(Document):
    name = StringField(required=True, max_length=50, unique=True)
    selectedtimes = IntField(required=True, default=0)
    remark = StringField(max_length=50)