define(['jquery','underscore','ko','mageUtils','jquery/jquery-storageapi'],function($,_,ko,utils){'use strict';return{name:'IdsStorage',initialize:function(){if(!this.data){this.data=ko.observable({});}
this.initCustomerDataReloadListener().initLocalStorage().cachesDataFromLocalStorage().initDataListener();return this;},getDataFromLocalStorage:function(){return this.localStorage.get();},cachesDataFromLocalStorage:function(){this.data(this.getDataFromLocalStorage());return this;},initLocalStorage:function(){this.localStorage=$.initNamespaceStorage(this.namespace).localStorage;return this;},initDataListener:function(){this.data.subscribe(this.internalDataHandler.bind(this));},initCustomerDataReloadListener:function(){$(document).on('customer-data-reload',function(event,sections){if((_.isEmpty(sections)||_.contains(sections,this.namespace))&&~~this.allowToSendRequest){this.localStorage.removeAll();this.data();}}.bind(this));return this;},internalDataHandler:function(data){var localStorage=this.localStorage.get();if(!utils.compare(data,localStorage).equal){this.localStorage.set(data);}},externalDataHandler:function(data){data=data.items?data.items:data;this.set(_.extend(utils.copy(this.data()),data));}};});