/*
    Copyright (c) 2005-2015, Mendix bv. All rights reserved.
    See licenses.txt for third party licenses that apply.
*/

//>>built
define("mxui/widget/ListView",["mxui/widget/Button","mxui/widget/_WidgetBase","mxui/mixin/_Stateful","mxui/mixin/_ContainingSelection","mxui/dom","mxui/wm/focus","mendix/lib/MxContext","mendix/lang","webcore/dataSourceFactory","dojo/dom-class","dojo/dom-construct","dojo/aspect","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dijit/registry"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){var $=_5.create;var _11=_e(_2,{declaredClass:"mxui.widget.ListViewItem",datasource:null,listview:null,template:null,action:null,selectable:"",_index:-1,_selected:false,_checknode:null,buildRendering:function(){var _12=this.domNode=$("li",{"class":"mx-listview-item"}),_13=this.selectable;if(_13){var _14=$("#");if(_13!="singleandmaintain"){_14.appendChild($("div",{"class":"mx-listview-selection"},this._checknode=_13=="multi"?$("input",{type:"checkbox"}):$("input",{type:"radio"})));}_14.appendChild($("div",{"class":"mx-listview-content"},this.template||""));_12.appendChild(_14);}else{if(this.template){_12.appendChild(this.template);}}this.connect(this.domNode,"click","onClick");},startup:function(){this.parseContent(this.domNode,{schema:""});},select:function(){_a.add(this.domNode,"selected");if(this._checknode){this._checknode.checked=true;}this._selected=true;},deselect:function(){_a.remove(this.domNode,"selected");if(this._checknode){this._checknode.checked=false;}this._selected=false;},getGuid:function(){return this.mxcontext.getTrackId();},_setIndexAttr:function(_15){if(_15===this._index){return;}var _16="mx-name-index-";_a.remove(this.domNode,_16+this._index);_a.add(this.domNode,_16+_15);this._index=_15;},onClick:function(_17){if(this.selectable){if(this._selected){this.listview._deselectItem(this);}else{this.listview._selectItem(this);}}else{if(this.action){_17.stopPropagation();var _18=this,_19=this.action,_1a=new _7();var run=function(){window.mx.ui.execute(_19,{context:_1a});_18.listview._shareSelection(_18.listview._entity);};_1a.mixin(this.mxcontext);_1a.setTrackObject(null);if(_19.microflow&&_19.microflow.validate){this.mxform.validate(run);}else{run();}}}}});var _1b=_e([_2,_3,_4],{declaredClass:"mxui.widget.ListView",datasource:null,dataSourceMixin:null,page:5,search:null,action:null,sort:null,selectable:"",templateMap:null,_entity:"",_datasource:null,_itemList:null,_loadButton:null,_clearButton:null,_searchNode:null,_listNode:null,_emptyNode:null,_loadNode:null,_lastRenderId:0,_preserveSelection:false,constructor:function(_1c){if(_1c.selection){this._preserveSelection=true;}},postMixInProperties:function(){if(this.listViewSelectionMode){this.selectable=this.listViewSelectionMode;}},buildRendering:function(){this._loadButton=new _1({caption:this.translate("load_more"),iconClass:"glyphicon-repeat",onClick:_f.hitch(this,"_loadMore"),"class":"mx-listview-loadMore"});this.domNode=$("div",{"class":"mx-listview"},this._listNode=$("ul",{"class":"mx-list mx-list-striped mx-listview-list"}));if(this.selectable!="singleandmaintain"){_a.add(this.domNode,"mx-listview-selectable");}if(this.action){_a.add(this.domNode,"mx-listview-clickable");}this._emptyNode=$("li",{"class":"mx-listview-empty"},$("label",this.translate("no_items")));this._loadNode=$("li",{"class":"mx-listview-loading"},$("img",{src:require.toUrl("mxui/ui/widget/images/loading.gif")}));if(this.search){this._clearButton=new _1({iconClass:"glyphicon-refresh",onClick:_f.hitch(this,"_clearSearchNode"),"class":"mx-listview-clear-button"});_b.place($("div",{"class":"mx-listview-searchbar clearfix"},this._clearButton.domNode,$("div",{"class":"mx-listview-search-input"},this._searchNode=$("input",{type:"text",placeholder:this.translate("search"),"class":"form-control",value:this.getState("searchValue","")}))),this.domNode,"first");this.connect(this._searchNode,"keyup","_searchKeyDown");}},postCreate:function(){this._createSource();this._itemList=[];this.templateMap=this.templateMap||[];this.selection=this.getState("selection",this.selection);},_onLoad:function(_1d){if(this.selectable){if(!this._preserveSelection){var _1e=_d.map(this._datasource.getObjects(),function(obj){return obj.getGuid();});this.selection=_d.filter(this.selection,function(_1f){return _d.indexOf(_1e,_1f)!=-1;});}this._ensureSelection();this._shareSelection(this._entity);}if(_1d){_1d();}},update:function(obj,_20){this._registerSubscriptions();this._loadData(_20);},_registerSubscriptions:function(){this.unsubscribeAll();this.subscribe({entity:this._entity,async:true,callback:function(_21,_22){this.update(null,_22);}});var _23=this.mxcontext.getTrackId();if(_23){this.subscribe({guid:_23,async:true,callback:function(_24,_25){this.update(null,_25);}});}},storeState:function(_26){if(this._searchNode){_26("searchValue",this._searchNode.value);}_26("datasourceOffset",this._datasource.getOffset());_26("selection",this.selection);},uninitialize:function(){this._clearData();this._datasource.destroy();},_createSource:function(){this._datasource=_9.create(_f.mixin({sort:this.sort,context:this.mxcontext,page:this.page},this.datasource,this.dataSourceMixin));this._entity="entity" in this.datasource?this.datasource.entity:this.datasource.path.split("/").pop();if(this.search){this._datasource.setConstraints(this._getSearchConstraint());}var _27=this.getState("datasourceOffset",0);if(_27){this._datasource.setPageSize(_27+this.page);this._datasource.setOffset(0);var _28=this,_29=_c.after(this,"_onLoad",function(){_28._datasource.setPageSize(_28.page);_28._datasource.setOffset(_27);_29.remove();});}},_clearData:function(){while(this._itemList.length){var _2a=this._itemList.pop();if(_2a.domNode){_2a.destroy();}}},_showLoadingIcon:function(){this._listNode.appendChild(this._loadNode);},_hideLoadingIcon:function(){_5.orphan(this._loadNode);},_showLoadMoreButton:function(){this.domNode.appendChild(this._loadButton.domNode);},_hideLoadMoreButton:function(){_5.orphan(this._loadButton.domNode);},_updateLoadMoreButton:function(){if(!this._datasource.atEnd()){this._showLoadMoreButton();}else{this._hideLoadMoreButton();}},_updateEmptyMessage:function(){if(this._itemList.length===0){this._listNode.appendChild(this._emptyNode);}else{_5.orphan(this._emptyNode);}},_searchKeyDown:function(){var _2b=this,_2c=this._datasource;this._clearButton.set("iconClass",this._searchNode.value?"glyphicon-remove":"glyphicon-refresh");clearTimeout(this._searchTimeout);this._searchTimeout=setTimeout(function(){_2b._clearData();_2b._showLoadingIcon();_2b._hideLoadMoreButton();_2c.setConstraints(_2b._getSearchConstraint());_2b.update();},500);},_clearSearchNode:function(){clearTimeout(this._searchTimeout);this._clearButton.set("iconClass","glyphicon-refresh");this._searchNode.value="";this._datasource.setConstraints("");this.update();},_selectItem:function(_2d){var _2e=_2d.getGuid();if(/^(single|singleandmaintain)$/.test(this.selectable)){var _2f=this.selection[0],_30=_8.find(this._itemList,function(_31){return _31.getGuid()==_2f;});if(_30){_30.deselect();}this.selection=[_2e];}else{this._addToSelection(_2e);}this._shareSelection(this._entity);_2d.select();},_deselectItem:function(_32){if(this.selectable!=="singleandmaintain"){this._removeFromSelection(_32.getGuid());this._shareSelection(this._entity);_32.deselect();}},_getSearchConstraint:function(){var _33=_5.escapeHTMLQuotes(this._searchNode.value),_34=[],_35=this.search.attributes,_36=this.search.method;if(_33){for(var i=0,_37;_37=_35[i];++i){_34.push(_36+"("+_37+",'"+_33+"')");}return "["+_34.join(" or ")+"]";}return "";},_loadData:function(_38){this._datasource.first();this.sequence(["_sourceReload","_renderData","_onLoad"],_38);},_loadMore:function(){this._showLoadingIcon();this._hideLoadMoreButton();this.sequence(["_sourceNext","_renderData"]);},_sourceReload:function(_39){this._datasource.reload(_39);},_sourceNext:function(_3a){this._datasource.next(_3a);},_renderData:function(_3b){var _3c=this._datasource.getObjects(),_3d=this._datasource.getOffset(),_3e=this._itemList.slice(_3d),_3f=[],_40=[],_41=_6.get();_d.forEach(_3c,function(obj,_42){var _43=obj.getGuid(),_44=_8.findIndex(_3e,function(_45){return _45.getGuid()===_43;}),_46;if(_44>-1){_46=_3e[_44];_3e.splice(_44,1);}else{_46=this._createListItem(obj,_3d+_42);_40.push(_46);}_3f.push(_46);},this);var _47=$("div",{"class":"mx-offscreen"});this.domNode.appendChild(_47);_d.forEach(_40,function(_48){_47.appendChild(_48.domNode);_48.startup();});var _49=this._lastRenderId=_8.getUniqueId();this._loadListItems(_3f,_3c,_f.hitch(this,function(){_5.orphan(_47);if(_49!=this._lastRenderId){_d.forEach(_40,function(_4a){_4a.destroy();});_3b();return;}_d.forEach(_3e,function(_4b){_4b.destroy();});this._itemList=this._itemList.slice(0,_3d).concat(_3f);this._updateStatusInfo();this._flushItemsToDom(_3f,_3d);if(_41&&this._listNode.contains(_41)){_6.put(_41);}_3b();}));},_flushItemsToDom:function(_4c,_4d){_d.forEach(_4c,function(_4e,i){_4e.set("index",_4d+i);var _4f=this._listNode.children[_4d+i];if(_4f){var _50=_10.byNode(_4f);if(_50.getGuid()!==_4e.getGuid()){this._listNode.insertBefore(_4e.domNode,_50.domNode);}}else{this._listNode.appendChild(_4e.domNode);}},this);},_updateStatusInfo:function(){this._hideLoadingIcon();this._updateLoadMoreButton();this._updateEmptyMessage();},_createListItem:function(obj,_51){var _52=this.templateMap[obj.getEntity()];if(!_52){_d.some(obj.getSuperEntities(),function(_53){return _52=this.templateMap[_53];},this);}var _54=new _11({index:_51,uniqueid:this.uniqueid+"_obj"+obj.getGuid(),listview:this,template:this.getTemplate(_52),action:this.action,selectable:this.selectable,mxform:this.mxform,validator:this.validator,readOnly:this.readOnly,ignoreUpdates:this.ignoreUpdates});if(this.selectable&&this._isSelected(obj.getGuid())){_54.select();}return _54;},_loadListItems:function(_55,_56,_57){this.collect(_d.map(_55,function(_58,i){return function(cb){var _59=new _7({mxcontext:this.mxcontext});_59.setObject(_56[i]);_58.applyContext(_59,cb);};}),_57);},_ensureSelection:function(){var _5a=this._datasource.getObjects();if(this.selectable==="singleandmaintain"&&!this._hasSelection()&&_5a.length>0){this._addToSelection(_5a[0].getGuid());}}});return _1b;});