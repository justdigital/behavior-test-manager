var BSON = global.mongo.BSONPure;

module.exports = {
  save: function(obj, cb){
    cb = cb || function(){};
    if (!obj._id){
      db.collection('scenarios').insert(obj, function(err, result) {
        if (err) cb(false);
        if (result) {
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
      db.collection("scenarios").update(query, obj, function(err, result) {
        if (err) {
          cb(false);
          throw err;
        }
        else {
          result.action = "update";
          cb(result);
        }
      });
    }
  },

  load: function(condition, cb){
    var db = global.db;
    cb = cb || function(){};
    db.collection('scenarios').find(condition).toArray(function(err, result) {
      if (err){
        throw err;
      }else{
        cb(result);
      }
    });
  }
};
