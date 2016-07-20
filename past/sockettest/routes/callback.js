var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/success');
});

module.exports = router;
