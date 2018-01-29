var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
