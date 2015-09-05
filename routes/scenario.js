var express = require('express');
var moments = require("../lib/data/momentsprovider-mongodb.js");
var steps = require("../lib/data/stepprovider-mongodb.js");
var scenarios = require("../lib/data/scenarioprovider-mongodb.js");
var router = express.Router();

/* GET home page. */
router.get('/save', function(req, res, next) {
	
    moments.load(function(results){	
	  res.render('scenario/save', { title: 'scenarios index', moments: results  });
	})

});

router.post('/save', function(req, res, next) {
	console.log(req.body);
	// scenarios.save(function(results){
 //  	  res.render('scenario/save', { title: 'scenarios index', moments: results  });
	// })

});

module.exports = router;
