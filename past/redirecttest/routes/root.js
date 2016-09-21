var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var headersRoute = '/headers';

	res.render('index', { headerspage: headersRoute });
});

module.exports = router;
