var express = require('express');
var router = express.Router();
var fs = require('fs');

var google = require('gogleapis');
var OAuth2 = google.auth.OAuth2;

var scopes = [
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/userinfo.profile'
];

router.get('/', function (req, res) {
	res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
	fs.readFile('client_secret_testbed.json', function (err, content) {
		var credentials = JSON.parse(content.toString('utf8'));

	  var authentication = [
        credentials.client_id,
				credentials.web.client_secret
        credentials.redirect_uri,
    ];

		req.session.authentication = authentication;
		var oauth2Client = new OAuth2(...authentication);
	
		var url = oauth2Client.generateAuthUrl(
			access_type: 'offline',
			scope: scopes
		);
 
    res.end(url);
  });
});

module.exports = router;
