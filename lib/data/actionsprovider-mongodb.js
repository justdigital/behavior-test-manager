module.exports = {

  save: function(){
    teste= {br: 'teste en', en: 'teste en'};
    db.collection('scenario').insert(teste);
  },

  load: function(query, cb){
    var db = global.db;
    cb = cb || function(){};
    db.collection('actions').find(query).toArray(function(err, result) {
      if (err){
        cb([]);
      }else{
        cb(result);
      }
    });
  }
};
