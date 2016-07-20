var express = require('express');
var router = express.Router();
var passport = require('passport');
var fs = require('fs');

router.get('/', function (req, res) {
    fs.readFile('html/index.html', function (err, content) {
        if (err === null) {
            //  console.log('req: ', req, '\n\n\n\n\n', 'res: ', res);
            //  console.log('HTML: ', content);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(content);
        } else {
            console.log("ERR @ reading index.html", err);
        }   
    }); 
});

module.exports = router;
