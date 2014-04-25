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


;window.w3exibeModernizr=function(a,b,c){function z(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+m.join(c+" ")+c).split(" ");return y(d,b)}function y(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function x(a,b){return!!~(""+a).indexOf(b)}function w(a,b){return typeof a===b}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function u(a){j.cssText=a}var d="2.0.6",e={},f=b.documentElement,g=b.head||b.getElementsByTagName("head")[0],h="modernizr",i=b.createElement(h),j=i.style,k,l=Object.prototype.toString,m="Webkit Moz O ms Khtml".split(" "),n={},o={},p={},q=[],r,s={}.hasOwnProperty,t;!w(s,c)&&!w(s.call,c)?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],c)},n.csstransitions=function(){return z("transitionProperty")};for(var A in n)t(n,A)&&(r=A.toLowerCase(),e[r]=n[A](),q.push((e[r]?"":"no-")+r));u(""),i=k=null,e._version=d,e._domPrefixes=m,e.testProp=function(a){return y([a])},e.testAllProps=z;return e}(this,this.document);
/*\
|*|
|*|  IE-specific polyfill which enables the passage of arbitrary arguments to the
|*|  callback functions of JavaScript timers (HTML5 standard syntax).
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
|*|
|*|  Syntax:
|*|  var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);
|*|  var timeoutID = window.setTimeout(code, delay);
|*|  var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
|*|  var intervalID = window.setInterval(code, delay);
|*|
\*/

if (document.all && !window.setTimeout.isPolyfill) {
  var __nativeST__ = window.setTimeout;
  window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };
  window.setTimeout.isPolyfill = true;
}

if (document.all && !window.setInterval.isPolyfill) {
  var __nativeSI__ = window.setInterval;
  window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeSI__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };
  window.setInterval.isPolyfill = true;
}

var W3Ex = W3Ex || {};

