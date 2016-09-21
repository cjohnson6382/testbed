var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



function genuuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }   
    return s4() + s4() + '-' + s4() + '-' + 
        s4() + '-' + s4() + '-' + s4() + s4() + s4();    
}

app.use(session({
    genid: function () {
        return genuuid();
    },  
    secret: 'hermesisisgrate',
    name: 'hermesis.sid',
    store: new MongoStore({ url: 'mongodb://localhost/hermesis' }), 
    maxAge: 1000 * 60 * 60 * 24 * 2,
    resave: false,
    secure: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug');

var root = require('./routes/root.js');
var headers = require('./routes/headers.js');
var redirect = require('./routes/redirect.js');

var routes = [
    app.use('/', root),
    app.use('/headers', headers),
    app.use('/redirect', redirect),
];

fs.readFile('./client_secret_testbed.json', function (err, content) {
    if (err) {
        console.log('error reading auth information from file');
    } else {
        var promise = Promise.all(routes);
        promise.then(function () {
            var options = {
                key: fs.readFileSync('./ssl/server.enc.key'),
                cert: fs.readFileSync('./ssl/server.crt')
            };
        
            try {
                https.createServer(options, app).listen(443, function () {
                    console.log('starting the HTTPS server');
                });
            } catch (e) {
                console.log('error starting server', e);
            }
        
        });
    }
});
