/*
    Copyright (c) 2005-2015, Mendix bv. All rights reserved.
    See licenses.txt for third party licenses that apply.
*/

//>>built
define("mendix/lib/MxObject",["mendix/lang","mendix/validator","mendix/logger","dojo/_base/json","dojo/_base/array","dojo/_base/lang","big/big","dojo/_base/declare"],function(_1,_2,_3,_4,_5,_6,_7,_8){var _9=_8(null,{constructor:function(_a){this.id="mendix.lib.MxObject";this._references=null;this._changeData=null;this.metaData=_a?_a.meta:false;this.resetFromJSON(_a?_a.json:false);if(this.jsonData&&this.metaData){this._guid=this.jsonData.guid;this.id+="("+this.jsonData.objectType+":"+this._guid+")";}if(!this.jsonData||!this.jsonData.objectType){var _b=this.metaData&&this.metaData.getEntity();_3.error(this.id+".create: Invalid Mendix object. Check entity access"+(_b?" for entity "+_b:"")+".");this._guid=0;this.jsonData=null;}if(!this._guid){this._guid="0";}},attachReferences:function(_c){if(_c&&_c.length>0){this._references={};_5.forEach(_c,function(_d){this._references[_d.getGuid()]=_d;},this);}},resetFromJSON:function(_e){this.jsonData=_e;this._changeData={};this._guid=this.jsonData?this.jsonData.guid:0;if(this.jsonData&&this.metaData){for(var _f in this.jsonData.attributes){this._setAttributeValue(_f,this._convertValue(_f,this._getAttributeValue(_f)));}}},getGuid:function(){return this._guid;},hasChanges:function(){return !_1.objectIsEmpty(this._changeData);},_collectChanges:function(){return _6.mixin({},this._changeData);},set:function(_10,_11){try{return this._setContent(_10,_11);}catch(e){throw new Error("Validate values using validator#validate(value, attr) before calling MxObject#set.");}},isReadonlyAttr:function(_12){if(this.has(_12)){return !!this.jsonData.attributes[_12].readonly;}else{if(this.metaData.has(_12)){return false;}else{return true;}}},fetch:function(_13,_14){var _15=this,obj=this,_16=null,_17;if(!_13){_17=[];}else{if(_13 instanceof Array){_17=_13.slice();}else{_17=_13.split("/");}}if(this.isA(_17[0])){_17.shift();}if(typeof _14!="function"){throw new Error(_15.id+".fetch : callback is not a function");}var _18=function(){if(_17.length===0){_14(obj);}else{if(_17.length==1){if(_16){window.mx.data.release(_16);}_14(obj.get2(_17[0]));}else{if(_16){window.mx.data.release(_16);}var ref=_17.shift(),_19=false,_1a,_1b;if(obj.isObjectReference(ref)){var _1c=obj.get2(ref);if(_1c===""){_14(null);return;}if(typeof _1c=="object"){_1a=[_1c.guid];}else{_1a=[_1c];}}else{if(obj.isObjectReferenceSet(ref)){if(_17.length==1){_19=true;var _1d=obj.get2(ref);if(_1d.length===0){_14(null);return;}if(typeof _1d[0]=="object"){_1a=[];while(_1d.length>0){_1a.push(_1d.shift().guid);}}else{_1a=_1d;}}else{throw new Error(_15.id+".fetch : "+obj+" reference set should be last reference in path");}}else{return _14(null);}}_1b=_17.shift();if(!_1b){throw new Error(_15.id+".fetch : no type specified");}if(_1a){window.mx.data.get({guids:_1a,callback:function(_1e){if(_19){if(_1e.length===0||_1e[0].isA(_1b)){_14(_1e);}else{_14(null);}}else{_16=obj=_1e[0];if(_1e.length>1){window.mx.data.release(_1e.slice(1));}if(obj){if(obj.isA(_1b)){_18();}else{_14(null);}}else{_14(null);}}},error:function(e){throw new Error(_15.id+".fetch : could not get objects with GUIDs "+_1a);}});}else{throw new Error(_15.id+".fetch : "+obj+"'s '"+ref+"' attribute is empty");}}}};_18();},get2:function(_1f){if(typeof _1f!=="string"){throw new Error(this.id+".get : parameter attr "+_1f+" is not of type String");}if(!this.metaData.has(_1f)){return null;}var _20=(this._changeData[_1f]!=null)?this._changeData[_1f]:this._getAttributeValue(_1f);if(this.isDate(_1f)){var _21=this.isLocalizedDate(_1f);if(_20===""||_20==null){_20="";}else{_20=_21?Number(_20):window.mx.parser.localizeEpoch(_20);}}else{if(this.isBoolean(_1f)){if(typeof _20=="string"&&_20!==""){_20=/^true$/.test(_20);}}}if(_20 instanceof _7){return new _7(_20);}if(typeof _20=="object"){return _6.clone(_20);}return _20;},has:function(_22){if(typeof _22!=="string"){throw new Error(this.id+".has: attribute parameter is not a string");}return _22 in this.jsonData.attributes;},getReferences:function(_23){var e;if(typeof _23!=="string"){throw new Error(this.id+".getReferences : parameter attr "+_23+" is not of type String.");}var _24=[];if(this.has(_23)){if(this.isReference(_23)){if(this._hasChildren(_23)&&this._changeData[_23]==null){var _25=this.getChildren(_23);var _26=[];for(var i=0;i<_25.length;i++){_26.push(_25[i].getGuid());}_24=_26;}else{_24=this.get2(_23);}if(_24===""){_24=[];}else{if(typeof (_24)=="string"||typeof (_24)=="number"){_24=[_24];}else{if((typeof (_24)=="object")&&(_24.length==null)){_24=_1.objectToArray(_24);}}}}else{throw new Error(this.id+".getReferences: attribute "+_23+" is not an ObjectReference(Set).");}}else{}return _24;},getReference:function(_27){var e;if(typeof _27!=="string"){throw new Error(this.id+".getReference : parameter attr is not of type String.");}if(this.has(_27)){if(!this.metaData.isObjectReference(_27)){throw new Error(this.id+".getReference: attribute "+_27+" is not an ObjectReference.");}}else{return null;}if(this._hasChildren(_27)){return this.getChild(_27).getGuid();}else{return this.get2(_27);}},isEnum:function(_28){return this.metaData.isEnum(_28);},isNumeric:function(_29){return this.metaData.isNumeric(_29);},isCurrency:function(_2a){return this.metaData.isCurrency(_2a);},isPassword:function(_2b){return this.metaData.isPassword(_2b);},isDate:function(_2c){return this.metaData.isDate(_2c);},isLocalizedDate:function(_2d){return this.metaData.isLocalizedDate(_2d);},isBoolean:function(_2e){return this.metaData.isBoolean(_2e);},isReference:function(_2f){return this.metaData.isReference(_2f);},isObjectReference:function(_30){return this.metaData.isObjectReference(_30);},isObjectReferenceSet:function(_31){return this.metaData.isObjectReferenceSet(_31);},getOptions:function(_32){return this.metaData.getOptions(_32);},getEnumMap:function(_33){return this.metaData.getEnumMap(_33);},getEnumKVPairs:function(_34){return this.metaData.getEnumKVPairs(_34);},getEnumCaption:function(_35){return this.metaData.getEnumCaption(_35,this.get2(_35));},hasChildren:function(_36){if(typeof _36!=="string"){throw new Error(this.id+".hasChildren : parameter attr ("+_36+") is not of type String.");}return (this.isReference(_36)&&this._hasChildren(_36));},getChildren:function(_37){if(typeof _37!=="string"){throw new Error(this.id+".getChildren : parameter attr ("+_37+") is not of type String.");}var _38=[],_39=null,_3a;if(this.has(_37)){if(this.isReference(_37)){if(this._hasChildren(_37)){_39=this.get2(_37);if(this.isObjectReference(_37)){if(this._references&&this._references[_39]){_3a=this._references[_39];_3a._references=this._references;_38.push(_3a);}else{_38.push(new _9({meta:window.mx.meta.getEntity(_39.objectType),json:_39}));}}else{for(var i in _39){if(this._references&&this._references[_39]){_3a=this._references[i];_3a._references=this._references;_38.push(_3a);}else{_38.push(new _9({meta:window.mx.meta.getEntity(_39[i].objectType),json:_39[i]}));}}}}}else{var e=this.id+".getChildren: attribute "+_37+" is not an ObjectReference(Set).";_3.exception(e);throw new Error(e);}}else{}return _38;},getChild:function(_3b){if(typeof _3b!=="string"){throw new Error(this.id+".getChild : parameter attr("+_3b+") is not of type String.");}if(this.has(_3b)&&this.isObjectReference(_3b)){var _3c=this.get2(_3b);if(this._references&&this._references[_3c]){var _3d=this._references[_3c];_3d._references=this._references;return _3d;}else{if(typeof _3c=="object"){return new _9({json:_3c,meta:window.mx.meta.getEntity(_3c.objectType)});}else{return null;}}}},removeReferences:function(_3e,_3f){var e;if(typeof _3e!=="string"){throw new Error(this.id+".removeReference : parameter attr is not of type String.");}else{if(this.has(_3e)){if(!this.isReference(_3e)){throw new Error(this.id+".removeReference : attempt to remove Reference from non-Reference attribute : "+_3e);}}else{return false;}}if(!(_6.isArray(_3f))){_3f=[_3f];}if(!this._hasChildren(_3e)){if(this.isObjectReference(_3e)){this._setContent(_3e,"");}else{this._setContent(_3e,_1.arraySubtract(this.getReferences(_3e),_3f));}}else{if(this.isObjectReference(_3e)){this._setContent(_3e,"");}else{for(var i=0;i<_3f.length;i++){delete this.jsonData.attributes[_3e].value[_3f[i]];}var val=_1.arraySubtract(this.getReferences(_3e),_3f);return this._makeChange(_3e,val);}}},addReference:function(_40,_41){var e;if(typeof _40!=="string"){throw new Error(this.id+".addReference : parameter attr is not of type String.");}else{if(!_41){throw new Error(this.id+".addReference : parameter guid is not set.");}else{if(this.has(_40)){if(!this.isReference(_40)){throw new Error(this.id+".addReference : attempt to add Reference to non-Reference attribute : "+_40);}}else{return false;}}}if(this.isObjectReference(_40)){this._setContent(_40,_41);}else{var _42=this.getReferences(_40);var _43=_42.join(";");if(!(_43.match(_41))){_42.push(_41);this._setContent(_40,_42);}}},addReferences:function(_44,_45){for(var i=0;i<_45.length;i++){var _46=_45[i];if(_46!==0&&!isNaN(_46)){this.addReference(_44,_46);}}},getReferenceAttributes:function(){return this.metaData.getReferenceAttributes();},getAttributes:function(){return this.metaData.getAttributes();},getPrimitives:function(){return this.metaData.getAttributesWithoutReferences();},getAttributeType:function(_47){return this.metaData.getAttributeType(_47);},getSelectorEntity:function(_48){return this.metaData.getSelectorEntity(_48);},getEntity:function(){return (this.jsonData&&this.jsonData.objectType);},isA:function(_49){return this.metaData.isA(_49);},hasSuperEntities:function(){return this.metaData.hasSuperEntities();},getSuperEntities:function(){return this.metaData.getSuperEntities();},hasSubEntities:function(){return this.metaData.hasSubEntities();},getSubEntities:function(){return this.metaData.getSubEntities();},reset:function(){this._changeData={};},inheritsFrom:function(_4a){return this.metaData.inheritsFrom(_4a);},compare:function(_4b){if(_4b.getEntity()!=this.getEntity()){return false;}var _4c=this.metaData.getAttributesWithoutReferences();for(var i=0,_4d;_4d=_4c[i];i++){var _4e=this.get2(_4d);var _4f=_4b.get2(_4d);if(_4e!==_4f){if(typeof _4e=="object"){if(typeof _4f!="object"){throw new Error("non matching value types for attribute "+_4d);}if(_4e.valueOf&&_4f.valueOf&&_4e.valueOf()!==_4f.valueOf()){return false;}}else{return false;}}}var _50=this.getReferenceAttributes(),ref;for(i=0,ref;ref=_50[i];i++){if((ref=="System.changedBy")||(ref=="System.owner")){continue;}var _51=_4b.getReferences(ref);var _52=this.getReferences(ref);var _53=_52.join(",");for(var j=0,id;id=_51[j];j++){if(!_53.match(id)){return false;}}}return true;},toString:function(){return this.getGuid();},_validateNumber:function(_54,_55){var _56=_2.validate(_55,this.metaData.getAttributeType(_54));if(_56!==_2.validation.OK){throw new Error("Cannot set invalid value to MxObject attribute "+_54);}},_convertValue:function(_57,_58){if(_58){if(this.isNumeric(_57)){if(!(_58 instanceof _7)){_58=new _7(_58);}this._validateNumber(_57,_58);}}return _58;},_setContent:function(_59,_5a){if(typeof _59!=="string"){throw new Error(this.id+"._setContent : parameter attr ("+_59+") is not of type String.");}if(!this.metaData.has(_59)){return false;}var _5b=this.get2(_59);if(_5b==null&&_5a===""){return false;}if(this.isDate(_59)){var _5c=this.isLocalizedDate(_59);if(_5a!==""){if(_5c){_5a=Number(_5a);}else{_5a=window.mx.parser.delocalizeEpoch(_5a);}}}else{if(this.isPassword(_59)){_5a=_5a.replace(/[\s\t]+$/,"").replace(/^[\s\t]+/,"");}else{if(this.isBoolean(_59)){_5a=!!_5a;}else{if(this.isObjectReference(_59)&&_6.isArray(_5a)){throw new Error("mendix/lib/MxObject._setContent : trying to set single object reference to multiple values");}else{if(this.isObjectReferenceSet(_59)&&!_6.isArray(_5a)){throw new Error("mendix/lib/MxObject._setContent : trying to set object reference set to single value");}}}}}if(_5a!==_5b){return this._makeChange(_59,_5a);}},_hasChildren:function(_5d){if(this._changeData[_5d]){return false;}var _5e=this._getAttributeValue(_5d);if(this._references&&this._references[_5e]){return true;}return (_5e&&(typeof _5e=="object")&&(_5e.length==null));},_getAttributeValue:function(_5f){var val=this.jsonData.attributes[_5f];if(val===undefined){val=null;}return (val&&(typeof val=="object")&&("value" in val))?val.value:val;},_setAttributeValue:function(_60,_61){var val=this.jsonData.attributes[_60];if(_61===undefined){_61=null;}if(val&&(typeof (val)=="object")&&"value" in val){val.value=_61;}else{this.jsonData.attributes[_60]=_61;}},setWithoutEvent:function(_62,_63){this._changeData[_62]=_63;},_makeChange:function(_64,_65){this.setWithoutEvent(_64,this._convertValue(_64,_65));window.mx.data.makeChange(this,_64,this.get(_64));return true;},_applyChangeSet:function(){for(var _66 in this._changeData){this._setAttributeValue(_66,this._changeData[_66]);}this._changeData={};}});return _9;});