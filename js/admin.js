/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(.6,.04,.98,.335)",linear:'cubic-bezier(1,1,1,1)',easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);


/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

var W3Ex = W3Ex || {};

jQuery(document).ready(function(){
	
W3Ex.ibaengine = (function($){
	
	var _arrPalette = [
		["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", 
		"rgb(204, 204, 204)", "rgb(217, 217, 217)",  "rgb(255, 255, 255)"],
		["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
		"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
		["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
		"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
		"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
		"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
		"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
		"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
		"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
		"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
		"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
		"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ];
	var _arrEffects = [];
	var _Data= {};
	var _Styles = {};
	var _arrSavedStates = [];
	var _conitems = 0;
	var _conitemsfin = 0;
	var _u;
	var _anima = {"type":"#onappeartype","easing":"#onappeareasing","speed":"#onappearspeed"};
	var _animd = {"type":"#ondisappeartype","easing":"#ondisappeareasing","speed":"#ondisappearspeed"};
	var _buts = {newlayer:"#newlayer",newtext:"#newtextstate",newhtml:"#newhtmlstate",newimage:"#newimagestate",previewlayer:"#previewlayer",deletelayer:"#deletelayer"}
	var _idcounts = {layer:0,state:0,style:0};
	var _selected = {layer:-1,state:-1};
	var _arrimgs = [];
	var $_sellayer;
	var _statestyle = {};
	var _imagesizeshtml = "";
	var _animOffset = 40;
	var _iselement = false;
	var _previewob = {};
	_previewob.ispreview = false;
	_previewob.counter = 0;
	
	$(document).on( "click",'div.defaultlayer a', function(e) 
	{
		e.preventDefault();
		return false;
	});
	
	$('#aelementid').keyup(function(){
       $('#elementerror').html('');
    });
	
	$('#newplaceholder').click(function ()
	{
		$('#placeholder').dialog("open");
	})
	$('input:radio[name=radiop]').click(function ()
	{
		$('#elementerror').html('');
	})
	//placement buttons
		$('#Top-left').click(function ()
		{
			$('#elementplacement').text("Top-left");
			$('#elementerror').html('');
		})
		$('#Top-middle').click(function ()
		{
			$('#elementplacement').text("Top-middle");
			$('#elementerror').html('');
		})
		$('#Top-right').click(function ()
		{
			$('#elementplacement').text("Top-right");
			$('#elementerror').html('');
		})
		$('#Mid-left').click(function ()
		{
			$('#elementplacement').text("Mid-left");
			$('#elementerror').html('');
		})
		$('#Mid-middle').click(function ()
		{
			$('#elementplacement').text("Center");
			$('#elementerror').html('');
		})
		$('#Mid-right').click(function ()
		{
			$('#elementplacement').text("Mid-right");
			$('#elementerror').html('');
		})
		$('#Bot-left').click(function ()
		{
			$('#elementplacement').text("Bot-left");
			$('#elementerror').html('');
		})
		$('#Bot-middle').click(function ()
		{
			$('#elementplacement').text("Bot-middle");
			$('#elementerror').html('');
		})
		$('#Bot-right').click(function ()
		{
			$('#elementplacement').text("Bot-right");
			$('#elementerror').html('');
		})
		
	$(document).on( "click",'.layersettings', function ()
	{
	 	
		var $elem = $(this);
		W3Ex.currcontainer = true;
		W3Ex.clickedelem = $elem;
		$('#placeholder').dialog("open");
	})
	
	$('#applyoffset').click(function()
	{
		var ischecked = $(this).prop('checked');
		if(ischecked)
		{
			$('#leftrightdiv').show();
			$('#topbottomdiv').show();
		}else
		{
			$('#leftrightdiv').hide();
			$('#topbottomdiv').hide();
		}
	})
	
	//end placement buttons
	$("#placeholder").dialog({			
	            autoOpen: false,
	            height: 420,
	            width: 520,
	            modal: true,
				draggable:false,
				resizable:false,
				closeOnEscape: false,
				open: function( event, ui ) {
					 var d = $('.ui-dialog:visible');
					 $(d).css('z-index',300002);
					  $('.ui-widget-overlay').each(function () {
	   					 $(this).next('.ui-dialog').andSelf().wrapAll('<div class="w3exvtfscope w3exvtfdel" />');
				});
					$('span.ui-icon-closethick').css({
													   left : '0px',
													   top : '0px'
													});
				$('input:radio[name=radiop]').each(function () { $(this).prop('checked', false); });	
				$('#elementplacement').text("");
				$('#aelementid').val('');
				$('#elementerror').html('');
				$('#placeholder').css('height','342px');
				$('#applyoffset').prop('checked',false);
				$('#leftrightdiv').hide();
				$('#topbottomdiv').hide();
				$('#leftrightper').val('0');
				$('#leftrightleft').prop('checked','checked');
				$('#topbottomper').val('0');
				$('#topbottomtop').prop('checked','checked');
				$('#p0').prop('checked','checked');
				if(W3Ex.currcontainer != undefined && W3Ex.currcontainer)
				{
					var id = W3Ex.clickedelem.attr('data-id');
					for(var i = 0; i < W3Ex.containers.length; i++){
						var container = W3Ex.containers[i];
						if(container == undefined) continue;
						if(container.id != id) continue;
						
						if((container.standalone !== true) && (container.standalone !== false))
						{
							if(container.standalone == "true")
							{
								container.standalone = true;
							}else
							{
								container.standalone = false;
							}
						}
						if(container.standalone)
						{
							$('#p0').prop('checked','checked');
						}else
						{
							$('#p1').prop('checked','checked');
							$('#aelementid').val(container.elemid);
							$('#elementplacement').text(container.elemposition);
							if((container.ifoffset !== true) && (container.ifoffset !== false))
							{
								if(container.ifoffset == "true")
								{
									container.ifoffset = true;
								}else
								{
									container.ifoffset = false;
								}
							}
							if(container.ifoffset)
							{
								$('#applyoffset').prop('checked',true);
								$('#leftrightdiv').show();
								$('#topbottomdiv').show();
								$('#leftrightper').val(container.leftrightp);
								$('#' +container.leftrightd).prop('checked','checked');
								$('#topbottomper').val(container.topbottomp);
								$('#' +container.topbottomd).prop('checked','checked');
							}
						}
					}	
				}
			},
			close: function( event, ui ) {
				W3Ex.currcontainer = false;
			},
   			 buttons: {
              "OK": function() {
			  
			  	var selid = $('input[name=radiop]:checked').attr('id');
				var elemid = $('#aelementid').val();
				var elemposition = $('#elementplacement').text();
				if(selid != undefined)
				{
					if(selid != 'p0')
					{
						if(isBlank(elemid))
						 {
							$('#elementerror').html('<div class="ui-widget">' +
						    '<div class="ui-state-error ui-corner-all" style="padding: 5px;">' +
								'Enter element ID' +
						        '</div></div>');
							return;
						 }
						
						 if(isBlank(elemposition))
						 {
							$('#elementerror').html('<div class="ui-widget">' +
						    '<div class="ui-state-error ui-corner-all" style="padding: 5px;">' +
								'Select element position' +
						        '</div></div>');
							return;
						 }	
					}
				}else
				{
					$('#elementerror').html('<div class="ui-widget">' +
					    '<div class="ui-state-error ui-corner-all" style="padding: 5px;">' +
							'Select layer style' +
					        '</div></div>');
					return;
				}
				var $elem = $('.ui-dialog-buttonset > .ui-button').first();
        		$elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
				var data = {};
				if(selid == 'p0')
				{
					data.standalone = true;
				}else
				{
					data.standalone = false;
					data.elemid = elemid;
					data.elemposition = elemposition;
					data.ifoffset = $('#applyoffset').prop('checked');
					if(data.ifoffset)
					{
						data.leftrightp = $('#leftrightper').val();
						var sellr = $('input[name=leftright]:checked').attr('id');
						data.leftrightd = sellr;
						data.topbottomp = $('#topbottomper').val();
						var sellt = $('input[name=topbottom]:checked').attr('id');
						data.topbottomd = sellt;
					}
				}
				if(W3Ex.currcontainer != undefined && W3Ex.currcontainer)
				{
					var id = W3Ex.clickedelem.attr('data-id');
					data.id = id;
					for(var i = 0; i < W3Ex.containers.length; i++){
						var container = W3Ex.containers[i];
						if(container == undefined) continue;
						if(container.id != id) continue;
						container.standalone = data.standalone;
						if(!container.standalone )
						{
							container.elemid = data.elemid;
							container.elemposition = data.elemposition;
							container.ifoffset = data.ifoffset;
							if(container.ifoffset)
							{
								container.leftrightp = data.leftrightp;
								container.leftrightd = data.leftrightd;
								container.topbottomp = data.topbottomp
								container.topbottomd = data.topbottomd;
							}
						}
					}
					var newimg = {};
					newimg.action = 'ibeffects_ajax_request';
					newimg.type = 'updateelement';
					newimg.nonce = W3ExIBA.nonce;
					newimg.data = data;
					var dlg = $(this);
					var $clickedelem = W3Ex.clickedelem;
					jQuery.ajax({
				         type : "post",
				         dataType : "json",
				         url : W3ExIBA.ajaxurl,
				         data : newimg,
				         success: function(response) {
						 	$elem.removeClass('disabled').css('position','static');
						   	$elem.find('.showajax').remove();
							var eleminfo = '<br>type: placeholder';
							if(data.standalone)
							{
								eleminfo+= '<br>sub-type: standalone';
							}else
							{
								eleminfo = 'type: placeholder';
								eleminfo+= '<br>sub-type: attached';
								eleminfo+= '<br>to element: '+ data.elemid;
								eleminfo+= '<br>position: '+ data.elemposition;
							}
							$clickedelem.closest(".centerblock").find(".shownimages").html(eleminfo);
							dlg.dialog( "close" );
				         },
						 
				      }) ; 
				}else
				{
					var newimg = {};
					newimg.action = 'ibeffects_ajax_request';
					newimg.type = 'newelement';
					newimg.nonce = W3ExIBA.nonce;
					newimg.data = data;
					var dlg = $(this);
					jQuery.ajax({
				         type : "post",
				         dataType : "json",
				         url : W3ExIBA.ajaxurl,
				         data : newimg,
				         success: function(response) {
						 	$elem.removeClass('disabled').css('position','static');
						   	$elem.find('.showajax').remove();
							var eleminfo = '<br>type: placeholder';
							if(data.standalone)
							{
								eleminfo+= '<br>sub-type: standalone';
							}else
							{
								eleminfo = 'type: placeholder';
								eleminfo+= '<br>sub-type: attached';
								eleminfo+= '<br>to element: '+ data.elemid;
								eleminfo+= '<br>position: '+ data.elemposition;
							}
						 	var html =  '<tr>' +
							'<td >' +response.id.id+ '</td>'+
							'<td >'+response.id.shortcode+'</td>' +
							'<td ><div style="text-align:left;">'+response.id.infoto+'</div></td>' +
							'<td style="padding-top:2px;padding-bottom:6px;"><div class="centerblock">' +
							'<div class="imagebuttons">' +
								'<a class="btn btn-success btn-sm editlayer" href="admin.php?page=ibeffects&edit='+response.id.id+'">' +
								'<span class="glyphicon glyphicon-pencil"></span>' +
								'&nbsp;Edit</a>' +
								'<button data-id="'+response.id.id+'" class="btn btn-info btn-sm layersettings" style="margin-top:6px;margin-bottom:6px;">'+
					 					'<span class="glyphicon glyphicon-cog"></span>'+
									'&nbsp;Settings</button>	' +
									'<button data-id="'+response.id.id+'" class="btn btn-danger btn-sm deletelayer">'+
					 					'<span class="glyphicon glyphicon-trash"></span>'+
									'&nbsp;Delete</button>	'+
							'</div>'+
							 '<div class="shownimages" style="text-align:left;padding-left:40px;">'+ eleminfo + '</div><div style="clear:both;"> </div></div></td></tr>';
							$('#showimages > tbody:last').append(html);
							W3Ex.containers = W3Ex.containers || [];
							var newcontainer = {};
							newcontainer.id = response.id.id;
							newcontainer.standalone = data.standalone;
							if(!newcontainer.standalone )
							{
								newcontainer.elemid = data.elemid;
								newcontainer.elemposition = data.elemposition;
								newcontainer.ifoffset = data.ifoffset;
								if(newcontainer.ifoffset)
								{
									newcontainer.leftrightp = data.leftrightp;
									newcontainer.leftrightd = data.leftrightd;
									newcontainer.topbottomp = data.topbottomp
									newcontainer.topbottomd = data.topbottomd;
								}
							}
							W3Ex.containers.push(newcontainer);
							dlg.dialog( "close" );
				         },
						 
				      }) ; 
					 }
				 
				
              },
              Cancel: function()
			  {
				  $( this ).dialog( "close" );
              }
            }
		});
		
	$(_buts.previewlayer).click(function ()
	{	
		if(_selected.layer == -1) return;
		var buttext = $(this).text();
		if(buttext.indexOf("Preview Layer") != -1)
		{
			$(this).html('<span class="glyphicon glyphicon-stop"></span>'+
			' Exit Preview</button>');
			$(this).removeClass('btn-success').addClass('btn-warning');
			$('#maindiv').hide();
			$(_buts.newlayer).attr("disabled","disabled");
			$(_buts.deletelayer).attr("disabled","disabled");
			_previewob.ispreview = true;
			var layer = {};
			layer.id = _selected.layer;
			_previewob.arrstates = GetLayerStates(_selected.layer);
			if(_selected.state == -1)
			{
				if(_previewob.arrstates.length > 0)
				{
					SaveLayerState(_selected.layer,_previewob.arrstates[0].stateid,true);
				}
			}else
			{
				SaveLayerState(_selected.layer,_selected.state ,true);
			}
			
			layer.top = $_sellayer.position().top;
			layer.left = $_sellayer.position().left;
			layer.width = 0;
			layer.height = 0;
			_previewob.layer = layer;	
			if(_iselement)
				$_sellayer.hide();
			for(var i = 0; i < _Data.layers.items.length; i++)
			{
				var layer = _Data.layers.items[i];
				if(layer == undefined) continue;
				var $layerdom = $('.layer[data-id="' + layer.id+'"]');
				if($layerdom.length)
				{
					$layerdom.hide();
				}
			}
			buildAnimations();
		}else
		{
			
			$(this).html('<span class="glyphicon glyphicon-play"></span>'+
			' Preview Layer</button>');
			$(this).removeClass('btn-warning').addClass('btn-success');
			$('#maindiv').show();
			if(!_iselement)
			{
				$(_buts.deletelayer).removeAttr("disabled");
				$(_buts.newlayer).removeAttr("disabled");
			}
			_previewob.ispreview = false;
			
			
			for(var j = 0; j < _arrEffects.length; j++)
			{
				var anim = _arrEffects[j];
				anim.domitem.dequeue();
				anim.domitem.css({
					'transition-timing-function':'',
					'transition-delay':'',
					'transition-duration':'',
					'transition-property':''
				});
			}
			var myNode = document.getElementById("w3_previewlayer");
			myNode.innerHTML = '';
			_arrEffects.splice(0, _arrEffects.length);
			$('#w3_previewlayer').remove();
			if(_iselement)
				$_sellayer.show();
			for(var i = 0; i < _Data.layers.items.length; i++)
			{
				var layer = _Data.layers.items[i];
				if(layer == undefined) continue;
				var $layerdom = $('.layer[data-id="' + layer.id+'"]');
				if($layerdom.length)
				{
					$layerdom.show();
				}
			}
		}
	});
	
	
	function UpdateUI(type)
	{
		if(type == "layer")
		{
			if(_iselement)
			{
				$(_buts.deletelayer).attr("disabled","disabled");
				$(_buts.newlayer).attr("disabled","disabled");
			}
			if(_selected.layer == -1)
			{
				$(_buts.newtext).attr("disabled","disabled");
				$(_buts.newhtml).attr("disabled","disabled");
				$(_buts.newimage).attr("disabled","disabled");
				$(_buts.previewlayer).attr("disabled","disabled");
				$(_buts.deletelayer).attr("disabled","disabled");
			}else{
				$(_buts.newtext).removeAttr("disabled");
				$(_buts.newhtml).removeAttr("disabled");
				$(_buts.newimage).removeAttr("disabled");
				var arrstates = GetLayerStates(_selected.layer);
				if(arrstates.length == 0)
					$(_buts.previewlayer).attr("disabled","disabled");
				else
					$(_buts.previewlayer).removeAttr("disabled");
				if(!_iselement)
				$(_buts.deletelayer).removeAttr("disabled");
			}
		}
		if(type == "state")
		{
			if(_selected.state == -1){
				
				$( "#statesettings" ).tabs().hide();	
			}else
			{
				$( "#statesettings" ).tabs().show();	
			}
		}
	}
	
	function GetLayerStates(id)
	{
		var arrstates = [];
		for(var i= 0; i < _Data.states.items.length; i++)
		{
			if(!isDefined(_Data.states.items[i]))
				continue;
			var state = _Data.states.items[i];
			if(state.layerid != id)
				continue;
			arrstates.push(state);
		}
		return arrstates;
	}
	
	function isBlank(str) {
	    return (!str || !/\S/.test(str));
	}
	
	$('#changestyle').click(function ()
	{
		SaveLayerState(_selected.layer,_selected.state,false);
		$('#showdialog').dialog("open");
	})
	
	$('#updatestyle').click(function ()
	{
		var id = $('#usestyles').val();
		if(id == "none") return;
		 var style;
		 for(var i = 0; i < _Styles.items.length; i++)
		 {
			style = _Styles.items[i];
			if(style == undefined) continue;
			if(style.id == id)
			{
				style.fontsize = $("#slider-font-size" ).slider( "value" );
				style.fontcolor = $("#font-color-value").val();
				style.fontfamily= $("#font-family").val();
				if($('#ifbackground').prop('checked'))
				{
					style.ifbackground = true;
					style.backcolor = $("#back-color-value").val();
					style.radiussize = $("#slider-radius-size" ).slider( "value" );
					style.padding = $("#slider-padding-size" ).slider( "value" );
				}else{
					style.ifbackground = false;
				}
				break;
			}
			
		 }
		var $elem = $(this);
		$elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
		var ajaxarr = {};
		ajaxarr.action = 'ibeffects_ajax_request';
		ajaxarr.type = 'savestyle';
		ajaxarr.nonce = W3ExIBA.nonce;
		var data = {};
		data.styles = _Styles;
		ajaxarr.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : ajaxarr,
		     complete: function(response) {
			 	   $elem.removeClass('disabled').css('position','static');
				   $elem.find('.showajax').remove();
		     }
		  }) ;
	});

	$('#renamestyle').click(function ()
	{
		var id = $('#usestyles').val();
		var namerename = $('#renamestylename').val();
		if(isBlank(namerename)) return;
		if(id == "none") return;
		 var style;
		 for(var i = 0; i < _Styles.items.length; i++)
		 {
			style = _Styles.items[i];
			if(style == undefined) continue;
			if(style.id == id)
			{
				style.name = namerename;
				break;
			}
		 }
		var $elem = $(this);
		$elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
		var ajaxarr = {};
		ajaxarr.action = 'ibeffects_ajax_request';
		ajaxarr.type = 'savestyle';
		ajaxarr.nonce = W3ExIBA.nonce;
		var data = {};
		data.styles = _Styles;
		ajaxarr.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : ajaxarr,
		     complete: function(response) {
			 	   $elem.removeClass('disabled').css('position','static');
				   $elem.find('.showajax').remove();
				   $('#usestyles option:selected').text(namerename);
				   $('#renamestylename').val('');
		     }
		  }) ;
	});

	$('#deletestyle').click(function ()
	{
		var id = $('#usestyles').val();
		if(id == "none") return;
		 var style;
		 for(var i = 0; i < _Styles.items.length; i++)
		 {
			style = _Styles.items[i];
			if(style == undefined) continue;
			if(style.id == id)
			{
				delete _Styles.items[i];
				break;
			}
		 }
		var $elem = $(this);
		$elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
		var ajaxarr = {};
		ajaxarr.action = 'ibeffects_ajax_request';
		ajaxarr.type = 'savestyle';
		ajaxarr.nonce = W3ExIBA.nonce;
		var data = {};
		data.styles = _Styles;
		ajaxarr.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : ajaxarr,
		     complete: function(response) {
			 	   $elem.removeClass('disabled').css('position','static');
				   $elem.find('.showajax').remove();
				   $('#usestyles option:selected').remove();
		     }
		  }) ;
	});

	$('#newstyle').click(function ()
	{
		var stylename = $('#newstylename').val();
		 if(isBlank(stylename))
		 	stylename = 'untitled';
		var $elem = $(this);
		$elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
		var newstyle = {};
		newstyle.name = stylename;
		newstyle.id = _idcounts.style;
		newstyle.fontsize = $("#slider-font-size" ).slider( "value" );
		newstyle.fontcolor = $("#font-color-value").val();
		newstyle.fontfamily= $("#font-family").val();
		if($('#ifbackground').prop('checked'))
		{
			newstyle.ifbackground = true;
			newstyle.backcolor = $("#back-color-value").val();
			newstyle.radiussize = $("#slider-radius-size" ).slider( "value" );
			newstyle.padding = $("#slider-padding-size" ).slider( "value" );
		}else{
			newstyle.ifbackground = false;
		}
		_idcounts.style++;
		_Styles.items.push(newstyle);
		var ajaxarr = {};
		ajaxarr.action = 'ibeffects_ajax_request';
		ajaxarr.type = 'savestyle';
		ajaxarr.nonce = W3ExIBA.nonce;
		var data = {};
		data.styles = _Styles;
		ajaxarr.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : ajaxarr,
		     complete: function(response) {
			 	   $elem.removeClass('disabled').css('position','static');
				   $elem.find('.showajax').remove();
				   $('#usestyles').append("<option value='"+newstyle.id+"'>"+newstyle.name+"</option>");
				   $('#usestyles').val(newstyle.id);
				   $('#updatestyle, #renamestyle, #deletestyle').removeAttr("disabled");
				   $('#newstylename').val('');
		     }
		  }) ; 
	})
	
	$('#ifbackground').click(function(e){
		if($('#ifbackground').prop('checked'))
		{
	 		$("#divifbackground").css('visibility','visible');
			$('#fontexample').css('background',$("#back-color-value").val());
			$('#fontexample').css('border-radius',$("#slider-radius-size" ).slider( "value"));
		}
	 	else
		{
			$("#divifbackground").css('visibility','hidden');
			$('#fontexample').css('background','');
			$('#fontexample').css('border-radius',"");
		}
	 		
	});

	$("#usestyles").change(function() 
	{
		var id = $(this).val();
		var $fontexample = $('#fontexample');
		if(id == "none")
		{
			$('#updatestyle, #renamestyle, #deletestyle').attr("disabled","disabled");
			$('#ifbackground').prop('checked',false);
			$("#divifbackground").css('visibility','hidden');
			$fontexample.css('background','');
			$("#slider-font-size").slider('value',15);
			$("#font-size").val("15px");
			$("#slider-padding-size").slider('value',0);
			$("#padding-size").val("0px");
			$fontexample.css('padding','0px');
			$("#font-color").spectrum("set", '#000000');
			$("#font-color-value").val('#000000');
			$fontexample.css('color','#000000');
			$fontexample.css('font-size',"15px");
			return;
		}
		$('#updatestyle, #renamestyle, #deletestyle').removeAttr("disabled");
		var style;
		for(var i = 0; i < _Styles.items.length; i++)
		{
			style = _Styles.items[i];
			if(style == undefined) continue;
			if(style.id == undefined) continue;
			if(style.id == id)
			{
				$("#slider-font-size").slider('value',style.fontsize);
				$("#font-size").val(style.fontsize + "px");
				$("#font-family").val(style.fontfamily);
				$fontexample.css('font-family',style.fontfamily);
				$("#font-color").spectrum("set", style.fontcolor);
				$("#font-color-value").val(style.fontcolor);
				$fontexample.css('color',style.fontcolor);
				$fontexample.css('font-size',style.fontsize + "px");
				if(style.ifbackground){
					if(style.ifbackground == "false"){
						style.ifbackground = false;
					}
					if(style.backcolor == undefined)
						style.ifbackground = false;
				}
				if(style.ifbackground)
				{
					$('#ifbackground').prop('checked',true);
					$("#divifbackground").css('visibility','visible');
					$("#back-color").spectrum("set", style.backcolor);
					$("#back-color-value").val(style.backcolor);
					$("#slider-radius-size" ).slider( "value" ,style.radiussize);
					$( "#radius-size" ).val(style.radiussize + "px");
					$("#slider-padding-size").slider('value',style.padding);
					$("#padding-size").val(style.padding+ "px");
					$fontexample.css('padding',style.padding + 'px');
					$fontexample.css('border-radius',style.radiussize + "px");
					$fontexample.css('background',style.backcolor);
				}else{
					$('#ifbackground').prop('checked',false);
					$("#divifbackground").css('visibility','hidden');
					$fontexample.css('background','');
					$fontexample.css('padding','0px');
				}
				break;
			}
		}
   })
 
	function PopulateStyles()
	{
		var style;
		var $select = $('#usestyles');
		for(var i = 0; i < _Styles.items.length; i++)
		{
			style = _Styles.items[i];
			if(style == undefined) continue;
			if(style.id == undefined) continue;
			$select.append("<option value='"+style.id+"'>"+style.name+"</option>");
			if(style.id >= _idcounts.style)
			{
				_idcounts.style = style.id;
				_idcounts.style++;
			}
		}
		$('#updatestyle, #renamestyle, #deletestyle').attr("disabled","disabled");
	}

	function UpdateStates()
	{
		var statesarr = GetState(_selected.layer);
		$('#statescontainer').empty();
		if(statesarr == undefined) return;
		for(var i = 0; i < statesarr.length; i++)
		{
			var state = statesarr[i];
			if(state == undefined) continue;
			if(state.stateid >= _idcounts.state)
			{
				_idcounts.state = state.stateid;
				_idcounts.state++
			}
			//get sorted
			for(var j = 0; j < statesarr.length; j++)
			{
				var statesort = statesarr[j];
				if(statesort.sortid == i)
				{
					var label = "Text State";
					if(statesort.type == "html")
					{
						label = "Html State";
					}else if(statesort.type == "image")
					{
						label = "Image State";
					}
					var newl = '<li data-id="' + statesort.stateid + '" class="ui-state-highlight layerstate">' +label+ '<button class="btn btn-danger btn-sm" type="button" title="Delete State">' +
					'<span class="glyphicon glyphicon-trash"></span>' +
					'</button></li>';
						$('#statescontainer').append(newl);
					break;
				}
			}
		}
		var saveState = _arrSavedStates[_selected.layer];
		if(saveState == undefined)
			return;
		if(saveState.selstate == -1)
			return;
		var seldiv = '<div class="selstatediv"></div>';
		$('li.layerstate').removeClass('selstate').find($('div')).remove();
		$('li.layerstate[data-id='+saveState.selstate+']').addClass('selstate').append(seldiv);
		_selected.state = saveState.selstate;
		FillLayerState(_selected.layer,_selected.state);
		UpdateUI("state");
	}

	$(document).on( "click",'div.imagelayer', function() 
	{
		if(_iselement)
			return;
		var clickedid = $(this).attr('data-id');
		if(_selected.layer == clickedid || _previewob.ispreview)
		   return;
		SaveLayerState(_selected.layer,_selected.state,true);
		var saveState = _arrSavedStates[_selected.layer];
		if(saveState == undefined)
		{
			saveState = {};
			_arrSavedStates[_selected.layer] = saveState;
		}
		saveState.selstate = _selected.state;
		
		_selected.state = -1;
		_idcounts.state = 0;
		$('.layer').removeClass('selected');
		$(this).addClass('selected');
		_selected.layer = clickedid;
		$_sellayer = $(this);
		UpdateUI("layer");
		UpdateUI("state");
		UpdateStates();
	});

	function SaveLayerState(layerid,stateid,bsorting)
	{
		if(layerid == -1 || stateid == -1)
			return;
		bsorting = typeof bsorting !== 'undefined' ? bsorting : false;
		var state = GetState(layerid,stateid);
		if(_selected.state != -1)
		{//not preview, save
			if(state.type == "text"){
			state.text = $('#statecontent').val();
			}else if(state.type == "html")
			{
				state.html = $('#statecontentdiv').html();
			}
			state.displayfor = $('#displaystate').val();
			state.delayfor =  $('#delaystate').val();
			state.afterfin = $('#laststatefin option:selected').val();
			state.onappear = $('#onappeartype option:selected').val();
			state.onappeareasing = $('#onappeareasing option:selected').val();
			state.onappearspeed = $('#onappearspeed').val();
			state.ondisappear = $('#ondisappeartype').val();
			state.ondisappeareasing = $('#ondisappeareasing option:selected').val();
			state.ondisappearspeed = $('#ondisappearspeed').val();
			state.staticeffect = $('#laststateeffect option:selected').val();
		}
		
		if(bsorting)
		{//all states
			var allstates = GetState(layerid);
			$('li.layerstate').each(function( index ) {
				var id = $(this).attr('data-id');
				for(var i = 0; i < allstates.length; i++)
				{
					var state = allstates[i];
					if(state.stateid != id)
						continue;
					state.sortid = index;
					break;
				}
			})
		}
	}

	function GetState(layerid,stateid,bdelete,bdeleteall)
	{
		bdelete = typeof bdelete !== 'undefined' ? bdelete : false;
		bdeleteall = typeof bdeleteall !== 'undefined' ? bdeleteall : false;
		stateid = typeof stateid !== 'undefined' ? stateid : -1;
		var allstates = [];
		if(_Data.states == undefined)
		{
			 _Data.states = {};
			 _Data.states.items = [];
		}
		for(var i = 0; i < _Data.states.items.length; i++)
		{
			if(_Data.states.items[i] == undefined) continue;
			if(_Data.states.items[i].layerid != layerid)
				continue;
			if(bdeleteall)
			{
				delete _Data.states.items[i];
				continue;
			}
			if(stateid == -1)
			{
				allstates.push(_Data.states.items[i]);
				continue;
			}
			if(_Data.states.items[i].stateid != stateid)
				continue;
			if(bdelete)
			{
				delete  _Data.states.items[i];
				return;
			}
			return _Data.states.items[i];
		}
		if(bdeleteall)
		{//delete layer too
			for(var j = 0; j < _Data.layers.items.length; j++)
			{
				if(_Data.layers.items[j] == undefined) continue;
				if(_Data.layers.items[j].id != layerid)
					continue;
				delete _Data.layers.items[j];
				break;
			}
			return;
		}
			
		if(stateid == -1)
		{
			return allstates;
		}
		var newstate = {};
		newstate.layerid = layerid;
		newstate.stateid = stateid;
		newstate.type = "text";
		newstate.text = "";
		newstate.html = "";
		_Data.states.items.push(newstate);
		return newstate;
	}
	
	
	function ChangeColor(color,parrSel,coloristring,pdelete) 
	{
        var colorhex;
		colorhex = color.toHexString(); 
		$('#fontexample').css('background',colorhex);
		$('#back-color-value').val(colorhex);
    }
	
	function ChangeFontColor(color) 
	{
        var colorhex;
		colorhex = color.toHexString(); 
		$('#fontexample').css('color',colorhex);
		$('#font-color-value').val(colorhex);
    }
	
	function Init()
	{
		if($('#newhtmlstate').length)
		{//edit image
			_selected.layer = -1;
			
			$( "#statescontainer" ).sortable({
			 cursor: "move" ,
			 start: function( event, ui ) {
			 	SaveLayerState(_selected.layer,_selected.state);
			 	var seldiv = '<div class="selstatediv"></div>';
			 	$('li.layerstate').removeClass('selstate').find($('div')).remove();
				ui.item.addClass('selstate').append(seldiv);
				var stateid = ui.item.attr('data-id');
			 	_selected.state = stateid;
				FillLayerState(_selected.layer,_selected.state);
				UpdateUI("state");
			 }
			}).disableSelection();
			$( "#statesettings" ).tabs();
 			$( "#statesettings" ).tabs().hide();
			_Styles.items = [];
			GenerateLayers();
			if(_Data.layers == undefined)
			{
				_Data.layers = {};
				_Data.layers.items = [];
				
			}
			if(_Data.states == undefined)
			{
				_Data.states = {};
				_Data.states.items = [];
			}
			UpdateUI("layer");
			PopulateStyles();
			var $fontexample = $('#fontexample');
			 $( "#slider-font-size" ).slider({
				range: "min",
				value: 15,
				min: 8,
				max: 82,
				slide: function( event, ui ) {
				$( "#font-size" ).val(ui.value + "px");
				$fontexample.css('font-size',ui.value + "px");
				}
				});
			
			$( "#slider-radius-size" ).slider({
				range: "min",
				value: 10,
				min: 0,
				max: 50,
				slide: function( event, ui ) {
				$( "#radius-size" ).val(ui.value + "px");
				$fontexample.css('border-radius',ui.value + "px");
				}
				});
			$( "#slider-padding-size" ).slider({
				range: "min",
				value: 0,
				min: 0,
				max: 20,
				slide: function( event, ui ) {
				$( "#padding-size" ).val(ui.value + "px");
				$fontexample.css('padding',ui.value + "px");
				}
				});
			$("#radius-size" ).val( $( "#slider-radius-size" ).slider( "value" )+ "px" );
			$("#padding-size" ).val( $( "#slider-padding-size" ).slider( "value" )+ "px" );
			$fontexample.css('border-radius',$( "#slider-radius-size" ).slider( "value" )+ "px");
			$('#font-color-value').val('#000000');
			$('#back-color-value').val('#ffffff');
			$("#showdialog").dialog({			
	            autoOpen: false,
	            height: 640,
	            width: 780,
	            modal: true,
				draggable:true,
				resizable:false,
				closeOnEscape: false,
				create: function (event, ui) {
			        $(this).dialog('widget')
			            .css({ position: 'fixed'})
			    },
				open: function( event, ui ) {
					 var d = $('.ui-dialog:visible');
					 $(d).css('z-index',300002);
					  $('.ui-widget-overlay').each(function () {
	   					 $(this).next('.ui-dialog').andSelf().wrapAll('<div class="w3exvtfscope w3exvtfdel" />');
						 $('#showdialog').css('height','auto');
				});
					$('span.ui-icon-closethick').css({
													   left : '0px',
													   top : '0px'
													});
					var $fontexample1 = $('#fontexample');								
					$("#font-size" ).val( $( "#slider-font-size" ).slider( "value" )+ "px" );
					$fontexample1.css('font-size',$( "#slider-font-size" ).slider( "value" )+ "px");
					var fontcolor = "#000000";
					var backcolor = "#ffffff";
					$("#back-color").spectrum({
						color:backcolor,
						className: "full-spectrum",
						appendTo: "#dialogstyles",
						showPalette: true,
						showInput: true,
						showSelectionPalette: true,
						maxPaletteSize: 10,
						preferredFormat: "hex",
						change: ChangeColor,
		                palette: _arrPalette
		          	});
					$("#font-color").spectrum({
						color:fontcolor,
						className: "full-spectrum",
						appendTo: "#dialogstyles",
						showPalette: true,
						showInput: true,
						showSelectionPalette: true,
						maxPaletteSize: 10,
						preferredFormat: "hex",
						change: ChangeFontColor,
		                palette: _arrPalette
		          	});
					var state = GetState(_selected.layer,_selected.state);
					_statestyle = {};
					if(isDefined(state) && isDefined(state.style))
					{
						_statestyle.fontsize = state.style.fontsize;
						_statestyle.fontcolor = state.style.fontcolor;
						_statestyle.fontfamily = state.style.fontfamily;
						_statestyle.ifbackground = state.style.ifbackground;
						if(state.style.ifbackground)
						{
							_statestyle.backcolor = state.style.backcolor;
							_statestyle.radiussize = state.style.radiussize;
							_statestyle.padding = state.style.padding;
						}
						$("#font-size").val(_statestyle.fontsize + "px");
						$("#font-family").val(_statestyle.fontfamily);
						$fontexample1.css('font-size',_statestyle.fontsize + "px");
						$("#slider-font-size").slider('value',_statestyle.fontsize);
						$("#font-color").spectrum("set",_statestyle.fontcolor);
						$("#font-color-value").val(_statestyle.fontcolor);
						$fontexample1.css('color',_statestyle.fontcolor);
						$fontexample1.css('font-family',_statestyle.fontfamily);
						if(_statestyle.ifbackground)
						{
							$("#divifbackground").css('visibility','visible');
							$('#ifbackground').prop('checked',true);
							$fontexample1.css('background',_statestyle.backcolor);
							$("#back-color").spectrum("set",_statestyle.backcolor);
							$("#slider-radius-size" ).slider( "value" ,_statestyle.radiussize);
							$("#back-color-value").val(_statestyle.backcolor);
							$("#radius-size" ).val(_statestyle.radiussize + "px");
							$("#slider-padding-size" ).slider( "value" ,_statestyle.padding);
							$("#padding-size" ).val(_statestyle.padding + "px");
							$fontexample1.css('border-radius', _statestyle.radiussize + "px");
							$fontexample1.css('padding', _statestyle.padding + "px");
						}else
						{
							$fontexample1.css('background','');
							$("#back-color").spectrum("set","#ffffff");
							$("#slider-radius-size" ).slider( "value" ,0);
							$("#slider-padding-size" ).slider( "value" ,0);
							$("#padding-size").val("0px");
							$("#back-color-value").val(backcolor);
							$("#radius-size" ).val("0px");
							$fontexample1.css('border-radius', "0px");
							$fontexample1.css('padding',"0px");
							$('#ifbackground').prop('checked',false);
							$("#divifbackground").css('visibility','hidden');
						}
					}else
					{//show defaults
						$("#font-size").val("15px");
						$fontexample1.css('font-size',"15px");
						$("#slider-font-size").slider('value',15);
						$("#font-color-value").val(fontcolor);
						$fontexample1.css('color',fontcolor);
						$fontexample1.css('font-family',"");
						$fontexample1.css('background','');
						$fontexample1.css('padding','0px');
						$("#back-color-value").val(backcolor);
						$("#slider-radius-size" ).slider( "value" ,0);
						$("#radius-size" ).val("0px");
						$fontexample1.css('border-radius', "0px");
						$('#ifbackground').prop('checked',false);
						$("#divifbackground").css('visibility','hidden');
					}
			},
			close: function( event, ui ) {
				
				$("#font-color").spectrum("destroy");
				$("#back-color").spectrum("destroy");
				 $('#updatestyle, #renamestyle, #deletestyle').attr("disabled","disabled");
				 $('#usestyles').val('none');
			},
   			 buttons: {
              "OK": function() {
				var state = GetState(_selected.layer,_selected.state);
				if(isDefined(state))
				{
					if(!isDefined(state.style))
						state.style = {};
					state.style.fontsize = $("#slider-font-size" ).slider( "value" );;
					state.style.fontcolor =  $("#font-color-value").val();
					state.style.fontfamily = $("#font-family").val();
					state.style.ifbackground = $('#ifbackground').prop('checked');
					if(state.style.ifbackground)
					{
						state.style.backcolor =  $("#back-color-value").val();
						state.style.radiussize = $("#slider-radius-size" ).slider( "value" );
						state.style.padding = $("#slider-padding-size" ).slider( "value" );
					}
					FillLayerState(_selected.layer,_selected.state);
				}
                 $( this ).dialog( "close" );
              },
              Cancel: function()
			  {
				  $( this ).dialog( "close" );
              }
            }
		});
		
		
		$("#showimagesizes").dialog({			
	            autoOpen: false,
	            height: 420,
	            width: 680,
	            modal: true,
				draggable:false,
				resizable:false,
				closeOnEscape: false,
				open: function( event, ui ) {
					 var d = $('.ui-dialog:visible');
					 $(d).css('z-index',300002);
					  $('.ui-widget-overlay').each(function () {
	   					 $(this).next('.ui-dialog').andSelf().wrapAll('<div class="w3exvtfscope w3exvtfdel" />');
				});
					$('span.ui-icon-closethick').css({
													   left : '0px',
													   top : '0px'
													});
					
			},
			close: function( event, ui ) {
				
			},
   			 buttons: {
              "OK": function() {
			  
			  	var selid = $('input[name=radioi]:checked').attr('id');
				if(selid != undefined)
				{
					SaveLayerState(_selected.layer,_selected.state);
					var stateid = _idcounts.state;
					_idcounts.state++;
					var seldiv = '<div class="selstatediv"></div>';
					var newl = '<li data-id="' + stateid + '" class="ui-state-highlight layerstate" >Image State<button class="btn btn-danger btn-sm deletestate" type="button" title="Delete State">' +
					'<span class="glyphicon glyphicon-trash"></span>' +
					'</button></li>';
					$('li.layerstate').removeClass('selstate').find($('div')).remove();
					$('#statescontainer').append(newl);
					$('#statescontainer > li:last').addClass('selstate').append(seldiv);
					_selected.state = stateid;
					UpdateUI("state");
					var state = GetState(_selected.layer,stateid);
					state.type = "image";
					state.imagesrc = _arrimgs[selid];
					ShowDefaultState("image");
					FillLayerState(_selected.layer,stateid);
					UpdateUI("layer");
	                 $( this ).dialog( "close" );
				}
				
              },
              Cancel: function()
			  {
				  $( this ).dialog( "close" );
              }
            }
		});
		
		}
	}

	$('#deletelayer').click(function ()
	{	
		if(_selected.layer == -1) return;
		GetState(_selected.layer,0,false,true);
		$('#w3_ibacontainer0 > div[data-id="'+_selected.layer +'"]').remove();
		_selected.layer = -1;
		_selected.state = -1;
		$('#statescontainer').empty();
		UpdateUI('layer');
		UpdateUI('state');
	});
		
	function GenerateLayers()
	{
		
		if(W3Ex.iselement != undefined)
		{
			_iselement = true;
			$(_buts.deletelayer).attr("disabled","disabled");
			$(_buts.newlayer).attr("disabled","disabled");
			_selected.layer = 0;
			$_sellayer = $('.layer');
			var newlayer = {};
			newlayer.id = 0;
			_Data.layers = {};
			_Data.layers.items = [];
			_Data.layers.items.push(newlayer);
			if(W3Ex.imagearrlayers != undefined)
			{
				_Data.states = {};
				_Data.states.items = [];
				if(W3Ex.imagearrlayers.states != undefined)
				{
					_Data.states = W3Ex.imagearrlayers.states;
					UpdateStates();
				}
			}
		}else if(W3Ex.imagearrlayers != undefined)
		{
			_Data = W3Ex.imagearrlayers;
			if(_Data.layers != undefined)
			{
				for(var i = 0; i < _Data.layers.items.length; i++)
				{
					var layer = _Data.layers.items[i];
					if(layer.id == undefined)
					{
						 _Data.layers.items.splice(i,1);
						 i--;
						 continue;
					}
					var layerid = layer.id;
					if(_idcounts.layer <= layerid)
					{
						_idcounts.layer = layerid;
						_idcounts.layer++;
					}
					var newl = '<div data-id="' + layerid + '" class="defaultlayer layer imagelayer defaultstyle"> Layer<br/>'+
					'</div>';
					$('#w3_ibacontainer0').append(newl);
					var $newlayer = $('#w3_ibacontainer0 > div:last');
					$newlayer.draggable({
						containment: "parent",
						start: function() {
							var clickedid = $(this).attr('data-id');
							if(_selected.layer == clickedid || _previewob.ispreview)
					   			return;
							SaveLayerState(_selected.layer,_selected.state,true);
							var saveState = _arrSavedStates[_selected.layer];
							if(saveState == undefined)
							{
								saveState = {};
								_arrSavedStates[_selected.layer] = saveState;
							}
							saveState.selstate = _selected.state;
							
							_selected.state = -1;
							_idcounts.state = 0;
							$('.layer').removeClass('selected');
							$(this).addClass('selected');
							_selected.layer = clickedid;
							$_sellayer = $(this);
							UpdateUI("layer");
							UpdateUI("state");
							UpdateStates();
					}
					});
					$newlayer.css("top",parseInt(layer.top));
					$newlayer.css("left",parseInt(layer.left));
				}
			}
		}
		if(W3Ex.arrstyles != undefined && W3Ex.arrstyles.items != undefined)
		{
			for(var j = 0; j < W3Ex.arrstyles.items.length; j++)
			{
				var style = W3Ex.arrstyles.items[j];
				if(style == undefined)
				{
					 W3Ex.arrstyles.items.splice(j,1);
					 j--;
					 continue;
				}
				if(style.id == undefined)
				{
					 W3Ex.arrstyles.items.splice(j,1);
					 j--;
					 continue;
				}
			}
			_Styles = W3Ex.arrstyles;
		}
	}

	$('#savechanges').click(function ()
	 {
	 	if(_Data.layers.items.length == 0) return;
	 	SaveLayerState(_selected.layer,_selected.state,true);
		for(var i = 0; i < _Data.layers.items.length; i++)
		{
			var layer = _Data.layers.items[i];
			if(layer == undefined) continue;
			var $layerdom = $('.layer[data-id="' + layer.id+'"]');
			if($layerdom.length)
			{
				layer.top = $layerdom.position().top;
				layer.left = $layerdom.position().left;
			}
		}
		var $elem = $(this);
        $elem.addClass('disabled').css('position','relative').append('<div class="showajax"></div>');
	 	var ajaxarr = {};
		ajaxarr.action = 'ibeffects_ajax_request';
		ajaxarr.type = 'savechanges';
		if(_iselement)
			ajaxarr.type = 'saveelementchanges';
		ajaxarr.nonce = W3ExIBA.nonce;
		var data = {};
		data.id  = W3Ex.imageid;
		data.layers = _Data;
		if(isDefined(_Data.states.items) && isDefined(_Data.layers.items))
		{
			
			data.layercount = 0;
			data.statecount = 0;
			for(var i = 0; i < _Data.states.items.length; i++)
			{
				if(!isDefined(_Data.states.items[i]))
					continue;
				if(!isDefined(_Data.states.items[i].layerid))
					continue;
				var state = _Data.states.items[i];
				if(state.type == "html")
				{
					state.html = state.html.replace(/\\"/g, "\"");
				}
				data.statecount++;
			}
			for(var j = 0; j < _Data.layers.items.length; j++)
			{
				if(!isDefined(_Data.layers.items[j]))
					continue;
				data.layercount++;
			}
		}
		ajaxarr.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : ajaxarr,
		     complete: function(response) {
			 	   $elem.removeClass('disabled').css('position','static');
				   $elem.find('.showajax').remove();
		     }
		  }) ; 
	 })

	$('#newlayer').click(function ()
	{	
		SaveLayerState(_selected.layer,_selected.state,true);
		if(_selected.layer != -1)
		{
			var saveState = _arrSavedStates[_selected.layer];
			if(saveState == undefined)
			{
				saveState = {};
				_arrSavedStates[_selected.layer] = saveState;
			}
			saveState.selstate = _selected.state;
		}			
		_selected.state = -1;
		_idcounts.state = 0;
		var layerid = _idcounts.layer;
		_idcounts.layer++;
		var newl = '<div data-id="' + layerid + '" class="defaultlayer layer imagelayer defaultstyle">Empty Layer<br/>'+
		'<div style="font-size:12px;">/todo: add states/</div>'+
		'</div>';
		var newlayer = {};
		newlayer.id = layerid;
		_Data.layers.items.push(newlayer);
		$('#w3_ibacontainer0').append(newl);
		$('#w3_ibacontainer0 > div:last').draggable({
			containment: "parent",
			start: function() {
				var clickedid = $(this).attr('data-id');
				if(_selected.layer == clickedid || _previewob.ispreview)
		   			return;
				SaveLayerState(_selected.layer,_selected.state,true);
				var saveState = _arrSavedStates[_selected.layer];
				if(saveState == undefined)
				{
					saveState = {};
					_arrSavedStates[_selected.layer] = saveState;
				}
				saveState.selstate = _selected.state;
				
				_selected.state = -1;
				_idcounts.state = 0;
				$('.layer').removeClass('selected');
				$(this).addClass('selected');
				_selected.layer = clickedid;
				$_sellayer = $(this);
				UpdateUI("layer");
				UpdateUI("state");
				UpdateStates();
			}
		});
	});
	
	
	function FillLayerState(layerid,stateid)
	{
		if(layerid == -1 || stateid == -1)
			return;
		var state = GetState(layerid,stateid);
		if(state.type == "text"){
			$('#changestyle').removeAttr("disabled");
			$('#contenttype').text("Text");
			$('#statecontentdiv').removeClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#statecontentdiv').hide();
			$('#editcontent').hide();
			$('#statecontent').show();
			state.text = state.text.replace(new RegExp('\n','g'), '<br />');
			state.text = state.text.replace(/\\\\/g, '@@@@@');
			state.text = state.text.replace(/\\/g, '');
			state.text = state.text.replace(/@@@@@/g, '\\');
//			$('#statecontent').val(state.text.replace(new RegExp('<br />','g'), '\n'));
			$('#statecontent').val(state.text);
		    $_sellayer.html(state.text);
		}else if(state.type == "html"){
		 	$('#changestyle').removeAttr("disabled");
			$('#contenttype').text("Html");
			$('#statecontent').hide();
			$('#statecontentdiv').show();
			$('#statecontentdiv').addClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#editcontent').show();
			state.html = state.html.replace(/\\"/g, "\"");
			$('#statecontentdiv').html(state.html);
		    $_sellayer.html(state.html);
		}else if(state.type == "image"){
		 	
			$('#contenttype').text("Image");
			$('#statecontent').hide();
			$('#statecontentdiv').show();
			$('#statecontentdiv').addClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#editcontent').hide();
			$('#changestyle').attr("disabled","disabled");
			var html = '<img src="' +state.imagesrc+'" />';
			$('#statecontentdiv').html(html);
		    $_sellayer.html(html);
		}
		$_sellayer.removeClass('defaultstyle');
		if(isDefined(state.style))
		{
			var style = state.style;
			$_sellayer.css({
				'font-size':style.fontsize+"px",
				'color':style.fontcolor,
				'font-family':style.fontfamily
				});
			if(style.ifbackground === "true")
				style.ifbackground = true;
			if(style.ifbackground === "false")
				style.ifbackground = false;
			if(style.ifbackground)
			{
				$_sellayer.css({
				'background':style.backcolor,
				'border-radius':style.radiussize+"px",
				'padding':style.padding+"px"
				});
			}else{
				$_sellayer.css({
				'background':'',
				'border-radius':'',
				'padding':"0px"
				});
			}
		}else
		{
			$_sellayer.css({
				'font-size':"15px",
				'color':'#000000',
				'background':'',
				'border-radius':'',
				'padding':"0px"
				});
		}
		if(isDefined(state.displayfor))
			$('#displaystate').val(state.displayfor);
		else
			$('#displaystate').val(4000);
		if(isDefined(state.delayfor))
			$('#delaystate').val(state.delayfor);
		else
			$('#delaystate').val(0);
		if(isDefined(state.afterfin))
			$('#laststatefin').val(state.afterfin);
		else
			$('#laststatefin').val('loop');
		if(isDefined(state.onappear))
			$('#onappeartype').val(state.onappear);
		else
			$('#onappeartype').val('fadein');
		if(isDefined(state.onappeareasing))
			$('#onappeareasing').val(state.onappeareasing);
		else
			$('#onappeareasing').val('ease');
		if(isDefined(state.onappearspeed))
			$('#onappearspeed').val(state.onappearspeed);
		else
			$('#onappearspeed').val(500);
		if(isDefined(state.ondisappear))
			$('#ondisappeartype').val(state.ondisappear);
		else
			$('#ondisappeartype').val('fadeout');
		if(isDefined(state.ondisappeareasing))
			$('#ondisappeareasing').val(state.ondisappeareasing);
		else
			$('#ondisappeareasing').val('ease');
		if(isDefined(state.ondisappearspeed))
			$('#ondisappearspeed').val(state.ondisappearspeed);
		else
			$('#ondisappearspeed').val(500);
		if(isDefined(state.staticeffect))
			$('#laststateeffect').val(state.staticeffect);
		else
			$('#laststateeffect').val('tada');
		
	}

	function ShowDefaultState(type)
	{
		$_sellayer.html("");
		if(type == "text"){
			$('#contenttype').text("Text");
			$('#statecontentdiv').removeClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#statecontentdiv').hide();
			$('#editcontent').hide();
			$('#statecontent').show();
			$('#statecontent').val("");
			$('#changestyle').removeAttr("disabled");
		}else if(type == "html"){
			$('#contenttype').text("Html");
			$('#statecontent').hide();
			$('#statecontentdiv').show();
			$('#statecontentdiv').addClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#editcontent').show();
			$('#statecontentdiv').html("");
			$('#changestyle').removeAttr("disabled");
		}else if(type == "image"){
			$('#contenttype').text("Image");
			$('#statecontent').hide();
			$('#statecontentdiv').show();
			$('#statecontentdiv').addClass("ui-nobackground ui-widget ui-state-default ui-corner-all");
			$('#editcontent').show();
			$('#statecontentdiv').html("");
			$('#editcontent').hide();
			$('#changestyle').attr("disabled","disabled");
		}
		
		$_sellayer.removeClass('defaultstyle');
		$_sellayer.css({
			'font-size':"15px",
			'color':'#000000',
			'background':'',
			'border-radius':'',
			'padding':"0px"
		});
		$('#displaystate').val(4000);
		$('#delaystate').val(0);
		$('#laststatefin').val('loop');
		$('#onappeartype').val('fadein');
		$('#onappeareasing').val('ease');
		$('#onappearspeed').val(500);
		$('#ondisappeartype').val('fadeout');
		$('#ondisappeareasing').val('ease');
		$('#ondisappearspeed').val(500);
		$('#laststateeffect').val('tada');
	}
	

