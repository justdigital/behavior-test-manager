var ScenarioCreate = {
  $stepContainer: false,

  init: function(){
    this.$stepContainer = $(".steps");
    this.bindEvents();
  },

  addStep: function(){
    // Clona o último step, limpa os campos e da append na div .steps
    var $oldStep = $(".step").last();

    var $newStep = $oldStep.clone();

    $newStep.find("input[type=text]").val();

    $oldStep.find(".action-button")
      .text("remove")
      .removeClass("green add-step")
      .addClass("red remove-step");
      
    this.$stepContainer.append($newStep);
    


    // Coloca botão de remover no step clonado anteriormente
  },


  bindEvents: function(){

  }
};


$(function(){
  ScenarioCreate.init();
});
