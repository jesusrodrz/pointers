define(['jquery','underscore','jquery/ui','Magento_Ui/js/modal/confirm','mage/translate'],function($,_){'use strict';$.widget('mage.alert',$.mage.confirm,{options:{modalClass:'confirm',title:$.mage.__('Attention'),actions:{always:function(){}},buttons:[{text:$.mage.__('OK'),class:'action-primary action-accept',click:function(){this.closeModal(true);}}]},closeModal:function(){this.options.actions.always();this.element.bind('alertclosed',_.bind(this._remove,this));return this._super();}});return function(config){return $('<div></div>').html(config.content).alert(config);};});