var express = require('express');
var router = express.Router();
var passport = require('passport');
var fs = require('fs');
var google = require('googleapis');
var service = google.drive('v3');
var OAuth2 = google.auth.OAuth2;

var oauth2client = new OAuth2();

//      test what an access token works for:
//  https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=accessToken

router.get('/', function (req, res) {
    oauth2client.setCredentials({access_token: req.session.passport.user.access_token});
    service.files.list({
            auth: oauth2client,
            pageSize: 10,
            fields: "nextPageToken, files(id, name)"
        }, function (err, resp) {
            if (err) {
                console.log("ERRRRRRR: ", err);
            } else {
                res.send(resp.files);
            }
        }
    );
});

module.exports = router;
