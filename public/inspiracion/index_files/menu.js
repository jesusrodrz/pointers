define(['jquery','matchMedia','jquery/ui','jquery/jquery.mobile.custom','mage/translate'],function($,mediaCheck){'use strict';$.widget('mage.menu',$.ui.menu,{options:{responsive:false,expanded:false,showDelay:42,hideDelay:300,delay:300,mediaBreakpoint:'(max-width: 767px)'},_create:function(){var self=this;this.delay=this.options.delay;this._super();$(window).on('resize',function(){self.element.find('.submenu-reverse').removeClass('submenu-reverse');});},_init:function(){this._super();if(this.options.expanded===true){this.isExpanded();}
if(this.options.responsive===true){mediaCheck({media:this.options.mediaBreakpoint,entry:$.proxy(function(){this._toggleMobileMode();},this),exit:$.proxy(function(){this._toggleDesktopMode();},this)});}
this._assignControls()._listen();this._setActiveMenu();},_assignControls:function(){this.controls={toggleBtn:$('[data-action="toggle-nav"]'),swipeArea:$('.nav-sections')};return this;},_listen:function(){var controls=this.controls,toggle=this.toggle;this._on(controls.toggleBtn,{'click':toggle});this._on(controls.swipeArea,{'swipeleft':toggle});},toggle:function(){var html=$('html');if(html.hasClass('nav-open')){html.removeClass('nav-open');setTimeout(function(){html.removeClass('nav-before-open');},this.options.hideDelay);}else{html.addClass('nav-before-open');setTimeout(function(){html.addClass('nav-open');},this.options.showDelay);}},_setActiveMenu:function(){var currentUrl=window.location.href.split('?')[0];if(!this._setActiveMenuForCategory(currentUrl)){this._setActiveMenuForProduct(currentUrl);}},_setActiveMenuForCategory:function(url){var activeCategoryLink=this.element.find('a[href="'+url+'"]'),classes,classNav;if(!activeCategoryLink||!activeCategoryLink.hasClass('ui-corner-all')){return false;}else if(!activeCategoryLink.parent().hasClass('active')){activeCategoryLink.parent().addClass('active');classes=activeCategoryLink.parent().attr('class');classNav=classes.match(/(nav\-)[0-9]+(\-[0-9]+)+/gi);if(classNav){this._setActiveParent(classNav[0]);}}
return true;},_setActiveParent:function(childClassName){var parentElement,parentClass=childClassName.substr(0,childClassName.lastIndexOf('-'));if(parentClass.lastIndexOf('-')!==-1){parentElement=this.element.find('.'+parentClass);if(parentElement){parentElement.addClass('has-active');}
this._setActiveParent(parentClass);}},_setActiveMenuForProduct:function(currentUrl){var categoryUrlExtension,lastUrlSection,possibleCategoryUrl,firstCategoryUrl=this.element.find('> li a').attr('href');if(firstCategoryUrl){lastUrlSection=firstCategoryUrl.substr(firstCategoryUrl.lastIndexOf('/'));categoryUrlExtension=lastUrlSection.lastIndexOf('.')!==-1?lastUrlSection.substr(lastUrlSection.lastIndexOf('.')):'';possibleCategoryUrl=currentUrl.substr(0,currentUrl.lastIndexOf('/'))+categoryUrlExtension;this._setActiveMenuForCategory(possibleCategoryUrl);}},isExpanded:function(){var subMenus=this.element.find(this.options.menus),expandedMenus=subMenus.find(this.options.menus);expandedMenus.addClass('expanded');},_activate:function(event){window.location.href=this.active.find('> a').attr('href');this.collapseAll(event);},_keydown:function(event){var match,prev,character,skip,regex,preventDefault=true;function escape(value){return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,'\\$&');}
if(this.active.closest(this.options.menus).attr('aria-expanded')!='true'){switch(event.keyCode){case $.ui.keyCode.PAGE_UP:this.previousPage(event);break;case $.ui.keyCode.PAGE_DOWN:this.nextPage(event);break;case $.ui.keyCode.HOME:this._move('first','first',event);break;case $.ui.keyCode.END:this._move('last','last',event);break;case $.ui.keyCode.UP:this.previous(event);break;case $.ui.keyCode.DOWN:if(this.active&&!this.active.is('.ui-state-disabled')){this.expand(event);}
break;case $.ui.keyCode.LEFT:this.previous(event);break;case $.ui.keyCode.RIGHT:this.next(event);break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event);break;case $.ui.keyCode.ESCAPE:this.collapse(event);break;default:preventDefault=false;prev=this.previousFilter||'';character=String.fromCharCode(event.keyCode);skip=false;clearTimeout(this.filterTimer);if(character===prev){skip=true;}else{character=prev+character;}
regex=new RegExp('^'+escape(character),'i');match=this.activeMenu.children('.ui-menu-item').filter(function(){return regex.test($(this).children('a').text());});match=skip&&match.index(this.active.next())!==-1?this.active.nextAll('.ui-menu-item'):match;if(!match.length){character=String.fromCharCode(event.keyCode);regex=new RegExp('^'+escape(character),'i');match=this.activeMenu.children('.ui-menu-item').filter(function(){return regex.test($(this).children('a').text());});}
if(match.length){this.focus(event,match);if(match.length>1){this.previousFilter=character;this.filterTimer=this._delay(function(){delete this.previousFilter;},1000);}else{delete this.previousFilter;}}else{delete this.previousFilter;}}}else{switch(event.keyCode){case $.ui.keyCode.DOWN:this.next(event);break;case $.ui.keyCode.UP:this.previous(event);break;case $.ui.keyCode.RIGHT:if(this.active&&!this.active.is('.ui-state-disabled')){this.expand(event);}
break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event);break;case $.ui.keyCode.LEFT:case $.ui.keyCode.ESCAPE:this.collapse(event);break;default:preventDefault=false;prev=this.previousFilter||'';character=String.fromCharCode(event.keyCode);skip=false;clearTimeout(this.filterTimer);if(character===prev){skip=true;}else{character=prev+character;}
regex=new RegExp('^'+escape(character),'i');match=this.activeMenu.children('.ui-menu-item').filter(function(){return regex.test($(this).children('a').text());});match=skip&&match.index(this.active.next())!==-1?this.active.nextAll('.ui-menu-item'):match;if(!match.length){character=String.fromCharCode(event.keyCode);regex=new RegExp('^'+escape(character),'i');match=this.activeMenu.children('.ui-menu-item').filter(function(){return regex.test($(this).children('a').text());});}
if(match.length){this.focus(event,match);if(match.length>1){this.previousFilter=character;this.filterTimer=this._delay(function(){delete this.previousFilter;},1000);}else{delete this.previousFilter;}}else{delete this.previousFilter;}}}
if(preventDefault){event.preventDefault();}},_toggleMobileMode:function(){var subMenus;$(this.element).off('mouseenter mouseleave');this._on({'click .ui-menu-item:has(a)':function(event){var target;event.preventDefault();target=$(event.target).closest('.ui-menu-item');if(!target.hasClass('level-top')||!target.has('.ui-menu').length){window.location.href=target.find('> a').attr('href');}},'click .ui-menu-item:has(.ui-state-active)':function(event){this.collapseAll(event,true);}});subMenus=this.element.find('.level-top');$.each(subMenus,$.proxy(function(index,item){var category=$(item).find('> a span').not('.ui-menu-icon').text(),categoryUrl=$(item).find('> a').attr('href'),menu=$(item).find('> .ui-menu');this.categoryLink=$('<a>').attr('href',categoryUrl).text($.mage.__('All ')+category);this.categoryParent=$('<li>').addClass('ui-menu-item all-category').html(this.categoryLink);if(menu.find('.all-category').length===0){menu.prepend(this.categoryParent);}},this));},_toggleDesktopMode:function(){var categoryParent,html;this._on({'mousedown .ui-menu-item > a':function(event){event.preventDefault();},'click .ui-state-disabled > a':function(event){event.preventDefault();},'click .ui-menu-item:has(a)':function(event){var target=$(event.target).closest('.ui-menu-item');if(!this.mouseHandled&&target.not('.ui-state-disabled').length){this.select(event);if(!event.isPropagationStopped()){this.mouseHandled=true;}
if(target.has('.ui-menu').length){this.expand(event);}else if(!this.element.is(':focus')&&$(this.document[0].activeElement).closest('.ui-menu').length){this.element.trigger('focus',[true]);if(this.active&&this.active.parents('.ui-menu').length===1){clearTimeout(this.timer);}}}},'mouseenter .ui-menu-item':function(event){var target=$(event.currentTarget),submenu=this.options.menus,ulElement,ulElementWidth,width,targetPageX,rightBound;if(target.has(submenu)){ulElement=target.find(submenu);ulElementWidth=ulElement.outerWidth(true);width=target.outerWidth()*2;targetPageX=target.offset().left;rightBound=$(window).width();if(ulElementWidth+width+targetPageX>rightBound){ulElement.addClass('submenu-reverse');}
if(targetPageX-ulElementWidth<0){ulElement.removeClass('submenu-reverse');}}
target.siblings().children('.ui-state-active').removeClass('ui-state-active');this.focus(event,target);},'mouseleave':function(event){this.collapseAll(event,true);},'mouseleave .ui-menu':'collapseAll'});categoryParent=this.element.find('.all-category');html=$('html');categoryParent.remove();if(html.hasClass('nav-open')){html.removeClass('nav-open');setTimeout(function(){html.removeClass('nav-before-open');},this.options.hideDelay);}},_delay:function(handler,delay){var instance=this,handlerProxy=function(){return(typeof handler==='string'?instance[handler]:handler).apply(instance,arguments);};return setTimeout(handlerProxy,delay||0);},expand:function(event){var newItem=this.active&&this.active.children('.ui-menu').children('.ui-menu-item').first();if(newItem&&newItem.length){if(newItem.closest('.ui-menu').is(':visible')&&newItem.closest('.ui-menu').has('.all-categories')){return;}
this.active.siblings().children('.ui-state-active').removeClass('ui-state-active');this._open(newItem.parent());this._delay(function(){this.focus(event,newItem);});}},select:function(event){var ui;this.active=this.active||$(event.target).closest('.ui-menu-item');if(this.active.is('.all-category')){this.active=$(event.target).closest('.ui-menu-item');}
ui={item:this.active};if(!this.active.has('.ui-menu').length){this.collapseAll(event,true);}
this._trigger('select',event,ui);}});$.widget('mage.navigation',$.mage.menu,{options:{responsiveAction:'wrap',maxItems:null,container:'#menu',moreText:$.mage.__('more'),breakpoint:767},_init:function(){var that,responsive;this._super();that=this;responsive=this.options.responsiveAction;this.element.addClass('ui-menu-responsive').attr('responsive','main');this.setupMoreMenu();this.setMaxItems();if(responsive=='onResize'){$(window).on('resize',function(){if($(window).width()>that.options.breakpoint){that._responsive();$('[responsive=more]').show();}else{that.element.children().show();$('[responsive=more]').hide();}});}else if(responsive=='onReload'){this._responsive();}},setupMoreMenu:function(){var moreListItems=this.element.children().clone(),moreLink=$('<a>'+this.options.moreText+'</a>');moreListItems.hide();moreLink.attr('href','#');this.moreItemsList=$('<ul>').append(moreListItems);this.moreListContainer=$('<li>').append(moreLink).append(this.moreItemsList);this.responsiveMenu=$('<ul>').addClass('ui-menu-more').attr('responsive','more').append(this.moreListContainer).menu({position:{my:'right top',at:'right bottom'}}).insertAfter(this.element);},_responsive:function(){var container=$(this.options.container),containerSize=container.width(),width=0,items=this.element.children('li'),more=$('.ui-menu-more > li > ul > li a');items=items.map(function(){var item={};item.item=$(this);item.itemSize=$(this).outerWidth();return item;});$.each(items,function(index){var itemText=items[index].item.find('a:first').text();width+=parseInt(items[index].itemSize,null);if(width<containerSize){items[index].item.show();more.each(function(){var text=$(this).text();if(text===itemText){$(this).parent().hide();}});}else if(width>containerSize){items[index].item.hide();more.each(function(){var text=$(this).text();if(text===itemText){$(this).parent().show();}});}});},setMaxItems:function(){var items=this.element.children('li'),itemsCount=items.length,maxItems=this.options.maxItems,overflow=itemsCount-maxItems,overflowItems=items.slice(overflow);overflowItems.hide();overflowItems.each(function(){var itemText=$(this).find('a:first').text();$(this).hide();$('.ui-menu-more > li > ul > li a').each(function(){var text=$(this).text();if(text===itemText){$(this).parent().show();}});});}});return{menu:$.mage.menu,navigation:$.mage.navigation};});