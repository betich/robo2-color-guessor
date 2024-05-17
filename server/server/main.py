from aiohttp import web
import socketio

## creates a new Async Socket IO Server
sio = socketio.AsyncServer()
## Creates a new Aiohttp Web Application

app = web.Application()

# Binds our Socket.IO server to our Web App
## instance
sio.attach(app)

async def index(request):
    web.Response(text='hello', content_type='text/html')

app.router.add_get('/', index)


@sio.event
async def connect(sid, environ, auth):
    print('connect ', sid)

    await sio.emit('server_says_hi', {'message': 'Connected'}, room=sid)
    print ('done')

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.on('say_hi', namespace='*')
def my_event_any_namespace(namespace, sid, data):
    print("Socket ID: ", sid, " Namespace: ", namespace, " Data: ", data)
    pass

@sio.on('color', namespace='*')
def my_event_any_namespace(namespace, sid, data):
    print("qr code scanned: ", data)
    pass


