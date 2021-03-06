var ScenarioCreate = {
  $stepContainer: false,
  $exporters: false,
  id: false,

  init: function(){
    this.$stepContainer = $(".steps");
    this.$exporters = $(".exporter");
    this.id = $("#scenario-id").val() || false;
    if (this.id){
      this.exportTo("behat");
      this.exportTo("jira");
      this.deleteScen();
    }
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

    if (this.id){
      json._id = this.id;
    }


    $(".step:not(.model)").each(function(){
      var $step = $(this);
      var moment = $step.find(".select-wrapper.moments input[type=text]").val();
      var action = $step.find(".select-wrapper.actions input[type=text]").val();
      var step = {
        moment: $step.find(".moments option").filter(function(){
          return $(this).text() == moment; 
        }).val(),
        action: $step.find(".actions option").filter(function(){
          return $(this).text() == action; 
        }).val()
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
        $.post(Globals.getBaseUrl() + '/scenario/add', json, function(result){
          if (result.action === "insert"){
            window.location.href = "/scenario/edit/" + result._id;
          }else{
            self.exportTo("behat");
            self.exportTo("jira");
          }
          $saveButton.removeClass("disabled");
          self.submitting = false;
        }, 'json');
      }
    }
  },

  deleteScen: function(del){
    if (this.id){
    
      $.get(Globals.getBaseUrl() + '/scenario/edit/' + this.id, function(result){
        $deleteButton = $("#delete-scenario");
        $deleteButton.removeClass("disabled");
        if(del){
           console.log('truee');
          // TO DO REQUEST POST 'DELETE' var http = require('http');
          // var options = {
          //   hostname: '127.0.0.1',
          //   port: 3000,
          //   path: '/scenario/edit/' + this.id,
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   }
          // };
          // var req = http.request(options, function(res) {
          //   console.log('STATUS: ' + res.statusCode);
          // });
        }
      });
    }
    
  },

  exportTo: function(tool){
    if (this.id){
      var self = this;
      $.get(Globals.getBaseUrl() + '/exporter/' + tool + "/" + this.id, function(result){
        if (result && result.message){
          $("#" + tool + "-export-contents").val(result.message);
          self.$exporters.filter("#" + tool + "-export-button").removeClass("disabled");
        }
      });
    }
  },
  
  modified: function(){
    this.$exporters.addClass("disabled");
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
      .on("click", '#delete-scenario', function(){
        var del = true;
        self.deleteScen(del);
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
      .validateItem($(".step:not(.model) .step-action"), /[a-zA-Z\-\s]{5,}/);

    if (!this.valid){
      Materialize.toast('Corrija os erros em vermelho!', 3000, 'red');
    }

    return this.valid;
  }
};

$(function(){
  ScenarioCreate.init();
});
