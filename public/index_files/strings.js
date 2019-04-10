define(['underscore'],function(_){'use strict';var jsonRe=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;return{castString:function(str){try{str=str==='true'?true:str==='false'?false:str==='null'?null:+str+''===str?+str:jsonRe.test(str)?JSON.parse(str):str;}catch(e){}
return str;},stringToArray:function(str,separator){separator=separator||' ';return typeof str==='string'?str.split(separator):str;},serializeName:function(name,separator){var result;separator=separator||'.';name=name.split(separator);result=name.shift();name.forEach(function(part){result+='['+part+']';});return result;},isEmpty:function(value){return value===''||_.isUndefined(value)||_.isNull(value);},fullPath:function(prefix,part){return prefix?prefix+'.'+part:part;},getPart:function(parts,offset,delimiter){delimiter=delimiter||'.';parts=parts.split(delimiter);offset=this.formatOffset(parts,offset);parts.splice(offset,1);return parts.join(delimiter)||'';},camelCaseToMinus:function camelCaseToMinus(string){return(''+string).split('').map(function(symbol,index){return index?symbol.toUpperCase()===symbol?'-'+symbol.toLowerCase():symbol:symbol.toLowerCase();}).join('');},minusToCamelCase:function minusToCamelCase(string){return(''+string).split('-').map(function(part,index){return index?part.charAt(0).toUpperCase()+part.slice(1):part;}).join('');}};});