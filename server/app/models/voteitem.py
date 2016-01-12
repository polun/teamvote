class VoteItem(Document):
    vote = ReferenceField(Vote)
    rest = ReferenceField(Rest)
    member =  ReferenceField(Member)