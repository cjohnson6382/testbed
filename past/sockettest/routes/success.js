var express = require('express');
var router = express.Router();
var passport = require('passport');
var fs = require('fs');

router.get('/', function (req, res) {
    fs.readFile('html/success.html', function (err, content) {
        if (err === null) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(content);
        } else {
            console.log("ERR @ reading success.html", err);
        }   
    }); 
});

module.exports = router;
