import logging

from flask import Flask
from flask_socketio import SocketIO, send

from entities.item_types import Scale

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'  # TODO
socketio = SocketIO(app)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


# @socketio.on('message 1')
# def hello():
#     response = {}
#
#     a_minor = Scale(iid=1, title="A Minor", sort_index=0)
#     b_major = Scale(iid=2, title="B Major", sort_index=1)
#     c_diminished = Scale(iid=3, title="C Diminished", sort_index=2)
#
#     response['scales'] = [a_minor.to_dict(), b_major.to_dict(), c_diminished.to_dict()]
#     return json.dumps(response), 200
#


@socketio.on('connect')
def test_connect():
    logger.debug('client connected')


@socketio.on('disconnect')
def test_disconnect():
    logger.debug('client disconnected')


@socketio.on('my event')
def my_event(username, password):
    logger.debug('USERNAME: {}'.format(username))
    logger.debug('PASSWORD: {}'.format(password))


socketio.run(app=app, host='0.0.0.0', port=5678, debug=True)
