var express = require('express');
var steps = require("../lib/data/stepprovider-mongodb.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  steps.load(function(results){
    console.log(results);
  });
  res.render('index', { title: 'Gerenciador' });
});
/* GET users listing. */
router.get('export/jira', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('export/behat', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello World' });
});

module.exports = router;
