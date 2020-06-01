var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { error: false });
});

router.get('/login', function(req, res) {
  res.render('login', { error: false });
});

router.get('/logout', function(req, res) {
  res.cookie('authtoken', {expires: Date.now()});
  res.redirect('/');
});

module.exports = router;
