var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();
var BSON = global.mongo.BSONPure;

router.get('/', function(req, res, next){
  scenarios.load({},function(results){	
  	console.log(results);
    res.render('scenario/list', { title: 'scenarios index', scenarios: results  });
  })
});

router.get('/filter/:team', function(req, res, next){
  team = req.params.team
  var regex = new RegExp(".*" + team + ".*");
  console.log(regex)
  scenarios.load({jiraId: regex}, function(results){
    res.render('scenario/list', { title: 'Gerenciador', scenarios: results });
  });
});

// Scenario add form
router.get('/add', function(req, res, next) {
 moments.load(function(results){	
   res.render('scenario/add', { title: 'scenarios index', moments: results  });
 })
});

router.get('/edit/:id', function(req, res, next) {
  scenarios.load({_id: new BSON.ObjectID(req.params.id)}, function(scenarios){
    if (!scenarios.length || scenarios.length === 0){
      res.redirect("scenario");
    }
    moments.load(function(results){	
      console.log(scenarios[0]);
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
