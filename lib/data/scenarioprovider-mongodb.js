module.exports = {
  save: function(cb){
    cb = cb || function(){};
    db.collection('scenarios').insert({ br : "teste luiz", en : "testeee" }, function(err, result) {
      if (err) throw err;
      if (result) {
        cb(result);
      };
    })
    
  },

  load: function(cb){
    var db = global.db;
    cb = cb || function(){};
    db.collection('scenarios').find().toArray(function(err, result) {
      if (err){
        throw err;
      }else{
        console.log(result);
        cb(result);
      }
    });
  }
};
