var db = globals.db;
module.exports = {
  save: function(){},
  load: function(cb){
    cb = cb || function(){};
    db.collection('steps').find().toArray(function(err, result) {
      if (err){
        throw err;
      }else{
        console.log(result);
        cb(result);
      }
    });
  }
};
