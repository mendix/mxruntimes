//>>built
define("dijit/DialogUnderlay","dojo/_base/declare dojo/_base/lang dojo/aspect dojo/dom-attr dojo/dom-style dojo/on dojo/window ./_Widget ./_TemplatedMixin ./BackgroundIframe ./Viewport ./main".split(" "),function(g,d,r,h,k,e,f,l,m,n,p,q){var c=g("dijit.DialogUnderlay",[l,m],{templateString:"\x3cdiv class\x3d'dijitDialogUnderlayWrapper'\x3e\x3cdiv class\x3d'dijitDialogUnderlay' tabIndex\x3d'-1' data-dojo-attach-point\x3d'node'\x3e\x3c/div\x3e\x3c/div\x3e",dialogId:"","class":"",_modalConnects:[],_setDialogIdAttr:function(a){h.set(this.node,
"id",a+"_underlay");this._set("dialogId",a)},_setClassAttr:function(a){this.node.className="dijitDialogUnderlay "+a;this._set("class",a)},postCreate:function(){this.ownerDocumentBody.appendChild(this.domNode);this.own(e(this.domNode,"keydown",d.hitch(this,"_onKeyDown")));this.inherited(arguments)},layout:function(){var a=this.node.style,c=this.domNode.style;c.display="none";var b=f.getBox(this.ownerDocument);c.top=b.t+"px";c.left=b.l+"px";a.width=b.w+"px";a.height=b.h+"px";c.display="block"},show:function(){this.domNode.style.display=
"block";this.open=!0;this.layout();this.bgIframe=new n(this.domNode);var a=f.get(this.ownerDocument);this._modalConnects=[p.on("resize",d.hitch(this,"layout")),e(a,"scroll",d.hitch(this,"layout"))]},hide:function(){this.bgIframe.destroy();delete this.bgIframe;for(this.domNode.style.display="none";this._modalConnects.length;)this._modalConnects.pop().remove();this.open=!1},destroy:function(){for(;this._modalConnects.length;)this._modalConnects.pop().remove();this.inherited(arguments)},_onKeyDown:function(){}});
c.show=function(a,d){var b=c._singleton;!b||b._destroyed?b=q._underlay=c._singleton=new c(a):a&&b.set(a);k.set(b.domNode,"zIndex",d);b.open||b.show()};c.hide=function(){var a=c._singleton;a&&!a._destroyed&&a.hide()};return c});
