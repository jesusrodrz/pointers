define(['./levels-pool'],function(logLevels){'use strict';var levels=logLevels.getLevels();function Logger(outputHandler,entryFactory){this.entries_=[];this.displayLevel_=levels.ERROR;this.displayCriteria_=[];this.entryFactory_=entryFactory;this.outputHandlers_=[outputHandler];this.addDisplayCriteria(this.matchesLevel_);}
Logger.prototype.setDisplayLevel=function(level){var levelName=logLevels.getNameByCode(level);if(!levelName){throw new TypeError('The provided level is not defined in the levels list.');}
this.displayLevel_=level;};Logger.prototype.addDisplayCriteria=function(criteria){this.displayCriteria_.push(criteria);};Logger.prototype.removeDisplayCriteria=function(criteria){var index=this.displayCriteria_.indexOf(criteria);if(~index){this.displayCriteria_.splice(index,1);}};Logger.prototype.error=function(message,messageData){return this.log_(message,levels.ERROR,messageData);};Logger.prototype.warn=function(message,messageData){return this.log_(message,levels.WARN,messageData);};Logger.prototype.info=function(message,messageData){return this.log_(message,levels.INFO,messageData);};Logger.prototype.debug=function(message,messageData){return this.log_(message,levels.DEBUG,messageData);};Logger.prototype.log_=function(message,level,messageData){var entry=this.createEntry_(message,level,messageData);this.entries_.push(entry);if(this.matchesCriteria_(entry)){this.processOutput_(entry);}
return entry;};Logger.prototype.createEntry_=function(message,level,messageData){return this.entryFactory_.createEntry(message,level,messageData);};Logger.prototype.getEntries=function(criteria){if(criteria){return this.entries_.filter(criteria);}
return this.entries_;};Logger.prototype.dump=function(criteria){var entries;if(!criteria){criteria=this.matchesCriteria_;}
entries=this.entries_.filter(criteria,this);this.outputHandlers_.forEach(function(handler){handler.dump(entries);});};Logger.prototype.processOutput_=function(entry){this.outputHandlers_.forEach(function(handler){handler.show(entry);});};Logger.prototype.matchesCriteria_=function(entry){return this.displayCriteria_.every(function(criteria){return criteria.call(this,entry);},this);};Logger.prototype.matchesLevel_=function(entry){return entry.level<=this.displayLevel_;};return Logger;});