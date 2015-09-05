var Globals = {
  getBaseUrl: function(){
    return window.location.protocol + "//" + window.location.host;
  }
};
$(function(){
  $(".step:not(.model) select").material_select();
});
