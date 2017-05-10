/*
    Copyright (c) 2005-2015, Mendix bv. All rights reserved.
    See licenses.txt for third party licenses that apply.
*/

//>>built
define("webcore/sql/transaction-creators",["./constants","./SelectBuilder","./Column","./InsertBuilder","../applicative","../DanglingError","../monad","../TaskReader","../Task","big/big"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b=_8;var _c={"String":"text","Integer":"text","Long":"text","Decimal":"text","Float":"text","Currency":"text","Enum":"text","HashString":"text","ObjectReference":"text","DateTime":"integer","Boolean":"integer","AutoNumber":"integer","Binary":"blob"};var _d={"String":false,"Integer":false,"Long":false,"Decimal":false,"Float":false,"Currency":false,"Enum":false,"HashString":false,"ObjectReference":false,"DateTime":true,"Boolean":true,"AutoNumber":true,"Binary":false};var _e={"String":String,"Integer":_f,"Long":_f,"Decimal":_f,"Float":_f,"Currency":_f,"Enum":String,"HashString":String,"ObjectReference":String,"DateTime":_10,"Boolean":Number,"AutoNumber":String,"Binary":String};var _11={"String":String,"Integer":String,"Long":String,"Decimal":String,"Float":String,"Currency":String,"Enum":String,"HashString":String,"ObjectReference":String,"DateTime":_12,"Boolean":Boolean,"AutoNumber":String,"Binary":String};var _13={"String":_12,"Integer":_12,"Long":_12,"Decimal":_12,"Float":_12,"Currency":_12,"Enum":_12,"HashString":_12,"ObjectReference":_12,"DateTime":Number,"Boolean":_14,"AutoNumber":_12,"Binary":_12};var _15={"String":"UPPER","Enum":"UPPER"};var _16={createCreateTransaction:function(_17){var _18=["CREATE TABLE IF NOT EXISTS _guidToTable (guid text primary key, tableName text, dirty boolean, autocommitted boolean)"].concat(_17.map(_19)).map(function(_1a){return _28(_1a,[]);});return _5.sequence(_18,_b);function _19(_1b){var _1c=[{attr:"guid",type:"text",isPrimaryKey:true}].concat(_1d(_1b)).map(function(_1e){return [_25(_1e.attr),_1e.type,_1e.isPrimaryKey?"PRIMARY KEY":""].join(" ");}).join(", ");return "CREATE TABLE IF NOT EXISTS "+_25(_1b)+" ("+_1c+")";};function _1d(_1f){var _20=mx.meta.getEntity(_1f);return _20.getAttributes().map(function(_21){var _22=_20.getAttributeType(_21);return {attr:_21,type:_c[_22]};});};},createResetTransaction:function(_23){var _24=["_guidToTable"].concat(_23).map(_25).map(function(_26){return "DROP TABLE IF EXISTS '"+_26+"'";}).map(function(_27){return _28(_27,[]);});return _7.sequence([_5.sequence(_24,_b),this.createCreateTransaction(_23)],_b);},createFetchByGuidTransaction:function(_29){var _2a=_2().from("_guidToTable").where("guid","equals").select("*");return _28(_2a,[_29]).chain(function(res){if(res.rows.length===0){return _b.rejected(new Error("guid not found"));}if(res.rows.length!==1){return _b.rejected(new Error("db consistency error"));}return _b.of(res.rows.item(0));}).chain(function(row){var _2b=row.tableName;var _2c=!row.dirty;var _2d=row.autocommitted;var _2e=_2().from(_25(_2b)).where("guid","equals").select("*");return _28(_2e,[_29]).map(function(res){if(res.rows.length===0){return _9.rejected(new Error("entity not found"));}if(res.rows.length!==1){return _9.rejected(new Error("db consistency error"));}return _2f(window.mx.meta.getEntity(_2b),_2d,_2c,res.rows.item(0));});});},createFetchSliceTransaction:function(_30,_31,_32,_33,_34){_31=_31||[];_34=_34||[];var _35=mx.meta.getEntity(_30);var _36=_37(_35,_31);var _38=_36.builder.from(_25(_30));var _39=_36.args;var _3a=_34.reduce(function(acc,_3b){var _3c=_35.getAttributeType(_3b[0]);var _3d=_3(_3b[0]);var _3e=_15[_3c];if(_3e){_3d=_3d.apply1(_3e);}return acc.order(_3d,_3b[1]);},_38.offset(_32).limit(_33));var _3f=_28(_3a.select("*"),_39).map(function(res){var _40=[];for(var i=0;i<res.rows.length;++i){var _41=!/^GUID:/.test(res.rows.item(i).guid);var _42=0;_40.push(_2f(_35,_42,_41,res.rows.item(i)));}return _40;});var _43=_28(_38.select("COUNT(*)","cnt"),_39).map(function(res){return res.rows.item(0).cnt;});return _5.lift2(function(x,y){return [x,y];},_3f,_43);},createInsertOrReplaceTransaction:function(_44,_45){var _46=_47(_44,false);var _48=_45.map(function(obj){return _5f(obj.guid).map(function(res){return res.rows.length>0;}).chain(function(_49){if(!_49){return _47(obj,true);}else{return _b.of();}});});return _5.sequence_([_46].concat(_48),_b);},createFillBulkTransaction:function(_4a,_4b){var _4c=_4b.reduce(function(acc,obj){var _4d=_4e();var _4f=_50(_4a,obj);return acc.concat([_28(_4d.insert(),[obj.guid,_4a,0,0]),_28(_4f.builder.insert(),_4f.values)]);},[]);return _5.sequence(_4c,_b);},createUpdateTransaction:function(_51,obj){var _52=_50(_51,obj);return _28(_52.builder.insertOrReplace(),_52.values);},createFetchDirtyObjectsTransaction:function(){return _53().chain(function(res){var _54=_82(res.rows).map(function(row){return _16.createFetchByGuidTransaction(row.guid);});return _5.sequence(_54,_b);});},createUploadTransaction:function(){var _55=this;return _56().chain(function(res){if(res.rows.length>0){var msg="There are autocommitted objects remaining. Sync has failed.";return _b.rejected(new _6(msg));}return _55.createFetchDirtyObjectsTransaction();});},createDeleteTransaction:function(_57,_58){return _5.sequence([_28("DELETE FROM "+_25(_57)+" WHERE guid = ?",[_58]),_28("DELETE FROM _guidToTable WHERE guid = ?",[_58])],_b);},createDirtyCleanupTransaction:function(){return _28("SELECT DISTINCT tableName FROM _guidToTable WHERE dirty = 1").chain(function(res){var _59=_82(res.rows).map(function(row){var _5a=row.tableName;return _28("DELETE FROM "+_25(_5a)+" WHERE guid IN ("+"SELECT guid FROM _guidToTable WHERE tableName = ? AND dirty = 1)",[_5a]);});return _7.sequence_([_5.sequence(_59,_b),_28("DELETE FROM _guidToTable WHERE dirty = 1")],_b);});}};return _16;function _47(obj,_5b){_5b=_5b+0;var _5c=obj.$objectType;var _5d=_4e();var _5e=_50(_5c,obj);return _5.sequence_([_28(_5d.insertOrReplace(),[obj.guid,_5c,1,_5b]),_28(_5e.builder.insertOrReplace(),_5e.values)],_b);};function _53(){var sql=_2().from("_guidToTable").where("dirty","equals").select("*");return _28(sql,[1]);};function _56(){var sql=_2().from("_guidToTable").where("autocommitted","equals").select("guid");return _28(sql,[1]);};function _5f(_60){var sql=_2().from("_guidToTable").where("guid","equals").select("guid");return _28(sql,[_60]);};function _61(_62,_63){if(_63==="guid"){return "String";}else{return _62.getAttributeType(_63);}};function _4e(){return _4().into("_guidToTable").column("guid").column("tableName").column("dirty").column("autocommitted");};function _37(_64,_65){return _65.reduce(function(acc,_66){var _67=_64.getAttributeType(_66.attribute);var _68=_d[_67];var _69=_66.value===""||_66.value==null;var _6a=_13[_67];var _6b=_e[_67];if(_68==null||!_6b){return acc;}var _6c=_6b(_6a(_66.value));if(_69&&_68&&_66.operator==="equals"){var _6d=_66.negate?acc.builder.whereNotNull:acc.builder.whereNull;return {constraintString:_6d.call(acc.builder,_25(_66.attribute)),args:acc.args};}else{if(_69&&_68&&_66.operator==="contains"){return acc;}else{var _6e=_66.negate?acc.builder.whereNot:acc.builder.where;var _6f=_66.operator==="contains"?_70(_6c):_6c;return {builder:_6e.call(acc.builder,_25(_66.attribute),_66.operator),args:acc.args.concat([_6f])};}}},{builder:_2(),args:[]});};function _50(_71,obj){var _72=mx.meta.getEntity(_71);var _73=_72.getAttributes();var _74=_73.reduce(function(acc,_75){var _76=_72.getAttributeType(_75);var _77=_e[_76];if(!_77){return acc;}var _78=_77(obj[_75]);return {attrs:acc.attrs.concat([_75]),values:acc.values.concat([_78])};},{attrs:["guid"],values:[obj.guid]});var _79=_74.attrs.reduce(function(_7a,_7b){return _7a.column(_25(_7b));},_4().into(_25(_71)));return {builder:_79,values:_74.values};};function _f(x){if(x===""){return "";}var _7c=20;var _7d=new _a(x);var _7e=_7c-Math.max(0,_7d.e)-1;var _7f=_7d.s<0?"-":"";var _80=new Array(_7e+1).join("0");var _81=_7d.abs().toFixed();return _7f+_80+_81;};function _10(x){if(x==null){return null;}else{return Number(x);}};function _14(s){return s!=="false";};function _12(x){return x;};function _82(_83){var arr=[];for(var i=0;i<_83.length;++i){arr.push(_83.item(i));}return arr;};function _70(s){var _84=_1.LIKE_ESCAPE_CHAR;return s.replace(new RegExp(_84,"g"),_84+_84).replace(/%/g,_84+"%").replace(/_/g,_84+"_");};function _25(key){return key.replace(".","$");};function _85(_86){return _86.replace("$",".");};function _2f(_87,_88,_89,row){var _8a={guid:row.guid,$objectType:_87.getEntity(),$autocommitted:_88,$readonlyAttrs:[]};for(var _8b in row){var _8c=_85(_8b);if(_8c==="guid"){continue;}var _8d=_87.getAttributeType(_8c);var _8e=_11[_8d];if(!_8e){continue;}_8a[_8c]=_8e(row[_8b]);if(_89){_8a.$readonlyAttrs.push(_8c);}}return _8a;};function _28(sql,_8f){_8f=_8f||[];return new _b(function(tx){return new _9(function(_90,_91){tx.executeSql(sql,_8f,function(tx,res){_91(res);},function(tx,e){_90(e);});});});};});