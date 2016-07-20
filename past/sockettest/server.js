var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

var io = require('socket.io');

var server;
var listener;

var socketpool = {};

fs.readFile('./client_secret_testbed.json', function (err, content) {
    if (err) {
        console.log('error reading auth information from file');
    } else {
        var options = {
            key: fs.readFileSync('./ssl/server.enc.key'),
            cert: fs.readFileSync('./ssl/server.crt')
        };
    
        try {
            listener = io.listen(https.createServer(options, app).listen(443, function () {
                console.log('starting the HTTPS server');
            }));

            listener.sockets.on('connection', function(socket){
                socket.on('cmessage', function (data) {
                    console.log(data.id, ' <-- data.id | socketpool keys -->', Object.keys(socketpool));
                    if (socketpool.hasOwnProperty('/#' + data.id) === false) {
                        console.log('socket is not in the socketpool; adding ' + socket.id);
                        socketpool[socket.id] = socket;
                        socket.emit('derp', {derp: 'derp derp derp'});
                        //  socketpool[data.user].emit('derp', {derp: 'derp derp derp'});
                    } else {
                        console.log('socket found; using it');
                        socketpool['/#' + data.id].emit('derp', {derp: 'derp derp derp'});
                    }
                    //  need a way to remove sockets from the socketpool
                    //  socketpool[data.user] = socket;
                });

                //  when a message is received up the channel, emit....
                socket.on('mmessage', function (data) {
                    socket.emit('returnmessage', {
                        'message': data.message
                    });
                });

                socket.on('disconnect', function () {
                    console.log('got disconnet');
                    delete socketpool[socket.id];
                });
            });


        } catch (e) {
            console.log('error starting server', e);
        }
    }
});

app.get('/', function (req, res) {
    fs.readFile('html/index.html', function (err, content) {
        if (err === null) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        } else {
            console.log('ERR reading index.html');
        }
    });
});

app.get('/send', function (req, res) {
    if (socketpool.hasOwnProperty('/#' + req.query.id)) {
        socketpool['/#' + req.query.id].emit('winner', {worked: 'it worked'});
        res.end(req.query.message);
    } else {
        res.end('the socket pool has no socket to transmit data on!');
    }
});


//  - I need to create a socket whenever a client connects
//  - the client's socket reference needs to go into its session
//  - when savemetadata executes, it needs to get the  id of the account that created the template
//  - in the same function, socket has to emit 
//        socket.broadcast.to(id).emit('updatelist', contractlist);

//  io.on('connection', function (socket) {
//      socket.on('savemetadata', function () {
//          socket.broadcast.to(id).emit('updatelist', contractlist);
//      });
//  });

//  what else is there besides 'connection'?
//  listener.sockets.on('connection', function (socket) {
//      socket.emit('newcontractlist', { list: contractlist });
//  });
