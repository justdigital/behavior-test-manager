var ScenarioCreate = {
  $stepContainer: false,

  init: function(){
    this.$stepContainer = $(".steps");
    this.bindEvents();
  },

  addStep: function(){
    // Clona o último step, limpa os campos e da append na div .steps
    var $lastStep = $(".step:not(.model)").last();
    var $modelStep = $(".step.model").first();

    var $newStep = $modelStep.clone().removeClass("model");

    var $newInput = $newStep.find("input[type=text]");
    var $newSelect = $newStep.find("select");

    $newInput.val('');

    $lastStep.find(".action-button")
      .text("remove")
      .removeClass("green add-step")
      .addClass("red remove-step");
      
    this.$stepContainer.append($newStep);
    $newInput.focus();
    $newSelect.material_select();
    


    // Coloca botão de remover no step clonado anteriormente
  },

  isLastStep: function($step){
    var $lastStep = $(".step").last();
    return $lastStep.is($step);
  },

  removeStep: function($step){
    $step.remove();
  },

  generateJSON: function(){
    var json = {
      name: $("#scenario-name").val(),
      jiraId: $("#jira-id").val(),
      steps: [],
    };

    $(".step:not(.model)").each(function(){
      var $step = $(this);
      var step = {
        moment: $step.find(".select-wrapper input[type=text]").val(),
        action: $step.find(".step-action").val()
      };
      json.steps.push(step);
    });

    return json;
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
      })
      .on("click", '#save-scenario', function(){
        var json = self.generateJSON();
        if (self.validate()){
          console.log(json);
        }
      });
  },

  validateItem: function($items, pattern){
    var self = this;
    $items.each(function(){
      $item = $(this);
      var value = $item.val();
      if (!value.match(pattern)){
        $item.addClass("invalid");
        self.valid = false;
      }
    });
    return this;
  },

  validate: function(){
    this.valid = true;
    this
      .validateItem($("#scenario-name"), /[a-zA-Z0-9]{3,}/)
      .validateItem($("#jira-id"), /[a-zA-Z]{2,}\-[0-9]+/)
      .validateItem($(".step:not(.model) .step-action"), /[a-zA-Z\s]{5,}/);

    if (!this.valid){
      Materialize.toast('Corrija os erros em vermelho!', 3000, 'red');
    }

    return this.valid;
  }
};

$(function(){
  ScenarioCreate.init();
});
