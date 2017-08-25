//>>built
define("dojox/date/umalqura/locale","dojox/main dojo/_base/lang dojo/_base/array dojo/date dojo/i18n dojo/regexp dojo/string ./Date dojo/i18n!dojo/cldr/nls/islamic".split(" "),function(t,m,n,u,l,v,p,w,z){function x(d,e,a,g,f){return f.replace(/([a-z])\1*/ig,function(b){var c,a,k=b.charAt(0);b=b.length;var g=["abbr","wide","narrow"];switch(k){case "G":c=e.eraAbbr[0];break;case "y":c=String(d.getFullYear());break;case "M":c=d.getMonth();3>b?(c+=1,a=!0):(k=["months-format",g[b-3]].join("-"),c=e[k][c]);
break;case "d":c=d.getDate(!0);a=!0;break;case "E":c=d.getDay();3>b?(c+=1,a=!0):(k=["days-format",g[b-3]].join("-"),c=e[k][c]);break;case "a":c=12>d.getHours()?"am":"pm";c=e["dayPeriods-format-wide-"+c];break;case "h":case "H":case "K":case "k":a=d.getHours();switch(k){case "h":c=a%12||12;break;case "H":c=a;break;case "K":c=a%12;break;case "k":c=a||24}a=!0;break;case "m":c=d.getMinutes();a=!0;break;case "s":c=d.getSeconds();a=!0;break;case "S":c=Math.round(d.getMilliseconds()*Math.pow(10,b-3));a=
!0;break;case "z":if(c=u.getTimezoneName(d.toGregorian()))break;b=4;case "Z":c=d.toGregorian().getTimezoneOffset();c=[0>=c?"+":"-",p.pad(Math.floor(Math.abs(c)/60),2),p.pad(Math.abs(c)%60,2)];4==b&&(c.splice(0,0,"GMT"),c.splice(3,0,":"));c=c.join("");break;default:throw Error("dojox.date.umalqura.locale.formatPattern: invalid pattern char: "+f);}a&&(c=p.pad(c,b));return c})}function q(d,e,a,g){var f=function(b){return b};e=e||f;a=a||f;g=g||f;var b=d.match(/(''|[^'])+/g),c="'"==d.charAt(0);n.forEach(b,
function(d,k){d?(b[k]=(c?a:e)(d),c=!c):b[k]=""});return g(b.join(""))}function y(d,e,a,g){g=v.escapeString(g);l.normalizeLocale(a.locale);return g.replace(/([a-z])\1*/ig,function(g){var b;b=g.charAt(0);var c=g.length,f="";a.strict?1<c&&(f="0{"+(c-1)+"}"):f="0?";switch(b){case "y":b="\\d+";break;case "M":b=2<c?"\\S+ ?\\S+":f+"[1-9]|1[0-2]";break;case "d":b="[12]\\d|"+f+"[1-9]|3[01]";break;case "E":b="\\S+";break;case "h":b=f+"[1-9]|1[0-2]";break;case "k":b=f+"\\d|1[01]";break;case "H":b=f+"\\d|1\\d|2[0-3]";
break;case "K":b=f+"[1-9]|1\\d|2[0-4]";break;case "m":case "s":b=f+"\\d|[0-5]\\d";break;case "S":b="\\d{"+c+"}";break;case "a":c=a.am||e["dayPeriods-format-wide-am"];f=a.pm||e["dayPeriods-format-wide-pm"];a.strict?b=c+"|"+f:(b=c+"|"+f,c!=c.toLowerCase()&&(b+="|"+c.toLowerCase()),f!=f.toLowerCase()&&(b+="|"+f.toLowerCase()));break;default:b=".*"}d&&d.push(g);return"("+b+")"}).replace(/[\xa0 ]/g,"[\\s\\xa0]")}var h=m.getObject("date.umalqura.locale",!0,t);h.format=function(d,e){e=e||{};var a=l.normalizeLocale(e.locale),
g=e.formatLength||"short",f=h._getIslamicBundle(a),b=[],a=m.hitch(this,x,d,f,a,e.fullYear);if("year"==e.selector)return d.getFullYear();if("time"!=e.selector){var c=e.datePattern||f["dateFormat-"+g];c&&b.push(q(c,a))}"date"!=e.selector&&(g=e.timePattern||f["timeFormat-"+g])&&b.push(q(g,a));return b.join(" ")};h.regexp=function(d){return h._parseInfo(d).regexp};h._parseInfo=function(d){d=d||{};var e=l.normalizeLocale(d.locale),e=h._getIslamicBundle(e),a=d.formatLength||"short",g=d.datePattern||e["dateFormat-"+
a],a=d.timePattern||e["timeFormat-"+a],f=[];return{regexp:q("date"==d.selector?g:"time"==d.selector?a:"undefined"==typeof a?g:g+" "+a,m.hitch(this,y,f,e,d)),tokens:f,bundle:e}};h.parse=function(d,e){d=d.replace(/[\u200E\u200F\u202A\u202E]/g,"");e||(e={});var a=h._parseInfo(e),g=a.tokens,f=a.bundle,a=a.regexp.replace(/[\u200E\u200F\u202A\u202E]/g,""),a=(new RegExp("^"+a+"$")).exec(d);l.normalizeLocale(e.locale);if(!a)return null;var b=[1389,9,22,0,0,0,0],c="",m=["abbr","wide","narrow"];n.every(a,function(a,
d){if(!d)return!0;var h=g[d-1],k=h.length;switch(h.charAt(0)){case "y":b[0]=Number(a);break;case "M":if(2<k){if(h=f["months-format-"+m[k-3]].concat(),e.strict||(a=a.replace(".","").toLowerCase(),h=n.map(h,function(a){return a?a.replace(".","").toLowerCase():a})),a=n.indexOf(h,a),-1==a)return!1}else a--;b[1]=Number(a);break;case "D":b[1]=0;case "d":b[2]=Number(a);break;case "a":h=e.am||f["dayPeriods-format-wide-am"];k=e.pm||f["dayPeriods-format-wide-pm"];if(!e.strict){var l=/\./g;a=a.replace(l,"").toLowerCase();
h=h.replace(l,"").toLowerCase();k=k.replace(l,"").toLowerCase()}if(e.strict&&a!=h&&a!=k)return!1;c=a==k?"p":a==h?"a":"";break;case "K":24==a&&(a=0);case "h":case "H":case "k":b[3]=Number(a);break;case "m":b[4]=Number(a);break;case "s":b[5]=Number(a);break;case "S":b[6]=Number(a)}return!0});a=+b[3];"p"===c&&12>a?b[3]=a+12:"a"===c&&12==a&&(b[3]=0);return new w(b[0],b[1],b[2],b[3],b[4],b[5],b[6])};var r=[];h.addCustomFormats=function(d,e){r.push({pkg:d,name:e})};h._getIslamicBundle=function(d){var e=
{};n.forEach(r,function(a){a=l.getLocalization(a.pkg,a.name,d);e=m.mixin(e,a)},this);return e};h.addCustomFormats("dojo.cldr","islamic");h.getNames=function(d,e,a,g,f){var b;g=h._getIslamicBundle(g);d=[d,a,e];"standAlone"==a&&(a=d.join("-"),b=g[a],1==b[0]&&(b=void 0));d[1]="format";return(b||g[d.join("-")]).concat()};h.weekDays=h.getNames("days","wide","format");h.months=h.getNames("months","wide","format");return h});
