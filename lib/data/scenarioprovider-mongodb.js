var BSON = global.mongo.BSONPure;

module.exports = {
  save: function(obj, cb){
    cb = cb || function(){};
    if (!obj._id){
      db.collection('scenarios').insert(obj, function(err, result) {
        if (err) cb(false);
        if (result) {
          result = result[0];
          result.action = "insert";
          cb(result);
        };
      })
    } else {
      var bsonId = new BSON.ObjectID(obj._id);
      var query = {
        _id: bsonId
      };
      obj._id = bsonId;
      db.collection("scenarios").update(query, obj, function(err, affected) {
        if (err) {
          cb(false);
          throw err;
        }
        else {
          var result = {
            affected: affected
          };
          result.action = "update";
          cb(result);
        }
      });
    }
  },

  load: function(condition, cb){
    var db = global.db;
    cb = cb || function(){};
    db.collection('scenarios').find(condition).toArray(function(err, results) {
      for (var i in results){
        var result = results[i];
        var steps = [];
        for (var prop in result){
          var val = result[prop];
          if (prop.match("step")){
            prop = prop.replace(/([a-z]\[\d\]\[)([a-z]+)(\])/, "$1'$2'$3");
            steps.push({});
            eval(prop + " = '" + val + "';");
          }
        }
        var newSteps = [];
        for (var prop in steps){
          var obj = steps[prop];
          if (Object.keys(obj).length){
            newSteps.push(obj);
          }
        }
        results[i].steps = newSteps;
      }
      if (err){
        throw err;
      }else{
        cb(results);
      }
    });
  }
};
