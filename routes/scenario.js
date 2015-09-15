var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var actions = require("../lib/data/actionsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();
var BSON = global.mongo.BSONPure;


// Scenario list
router.get('/', function(req, res, next){
  scenarios.load({}, function(results){
    var team = [];

    for (var item in results){
      var resItem = results[item].jiraId.replace(/\-[0-9]+/g , "");

      if(team.indexOf(resItem) == -1 ){
        team.push(resItem);
      }
    }
    res.render('scenario/list', { title: 'Gerenciador', scenarios: results, team: team });
  });
});

//Scenario filter
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
  actions.load({}, function(actions){	
    moments.load({}, function(moments){	
      res.render('scenario/add', { title: 'scenarios index', moments: moments, actions: actions  });
    });
  });
});

// Scenario edit form
router.get('/edit/:id', function(req, res, next) {
  scenarios.load({_id: new BSON.ObjectID(req.params.id)}, function(scenarios){
    if (!scenarios.length || scenarios.length === 0){
      res.redirect("/scenario");
    }
    actions.load({}, function(actions){	
      moments.load({}, function(moments){	
        res.render('scenario/add', { title: 'scenarios index', moments: moments, scenario: scenarios[0], actions: actions });
      });
    });
  });
});

// Scenario save 
router.post('/add', function(req, res, next) {
	scenarios.save(req.body, function(results){
    res.json(results);
	})

});

// Scenario delete 
router.get('/edit/:id/delete', function(req, res) {
  scenarios.destroy(req.params.id, function(result){
    if(result){
      res.redirect("/scenario");
    }  
  })
});

module.exports = router;
