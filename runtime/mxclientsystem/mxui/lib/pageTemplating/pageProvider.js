/*
    Copyright (c) 2005-2015, Mendix bv. All rights reserved.
    See licenses.txt for third party licenses that apply.
*/

//>>built
define("mxui/lib/pageTemplating/pageProvider",["mxui/lib/pageTemplating/roleFilter","mxui/lib/pageTemplating/PageComponent","mxui/dom","mendix/lib/Error","dojo/sniff","dojo/_base/array","dojo/_base/lang"],function(_1,_2,_3,_4,_5,_6,_7){"use strict";function _8(_9){var _a=[];while(_9.firstChild){_a.push(document.adoptNode(_9.firstChild));}return _6.filter(_6.map(_a,function(_b){return _1.filterDom(_b);}),function(_c){return _c!=null;});};function _d(_e){var _f=document.createDocumentFragment();_6.forEach(_e,_7.hitch(_f,_f.appendChild));return _f;};function _10(xml){return _6.map(_3.getElementsByTagNameNoNS(xml,"layout"),function(_11){return _11.getAttribute("path");}).reverse();};function _12(xml){return _6.map(_3.getElementsByTagNameNoNS(xml,"argument"),function(_13){return new _2(_13.getAttribute("parameterName")||"main",_8(_13));});};function _14(xml){var _15={};_6.forEach(_3.getElementsByTagNameNoNS(xml,"template"),function(_16){var _17={widgetId:_16.getAttribute("widget-id"),templateName:_16.getAttribute("name"),content:_d(_8(_16))};if(!_15[_17.widgetId]){_15[_17.widgetId]={};}_15[_17.widgetId][_17.templateName]=_17.content;});return _15;};function _18(xml,_19){var _1a=xml.documentElement;return {id:_1a.getAttribute("id")||"",title:_1a.getAttribute("title")||"","class":_1a.getAttribute("class")||"",style:_1a.getAttribute("style")||"",url:_1a.getAttribute("url"),closeButton:_1a.getAttribute("closeButton"),path:_19,layouts:_10(xml),components:_12(xml),widgetTemplates:_14(xml)};};var _1b={get:function(_1c,_1d,_1e){var _1f="pages/"+window.mx.session.getConfig("uiconfig.locale");window.mx.server.get({url:_1f+"/"+_1c,failOk:false,handleAs:"xml",load:function(_20){_1d(_18(_20,_1c));},error:_1e});}};return _1b;});