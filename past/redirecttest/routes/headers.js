var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var rootRoute = '/';
	var redirectRoute = '/redirect';
	var headersRoute = '/headers';

	console.log(req.headers);

	res.render('getheaders', { 
		main: rootRoute, 
		redirect: redirectRoute, 
		head: headersRoute, 
		cookie: req.headers.cookie,
		host: req.headers.host,
		referrer: req.headers.referer
	});
});

module.exports = router;
