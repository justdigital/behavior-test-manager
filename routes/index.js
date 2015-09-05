var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
  scenarios.load(function(results){
	  res.render('scenario/list', { title: 'Gerenciador', scenarios: results });
  });

});

/* GET users listing. */
router.get('export/jira', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('export/behat', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
