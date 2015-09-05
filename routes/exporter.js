var express = require('express');
var actions = require("../lib/data/actionsprovider-mongodb.js");
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();
var BSON = global.mongo.BSONPure;

var getScenarioById = function(id, cb){
  scenarios.load({_id: new BSON.ObjectID(id)}, function(scenarios){
    if (!scenarios.length || scenarios.length === 0){
      cb(false);
    }
    var scenario = scenarios[0];
    cb(scenario)
  });
};

var translateTermToBr = function(en, terms){
  var brStr = en;

  for (var t in terms){
    var term = terms[t];
    if (term.en === en){
      brStr = term.br;
      break;
    }
  }

  return brStr;
}

router.get('/behat/:id', function(req, res, next){
  var message = "";
  getScenarioById(req.params.id, function(scenario){
    if (scenario){
      message += "Scenario: " + scenario.name + "\n";
      for (var s in scenario.steps){
        var step = scenario.steps[s];
        message += step.moment + " " + step.action + "\n";
      }
      res.json({message: message});
    }else{
      res.json({});
    }
  });
});

router.get('/jira/:id', function(req, res, next){
  var message = "";
  actions.load({}, function(actions){
    moments.load({}, function(moments){
      getScenarioById(req.params.id, function(scenario){
        if (scenario){
          for (var s in scenario.steps){
            var step = scenario.steps[s];
            var moment = translateTermToBr(step.moment, moments);
            var action = translateTermToBr(step.action, actions);
            message += moment + " " + action + "\n";
          }
          res.json({message: message});
        }else{
          res.json({});
        }
      });
    });
  });
});

module.exports = router;
