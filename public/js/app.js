var Globals = {
  getBaseUrl: function(){
    return window.location.protocol + "//" + window.location.host;
  }
};
$(function(){
  $(".step:not(.model) select, select.filter").material_select();


  //filtrar por times
  $('.filter-team li').on('click',function(){
  	team = $('select.filter').val();
  	if(team==""){
	  	$('.collection').load('/ .collection');
	}else{
	  	$('.collection').load('/scenario/filter/'+team+' .collection');		
	}

  })

  $('.modal-trigger').leanModal();
});
