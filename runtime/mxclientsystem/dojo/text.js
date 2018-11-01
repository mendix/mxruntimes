/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/text",["./_base/kernel","require","./has","./request"],function(r,t,v,u){var k;k=function(a,c,b){u(a,{sync:!!c,headers:{"X-Requested-With":null}}).then(b)};var e={},l=function(a){if(a){a=a.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");var c=a.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);c&&(a=c[1])}else a="";return a},p={},h={};r.cache=function(a,c,b){var d;"string"==typeof a?/\//.test(a)?(d=a,b=c):d=t.toUrl(a.replace(/\./g,"/")+(c?"/"+c:"")):(d=a+"",b=c);a=
void 0!=b&&"string"!=typeof b?b.value:b;b=b&&b.sanitize;if("string"==typeof a)return e[d]=a,b?l(a):a;if(null===a)return delete e[d],null;d in e||k(d,!0,function(a){e[d]=a});return b?l(e[d]):e[d]};return{dynamic:!0,normalize:function(a,c){var b=a.split("!"),d=b[0];return(/^\./.test(d)?c(d):d)+(b[1]?"!"+b[1]:"")},load:function(a,c,b){a=a.split("!");var d=1<a.length,m=a[0],f=c.toUrl(a[0]);a="url:"+f;var g=p,n=function(a){b(d?l(a):a)};m in e?g=e[m]:c.cache&&a in c.cache?g=c.cache[a]:f in e&&(g=e[f]);
if(g===p)if(h[f])h[f].push(n);else{var q=h[f]=[n];k(f,!c.async,function(a){e[m]=e[f]=a;for(var b=0;b<q.length;)q[b++](a);delete h[f]})}else n(g)}}});
