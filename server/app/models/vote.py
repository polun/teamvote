class Vote(Document):
    title = StringField(required=True, max_length=20, unique=True)
    remark = StringField(required=True, max_length=100)
    candidaterests = ListField(EmbeddedDocumentField('Rest'), unique=True)
    createtime = DateTimeField(required=True, default=datetime.datetime.now)