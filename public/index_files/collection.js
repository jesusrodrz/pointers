define(['underscore','mageUtils','uiRegistry','uiElement'],function(_,utils,registry,Element){'use strict';function compact(container){return container.filter(utils.isObject);}
return Element.extend({defaults:{template:'ui/collection',_elems:[],ignoreTmpls:{childDefaults:true}},initObservable:function(){this._super().observe({elems:[]});return this;},initElement:function(elem){elem.initContainer(this);return this;},getChild:function(index){return _.findWhere(this.elems(),{index:index});},insertChild:function(elems,position){var container=this._elems,insert=this._insert.bind(this),update;if(!Array.isArray(elems)){elems=[elems];}
elems.map(function(item){return item.elem?utils.insert(item.elem,container,item.position):utils.insert(item,container,position);}).forEach(function(item){if(item===true){update=true;}else if(_.isString(item)){registry.get(item,insert);}else if(utils.isObject(item)){insert(item);}});if(update){this._updateCollection();}
return this;},removeChild:function(elem,skipUpdate){if(_.isString(elem)){elem=this.getChild(elem);}
if(elem){utils.remove(this._elems,elem);if(!skipUpdate){this._updateCollection();}}
return this;},destroyChildren:function(){this.elems.each(function(elem){elem.destroy(true);});this._updateCollection();},clear:function(){var elems=this.elems();_.each(elems,function(elem){if(_.isFunction(elem.clear)){elem.clear();}},this);return this;},hasChild:function(index){return!!this.getChild(index);},requestChild:function(index){var name=this.formChildName(index);return this.requestModule(name);},formChildName:function(index){return this.name+'.'+index;},getRegion:function(name){var regions=this.regions=this.regions||{};if(!regions[name]){regions[name]=[];this.observe.call(regions,name);}
return regions[name];},updateRegion:function(items,name){this.getRegion(name)(items);return this;},destroy:function(){this._super();this.elems.each('destroy');},_insert:function(elem){var index=this._elems.indexOf(elem.name);if(~index){this._elems[index]=elem;}
this._updateCollection().initElement(elem);},_updateCollection:function(){var _elems=compact(this._elems),grouped;grouped=_elems.filter(function(elem){return elem.displayArea&&_.isString(elem.displayArea);});grouped=_.groupBy(grouped,'displayArea');_.each(grouped,this.updateRegion,this);_.each(this.regions,function(items){var hasObsoleteComponents=items().length&&!_.intersection(_elems,items()).length;if(hasObsoleteComponents){items.removeAll();}});this.elems(_elems);return this;},delegate:function(target){var args=_.toArray(arguments);target=this[target];if(_.isFunction(target)){return target.apply(this,args.slice(1));}
return this._delegate(args);},_delegate:function(args){var result;result=this.elems.map(function(elem){var target;if(!_.isFunction(elem.delegate)){target=elem[args[0]];if(_.isFunction(target)){return target.apply(elem,args.slice(1));}}else{return elem.delegate.apply(elem,args);}});return _.flatten(result);}});});