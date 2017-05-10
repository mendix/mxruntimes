/*
    Copyright (c) 2005-2015, Mendix bv. All rights reserved.
    See licenses.txt for third party licenses that apply.
*/

//>>built
define("mxui/widget/_Button",["mxui/widget/_WidgetBase","mxui/dom","dojo/_base/lang","dojo/_base/event","dojo/_base/declare"],function(_1,_2,_3,_4,_5){var $=_2.create;var _6=_5(_1,{declaredClass:"mxui.widget._Button",renderType:"button",iconUrl:"",iconClass:"",cssClasses:null,cssStyle:"",_textNode:null,_iconNode:null,_isCls:false,buildRendering:function(){this._textNode=document.createTextNode("");var _7={};if(this.cssStyle){_7={"style":this.cssStyle};}var _8=this.cssClasses||[];if(typeof _8==="string"){_8=[_8];}var _9=_8.join(" ");if(this.renderType==="link"){this.domNode=$("span",_3.mixin(_7,{"class":"mx-link"+" "+_9})," ",$("a",{tabindex:-1},this._textNode)," ");}else{this.domNode=$("button",_3.mixin(_7,{"type":"button","class":"btn mx-button "+_9})," ",this._textNode," ");}this._connectEvents();},_connectEvents:function(){this.connect(this.domNode,"click","_onClick");this.connect(this.domNode,"keyup","onKeyUp");},onClick:function(e){},onKeyUp:function(e){},_onClick:function(e){_4.stop(e);this.domNode.focus();this.onClick(e);},checkDisabled:function(){return this._disabled;},enable:function(){if(this.renderType=="button"){this.domNode.removeAttribute("disabled");}},disable:function(){if(this.renderType=="button"){this.domNode.setAttribute("disabled","disabled");}},_setCaptionAttr:function(_a){this._textNode.nodeValue=_a;},_setIconClassAttr:function(_b){this._setIcon(_b,true);},_setIconUrlAttr:function(_c){this._setIcon(_c,false);},_setIconVisibleAttr:function(_d){this._iconNode.style.display=_d?"":"none";},_setIcon:function(_e,_f){if(this._iconNode){_2.orphan(this._iconNode);this._iconNode=null;}if(_e){this._iconNode=_f?$("span",{"class":"glyphicon "+_e}):$("img",{src:window.mx.appUrl+_e});this.domNode.insertBefore(this._iconNode,this.domNode.firstChild);}},_setFocusIndexAttr:function(_10){this.domNode.setAttribute("tabindex",_10);}});return _6;});