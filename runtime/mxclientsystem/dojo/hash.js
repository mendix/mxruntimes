/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/hash","./_base/kernel require ./_base/config ./aspect ./_base/lang ./topic ./domReady ./sniff".split(" "),function(d,y,n,z,h,A,B,k){function u(a,c){var b=a.indexOf(c);return 0<=b?a.substring(b+1):""}function e(){return u(location.href,"#")}function p(){A.publish("/dojo/hashchange",e())}function l(){e()!==b&&(b=e(),p())}function w(a){if(f)if(f.isTransitioning())setTimeout(h.hitch(null,w,a),q);else{var c=f.iframe.location.href,b=c.indexOf("?");f.iframe.location.replace(c.substring(0,b)+
"?"+a)}else c=location.href.replace(/#.*/,""),location.replace(c+"#"+a),!x&&l()}function C(){function a(){b=e();k=g?b:u(v.href,"?");r=!1;t=null}var c=document.createElement("iframe"),f=n.dojoBlankHtmlUrl||y.toUrl("./resources/blank.html");n.useXDomain&&!n.dojoBlankHtmlUrl&&console.warn("dojo/hash: When using cross-domain Dojo builds, please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl to the path on your domain to blank.html");c.id="dojo-hash-iframe";c.src=f+"?"+
e();c.style.display="none";document.body.appendChild(c);this.iframe=d.global["dojo-hash-iframe"];var k,r,t,l,g,v=this.iframe.location;this.isTransitioning=function(){return r};this.pollLocation=function(){if(!g)try{var d=u(v.href,"?");document.title!=l&&(l=this.iframe.document.title=document.title)}catch(D){g=!0,console.error("dojo/hash: Error adding history entry. Server unreachable.")}var m=e();if(r&&b===m)if(g||d===t)a(),p();else{setTimeout(h.hitch(this,this.pollLocation),0);return}else if(b!==
m||!g&&k!==d){if(b!==m){b=m;r=!0;t=m;c.src=f+"?"+t;g=!1;setTimeout(h.hitch(this,this.pollLocation),0);return}g||(location.href="#"+v.search.substring(1),a(),p())}setTimeout(h.hitch(this,this.pollLocation),q)};a();setTimeout(h.hitch(this,this.pollLocation),q)}d.hash=function(a,b){if(!arguments.length)return e();"#"==a.charAt(0)&&(a=a.substring(1));b?w(a):location.hash="#"+a;return a};var b,f,x,q=n.hashPollFrequency||100;B(function(){"onhashchange"in d.global&&(!k("ie")||8<=k("ie")&&"BackCompat"!=document.compatMode)?
x=z.after(d.global,"onhashchange",p,!0):document.addEventListener?(b=e(),setInterval(l,q)):document.attachEvent&&(f=new C)});return d.hash});
