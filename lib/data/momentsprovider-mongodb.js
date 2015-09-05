module.exports = {

  save: function(){
    teste= {br: 'teste en', en: 'teste en'};
    db.collection('scenario').insert(teste);
  },

  load: function(cb){
    var db = global.db;
    cb = cb || function(){};
    db.collection('moments').find().toArray(function(err, result) {
      if (err){
        cb([]);
      }else{
        // console.log(result);
        cb(result);
      }
    });
  }
};
