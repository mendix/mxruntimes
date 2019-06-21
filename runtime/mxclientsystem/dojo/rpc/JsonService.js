/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/rpc/JsonService","../_base/declare ../_base/Deferred ../_base/json ../_base/lang ../_base/xhr ./RpcService".split(" "),function(d,e,f,g,h,k){return d("dojo.rpc.JsonService",k,{bustCache:!1,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(a,c){var b=new e;this.bind(a,c,b);return b},bind:function(a,c,b,d){h.post({url:d||this.serviceUrl,postData:this.createRequest(a,c),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"}).addCallbacks(this.resultCallback(b),
this.errorCallback(b))},createRequest:function(a,c){var b={params:c,method:a,id:++this.lastSubmissionId};return f.toJson(b)},parseResults:function(a){if(g.isObject(a)){if("result"in a)return a.result;if("Result"in a)return a.Result;if("ResultSet"in a)return a.ResultSet}return a}})});