W3Ex.ibaengine = (function($){
	var _notmodern = false;
	if(!w3exibeModernizr.csstransitions) 
  	{
		_notmodern = true;
	}
	(function(){
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);
		if( v > 4 )
			_notmodern = true;
	}());
	if(_notmodern) 
  	{
		jQuery.extend( jQuery.easing,
		{
			def: 'swing',
			w3_iblinear: function (x, t, b, c, d) {
				t/=d;
				return b+c*(t);
			},
			w3_ibease: function (x, t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;
			},
			w3_ibsnap: function (x, t, b, c, d) {
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			}
		});
	}
	var _arrEffects = [];
	var _conitems = 0;
	var _checkcounter = 0;
	var _conitemsfin = 0;
	var _u;
	var _arrLayers = [];
	var _arrImages = [];
	var _curContainer;
	
	function isDefined(x) { return x !== _u;}
	
	function StaticAnimation($domitem,anim)
	{
		console.log($domitem.attr('id'));
		$domitem.removeClass(anim + ' animated').addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  				$domitem.removeClass(anim + ' animated');
			 });
	}
	function getContainer(index)
	{
		for(var i=0; i<W3Ex.containers.length; i++)
		{
			var container = W3Ex.containers[i];
			if(container.id == index)
				return container;
		}
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
		
		$elem.clone().attr('id',anim.domid + 'second').prependTo('#'+anim.layerid);
		$('#'+anim.domid + 'second').wrap('<div id="wraps_'+anim.domid+'"></div>');
		var secondstatecss = {
			opacity:'1',
			visibility:'visible',
			left:'0px',
			top:'-'+height+'px'

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
		var animOffset = 40;
		var container = getContainer(anim.containerid);
		if(container != undefined)
		{
			animOffset = container.animOffset;
		}
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
				transform:'',
				transition:''
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
				}break;
				case "hflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"hflip");
					propssecond.duration = anim.onappspeed;
					propssecond.easing = anim.onappeasing;
					propssecond.opacity =  1;//show
					propssecond.top = '-'+topheight+'px';
					props.opacity =  1;//show
					props.left = '0px';
					props.top = '0px';
				}break;
				case "vflip":
				{
					hastwo = true;
					buidTwoHalfStates(anim,"vflip");
					propssecond.duration = anim.onappspeed;
					propssecond.easing = anim.onappeasing;
					propssecond.opacity = 1;//show
					propssecond.left = '-'+leftwidth+'px';
					props.opacity =  1;//show
					props.left = '0px';
				}break;
				case "fadein":
				{
					props.opacity = 1;//show
				}break;
				case "top":
				{
					$elem.css({
						top:(anim.top - animOffset) + 'px'
					});
					props.top = anim.top+'px';
					props.opacity =  1;
				}break;
				case "left":
				{
					$elem.css({
						left:(anim.left - animOffset) + 'px'
					});
					props.left = anim.left+'px';
					props.opacity =  1;
				}break;
				case "right":
				{
					$elem.css({
						left:(anim.left + animOffset) + 'px'
					});
					{
						props.left = anim.left+'px';
						$elem.css({
							'height':anim.height+'px'
						});
					}
					props.opacity =  1;
				}break;
				case "bottom":
				{
					$elem.css({
						top:(anim.top + animOffset) + 'px'
					});
					props.top = anim.top+'px';
					props.opacity =  1;
				}break;
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
					props.top = (anim.top - animOffset)+'px';
					props.opacity = 0;
				}
					break;
				case "left":
				{
					props.left = (anim.left - animOffset)+'px';
					props.opacity = 0;
				}break;
				case "right":
				{
					props.left = (anim.left + animOffset)+'px';
					props.opacity = 0;
				}break;
				case "bottom":
				{
					props.top = (anim.top + animOffset)+'px';
					props.opacity = 0;
				}break;
				case "none":
				{
					props.duration = 10;
					props.opacity = 0;
				}break;
				default:
					break;
			}
			
		}
		var options = {
				complete:animationFinish
			};
		if(anim.state.start)
		{
			options.easing = 'w3_ib' + anim.onappeasing;
			options.duration = anim.onappspeed;
		}else{
			options.easing = 'w3_ib' + anim.ondiseasing;
			options.duration = anim.ondisspeed;
		}
		if(anim.state.firstshow)
		{
			anim.state.firstshow = false;
			anim.state.start = true;
			anim.state.finish = false;
			if(_notmodern)
			{
				$elem.animate({},0).delay(anim.delayfor).animate(props,options);
				if(hastwo)
				{
					options.complete = '';
					$('#'+anim.domid + 'second').animate({},0).delay(anim.delayfor).animate(propssecond,options).delay(anim.displayfor);
				}
			}else
			{
				props.delay = anim.delayfor;
				if(hastwo)
				{
					propssecond.delay = anim.delayfor;
					$('#'+anim.domid + 'second').transition(propssecond);
				}
				$elem.transition(props);
			}
		}
		else
		{
			if(anim.state.finish)
			{
				if(_notmodern)
				{
					
					$elem.animate({opacity:1},anim.displayfor).animate(props,options);
					if(hastwo)
					{
						options.complete = '';
						$('#'+anim.domid + 'second').animate({opacity:1},anim.displayfor).animate(propssecond,options);
					}
				}else
				{
					props.delay = anim.displayfor;
					propssecond.delay = anim.displayfor;
					$elem.transition(props);
					if(hastwo)
					{
						propssecond.delay = anim.displayfor;
						$('#'+anim.domid + 'second').transition(propssecond);
					}
				}
			}else
			{
				if(_notmodern)
				{
					$elem.animate(props,options);
					if(hastwo)
					{
						options.complete = '';
						$('#'+anim.domid + 'second').animate(propssecond,options);
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
	}
	
	function animationFinish(domid)
	{
		
		var domid = typeof domid !== 'undefined' ? domid : -1;
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
	
	function getAttributes(elemid) 
	{
		var AnimItem = {};
		var $elem = $('#'+elemid);
		AnimItem.domitem = $('#'+elemid);
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
		AnimItem.width =  parseInt($elem.outerWidth(),10) + 3;
		AnimItem.height =  $elem.outerHeight();
		AnimItem.sortid =   parseInt($elem.attr("data-sortid"),10);
		AnimItem.layerid = $elem.attr("data-layerdom");
		AnimItem.layerdom = $('#'+AnimItem.layerid);
		AnimItem.delayfor =  parseInt($elem.attr("data-delayfor"),10);
		AnimItem.displayfor =   parseInt($elem.attr("data-displayfor"),10); 
		AnimItem.afterfin =  $elem.attr("data-afterfin");
		AnimItem.onappear =  $elem.attr("data-onapp");
		AnimItem.onappeasing =  $elem.attr("data-onappeasing");
		AnimItem.onappspeed =   parseInt($elem.attr("data-onappspeed"),10);
		AnimItem.ondis =  $elem.attr("data-ondis");
		AnimItem.ondiseasing =  $elem.attr("data-ondiseasing");
		AnimItem.ondisspeed =   parseInt($elem.attr("data-ondisspeed"),10);
		AnimItem.staticeffect =  $elem.attr("data-staticeffect");
		var layer = GetLayer(AnimItem.layerid);
		var container = getContainer(layer.containerid);
		if(layer.width < AnimItem.width)
		{
			layer.domitem.css('width',AnimItem.width+'px');
			layer.width = AnimItem.width;
			if(container.standalone && !container.atttached)
			{
				var $condom = $('#w3_ibacontainer'+container.id);
				$condom.css('max-width',AnimItem.width+'px');
				container.width = AnimItem.width;
			}
		}
		if(layer.height < AnimItem.height)
		{
			layer.domitem.css('height',AnimItem.height+'px');
			layer.height = AnimItem.height;
			if(container.standalone && !container.atttached)
			{
				var $condom = $('#w3_ibacontainer'+container.id);
				$condom.css('max-height',AnimItem.height+'px');
				container.height = AnimItem.height;
			}
		}
		
		$elem.css({
			position:'absolute',
			display:'inline-block',
			height:AnimItem.height+'px',
			width:AnimItem.width+'px'
		});
		return AnimItem;
	}

	function GetLayer(id)
	{
		for(var i=0; i<_arrLayers.length;i++)
		{
			var layer = _arrLayers[i];
			if(layer.domid == id)
				return layer;
		}
	}
	
	function AddEffect(domid,conid)
	{
		var AnimItem = getAttributes(domid);
		var style = {
			visibility : "hidden"
			};
		AnimItem.domitem.css(style);
		AnimItem.domitem.detach().appendTo(AnimItem.layerdom);
		AnimItem.containerid = conid;
		_arrEffects.push(AnimItem);
	}

	function CheckIfLast(anim)
	{
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var animl = _arrEffects[i];
			if(animl.layerid!= anim.layerid)
				continue;
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
			if(animl.layerid != anim.layerid)
				continue;
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
			if(animlj.layerid != anim.layerid)
				continue;
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
	
	function UpdateLayers()
	{
		for(var i = 0; i < _arrImages.length; i++)
		{
			var bupdate = false;
			var returnorig = false;
			var imgitem =  _arrImages[i];
			if(imgitem.origwidth != imgitem.$image.outerWidth())
			{
				
				imgitem.width = imgitem.$image.outerWidth();
				imgitem.widthratio = Number((imgitem.width / imgitem.origwidth).toFixed(2));
				imgitem.heightratio = imgitem.widthratio;
				
				bupdate = true;
			}else
			{
				returnorig = true;
			}
			
			if(imgitem.origheight != imgitem.$image.outerHeight())
			{
				imgitem.height = imgitem.$image.outerHeight()
				imgitem.heightratio = Number((imgitem.height / imgitem.origheight).toFixed(2)); 
				imgitem.widthtratio = imgitem.heightratio;
				bupdate = true;
				returnorig = false;
			}
			if((imgitem.widthratio >= 1) || (imgitem.heightratio >= 1))
			{
				bupdate = false;
				returnorig = true;
			}
			if(bupdate)
			{
				for(var j = 0; j < _arrLayers.length; j++)
				{
					var layer = _arrLayers[j];
					if(layer.containerid != imgitem.containerid)
						continue;
					layer.top = Math.floor(layer.origtop * imgitem.heightratio);
					layer.left = Math.floor(layer.origleft * imgitem.widthratio);
					var scale = "";
					if(imgitem.heightratio != 1 || imgitem.widthratio != 1)
						scale = 'scale('+imgitem.widthratio+','+imgitem.heightratio+')';
					var container = getContainer(layer.containerid);
					if(!container.placeholder)
					{
						layer.domitem.css({
							left:(layer.left -(Math.floor((layer.width - (layer.width * imgitem.widthratio))/2))) + 'px',
							top:(layer.top -(Math.floor((layer.height - (layer.height * imgitem.heightratio))/2))) + 'px',
							transform:scale
						});
					}else if(!container.attached)
					{
						layer.domitem.css({
							left:(0 -(Math.floor((layer.width - (layer.width * imgitem.widthratio))/2))) + 'px',
							top:(0 -(Math.floor((layer.height - (layer.height * imgitem.heightratio))/2))) + 'px',
							transform:scale
						});
					}else
					{
						if(imgitem.origheight == imgitem.$image.outerHeight())
						{
							layer.domitem.css({
							left:(layer.left -(Math.floor((layer.width - (layer.width * imgitem.widthratio))/2))) + 'px',
							transform:scale
							});
						}else if(imgitem.origwidth == imgitem.$image.outerWidth())
						{
							layer.domitem.css({
								top:(layer.top -(Math.floor((layer.height - (layer.height * imgitem.heightratio))/2))) + 'px',
								transform:scale
							});
						}else
						{
							layer.domitem.css({
								left:(layer.left -(Math.floor((layer.width - (layer.width * imgitem.widthratio))/2))) + 'px',
								top:(layer.top -(Math.floor((layer.height - (layer.height * imgitem.heightratio))/2))) + 'px',
								transform:scale
							});
						}
						
					}
					
					for(var k = 0; k < _arrEffects.length; k++)
					{
						var anim = _arrEffects[k];
						if(anim.layerid != layer.id)
							continue;
						anim.widthratio = parseFloat(imgitem.widthratio.toFixed(1));
						anim.heightratio = parseFloat(imgitem.heightratio.toFixed(1));
					}
				}
			}else if(returnorig)
			{
				for(var j = 0; j < _arrLayers.length; j++)
				{
					var layer = _arrLayers[j];
					if(layer.containerid != imgitem.containerid)
						continue;
					var container = getContainer(layer.containerid);
					if(!container.standalone)
					{
						layer.domitem.css({
							left:layer.left + 'px',
							top:layer.top  + 'px',
							transform:''
						});
					}else if(!container.attached)
					{
						layer.domitem.css({
							left:'0px',
							top:'0px',
							transform:''
						});
					}
					
					for(var k = 0; k < _arrEffects.length; k++)
					{
						var anim = _arrEffects[k];
						if(anim.layerid != layer.id)
							continue;
						anim.widthratio = 1;
						anim.heightratio = 1;
					}
				}
			}
		}
	}
	
	function placeAttachedLayer(layer,coninfo,container)
	{
		var vircon = {};
		vircon.width = coninfo.origwidth;
		vircon.height = coninfo.origheight;
		if(coninfo.origwidth < layer.width)
			coninfo.origwidth = layer.width;
		if(coninfo.origheight < layer.height)
		    coninfo.origheight =  layer.height;

		//virtual placeholder
		if(vircon.width < layer.width || vircon.height < layer.height)
		{
			
			//use bigger ratio for dimensions multiplier
			var widthratio = Number((coninfo.origwidth / vircon.width).toFixed(2));
			var heightratio = Number((coninfo.origheight / vircon.height).toFixed(2));  
			var multiplier = 1;
			if(widthratio > heightratio)
			{
				multiplier = widthratio;
			}else
			{
				multiplier = heightratio;
			}
			
			vircon.width = Math.ceil(vircon.width * multiplier);
			vircon.height = Math.ceil(vircon.height * multiplier);
			
		}
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
		var leftoffset = 0;
		var topoffset = 0;
		
		if(container.ifoffset)
		{
			
			var leftperc = parseInt(container.leftrightp,10);
			if(leftperc >0 && leftperc <300)
			{
				if(container.leftrightd == "leftrightleft")
				{//to the left -
					leftoffset = Math.round(vircon.width * (0.01 * leftperc));
				}else
				{
					leftoffset = -Math.round(vircon.width * (0.01 * leftperc));
				}
			}
			var topperc = parseInt(container.topbottomp,10);
			if(topperc >0 && topperc <300)
			{
				if(container.topbottomd == "topbottomtop")
				{//to the top -
					topoffset = Math.round(vircon.height * (0.01 * topperc));
				}else
				{
					topoffset = -Math.round(vircon.height * (0.01 * topperc));
				}
			}
		}
		switch(container.elemposition){
				case 'Top-left':
				{
					layer.left = 0 - leftoffset;
					layer.top = 0 - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Top-middle':
				{
					layer.left = Math.ceil((vircon.width - layer.width) /2) - leftoffset;
					layer.top = 0 - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Top-right':
				{
					layer.left = Math.ceil(vircon.width - layer.width) - leftoffset;
					layer.top = 0 - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Mid-left':
				{
					layer.left = 0 - leftoffset;
					layer.top = Math.ceil((vircon.height - layer.height) /2) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Center':
				{
					layer.left = Math.ceil((vircon.width - layer.width) /2) - leftoffset;
					layer.top = Math.ceil((vircon.height - layer.height) /2) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Mid-right':
				{
					layer.left = Math.ceil(vircon.width - layer.width)- leftoffset;
					layer.top = Math.ceil((vircon.height - layer.height) /2) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Bot-left':
				{
					layer.left = 0 - leftoffset;
					layer.top = Math.ceil(vircon.height - layer.height) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Bot-middle':
				{
					layer.left = Math.ceil((vircon.width - layer.width) /2) - leftoffset;
					layer.top = Math.ceil(vircon.height - layer.height) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				case 'Bot-right':
				{
					layer.left = Math.ceil(vircon.width - layer.width) - leftoffset;
					layer.top = Math.ceil(vircon.height - layer.height) - topoffset;
					layer.origleft = layer.left;
					layer.origtop = layer.top;
				}break;
				default:
					break;
			}
		layer.domitem.css({
			top:layer.top+'px',
			left:layer.left+'px'
		});
	}
	
	function startAnimations(container)
	{
		if(container.effectsstarted != undefined && container.effectsstarted)
			return;
		container.effectsstarted = true;
		UpdateLayers();
		
		
		var _arrFirstEffects = [];
		for(var i = 0; i < _arrEffects.length; i++)
		{
			var AnimItem = _arrEffects[i];
			if(AnimItem.effectstarted != undefined && AnimItem.effectstarted)
				continue;
			if(AnimItem.containerid != container.id)
				continue;
			var has = false;
			for(var j = 0; j < _arrFirstEffects.length; j++)
			{
				var AnimFirst = _arrEffects[_arrFirstEffects[j]];
				if(AnimFirst.layerid == AnimItem.layerid)
				{
					has = true;
					if(AnimItem.sortid == 0)
					{_arrFirstEffects[j] = i;  break;}
				}
			}
			if(!has)
				_arrFirstEffects.push(i);
		}
		for(var k = 0; k < _arrFirstEffects.length; k++)
		{
			var anim = _arrEffects[_arrFirstEffects[k]];
			if(anim.effectstarted != undefined && anim.effectstarted)
				continue;
			if(anim.containerid != container.id)
				continue;
			anim.effectstarted = true;
			anim.state.start = true;
			anim.state.finish = false;
			anim.state.curritem = true;
			anim.state.isfirst = true;
			anim.state.firstshow = true;
			anim.state.islast = CheckIfLast(anim);
			animateSingleItem(anim);
		}
	}

	function buildAnimations(container)
	{
		if(container.effectsbuilt != undefined && container.effectsbuilt)
			return;
		container.effectsbuilt = true;
		var counteff = 0;
		var counteffitem = 0;
		var conindex = 0;
		var attached = false;
		{
			conindex = container.id;
			if($('.w3_ibalayer' + conindex).length == 0) return;
			_curContainer = $('#' + container.elemid);
			if(_curContainer.length > 0 && !container.placeholder)
			{
				 var $img = $('#w3_ibacontainer'+conindex+' img[data-id="'+conindex+'"]');
				 if($img.length > 0)
				 {
				 	 var info = {
					 	containerid:conindex,
						$image:$img,
						origwidth:parseInt($img.attr('data-width'),10),
						origheight:parseInt($img.attr('data-height'),10)
					 }
					 info.width = $img.width();
				     info.height = $img.height();
					 info.widthratio = 1;
					 info.heightratio = 1;
					 
					 _arrImages.push(info);
				 }
			}
			
			$('.w3_ibalayer' + conindex).each(function ()
			 {
				var newlayer = {};
				newlayer.id = $(this).attr('data-id');
				newlayer.domid =  $(this).attr('id');
				newlayer.domitem = $('#'+newlayer.domid);
				newlayer.containerid = conindex;
				newlayer.width = 0;
				newlayer.height = 0;
				if(container.attached)
				{
					newlayer.origtop = 0;
					newlayer.origleft = 0;
				}
				else
				{
					newlayer.origtop = newlayer.domitem.position().top;
					newlayer.origleft = newlayer.domitem.position().left;
				}
				
				_arrLayers.push(newlayer);
			 })
			for(var i=0; i<_arrLayers.length;i++)
			{
				
				var layer = _arrLayers[i];
				if(layer.containerid != conindex) continue;
				$('.w3_ibalayerid' + layer.id +'_' +conindex).each(function ()
				{
					AddEffect($(this).attr('id'),conindex);	
				});
				if(layer.width > layer.height)
				 	container.animOffset = parseInt(layer.width * 0.4,10);
				 else
				 	container.animOffset = parseInt(layer.height * 0.4,10);
				if(container.placeholder)
				{
					var $img = $('#' + container.elemid);
					 var info = {
					 	containerid:conindex,
						$image:$img,
						origwidth:container.width,
						origheight:container.height
					 }
					 
					 info.width = $img.width();
				     info.height = $img.height();
					 if(container.attached){
						layer.attachedrelative = 'w3exibe_attachedto_'+container.elemid;
						$('<div id="'+layer.attachedrelative +'" style="position:relative;top:0px;left:0px;"></div>').prependTo($img);
					 	info.origwidth = info.width;
						info.origheight = info.height;
						layer.domitem.detach().appendTo('#'+layer.attachedrelative);
						layer.domitem.css({
							position:'absolute'
						});
					 }
					 placeAttachedLayer(layer,info,container);
					 info.widthratio = 1;
					 info.heightratio = 1;
					 _arrImages.push(info);
				}
			}
			for(var j = 0; j < _arrEffects.length; j++)
			{
				var anim = _arrEffects[j];
				if(anim.containerid != container.id)
					continue;
				var layer = GetLayer(anim.layerid);
				if(anim.height < layer.height)
				{
					anim.domitem.css('top',Math.round((layer.height - anim.height) /2) + 'px');
				}
				if(anim.width < layer.width)
				{
					anim.domitem.css('left',Math.round((layer.width - anim.width) /2) + 'px');
				}
				anim.origleft =  anim.domitem.position().left;
				anim.origtop =  anim.domitem.position().top;
				anim.left =  anim.origleft;
				anim.top = anim.origtop;
			}
		}
		
		
	}
	
	$( window ).resize(function() {
			UpdateLayers();
		});
		
	 return {
	 	checkforexistance:function(){
			if(_checkcounter > 10)
				return;
			_checkcounter++;
			var notfoundelem = false;
			for(var j=0;j<W3Ex.containers.length;j++)
			{
				var container = W3Ex.containers[j];
				if(container == undefined) continue;
				if(container.foundid == undefined)
				{
					if(document.getElementById(container.elemid))
					{
						container.foundid = true;
						imagesLoaded( document.getElementById(container.elemid), function( instance ) {
							var con = "";
							if(instance.elements != undefined)
							{
								if(instance.elements.length > 0)
									con = instance.elements[0].id;
							}
						    W3Ex.ibaengine.finLoad(con);
						});
					}else
					{
						notfoundelem = true;
					}
				}
			}
			if(notfoundelem)
				window.setTimeout(W3Ex.ibaengine.checkforexistance,1000);
		},
		incConItems:function(){
			_conitems++;
		},
		finLoad:function(elemid){
			_conitemsfin++;
			if(elemid != "" && elemid != undefined)
			{
				if(W3Ex.containers != undefined)
				{
					for(var i=0;i<W3Ex.containers.length;i++)
					{
						var container = W3Ex.containers[i];
						if(container == undefined) continue;
						if(container.elemid != elemid) continue;
						buildAnimations(container);
						startAnimations(container);
						break;
					}
				}
			}
		}
		
		};
	
})(jQuery);

(function(){
	var checkcons = 0;
	if(W3Ex != undefined)
	{
		if(W3Ex.containers != undefined)
		{
			var notfoundelem = false;
			for(var i=0;i<W3Ex.containers.length;i++)
			{
				var container = W3Ex.containers[i];
				if(container == undefined) continue;
				var elemid = container.elemid;
				elemid = elemid.replace(/^\s+|\s+$/gm,''); //trim
				if(elemid.length > 0)
				{
					if(elemid.charAt(0) == '#')
					{
						elemid = elemid.replace('#','');
					}
					container.elemid = elemid;
				}
			}
			imagesLoaded(document.querySelectorAll('.w3_ibainner'), function( instance ) {
				W3Ex.ibaengine.checkforexistance();
			});
		}
	}
})();
