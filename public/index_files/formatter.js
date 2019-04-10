define(['moment','mage/utils/template'],function(moment,mageTemplate){'use strict';function LogFormatter(dateFormat,template){this.dateFormat_='YYYY-MM-DD hh:mm:ss';this.template_='[${ $.date }] [${ $.entry.levelName }] ${ $.message }';if(dateFormat){this.dateFormat_=dateFormat;}
if(template){this.template_=template;}}
LogFormatter.prototype.process=function(entry){var message=mageTemplate.template(entry.message,entry.data),date=moment(entry.timestamp).format(this.dateFormat_);return mageTemplate.template(this.template_,{date:date,entry:entry,message:message});};return LogFormatter;});