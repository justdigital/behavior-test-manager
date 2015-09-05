var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();
var BSON = global.mongo.BSONPure;

router.get('/behat/:id', function(req, res, next){
  var message = "";
  scenarios.load({_id: new BSON.ObjectID(req.params.id)}, function(scenarios){
    if (!scenarios.length || scenarios.length === 0){
      res.json({});
    }
    var scenario = scenarios[0];

    for (var s in scenario.steps){
      var step = scenario.steps[s];
      message += step.moment + " " + step.action + "\n";
    }
    res.json({message: message});

  });
});

module.exports = router;
