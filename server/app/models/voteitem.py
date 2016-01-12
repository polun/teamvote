from mongoengine import *
import datetime
from .vote import Vote
from .rest import Rest
from .member import Member

class VoteItem(Document):
    vote = ReferenceField(Vote)
    rest = ReferenceField(Rest)
    member =  ReferenceField(Member)