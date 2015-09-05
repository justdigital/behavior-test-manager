var ScenarioCreate = {
  $stepContainer: false,

  init: function(){
    this.$stepContainer = $(".steps");
    this.bindEvents();
  },

  addStep: function(){
    // Clona o último step, limpa os campos e da append na div .steps
    var $oldStep = $(".step").last();

    var $newStep = $oldStep.clone(true,true);

    var $newInput = $newStep.find("input[type=text]");

    $newInput.val('');

    $oldStep.find(".action-button")
      .text("remove")
      .removeClass("green add-step")
      .addClass("red remove-step");
      
    this.$stepContainer.append($newStep);
    $newInput.focus();
    


    // Coloca botão de remover no step clonado anteriormente
  },

  isLastStep: function($step){
    var $lastStep = $(".step").last();
    //return $lastStep[0] == $step[0];
    return $lastStep.is($step);
  },

  removeStep: function($step){
    $step.remove();
  },


  bindEvents: function(){
    var self = this;
    $(document)
      .on('click', '.add-step', function(){
        self.addStep();
      })
      .on('keydown', '.step-action', function(e){
        if(e.keyCode === 13 && self.isLastStep($(this).parents(".step"))) {
          self.addStep();
        }
      })
      .on('click', '.remove-step', function(){
        var $step = $(this).parents('.step');
        self.removeStep($step);
      });
  }
};


$(function(){
  ScenarioCreate.init();
});
