define(['ko','../template/renderer'],function(ko,renderer){'use strict';ko.bindingHandlers.keyboard={init:function(el,valueAccessor,allBindings,viewModel){var map=valueAccessor();ko.utils.registerEventHandler(el,'keyup',function(e){var callback=map[e.keyCode];if(callback){return callback.call(viewModel,e);}});}};renderer.addAttribute('keyboard');});