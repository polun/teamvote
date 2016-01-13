from flask.ext.wtf import Form
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class VoteCreateForm(Form):
    voteId = StringField('voteId', validators=[DataRequired()])