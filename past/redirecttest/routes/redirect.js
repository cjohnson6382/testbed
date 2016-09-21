var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.redirect('/headers');
});

module.exports = router;