//DELETE STATE
	$(document).on( "click",'li.layerstate > button', function(e) {
		var stateid = $(this).parent().attr('data-id');
		GetState(_selected.layer,stateid,true);
		if(stateid == _selected.state)
		{
			_selected.state = -1;
			ShowDefaultState("text");
			UpdateUI("state");
		}
		$(this).parent().remove();
		UpdateUI("layer");
		e.stopPropagation();
	});
	
	$(document).on( "click",'li.layerstate', function() {
		SaveLayerState(_selected.layer,_selected.state);
		var stateid = $(this).attr('data-id');
		var seldiv = '<div class="selstatediv"></div>';
		$('li.layerstate').removeClass('selstate').find($('div')).remove();
		$(this).addClass('selstate').append(seldiv);
		_selected.state = stateid;
		FillLayerState(_selected.layer,_selected.state);
		UpdateUI("state");
	});
	
	$('#statecontent').keyup(function(){
		var val = $(this).val();
		val = val.replace(new RegExp('\n','g'), '<br />');
      $_sellayer.html(val);
    });
	
	$('#htmleditorok').click(function ()
	 {
		$('#editorcontainer').css("visibility","hidden");//css("display","inline");
		$('#editorcontainer').css("display","none");
		$("#editorcontainer").css("height","0px");
		$("#wp-posttext-wrap").css("visibility","hidden");
		$("#wp-posttext-wrap").css("height","0px");
		$('.w3exvtfscope').show();
		var html = tinyMCE.get('editorid').getContent();
		$('#statecontentdiv').html(html);
		$_sellayer.html(html);
		var state = GetState(_selected.layer,_selected.state);
		state.html = html;
		 $('html, body').animate({
	        scrollTop: parseInt($("#statecontentdiv").offset().top)
	    }, 500);
	 });

	$('#htmleditorcancel').click(function ()
	{
		$('#editorcontainer').css("visibility","hidden");//css("display","inline");
		$('#editorcontainer').css("display","none");
		$("#editorcontainer").css("height","0px");
		$("#wp-posttext-wrap").css("visibility","hidden");
		$("#wp-posttext-wrap").css("height","0px");
		$('.w3exvtfscope').show();
		 $('html, body').animate({
		    scrollTop: parseInt($("#statecontentdiv").offset().top)
		}, 500);
	});

	$('#editcontent').click(function ()
	{
		$('.w3exvtfscope').css("display","none");
		$('#editorcontainer').css("visibility","visible");//css("display","inline");
		$('#editorcontainer').css("display","block");
		$("#editorcontainer").css("height","auto");
		$("#wp-posttext-wrap").css("visibility","visible");
		$("#wp-posttext-wrap").css("height","400px");
		tinyMCE.get('editorid').setContent($('#statecontentdiv').html());
	});
	

	(function ()
	 {
	 	
	 	$('#newtextstate').click(function ()
		{
			
			SaveLayerState(_selected.layer,_selected.state);
			var stateid = _idcounts.state;
			_idcounts.state++;
			var seldiv = '<div class="selstatediv"></div>';
			var newl = '<li data-id="' + stateid + '" class="ui-state-highlight layerstate" >Text State<button class="btn btn-danger btn-sm deletestate" type="button" title="Delete State">' +
			'<span class="glyphicon glyphicon-trash"></span>' +
			'</button></li>';
			
			$('li.layerstate').removeClass('selstate').find($('div')).remove();
			$('#statescontainer').append(newl);
			$('#statescontainer > li:last').addClass('selstate').append(seldiv);
			_selected.state = stateid;
			UpdateUI("state");
			var state = GetState(_selected.layer,stateid);
			UpdateUI("layer");
			state.type = "text";
			ShowDefaultState("text");
		});
		
		$('#newhtmlstate').click(function ()
		{
			SaveLayerState(_selected.layer,_selected.state);
			var stateid = _idcounts.state;
			_idcounts.state++;
			var seldiv = '<div class="selstatediv"></div>';
			var newl = '<li data-id="' + stateid + '" class="ui-state-highlight layerstate" >Html State<button class="btn btn-danger btn-sm deletestate" type="button" title="Delete State">' +
			'<span class="glyphicon glyphicon-trash"></span>' +
			'</button></li>';
			
			$('li.layerstate').removeClass('selstate').find($('div')).remove();
			$('#statescontainer').append(newl);
			$('#statescontainer > li:last').addClass('selstate').append(seldiv);
			_selected.state = stateid;
			UpdateUI("state");
			var state = GetState(_selected.layer,stateid);
			UpdateUI("layer");
			state.type = "html";
			state.text = "";
			state.html = "";
			ShowDefaultState("html");
		});
		
		var layer_uploader;
		$('#newimagestate').click(function(e){
			e.preventDefault();
			//If the uploader object has already been created, reopen the dialog
			if (layer_uploader) {
				layer_uploader.open();
			    return;
			}
			layer_uploader = wp.media.frames.file_frame = wp.media({
				title: 'Choose Image',
				library: {
	           		 type: 'image'
	    	    },
			    button: {
			    			text: 'Choose Image'
			            },
			    multiple: false,
				displaySettings: true,
	       		displayUserSettings: true
			});
	        //When a file is selected, grab the URL and set it as the text field's value
	        layer_uploader.on('select', function() {
	        	var attachment = layer_uploader.state().get('selection').first().toJSON();
				var size = attachment.sizes;
				var html = "Select image size to continue<br /><br />";
				var counter = 0;
				_arrimgs.length = 0;
				var backimg = "";
				for(key in size)
				{
					var img = attachment.sizes[key];
					if(img == _u) continue;
					if(key == "thumbnail")
						backimg = img.url;
					html+= '<input type="radio" id="'+counter+'" name="radioi"><label for="' +counter+'"> ';
					html+= ( key.charAt(0).toUpperCase() + key.slice(1)) + ' - ( width: ' + img.width + ' ) ( height: ' +img.height + ' )</label> <br/>';
					_arrimgs[counter] = img.url;
					if(backimg == "")
						backimg = img.url;
					counter++;
				}
				
				html+= '<div id="imageurl"></div>';
				$('#showimagesizesinner').html(html);
				$('#showimagesizes').dialog('open');
				
	        });
			//Open the uploader dialog
			layer_uploader.open();
		});
		Init();
	 })();
	
	
	$(document).on( "click",'input:radio', function() {
		var id = $(this).attr('id');
		if(_arrimgs[id] != undefined)
		{
			var html = 'Url: <a href="'+_arrimgs[id]+'" target="_blank">' +_arrimgs[id]+ '</a>'; 
			$('#imageurl').html(html);
			$('#imagesaveok').removeAttr("disabled");
		}
	});
	
	  
	$(document).on( "click",'.deletelayer', function ()
	{
	 	var id = $(this).attr('data-id');
		var $elem = $(this);
	 	var newimg = {};
		newimg.action = 'ibeffects_ajax_request';
		newimg.type = 'deleteimage';
		newimg.nonce = W3ExIBA.nonce;
		var data = {};
		data.id  = id;
		newimg.data = data;
		jQuery.ajax({
		     type : "post",
		     dataType : "json",
		     url : W3ExIBA.ajaxurl,
		     data : newimg,
		     success: function(response) {
			 	$elem.parents("tr:first").remove();
		     },
			  error: function(errorThrown){
		           ;
		      }
		  }) ; 
	})
	
	
	
	var custom_uploader;
	
	$('#newimage').click(function(e){
		e.preventDefault();
		//If the uploader object has already been created, reopen the dialog
		if (custom_uploader) {
			custom_uploader.open();
		    return;
		}
		custom_uploader = wp.media.frames.file_frame = wp.media({
			title: 'Choose Image',
			library: {
           		 type: 'image'
    	    },
		    button: {
		    			text: 'Choose Image'
		            },
		    multiple: false,
			displaySettings: true,

       		displayUserSettings: true
		});
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function() {
        	var attachment = custom_uploader.state().get('selection').first().toJSON();
			var size = attachment.sizes;
			var html = "Select image size to continue<br /><br />";
			var counter = 0;
			_arrimgs.length = 0;
			var backimg = "";
			for(key in size)
			{
				var img = attachment.sizes[key];
				if(img == _u) continue;
				if(key == "thumbnail")
					backimg = img.url;
				html+= '<input type="radio" id="'+counter+'" name="radioi"><label for="' +counter+'"> ';
				html+= ( key.charAt(0).toUpperCase() + key.slice(1)) + ' - ( width: ' + img.width + ' ) ( height: ' +img.height + ' )</label> <br/>';
				_arrimgs[counter] = img.url;
				if(backimg == "")
					backimg = img.url;
				counter++;
			}
			if(backimg != "")
			{
				$('#imagedivback').css('background-image','url(' + backimg + ')');
			}
			html+= '<div id="imageurl"></div>';
			$('#imagesizes').html(html);
			$('#newimagediv').css('visibility','visible').hide().fadeIn('slow',function ()
			   {
 					 $("html, body").animate({ scrollTop: $(document).height() }, "slow");
			   });
			
			$('#imagesaveok').unbind('click');
			$('#imagesaveok').click(function ()
			{
				var newimg = {};
				newimg.action = 'ibeffects_ajax_request';
				newimg.type = 'newimage';
				newimg.nonce = W3ExIBA.nonce;
				var data = {};
				var selid = $('input[name=radioi]:checked').attr('id');
				if(_arrimgs[selid] != undefined)
				{
					data.img = _arrimgs[selid];
				}
				data.thumb = backimg;
				newimg.data = data;
				jQuery.ajax({
			         type : "post",
			         dataType : "json",
			         url : W3ExIBA.ajaxurl,
			         data : newimg,
			         success: function(response) {
					 	var html =  '<tr>' +
						'<td >' +response.id.id+ '</td>'+
						'<td >'+response.id.shortcode+'</td>' +
						'<td ><div style="text-align:left;">'+response.id.infoto+'</div></td>' +
						'<td style="padding-top:2px;padding-bottom:6px;"><div class="centerblock">' +
						'<div class="imagebuttons">' +
							'<a class="btn btn-success btn-sm editlayer" href="admin.php?page=ibeffects&edit='+response.id.id+'">' +
							'<span class="glyphicon glyphicon-pencil"></span>' +
							'Edit</a>' +
							'<br/><br /><br />' +
								'<button data-id="'+response.id.id+'" class="btn btn-danger btn-sm deletelayer">'+
				 					'<span class="glyphicon glyphicon-trash"></span>'+
								'Delete</button>	'+
						'</div>'+
						 '<div class="shownimages""><img src="'+backimg+'"></img>'+
						 '</div><div style="clear:both;"> </div></div></td></tr>';
						$('#showimages > tbody:last').append(html);
						
						$('#newimage').removeAttr('disabled');
						$('#newimagediv').fadeOut();
			         },
					  error: function(errorThrown){
					  	$('#newimage').removeAttr('disabled');
						$('#newimagediv').fadeOut();
			          }
			      }) ; 
			});
			$('#imagesaveok').attr('disabled','disabled');
			$('#imagesavecancel').click(function ()
			{
				$('#newimage').removeAttr('disabled');
				$('#newimagediv').fadeOut();
			});
			$('#newimage').attr('disabled','disabled');
        });
		//Open the uploader dialog
		custom_uploader.open();
	});

	function isDefined(x) { return x !== _u;}
	
	function AddEffect(state)
	{
		var AnimItem = getAttributes(state);
		var style = {
			visibility : "hidden"
			};
		AnimItem.domitem.css(style);
		_arrEffects.push(AnimItem);
	}
	
	function StaticAnimation($domitem,anim)
	{
		$domitem.removeClass(anim + ' animated').addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  				$domitem.removeClass(anim + ' animated');
			 });
	}
	
	function buidTwoHalfStates(anim,type,animtype)
	{
		var animtype = typeof animtype !== 'undefined' ? animtype : "app";
		var width = anim.width;
		var leftwidth = Math.round(width/2);
		var rightwidth = width - leftwidth;
		var height = anim.height;
		var topheight = Math.round(height/2);
		var botheight = height - topheight;
		var $elem = anim.domitem;
		var css = {
			visibility:"visible",
			opacity:1,
			transform:"",
			left:"0px",
			top:'0px'
		}
		if(animtype == "app")
		{
			if(type == "mixed")
			{
				css.left = '-'+width+'px';
			}else if(type == "hflip")
			{
				css.top = topheight+'px';
			}else if(type == "vflip")
			{
				css.left = leftwidth+'px';
			}	
		}
		$elem.wrap('<div id="wrap_'+anim.domid+'"></div>');
		
				
		var wrapcss = {
			position:'absolute',
			top:anim.top+'px',
			left:anim.left + 'px',
			height:topheight+'px',
			width:anim.width+'px'	,
			transform:'',
			overflow:'hidden'
		}
		
		if(type == "vflip")
		{
			wrapcss.height = height+'px';
			wrapcss.width = leftwidth+'px';
		}	
		$('#wrap_'+anim.domid).css(wrapcss);	
		$elem.css(css);
		
		$elem.clone().attr('id',anim.domid + 'second').prependTo(anim.layerdom);
		$('#'+anim.domid + 'second').wrap('<div id="wraps_'+anim.domid+'"></div>');
		var secondstatecss = {
			opacity:'1',
			visibility:'visible',
			left:'0px',
			top:'-'+height+'px'
//			display:'inline-block'
		}
		if(animtype == "app")
		{
			if(type == "vflip")
			{
				secondstatecss.left = '-'+width+'px';
				secondstatecss.top = '0px';
			}	
		}else
		{
			if(type == "mixed" || type == "hflip")
			{
				secondstatecss.top = '-'+topheight+'px';
			}else if(type == "vflip")
			{
				secondstatecss.left = '-'+leftwidth+'px';
				secondstatecss.top = '0px';
			}	
		}
		var secondwrapcss = {
			position:'absolute',
			top:(anim.top + topheight)+'px',
			left:anim.left +'px',
			height:botheight+'px',
			width:anim.width+'px'	,
			transform:'',
			overflow:'hidden'
		}
		if(type == "vflip")
		{
			secondwrapcss.left = (anim.left + leftwidth) +'px';
			secondwrapcss.top = anim.top+'px';
			secondwrapcss.height = height+'px';
			secondwrapcss.width = leftwidth+'px';
		}	
		$('#wraps_'+anim.domid).css(secondwrapcss);
		$('#'+anim.domid + 'second').css(secondstatecss);
		
	}
	
	function animateSingleItem(anim)
	{
		var props = {};
		var propssecond = {};
		var $elem = anim.domitem;
		props.duration = anim.onappspeed;
		props.complete = animationFinish;
		var hastwo = false;
		var width = anim.width;
		var leftwidth = Math.round(width/2);
		var height = anim.height;
		var topheight = Math.round(height/2);
		if(anim.state.start && !anim.state.finish)
		{
			props.easing = anim.onappeasing;
			$elem.css({
				top:anim.top + 'px',
				left:anim.left + 'px',
				visibility:"visible",
				opacity:0,
				transition:'',
				transform:''
			});
			switch(anim.onappear){
				case "mixed":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"mixed");
					var topheight = Math.ceil(anim.height/2);
					propssecond.duration = anim.onappspeed;
					propssecond.easing = anim.onappeasing;
					propssecond.opacity = 1;//show
					propssecond.top = '-'+topheight+'px';
					props.opacity = 1;//show
					props.left = '0px';
				}
					break;
				case "hflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"hflip");
					propssecond.duration = anim.onappspeed;
					propssecond.easing = anim.onappeasing;
					propssecond.opacity = 1;//show
					propssecond.top = '-'+topheight+'px';
					props.opacity = 1;//show
					props.left = '0px';
					props.top = '0px';
				}
					break;
				case "vflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"vflip");
					propssecond.duration = anim.onappspeed;
					propssecond.easing = anim.onappeasing;
					propssecond.opacity = 1;//show
					propssecond.left = '-'+leftwidth+'px';
					props.opacity = 1;//show
					props.left = '0px';
				}
					break;
				case "fadein":
				{
					props.opacity = 1;//show
				}
					break;
				case "top":
				{
					$elem.css({
						top:(anim.top-_animOffset) + 'px'
					});
					props.top = anim.top+'px';
					props.opacity = 1;
				}
					break;
				case "left":
				{
					$elem.css({
						left:(anim.left-_animOffset) + 'px'
					});
					props.left = anim.left+'px';
					props.opacity = 1;
				}
					break;
				case "right":
				{
					$elem.css({
						left:(anim.left+_animOffset) + 'px'
					});
					{
						props.left = anim.left+'px';
						$elem.css({
							'height':anim.height+'px'
						});
					}
					props.opacity = 1;
				}
					break;
				case "bottom":
				{
					$elem.css({
						top:(anim.top+_animOffset) + 'px'
					});
					props.top = anim.top+'px';
					props.opacity = 1;
				}
					break;
				default:
					break;
			}
		}else if(anim.state.finish)
		{
			props.duration = anim.ondisspeed;
			props.easing = anim.ondiseasing;
			if(anim.onappear == "mixed" || anim.onappear == "vflip" || anim.onappear == "hflip")
			{
				var $parent = $elem.parent();
				var parentid = $parent.attr('id');
				if(parentid.indexOf('wrap')!=-1)
				{
					$elem.css({
					top:anim.top+'px',
					left:anim.left+'px'});
					$elem.unwrap();
					$('#'+anim.domid + 'second').css({
						visibility:'hidden'
						});
					$('#'+anim.domid + 'second').unwrap();
					$('#'+anim.domid + 'second').remove();
				}
			}else
			{
				$elem.css({
					top:anim.top+'px',
					left:anim.left+'px',
					transition:'',
					transform:''
					});
			}
		
			
			switch(anim.ondis){
				case "mixed":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"mixed","dis");
					propssecond.duration = anim.ondisspeed;
					propssecond.easing = anim.ondiseasing;
					propssecond.opacity = 1;//show
					propssecond.top = '-'+height+'px';
					props.opacity = 1;//show
					props.left = width + 'px';
				}break;
				case "hflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"hflip","dis");
					propssecond.duration = anim.ondisspeed;
					propssecond.easing = anim.ondiseasing;
					propssecond.opacity = 1;//show
					propssecond.top = '-'+height+'px';
					props.opacity = 1;//show
					props.top = topheight+'px';
				}break;
				case "vflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"vflip","dis");
					propssecond.duration = anim.ondisspeed;
					propssecond.easing = anim.ondiseasing;
					propssecond.opacity = 1;//show
					propssecond.left = '-'+width+'px';
					props.opacity = 1;//show
					props.left = leftwidth+'px';
				}break;
				case "fadeout":
				{
					props.opacity = 0;//show
				}break;
				case "top":
				{
					props.top = (anim.top-_animOffset)+'px';
					props.opacity = 0;
				}break;
				case "left":
				{
					props.left = (anim.left-_animOffset)+'px';
					props.opacity = 0;
				}break;
				case "right":
				{
					props.left = (anim.left+_animOffset)+'px';
					props.opacity = 0;
				}break;
				case "bottom":
				{
					props.top = (anim.top + _animOffset)+'px';
					props.opacity = 0;
				}break;
				case "none":
				{
					props.duration = 10;
					props.opacity = 0;
				}
					break;
				default:
					break;
			}
		}
		
		if(anim.state.firstshow)
		{
			anim.state.firstshow = false;
			anim.state.start = true;
			anim.state.finish = false;
			props.delay = anim.delayfor;
			if(hastwo)
			{
				propssecond.delay = anim.delayfor;
				$('#'+anim.domid + 'second').transition(propssecond);
			}
			$elem.transition(props);
		}
		else
		{
			if(anim.state.finish)
			{
				props.delay = anim.displayfor;
				propssecond.delay = anim.displayfor;
				$elem.transition(props);
				if(hastwo)
				{
					propssecond.delay = anim.displayfor;
					$('#'+anim.domid + 'second').transition(propssecond);
				}
				
			}else
			{
				props.delay = 0;
				propssecond.delay = 0;
				$elem.transition(props);
				if(hastwo)
				{
					$('#'+anim.domid + 'second').transition(propssecond);
				}
			}
		}
	}
	
	function animationFinish(domid)
	{
		var domid = typeof domid !== 'undefined' ? domid : -1;
		if(!_previewob.ispreview)
			return;
		var elemid;
		if(domid != -1)
		{
			elemid = domid;
		}
		else
			elemid = $(this).attr('id');
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var AnimItem = _arrEffects[i];
			if(AnimItem.domid == elemid)
			{
				if(domid != -1)
				{
					animateSingleItem(AnimItem);
					return;
				}
				if(AnimItem.state.start)
				{
					AnimItem.state.start = false;
					AnimItem.state.finish = true;
					if(CheckIfLast(AnimItem))
					{
						if(AnimItem.afterfin == "stop")
							return;
						if(AnimItem.afterfin != "loop")
						{//apply static effect
							var $elem = AnimItem.domitem;
						if(AnimItem.onappear == "mixed" || AnimItem.onappear == "vflip" || AnimItem.onappear == "hflip")						{
								var $secstate = $('#'+AnimItem.domid + 'second');
								var $parent = $elem.parent();
								var parentid = $parent.attr('id');
								if(parentid.indexOf('wrap')!=-1)
								{
									$elem.unwrap();
									$elem.css({
										top:AnimItem.top+'px',
										left:AnimItem.left+'px',
										opacity:1
									});
									$secstate.css({
										visibility:'hidden'
										});
									$secstate.unwrap();
									$secstate.remove();
								}
							}
							setInterval(StaticAnimation,5500,AnimItem.domitem,AnimItem.staticeffect);
							return;
						}
					}
					animateSingleItem(AnimItem);
				}else if(AnimItem.state.finish)
				{//check for next state
					var $elem = AnimItem.domitem;
					if(AnimItem.ondis == "mixed" || AnimItem.ondis == "vflip" || AnimItem.ondis == "hflip")
					{
						
						var $secstate = $('#'+AnimItem.domid + 'second');
						var $parent = $elem.parent();
						var parentid = $parent.attr('id');
						if(parentid.indexOf('wrap')!=-1)
						{
							$elem.unwrap();
							$elem.css({
								top:AnimItem.top+'px',
								left:AnimItem.left+'px',
								opacity:0,
								visibility:'hidden'
							});
							$secstate.css({
								visibility:'hidden'
								});
							$secstate.unwrap();
							$secstate.remove();
						}
					}else
					{
						$elem.css({
							top:AnimItem.top+'px',
							left:AnimItem.left+'px',
							transform:'',
							transition:'',
							opacity:0,
							visibility:'hidden'
						});
					}
					var AnimNew;
					var nextstate = GetNextState(AnimItem); //old if no new state found
					AnimNew = nextstate.anim;
					AnimItem.state.start = false;
					AnimItem.state.finish= false;
					AnimItem.state.curritem = false;
					AnimNew.state.start = true;
					AnimNew.state.curritem = true;
					AnimNew.state.finish = false;
					animateSingleItem(AnimNew);
				}
				break;
			}
		}
	}
	
	function getAttributes(stateitem) 
	{
		var AnimItem = {};
		
		var $elem = $('#w3_effect'+stateitem.stateid+'-'+_previewob.counter);
		AnimItem.domitem = $elem;
		var state = {
			start:false,
			finish:false,
			curritem:false,
			isfirst:false,
			islast:false,
			firstshow:false
		}
		AnimItem.state = state;
		AnimItem.domid =  $elem.attr("id");
		AnimItem.width =  parseInt($elem.outerWidth(),10);
		AnimItem.height =  $elem.outerHeight();
		AnimItem.sortid =   parseInt(stateitem.sortid,10);
		AnimItem.layerid = 0;
		AnimItem.layerdom = _previewob.layer.domitem;
		AnimItem.delayfor =  parseInt(stateitem.delayfor,10);
		AnimItem.displayfor =   parseInt(stateitem.displayfor,10); 
		AnimItem.afterfin =  stateitem.afterfin;
		AnimItem.onappear = stateitem.onappear;
		AnimItem.onappeasing =  stateitem.onappeareasing;
		AnimItem.onappspeed =   parseInt(stateitem.onappearspeed,10);
		AnimItem.ondis =  stateitem.ondisappear;
		AnimItem.ondiseasing =  stateitem.ondisappeareasing;
		AnimItem.ondisspeed =   parseInt(stateitem.ondisappearspeed,10);
		AnimItem.staticeffect =  stateitem.staticeffect;
		
		var layer = _previewob.layer;
		if(layer.width < AnimItem.width)
		{
			layer.width = AnimItem.width;
		}
		if(layer.height < AnimItem.height)
		{
			layer.height = AnimItem.height;
		}
		$elem.css({
			'position':'absolute',
			'display':'inline-block',
			'width':AnimItem.width+'px',
			'height':AnimItem.height+'px',
			'padding-right':'0px'
			});
		return AnimItem;
	}

	function startAnimations()
	{
		var layer = _previewob.layer;
		var $mainimg = $('#mainimage');
		 if($mainimg.width() > $mainimg.height())
		 	_animOffset = parseInt($mainimg.width() * 0.14,10);
		 else
		 	_animOffset = parseInt($mainimg.height() * 0.14,10);
		if(_iselement)
			_animOffset = 40;
		var arrstates = _previewob.arrstates;
		for(var i=0; i<arrstates.length;i++)
		{
			var state = arrstates[i];
			AddEffect(state);
		}
		
		layer.domitem.removeClass('w3_ibainnerhold');
		if(_iselement)
		{
			layer.domitem.css({
				position:'relative',
				display:'inline-block',
				width:layer.width,
				height:layer.height
			})
		}else
		{
			layer.domitem.css({
				position:'absolute',
				top:layer.top,
				left:layer.left,
				width:layer.width,
				height:layer.height
			})
		}
		
		for(var k = 0; k < _arrEffects.length; k++)
		{
			var anim = _arrEffects[k];
			if(_iselement)
				anim.domitem.css('visibility','hidden');
			if(anim.height > layer.height)
			{
				layer.domitem.css({
					height:anim.height
				})
			}
			if(anim.width > layer.width)
			{
				layer.domitem.css({
					width:anim.width,
				})
			}
		}
		
		for(var j = 0; j < _arrEffects.length; j++)
		{
			var anim = _arrEffects[j];
			
			if(anim.height < layer.height)
			{
				anim.domitem.css('top',Math.round((layer.height - anim.height) /2) + 'px');
			}
			if(anim.width < layer.width)
			{
				anim.domitem.css('left',Math.round((layer.width - anim.width) /2) + 'px');
			}
			anim.left =  anim.domitem.position().left;
			anim.top =  anim.domitem.position().top;
		}
		
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var anim = _arrEffects[i];
			if(anim.sortid == 0)
			{
				anim.state.start = true;
				anim.state.finish = false;
				anim.state.curritem = true;
				anim.state.isfirst = true;
				anim.state.firstshow = true;
				anim.state.islast = CheckIfLast(anim);
				animateSingleItem(anim);
				break;
			}
		}
	}
	
	function buildAnimations()
	{
		var counteff = 0;
		var counteffitem = 0;
		_arrEffects.length = 0;
		_previewob.counter++;
		if(_iselement)
		{
			$('<div id="w3_previewlayer"></div>').appendTo($('.w3c_wrap_element'));
			_previewob.layer.domitem = $('#w3_previewlayer');
//			_previewob.layer.domitem = $('.w3c_wrap_element');
		}else
		{
			$('<div id="w3_previewlayer" class="w3_ibainnerhold"></div>').appendTo($('#w3_ibacontainer0'));
			_previewob.layer.domitem = $('#w3_previewlayer');
		}
		
		
		var arrstates = _previewob.arrstates;
		for(var i=0; i<arrstates.length;i++)
		{
			var state = arrstates[i];
			$('<div style="position: absolute;left:0px;top:0px;display:inline;" data-id="'+state.stateid+'" id="w3_effect'+state.stateid+'-'+_previewob.counter+'" class="w3_effect"></div>').appendTo(_previewob.layer.domitem);
			var $elem = $('#w3_effect'+state.stateid+'-'+_previewob.counter);
			if(state.type == "text")
			{
				state.text = state.text.replace(new RegExp('\n','g'), '<br />');
				$elem.html(state.text);
				
			}else if(state.type == "html")
			{
				var val = state.html;
				state.html = val.replace(/\\"/g, "\"");
				$elem.html(state.html);
			}else
			{
				$elem.html('<img src="'+state.imagesrc+'" />');
			}
			if(isDefined(state.style))
			{
				var style = state.style;
				$elem.css({
					'font-size':style.fontsize+"px",
					'color':style.fontcolor,
					'font-family':style.fontfamily
					});
				if(style.ifbackground === "true")
					style.ifbackground = true;
				if(style.ifbackground === "false")
					style.ifbackground = false;
				if(style.ifbackground)
				{
					$elem.css({
					'background':style.backcolor,
					'border-radius':style.radiussize+"px",
					'padding':style.padding+"px"
					});
				}else{
					$elem.css({
					'background':'',
					'border-radius':'',
					'padding':"0px"
					});
				}
			}else
			{
				$elem.css({
					'font-size':"15px",
					'color':'#000000',
					'background':'',
					'border-radius':'',
					'padding':"0px"
					});
			}
		}
		if(document.getElementById('w3_previewlayer'))
		{
			imagesLoaded(document.getElementById('w3_previewlayer'), function(instance){
				startAnimations();
			});
		}else
			startAnimations();
	}
	
	function CheckIfLast(anim)
	{
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var animl = _arrEffects[i];
			if(animl.sortid > anim.sortid)
			{
				return false;
			}
		}
		return true;
	}
	
	function GetNextState(anim)
	{
		var nextstate = {}
		nextstate.islast = false;
		nextstate.isfirst = false;
		nextstate.anim = anim;
		var notfirst = false;
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var animl = _arrEffects[i];
			if((animl.sortid - anim.sortid) == 1)
			{
				nextstate.anim = animl;
				notfirst = true;
				break;
			}
		}
		var foundgreater = false;
		for(var j = 0; j < _arrEffects.length; j++)
		{
			var animlj = _arrEffects[j];
			if(animlj.sortid == 0)
			{
				if(!notfirst)
				{
					nextstate.anim = animlj;
					nextstate.isfirst = true;
				}
				
			}else
			{
				foundgreater = true;
			}
		}
		if(!foundgreater)
			nextstate.islast = true;
		return nextstate;
	}
	 return {
		incConItems:function(){
			_conitems++;
		},
		finLoad:function(){
			_conitemsfin++;
		}
		
		};
	
	
})(jQuery);

});

