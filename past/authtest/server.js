var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var google = require('googleapis');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function genuuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }   
    return s4() + s4() + '-' + s4() + '-' + 
        s4() + '-' + s4() + '-' + s4() + s4() + s4();    
}

app.use(passport.initialize());
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

passport.serializeUser(function (user, done) {
    done(null, { id: user.id, access_token: user.access_token });
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(null, user);
    });
});

var root = require('./routes/root.js');
var auth = require('./routes/auth.js');
var callback = require('./routes/callback.js');
var success = require('./routes/success.js');
var apitest = require('./routes/apitest.js');

var routes = [
    app.use('/', root),
    app.use('/auth', auth),
    app.use('/callback', callback),
    app.use('/success', success),
    app.use('/apitest', apitest)
];


var scopes = [
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/userinfo.profile'
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

        content = JSON.parse(content);
        passport.use(new GoogleStrategy({
            clientID: content.web.client_id,
            clientSecret: content.web.client_secret,
            callbackURL: content.web.redirect_uris[0]
        }, function (access_token, refresh_token, profile, done) {
            done(null, {id: profile.id, access_token: access_token});
        }));
    }
});
