module.exports = {
  save: function(obj, cb){
    cb = cb || function(){};
    db.collection('scenarios').insert(obj, function(err, result) {
      if (err) throw err;
      if (result) {
        cb(result);
      };
    })
    
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
