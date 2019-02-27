/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/Deferred","./kernel ../Deferred ../promise/Promise ../errors/CancelError ../has ./lang ../when".split(" "),function(e,r,z,A,w,h,B){var u=function(){},C=Object.freeze||function(){},t=e.Deferred=function(e){function p(a){if(k)throw Error("This deferred has already been resolved");l=a;k=!0;n()}function n(){for(var a;!a&&f;){var b=f;f=f.next;if(a=b.progress==u)k=!1;var c=m?b.error:b.resolved;w("config-useDeferredInstrumentation")&&m&&r.instrumentRejected&&r.instrumentRejected(l,!!c);
if(c)try{var d=c(l);d&&"function"===typeof d.then?d.then(h.hitch(b.deferred,"resolve"),h.hitch(b.deferred,"reject"),h.hitch(b.deferred,"progress")):(c=a&&void 0===d,a&&!c&&(m=d instanceof Error),b.deferred[c&&m?"reject":"resolve"](c?l:d))}catch(D){b.deferred.reject(D)}else m?b.deferred.reject(l):b.deferred.resolve(l)}}var l,k,x,q,m,v,f,g=this.promise=new z;this.isResolved=g.isResolved=function(){return 0==q};this.isRejected=g.isRejected=function(){return 1==q};this.isFulfilled=g.isFulfilled=function(){return 0<=
q};this.isCanceled=g.isCanceled=function(){return x};this.resolve=this.callback=function(a){this.fired=q=0;this.results=[a,null];p(a)};this.reject=this.errback=function(a){m=!0;this.fired=q=1;w("config-useDeferredInstrumentation")&&r.instrumentRejected&&r.instrumentRejected(a,!!f);p(a);this.results=[null,a]};this.progress=function(a){for(var b=f;b;){var c=b.progress;c&&c(a);b=b.next}};this.addCallbacks=function(a,b){this.then(a,b,u);return this};g.then=this.then=function(a,b,c){var d=c==u?this:new t(g.cancel);
a={resolved:a,error:b,progress:c,deferred:d};f?v=v.next=a:f=v=a;k&&n();return d.promise};var y=this;g.cancel=this.cancel=function(){if(!k){var a=e&&e(y);k||(a instanceof Error||(a=new A(a)),a.log=!1,y.reject(a))}x=!0};C(g)};h.extend(t,{addCallback:function(n){return this.addCallbacks(h.hitch.apply(e,arguments))},addErrback:function(n){return this.addCallbacks(null,h.hitch.apply(e,arguments))},addBoth:function(n){var p=h.hitch.apply(e,arguments);return this.addCallbacks(p,p)},fired:-1});t.when=e.when=
B;return t});
//# sourceMappingURL=Deferred.js.map