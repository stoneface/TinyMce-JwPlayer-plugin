(function(){tinymce.PluginManager.requireLangPack("jwplayer");tinymce.create("tinymce.plugins.JwPlayerPlugin",{init:function(f,b){var j=this,d={},e,g,h,c;j.editor=f;f.addCommand("mceJwPlayer",function(){f.windowManager.open({file:b+"/dialog.htm",width:270+parseInt(f.getLang("jwplayer.delta_width",0)),height:300+parseInt(f.getLang("jwplayer.delta_height",0)),inline:1},{plugin_url:b,some_custom_arg:"custom arg"})});f.addButton("jwplayer",{title:"jwplayer.desc",cmd:"mceJwPlayer",image:b+"/img/jwplayer.gif"});function a(i){return i&&i.nodeName==="IMG"&&f.dom.hasClass(i,"JwpPlayerImg")}f.onPreInit.add(function(){f.schema.addValidElements("script[language|type]");f.parser.addNodeFilter("div",function(k){var l=k.length;while(l--){if(k[l].attr("class")==="JwpPlayerItem"){j.objectToImg(k[l])}}});f.serializer.addNodeFilter("img",function(k,m,l){var n=k.length;while(n--){if(k[n].attr("class")==="JwpPlayerImg mceItem"){j.imgToObject(k[n],l)}}})});f.onInit.add(function(){tinyMCE.activeEditor.dom.loadCSS(b+"/css/jwplayer.css");if(f.theme&&f.theme.onResolveName){f.theme.onResolveName.add(function(i,k){if(k.name==="img.JwpPlayerImg"&&f.dom.hasClass(k.node,"JwpPlayerImg")){k.name="jwplayer"}})}if(f&&f.plugins.contextmenu){f.plugins.contextmenu.onContextMenu.add(function(k,l,i){if(i.nodeName==="IMG"&&i.className.indexOf("JwpPlayerImg")!==-1){l.add({title:"jwplayer.edit",cmd:"mceJwPlayer"})}})}});f.onNodeChange.add(function(k,i,l){i.setActive("jwplayer",a(l))})},createControl:function(b,a){return null},getInfo:function(){return{longname:"JwPlayer plugin",author:"ssm2017 Binder",authorurl:"http://ssm2017.com",infourl:"https://github.com/ssm2017/TinyMce-JwPlayer-plugin",version:"1.0"}},objectToImg:function(b){if(!b.parent){return}var a=new tinymce.html.Node("img",1);a.attr({src:this.editor.theme.url+"/img/trans.gif"});if(b.firstChild.name.toLowerCase()==="input"){var c=tinymce.util.JSON.parse(b.firstChild.attr("value"));a.attr({id:b.attr("id"),"class":"JwpPlayerImg mceItem",width:c.width,height:c.height,hspace:b.attr("hspace"),vspace:b.attr("vspace"),align:b.attr("align"),bgcolor:b.attr("bgcolor"),"data-mce-json":b.firstChild.attr("value")});b.empty();b.replace(a)}},imgToObject:function(e,i){var g=e.attr("data-mce-json");if(!g){return}g=tinymce.util.JSON.parse(g);var k=new tinymce.html.Node("div",1);k.attr({"class":"JwpPlayerItem"});var j=new tinymce.html.Node("input",1);j.attr({type:"hidden",value:e.attr("data-mce-json")});k.append(j);var c=new tinymce.html.Node("div",1);c.attr({id:"mediaspace_"+g.id});var f=new tinymce.html.Node("p",1);var h=new tinymce.html.Node("#text",3);h.value="Media not computed.";f.append(h);c.append(f);k.append(c);var a=new tinymce.html.Node("script",1);a.attr({type:"text/javascript"});var b=tinyMCE.baseURI.source;var m=b.substring(0,(b.length-26))+"/jwplayer";var d="'file': '"+g.file+"',";if(g.playlistfile!=""){d="'playlistfile': '"+g.playlistfile+"',";d+="'playlist.position': '"+g.playlist+"',";d+="'playlist.size': '"+g.playlistsize+"',"}var l=new tinymce.html.Node("#text",3);l.value="jwplayer('mediaspace_"+g.id+"').setup({    'flashplayer': '"+m+"/player.swf',    'controlbar': '"+g.controlbar+"',"+d+"    'image': '"+g.imagefile+"',    'stretching': '"+g.stretching+"',    'width': '"+g.width+"',    'height': '"+g.height+"'  });";a.append(l);k.append(a);e.replace(k)}});tinymce.PluginManager.add("jwplayer",tinymce.plugins.JwPlayerPlugin)})();