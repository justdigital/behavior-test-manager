var ScenarioCreate = {
  $stepContainer: false,
  $exporters: false,

  init: function(){
    this.$stepContainer = $(".steps");
    this.$exporters = $(".exporter");
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
    $newStep.removeClass("model");
    $newStep.hide();
    $newStep.slideDown(150, function(){
      $newInput.focus();
      $newSelect.material_select();
    });
    
  },

  isLastStep: function($step){
    var $lastStep = $(".step").last();
    return $lastStep.is($step);
  },

  removeStep: function($step){
    $step.slideUp(150, function(){
      $step.remove();
    });
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

  save: function(){
    if (!this.submitting){
      var json = this.generateJSON();
      $saveButton = $("#save-scenario");
      if (this.validate()){
        this.submitting = true;
        var self = this;
        $saveButton.addClass("disabled");
        $.post('add', json, function(result){
          $saveButton.removeClass("disabled");
          self.modified(false);
          self.submitting = false;
        }, 'json');
      }
    }
  },
  
  modified: function(changed){
    if (changed)
      this.$exporters.addClass("disabled");
    else
      this.$exporters.removeClass("disabled");
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
        self.save();
      })
      .on("keydown change", "input, select", function(){
        self.modified(true);
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
