class Member(Document):
    name = StringField(required=True, max_length=50, unique=True)
    nickname = StringField(required=True, max_length=10, unique=True)