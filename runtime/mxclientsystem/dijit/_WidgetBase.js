//>>built
define("dijit/_WidgetBase","require dojo/_base/array dojo/aspect dojo/_base/config dojo/_base/connect dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/has dojo/_base/kernel dojo/_base/lang dojo/on dojo/ready dojo/Stateful dojo/topic dojo/_base/window ./Destroyable dojo/has!dojo-bidi?./_BidiMixin ./registry".split(" "),function(r,g,y,h,z,A,t,n,p,q,B,u,m,C,e,v,D,E,F,G,H,I,f){function w(a){return function(b){n[b?"set":"remove"](this.domNode,
a,b);this._set(a,b)}}m.add("dijit-legacy-requires",!C.isAsync);m.add("dojo-bidi",!1);m("dijit-legacy-requires")&&D(0,function(){r(["dijit/_base/manager"])});var x={};h=A("dijit._WidgetBase",[E,H],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:w("lang"),dir:"",_setDirAttr:w("dir"),"class":"",_setClassAttr:{node:"domNode",type:"class"},_setTypeAttr:null,style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(a){this._set("ownerDocument",
a)},attributeMap:{},_blankGif:h.blankGif||r.toUrl("dojo/resources/blank.gif"),textDir:"",_introspect:function(){var a=this.constructor;if(!a._setterAttrs){var b=a.prototype,c=a._setterAttrs=[],a=a._onMap={},d;for(d in b.attributeMap)c.push(d);for(d in b)/^on/.test(d)&&(a[d.substring(2).toLowerCase()]=d),/^_set[A-Z](.*)Attr$/.test(d)&&(d=d.charAt(4).toLowerCase()+d.substr(5,d.length-9),b.attributeMap&&d in b.attributeMap||c.push(d))}},postscript:function(a,b){this.create(a,b)},create:function(a,b){this._introspect();
this.srcNodeRef=t.byId(b);this._connects=[];this._supportingWidgets=[];this.srcNodeRef&&this.srcNodeRef.id&&"string"==typeof this.srcNodeRef.id&&(this.id=this.srcNodeRef.id);a&&(this.params=a,e.mixin(this,a));this.postMixInProperties();this.id||(this.id=f.getUniqueId(this.declaredClass.replace(/\./g,"_")),this.params&&delete this.params.id);this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:document);this.ownerDocumentBody=G.body(this.ownerDocument);f.add(this);
this.buildRendering();var c;if(this.domNode){this._applyAttributes();var d=this.srcNodeRef;d&&d.parentNode&&this.domNode!==d&&(d.parentNode.replaceChild(this.domNode,d),c=!0);this.domNode.setAttribute("widgetId",this.id)}this.postCreate();c&&delete this.srcNodeRef;this._created=!0},_applyAttributes:function(){var a={},b;for(b in this.params||{})a[b]=this._get(b);g.forEach(this.constructor._setterAttrs,function(b){if(!(b in a)){var c=this._get(b);c&&this.set(b,c)}},this);for(b in a)this.set(b,a[b])},
postMixInProperties:function(){},buildRendering:function(){this.domNode||(this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div"));if(this.baseClass){var a=this.baseClass.split(" ");this.isLeftToRight()||(a=a.concat(g.map(a,function(a){return a+"Rtl"})));p.add(this.domNode,a)}},postCreate:function(){},startup:function(){this._started||(this._started=!0,g.forEach(this.getChildren(),function(a){a._started||a._destroyed||!e.isFunction(a.startup)||(a.startup(),a._started=!0)}))},destroyRecursive:function(a){this._beingDestroyed=
!0;this.destroyDescendants(a);this.destroy(a)},destroy:function(a){function b(b){b.destroyRecursive?b.destroyRecursive(a):b.destroy&&b.destroy(a)}this._beingDestroyed=!0;this.uninitialize();g.forEach(this._connects,e.hitch(this,"disconnect"));g.forEach(this._supportingWidgets,b);this.domNode&&g.forEach(f.findWidgets(this.domNode,this.containerNode),b);this.destroyRendering(a);f.remove(this.id);this._destroyed=!0},destroyRendering:function(a){this.bgIframe&&(this.bgIframe.destroy(a),delete this.bgIframe);
this.domNode&&(a?n.remove(this.domNode,"widgetId"):q.destroy(this.domNode),delete this.domNode);this.srcNodeRef&&(a||q.destroy(this.srcNodeRef),delete this.srcNodeRef)},destroyDescendants:function(a){g.forEach(this.getChildren(),function(b){b.destroyRecursive&&b.destroyRecursive(a)})},uninitialize:function(){return!1},_setStyleAttr:function(a){var b=this.domNode;e.isObject(a)?u.set(b,a):b.style.cssText=b.style.cssText?b.style.cssText+("; "+a):a;this._set("style",a)},_attrToDom:function(a,b,c){c=3<=
arguments.length?c:this.attributeMap[a];g.forEach(e.isArray(c)?c:[c],function(c){var d=this[c.node||c||"domNode"];switch(c.type||"attribute"){case "attribute":e.isFunction(b)&&(b=e.hitch(this,b));c=c.attribute?c.attribute:/^on[A-Z][a-zA-Z]*$/.test(a)?a.toLowerCase():a;d.tagName?n.set(d,c,b):d.set(c,b);break;case "innerText":d.innerHTML="";d.appendChild(this.ownerDocument.createTextNode(b));break;case "innerHTML":d.innerHTML=b;break;case "class":p.replace(d,b,this[a]);break;case "toggleClass":p.toggle(d,
c.className||a,b)}},this)},get:function(a){var b=this._getAttrNames(a);return this[b.g]?this[b.g]():this._get(a)},set:function(a,b){if("object"===typeof a){for(var c in a)this.set(c,a[c]);return this}c=this._getAttrNames(a);var d=this[c.s];if(e.isFunction(d))var g=d.apply(this,Array.prototype.slice.call(arguments,1));else{var d=this.focusNode&&!e.isFunction(this.focusNode)?"focusNode":"domNode",f=this[d]&&this[d].tagName,k;if((k=f)&&!(k=x[f])){k=this[d];var h={},l;for(l in k)h[l.toLowerCase()]=!0;
k=x[f]=h}l=k;c=a in this.attributeMap?this.attributeMap[a]:c.s in this?this[c.s]:l&&c.l in l&&"function"!=typeof b||/^aria-|^data-|^role$/.test(a)?d:null;null!=c&&this._attrToDom(a,b,c);this._set(a,b)}return g||this},_attrPairNames:{},_getAttrNames:function(a){var b=this._attrPairNames;if(b[a])return b[a];var c=a.replace(/^[a-z]|-[a-zA-Z]/g,function(a){return a.charAt(a.length-1).toUpperCase()});return b[a]={n:a+"Node",s:"_set"+c+"Attr",g:"_get"+c+"Attr",l:c.toLowerCase()}},_set:function(a,b){var c=
this[a];this[a]=b;!this._created||c===b||c!==c&&b!==b||(this._watchCallbacks&&this._watchCallbacks(a,c,b),this.emit("attrmodified-"+a,{detail:{prevValue:c,newValue:b}}))},_get:function(a){return this[a]},emit:function(a,b,c){b=b||{};void 0===b.bubbles&&(b.bubbles=!0);void 0===b.cancelable&&(b.cancelable=!0);b.detail||(b.detail={});b.detail.widget=this;var d,e=this["on"+a];e&&(d=e.apply(this,c?c:[b]));this._started&&!this._beingDestroyed&&v.emit(this.domNode,a.toLowerCase(),b);return d},on:function(a,
b){var c=this._onMap(a);return c?y.after(this,c,b,!0):this.own(v(this.domNode,a,b))[0]},_onMap:function(a){var b=this.constructor,c=b._onMap;if(!c){var c=b._onMap={},d;for(d in b.prototype)/^on/.test(d)&&(c[d.replace(/^on/,"").toLowerCase()]=d)}return c["string"==typeof a&&a.toLowerCase()]},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"},getChildren:function(){return this.containerNode?f.findWidgets(this.containerNode):[]},getParent:function(){return f.getEnclosingWidget(this.domNode.parentNode)},
connect:function(a,b,c){return this.own(z.connect(a,b,this,c))[0]},disconnect:function(a){a.remove()},subscribe:function(a,b){return this.own(F.subscribe(a,e.hitch(this,b)))[0]},unsubscribe:function(a){a.remove()},isLeftToRight:function(){return this.dir?"ltr"==this.dir.toLowerCase():B.isBodyLtr(this.ownerDocument)},isFocusable:function(){return this.focus&&"none"!=u.get(this.domNode,"display")},placeAt:function(a,b){var c=!a.tagName&&f.byId(a);!c||!c.addChild||b&&"number"!==typeof b?(c=c&&"domNode"in
c?c.containerNode&&!/after|before|replace/.test(b||"")?c.containerNode:c.domNode:t.byId(a,this.ownerDocument),q.place(this.domNode,c,b),!this._started&&(this.getParent()||{})._started&&this.startup()):c.addChild(this,b);return this},defer:function(a,b){var c=setTimeout(e.hitch(this,function(){c&&(c=null,this._destroyed||e.hitch(this,a)())}),b||0);return{remove:function(){c&&(clearTimeout(c),c=null);return null}}}});m("dojo-bidi")&&h.extend(I);return h});
