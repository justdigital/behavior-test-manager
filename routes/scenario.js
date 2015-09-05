var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();
var BSON = global.mongo.BSONPure;

/* GET home page. */
router.get('/add', function(req, res, next) {
  scenarios.load({jiraId: /.*fvc.*/},function(results){	
  	console.log(results);
    res.render('scenario/list', { title: 'scenarios index', scenarios: results  });
  })
});

router.get('/edit/:id', function(req, res, next) {
  scenarios.load({_id: new BSON.ObjectID(req.params.id)}, function(scenarios){
    if (!scenarios.length || scenarios.length === 0){
      res.redirect("scenario");
    }
    moments.load(function(results){	
      res.render('scenario/add', { title: 'scenarios index', moments: results, scenario: scenarios[0]  });
    })
  });
});

router.post('/add', function(req, res, next) {
	scenarios.save(req.body, function(results){
    res.json(results);
	})

});

module.exports = router;
