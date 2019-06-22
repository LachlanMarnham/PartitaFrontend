import json

from flask import Flask

from entities.item_types import Scale

app = Flask(__name__)


@app.route('/')
def hello():
    response = {}

    a_minor = Scale(iid=1, title="A Minor", sort_index=0)
    b_major = Scale(iid=2, title="B Major", sort_index=1)
    c_diminished = Scale(iid=3, title="C Diminished", sort_index=2)

    response['scales'] = [a_minor.to_dict(), b_major.to_dict(), c_diminished.to_dict()]
    return json.dumps(response), 200


app.run(host='0.0.0.0', port=5678, debug=True)