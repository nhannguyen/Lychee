album={json:null,getID:function(){var e;if(photo.json)e=photo.json.album;else if(album.json)e=album.json.id;else e=$(".album:hover, .album.active").attr("data-id");if(!e)e=$(".photo:hover, .photo.active").attr("data-album-id");if(e)return e;else return false},load:function(e,t){var n,r,i,s,o="";password.get(e,function(){if(!t){loadingBar.show();lychee.animate(".album, .photo","contentZoomOut");lychee.animate(".divider","fadeOut")}n=(new Date).getTime();r="getAlbum&albumID="+e+"&password="+password.value;lychee.api(r,"json",function(r){if(r=="HTTP/1.1 403 Album private!"){lychee.setMode("view");return false}if(r=="HTTP/1.1 403 Wrong password!"){album.load(e,t);return false}album.json=r;i=(new Date).getTime()-n;if(i>300)s=0;else if(t)s=0;else s=300-i;if(!visible.albums()&&!visible.photo()&&!visible.album())s=0;setTimeout(function(){view.album.init();if(!t){lychee.animate(".album, .photo","contentZoomIn");view.header.mode("album")}},s)})})},parse:function(e){if(e&&e.thumbUrl)e.thumbUrl=lychee.upload_path_thumb+e.thumbUrl;else if(!album.json.title)album.json.title="Untitled"},add:function(){var e=prompt("Please enter a title for this album:","Untitled"),t;if(e.length>0&&e.length<31){modal.close();t="addAlbum&title="+escape(encodeURI(e));lychee.api(t,"text",function(e){if(e)lychee.goto("a"+e);else loadingBar.show("error")})}else if(e.length>0)loadingBar.show("error","Error","Title to short or too long. Please try another one!")},"delete":function(e){var t,n,r;n=[["Delete Album and Photos",function(){t="deleteAlbum&albumID="+e+"&delAll=true";lychee.api(t,"text",function(t){if(visible.albums())view.albums.content.delete(e);else lychee.goto("");if(!t)loadingBar.show("error")})}],["Keep Album",function(){}]];if(e==0){n[0][0]="Clear Unsorted";modal.show("Clear Unsorted","Are you sure you want to delete all photos from 'Unsorted'?<br>This action can't be undone!",n)}else{if(album.json)r=album.json.title;else if(albums.json)r=albums.json.content[e].title;modal.show("Delete Album","Are you sure you want to delete the album '"+r+"' and all of the photos it contains? This action can't be undone!",n)}},setTitle:function(e){var t="",n,r;if(!e)e=album.getID();if(album.json)t=album.json.title;else if(albums.json)t=albums.json.content[e].title;n=prompt("Please enter a new title for this album:",t);if(e!=""&&e!=null&&e&&n.length>0&&n.length<31){if(visible.album()){album.json.title=n;view.album.title()}else if(visible.albums()){albums.json.content[e].title=n;view.albums.content.title(e)}r="setAlbumTitle&albumID="+e+"&title="+escape(encodeURI(n));lychee.api(r,"text",function(e){if(!e)loadingBar.show("error")})}else if(n.length>0)loadingBar.show("error","Error","New title to short or too long. Please try another one!")},setPublic:function(e,t){var n;if($("input.password").length>0&&$("input.password").val().length>0){n="setAlbumPublic&albumID="+e+"&password="+hex_md5($("input.password").val());album.json.password=true}else{n="setAlbumPublic&albumID="+e;album.json.password=false}if(visible.album()){album.json.public=album.json.public==0?1:0;view.album.public();if(album.json.public==1)contextMenu.shareAlbum(e,t)}lychee.api(n,"text",function(e){if(!e)loadingBar.show("error")})},share:function(e){var t="",n=location.href;switch(e){case 0:t="https://twitter.com/share?url="+encodeURI(n);break;case 1:t="http://www.facebook.com/sharer.php?u="+encodeURI(n)+"&t="+encodeURI(album.json.title);break;case 2:t="mailto:?subject="+encodeURI(album.json.title)+"&body="+encodeURI("Hi! Check this out: "+n);break;default:t="";break}if(t.length>5)location.href=t},getArchive:function(e){var t;if(location.href.indexOf("index.html")>0)t=location.href.replace(location.hash,"").replace("index.html","php/api.php?function=getAlbumArchive&albumID="+e);else t=location.href.replace(location.hash,"")+"php/api.php?function=getAlbumArchive&albumID="+e;location.href=t}};albums={json:null,load:function(){var e,t,n,r,i,s="",o="";lychee.animate(".album, .photo","contentZoomOut");lychee.animate(".divider","fadeOut");e=(new Date).getTime();lychee.api("getAlbums","json",function(n){n.unsortedAlbum={id:0,title:"Unsorted",sysdate:n.unsortedNum+" photos",unsorted:1,thumb0:n.unsortedThumb0,thumb1:n.unsortedThumb1,thumb2:n.unsortedThumb2};n.starredAlbum={id:"f",title:"Starred",sysdate:n.starredNum+" photos",star:1,thumb0:n.starredThumb0,thumb1:n.starredThumb1,thumb2:n.starredThumb2};n.publicAlbum={id:"s",title:"Public",sysdate:n.publicNum+" photos","public":1,thumb0:n.publicThumb0,thumb1:n.publicThumb1,thumb2:n.publicThumb2};albums.json=n;t=(new Date).getTime()-e;if(t>300)waitTime=0;else waitTime=300-t;if(!visible.albums()&&!visible.photo()&&!visible.album())waitTime=0;setTimeout(function(){view.header.mode("albums");view.albums.init();lychee.animate(".album, .photo","contentZoomIn")},waitTime)})},parse:function(e){if(e.password&&lychee.publicMode){e.thumb0="img/password.png";e.thumb1="img/password.png";e.thumb2="img/password.png"}else{if(e.thumb0)e.thumb0=lychee.upload_path_thumb+e.thumb0;else e.thumb0="img/no_images.png";if(e.thumb1)e.thumb1=lychee.upload_path_thumb+e.thumb1;else e.thumb1="img/no_images.png";if(e.thumb2)e.thumb2=lychee.upload_path_thumb+e.thumb2;else e.thumb2="img/no_images.png"}}};build={divider:function(e){return"<div class='divider fadeIn'><h1>"+e+"</h1></div>"},album:function(e){if(!e)return"";var t="";title=e.title;if(title.length>18)title=e.title.substr(0,18)+"...";t+="<div  class='album' data-id='"+e.id+"' data-password='"+e.password+"'>";t+="<img src='"+e.thumb2+"' width='200' height='200' alt='thumb'>";t+="<img src='"+e.thumb1+"' width='200' height='200' alt='thumb'>";t+="<img src='"+e.thumb0+"' width='200' height='200' alt='thumb'>";t+="<div class='overlay'>";if(e.password&&!lychee.publicMode)t+="<h1><span class='icon-lock'></span> "+title+"</h1>";else t+="<h1>"+title+"</h1>";t+="<a>"+e.sysdate+"</a>";t+="</div>";if(!lychee.publicMode&&e.star==1)t+="<a class='badge red icon-star'></a>";if(!lychee.publicMode&&e.public==1)t+="<a class='badge red icon-share'></a>";if(!lychee.publicMode&&e.unsorted==1)t+="<a class='badge red icon-reorder'></a>";t+="</div>";return t},photo:function(e){if(!e)return"";var t="",n=e.title;if(n.length>18)n=e.title.substr(0,18)+"...";t+="<div class='photo' data-album-id='"+e.album+"' data-id='"+e.id+"'>";t+="<img src='"+e.thumbUrl+"' width='200' height='200' alt='thumb'>";t+="<div class='overlay'>";t+="<h1>"+n+"</h1>";t+="<a>"+e.sysdate+"</a>";t+="</div>";if(e.star==1)t+="<a class='badge red icon-star'></a>";if(!lychee.publicMode&&e.public==1&&album.json.public!=1)t+="<a class='badge red icon-share'></a>";t+="</div>";return t},no_content:function(e){var t="";t+="<div class='no_content fadeIn'>";t+="<a class='icon icon-"+e+"'></a>";if(e=="search")t+="<p>No results</p>";else if(e=="picture")t+="<p>No public albums</p>";t+="</div>";return t},modal:function(e,t,n){var r="";r+="<div class='message_overlay fadeIn'>";r+="<div class='message center'>";r+="<h1>"+e+"</h1>";r+="<a class='close icon-remove-sign'></a>";r+="<p>"+t+"</p>";$.each(n,function(e){if(this[0]!=""){if(e==0)r+="<a class='button active'>"+this[0]+"</a>";else r+="<a class='button'>"+this[0]+"</a>"}});r+="</div>";r+="</div>";return r},addModal:function(){var e="";e+="<div class='message_overlay fadeIn'>";e+="<div class='message center add'>";e+="<h1>Add Album or Photo</h1>";e+="<a class='close icon-remove-sign'></a>";e+="<div id='add_album' class='add_album'>";e+="<div class='icon icon-folder-close'></div>";e+="<a>New Album</a>";e+="</div>";e+="<div id='add_link' class='add_album'>";e+="<div class='icon icon-link'></div>";e+="<a>Import Link</a>";e+="</div>";e+="<div id='add_photo' class='add_album'>";e+="<div class='icon icon-picture'></div>";e+="<a>Upload Photo</a>";e+="</div>";e+="</div>";e+="</div>";return e},signInModal:function(){var e="";e+="<div class='message_overlay'>";e+="<div class='message center'>";e+="<h1><a class='icon-lock'></a> Sign In</h1>";e+="<div class='sign_in'>";e+="<input id='username' type='text' name='' value='' placeholder='username'>";e+="<input id='password' type='password' name='' value='' placeholder='password'>";e+="</div>";e+="<div id='version'>Version "+lychee.version+"<span> &#8211; <a target='_blank' href='"+lychee.updateURL+"'>Update available!</a><span></div>";e+="<a onclick='lychee.login()' class='button active'>Sign in</a>";e+="</div>";e+="</div>";return e},uploadModal:function(){var e="";e+="<div class='upload_overlay fadeIn'>";e+="<div class='upload_message center'>";e+="<a class='icon-upload'></a>";e+="<div class='progressbar'><div></div></div>";e+="</div>";e+="</div>";return e},contextMenu:function(e){var t="";t+="<div class='contextmenu_bg'></div>";t+="<div class='contextmenu'>";t+="<table>";t+="<tbody>";$.each(e,function(n){if(e[n][0]=="separator"&&e[n][1]==-1)t+="<tr class='separator'></tr>";else if(e[n][1]==-1)t+="<tr class='no_hover'><td>"+e[n][0]+"</td></tr>";else if(e[n][2]!=undefined)t+="<tr><td onclick='"+e[n][2]+"; window.contextMenu.close();'>"+e[n][0]+"</td></tr>";else t+="<tr><td onclick='window.contextMenu.fns["+e[n][1]+"](); window.contextMenu.close();'>"+e[n][0]+"</td></tr>"});t+="</tbody>";t+="</table>";t+="</div>";return t},infobox:function(e,t){if(!e)return"";var n="",r,i,s,o;n+="<div class='header'><h1>About</h1><a class='icon-remove-sign'></a></div>";n+="<div class='wrapper'>";switch(e.public){case"0":r="Private";break;case"1":r="Public";break;case"2":r="Public (Album)";break;default:r="-";break}i=t==true||lychee.publicMode?"":" <div id='edit_title'><a class='icon-pencil'></a></div>";s=t==true||lychee.publicMode?"":" <div id='edit_description'><a class='icon-pencil'></a></div>";o=[["","Basics"],["Name",e.title+i],["Uploaded",e.sysdate],["Description",e.description+s],["","Image"],["Size",e.size],["Format",e.type],["Resolution",e.width+" x "+e.height],["","Camera"],["Captured",e.takedate],["Make",e.make],["Type/Model",e.model],["Shutter Speed",e.shutter],["Aperture",e.aperture],["Focal Length",e.focal],["ISO",e.iso],["","Share"],["Visibility",r]];$.each(o,function(e){if(o[e][1]==""||o[e][1]==undefined||o[e][1]==null)o[e][1]="-";if(o[e][0]==""){n+="</table>";n+="<div class='separater'><h1>"+o[e][1]+"</h1></div>";n+="<table id='infos'>"}else{n+="<tr>";n+="<td>"+o[e][0]+"</td>";n+="<td class='attr_"+o[e][0].toLowerCase()+"'>"+o[e][1]+"</td>";n+="</tr>"}});n+="</table>";n+="<div class='bumper'></div>";n+="</div>";return n}};contextMenu={fns:null,album:function(e){e.preventDefault();var t=e.pageX,n=e.pageY,r=album.getID(),i;if(r=="0"||r=="f"||r=="s")return false;n-=$(document).scrollTop();contextMenu.fns=[function(){album.setTitle(r)},function(){album.delete(r)}];i=[["<a class='icon-edit'></a> Rename",0],["<a class='icon-trash'></a> Delete",1]];contextMenu.close();$(".album[data-id='"+r+"']").addClass("active");$("body").css("overflow","hidden").append(build.contextMenu(i));$(".contextmenu").css({top:n,left:t})},photo:function(e){e.preventDefault();var t=e.pageX,n=e.pageY,r=photo.getID(),i;n-=$(document).scrollTop();contextMenu.fns=[function(){photo.setStar(r)},function(){photo.setTitle(r)},function(){contextMenu.move(r,e)},function(){photo.delete(r)}];i=[["<a class='icon-star'></a> Star",0],["separator",-1],["<a class='icon-edit'></a> Rename",1],["<a class='icon-folder-open'></a> Move",2],["<a class='icon-trash'></a> Delete",3]];contextMenu.close();$(".photo[data-id='"+r+"']").addClass("active");$("body").css("overflow","hidden").append(build.contextMenu(i));$(".contextmenu").css({top:n,left:t})},move:function(e,t){var n=t.pageX,r=t.pageY,i=[],s;contextMenu.fns=[];r-=$(document).scrollTop();if(!n||!r){n="10px";r="10px"}if(album.getID()!=0){i=[["Unsorted",0,"photo.setAlbum(0, "+e+")"],["separator",-1]]}lychee.api("getAlbums","json",function(t){if(!t.albums){i=[["New Album",0,"album.add()"]]}else{$.each(t.content,function(t){if(this.id!=album.getID())i.push([this.title,0,"photo.setAlbum("+this.id+", "+e+")"])})}contextMenu.close();$(".photo[data-id='"+e+"']").addClass("active");$("body").css("overflow","hidden").append(build.contextMenu(i));if(!visible.photo())n+=$(".contextmenu").width();$(".contextmenu").css({top:r,left:n-$(".contextmenu").width()})})},sharePhoto:function(e,t){var n=t.pageX,r=t.pageY,i;r-=$(document).scrollTop();if(!n||!r){n="10px";r="10px"}contextMenu.fns=[function(){photo.setPublic(e)},function(){photo.share(e,0)},function(){photo.share(e,1)},function(){photo.share(e,2)},function(){photo.share(e,3)}];if(document.location.hostname!="localhost"){i=[["<input readonly id='link' value='"+photo.getViewLink(e)+"'>",-1],["separator",-1],["<a class='icon-eye-close'></a> Make Private",0],["separator",-1],["<a class='icon-twitter'></a> Twitter",1],["<a class='icon-facebook'></a> Facebook",2],["<a class='icon-envelope'></a> Mail",3],["<a class='icon-hdd'></a> Dropbox",4]]}else{i=[["<input readonly id='link' value='"+photo.getViewLink(e)+"'>",-1],["separator",-1],["<a class='icon-eye-close'></a> Make Private",0],["separator",-1],["<a class='icon-envelope'></a> Mail",3]]}contextMenu.close();$("body").css("overflow","hidden").append(build.contextMenu(i));$(".contextmenu").css({top:r,left:n+20-$(".contextmenu").width()});$(".contextmenu input").focus()},shareAlbum:function(e,t){var n=t.pageX,r=t.pageY,i;r-=$(document).scrollTop();if(!n||!r){n="10px";r="10px"}contextMenu.fns=[function(){album.setPublic(e)},function(){password.set(e)},function(){album.share(0)},function(){album.share(1)},function(){album.share(2)},function(){password.remove(e)}];if(document.location.hostname!="localhost"){i=[["<input readonly id='link' value='"+location.href+"'>",-1],["separator",-1],["<a class='icon-eye-close'></a> Make Private",0],["<a class='icon-lock'></a> Set Password",1],["separator",-1],["<a class='icon-twitter'></a> Twitter",2],["<a class='icon-facebook'></a> Facebook",3],["<a class='icon-envelope'></a> Mail",4]]}else{i=[["<input readonly id='link' value='"+location.href+"'>",-1],["separator",-1],["<a class='icon-eye-close'></a> Make Private",0],["<a class='icon-lock'></a> Set Password",1],["separator",-1],["<a class='icon-envelope'></a> Mail",4]]}if(album.json.password==true)i[3]=["<a class='icon-unlock'></a> Remove Password",5];contextMenu.close();$("body").css("overflow","hidden").append(build.contextMenu(i));$(".contextmenu").css({top:r,left:n+20-$(".contextmenu").width()});$(".contextmenu input").focus()},close:function(){contextMenu.js=null;$(".contextmenu_bg, .contextmenu").remove();$(".photo.active, .album.active").removeClass("active");$("body").css("overflow","scroll")}};loadingBar={status:null,show:function(e,t,n){if(e=="error"){loadingBar.status="error";if(!t)t="Error";if(!n)n="Whoops, it looks like something went wrong. Please reload the site and try again!";lychee.loadingBar.removeClass("loading uploading error").addClass(e).html("<h1>"+t+": <span>"+n+"</span></h1>").show().css("height","40px");if(visible.controls())lychee.header.css("margin-Top","40px");clearTimeout(lychee.loadingBar.data("timeout"));lychee.loadingBar.data("timeout",setTimeout(function(){loadingBar.hide(true)},3e3))}else if(loadingBar.status==null){loadingBar.status="loading";clearTimeout(lychee.loadingBar.data("timeout"));lychee.loadingBar.data("timeout",setTimeout(function(){lychee.loadingBar.show().removeClass("loading uploading error").addClass("loading");if(visible.controls())lychee.header.css("margin-Top","3px")},1e3))}},hide:function(e){if(loadingBar.status!="error"&&loadingBar.status!=null||e){loadingBar.status=null;clearTimeout(lychee.loadingBar.data("timeout"));lychee.loadingBar.html("").css("height","3px");if(visible.controls())lychee.header.css("marginTop","0px");setTimeout(function(){lychee.loadingBar.hide()},300)}}};var lychee={init:function(){this.version="1.3.2";this.api_path="php/api.php";this.update_path="http://lychee.electerious.com/version/index.php";this.updateURL="https://github.com/electerious/Lychee";this.upload_path_thumb="uploads/thumb/";this.upload_path_big="uploads/big/";this.publicMode=false;this.viewMode=false;this.checkForUpdates=false;this.dropbox=false;this.loadingBar=$("#loading");this.header=$("header");this.content=$("#content");this.imageview=$("#imageview");this.infobox=$("#infobox")},run:function(){lychee.api("init","json",function(e){lychee.checkForUpdates=e.config.checkForUpdates;if(!e.loggedIn)lychee.setMode("public");$(window).bind("popstate",lychee.load);lychee.load()})},api:function(e,t,n,r){if(r==undefined)loadingBar.show();$.ajax({type:"POST",url:lychee.api_path,data:"function="+e,dataType:t,success:function(e){setTimeout(function(){loadingBar.hide()},100);n(e)},error:lychee.error})},login:function(){var e=$("input#username").val(),t=hex_md5($("input#password").val()),n;n="login&user="+e+"&password="+t;lychee.api(n,"text",function(t){if(t){localStorage.setItem("username",e);window.location.reload()}else{$("#password").val("").addClass("error");$(".message .button.active").removeClass("pressed")}})},loginDialog:function(){$("body").append(build.signInModal());$("#username").focus();if(localStorage){local_username=localStorage.getItem("username");if(local_username!=null){if(local_username.length>0)$("#username").val(local_username);$("#password").focus()}}if(lychee.checkForUpdates)lychee.getUpdate()},logout:function(){lychee.api("logout","text",function(e){window.location.reload()})},"goto":function(e){if(e==undefined)e="";document.location.hash=e},load:function(){var e="",t="",n=document.location.hash.replace("#","");contextMenu.close();if(n.indexOf("a")!=-1)e=n.split("p")[0].replace("a","");if(n.indexOf("p")!=-1)t=n.split("p")[1];if(e&&t){albums.json=null;photo.json=null;if(lychee.content.html()==""||$("#search").length&&$("#search").val().length!=0){lychee.content.hide();album.load(e,true)}if(!visible.photo())view.photo.show();photo.load(t,e)}else if(e){albums.json=null;photo.json=null;if(visible.photo())view.photo.hide();if(album.json&&e==album.json.id)view.album.title();else album.load(e)}else{albums.json=null;album.json=null;photo.json=null;search.code="";if(visible.photo())view.photo.hide();albums.load()}},getUpdate:function(){$.ajax({url:lychee.update_path,success:function(e){if(e!=lychee.version)$("#version span").show()}})},setTitle:function(e,t,n){if(e=="Albums")document.title="Photos";else document.title="Photos - "+e;if(t)e+="<span> - "+t+" photos</span>";if(n)$("#title").addClass("editable");else $("#title").removeClass("editable");$("#title").html(e)},setMode:function(e){$("#button_signout, #search, #button_trash_album, #button_share_album, #button_edit_album, .button_add, #button_archive, .button_divider").remove();$("#button_trash, #button_move, #button_edit, #button_share, #button_star").remove();$(document).on("mouseenter","#title.editable",function(){$(this).removeClass("editable")}).off("click","#title.editable").off("touchend","#title.editable").off("contextmenu",".photo").off("contextmenu",".album").off("drop");Mousetrap.unbind("n").unbind("u").unbind("s").unbind("backspace");if(e=="public"){$("#button_signin").show();lychee.publicMode=true}else if(e=="view"){Mousetrap.unbind("esc");$("#button_back, a#next, a#previous").remove();lychee.publicMode=true;lychee.viewMode=true}},animate:function(e,t){var n=[["fadeIn","fadeOut"],["contentZoomIn","contentZoomOut"]];if(!e.jQuery)e=$(e);for(var r=0;r<n.length;r++){for(var i=0;i<n[r].length;i++){if(n[r][i]==t){e.removeClass(n[r][0]+" "+n[r][1]).addClass(t);return true}}}return false},loadDropbox:function(e){if(!lychee.dropbox){loadingBar.show();var t=document.createElement("script"),n=document.getElementsByTagName("script")[0];t.src="https://www.dropbox.com/static/api/1/dropins.js";t.id="dropboxjs";t.type="text/javascript";t.async="true";t.setAttribute("data-app-key","iq7lioj9wu0ieqs");t.onload=t.onreadystatechange=function(){var t=this.readyState;if(t&&t!="complete"&&t!="loaded")return;lychee.dropbox=true;loadingBar.hide();e()};n.parentNode.insertBefore(t,n)}else e()},error:function(e,t,n){console.log(e);console.log(t);console.log(n);loadingBar.show("error",t,n)}};modal={fns:null,show:function(e,t,n){if(!n){var n=[];n[0]=["",function(){}];n[1]=["",function(){}]}modal.fns=[n[0][1],n[1][1]];$("body").append(build.modal(e,t,n));$(".message input").focus()},close:function(){modal.fns=null;$(".message_overlay").removeClass("fadeIn").css("opacity",0);setTimeout(function(){$(".message_overlay").remove()},300)}};password={value:"",set:function(e){var t,n;t=[["Set Password",function(){if(visible.album())album.json.password=true;n="setAlbumPassword&albumID="+e+"&password="+hex_md5($("input.password").val());lychee.api(n,"text",function(e){if(!e)loadingBar.show("error")})}],["Cancel",function(){}]];modal.show("Set Password","Set a password to protect '"+album.json.title+"' from unauthorized viewers. Only people with this password can view this album. <input class='password' type='password' placeholder='password' value=''>",t)},get:function(e,t){var n=$("input.password").val(),r;if(!lychee.publicMode)t();else if(album.json&&album.json.password==false)t();else if(albums.json&&albums.json.content[e].password==false)t();else if(!albums.json&&!album.json){album.json={password:true};t("")}else if(n==undefined){password.getDialog(e,t)}else{r="checkAlbumAccess&albumID="+e+"&password="+hex_md5(n);lychee.api(r,"text",function(e){if(e){password.value=hex_md5(n);t()}else{lychee.goto("");loadingBar.show("error","Error","Access denied. Wrong password!")}})}},getDialog:function(e,t){var n;n=[["Enter",function(){password.get(e,t)}],["Cancel",lychee.goto]];modal.show("<a class='icon-lock'></a> Enter Password","This album is protected with a password. Enter the password below to view the photos of this album: <input class='password' type='password' placeholder='password' value=''>",n)},remove:function(e){var t;if(visible.album())album.json.password=false;t="setAlbumPassword&albumID="+e+"&password=";lychee.api(t,"text",function(e){if(!e)loadingBar.show("error")})}};photo={json:null,getID:function(){var e;if(photo.json)e=photo.json.id;else e=$(".photo:hover, .photo.active").attr("data-id");if(e)return e;else return false},load:function(e,t){var n,r;n="getPhoto&photoID="+e+"&albumID="+t+"&password="+password.value;lychee.api(n,"json",function(n){if(n=="HTTP/1.1 403 Wrong password!"){r=function(){if(password.value!="")photo.load(e,t);else setTimeout(r,250)};r();return false}photo.json=n;view.photo.init();lychee.imageview.show();setTimeout(function(){lychee.content.show()},300)})},parse:function(){if(!photo.json.title)photo.json.title="Untitled";photo.json.url=lychee.upload_path_big+photo.json.url},add:{files:function(e){var t=0,n=new FormData,r=new XMLHttpRequest,i,s;$(".upload_overlay").remove();$("body").append(build.uploadModal());window.onbeforeunload=function(){return"Lychee is currently uploading!"};for(var o=0;o<e.length;o++)n.append(o,e[o]);n.append("function","upload");if(album.getID()=="")n.append("albumID",0);else n.append("albumID",album.getID());r.open("POST",lychee.api_path);r.onload=function(){if(r.status===200){$(".progressbar div").css("width","100%");$(".upload_overlay").removeClass("fadeIn").css("opacity",0);setTimeout(function(){$(".upload_overlay").remove()},300);if(window.webkitNotifications&&BrowserDetect.browser=="Safari"){i=window.webkitNotifications.createNotification("","Upload complete","You can now manage your new photo.");i.show()}window.onbeforeunload=null;if(album.getID()=="")lychee.goto("a0");else album.load(album.getID())}};r.upload.onprogress=function(e){if(e.lengthComputable){s=e.loaded/e.total*100|0;if(s>t){$(".progressbar div").css("width",s+"%");t=s}if(s>=100)$(".progressbar div").css("opacity",.2)}};$("#upload_files").val("");r.send(n)},url:function(e){var t=album.getID();if(!e)e=prompt("Please enter the direct link to a photo to import it:","");if(album.getID()=="")t=0;if(e&&e.length>3){modal.close();$(".upload_overlay").remove();$("body").append(build.uploadModal());$(".progressbar div").css({opacity:.2,width:"100%"});params="importUrl&url="+escape(e)+"&albumID="+t;lychee.api(params,"text",function(e){$(".upload_overlay").removeClass("fadeIn").css("opacity",0);setTimeout(function(){$(".upload_overlay").remove()},300);if(e){if(album.getID()=="")lychee.goto("a0");else album.load(album.getID())}else loadingBar.show("error")})}else if(e.length>0)loadingBar.show("error","Error","Link to short or too long. Please try another one!")},dropbox:function(){lychee.loadDropbox(function(){Dropbox.choose({linkType:"direct",multiselect:false,success:function(e){photo.add.url(e[0].link)}})})}},"delete":function(e){var t,n,r;if(!e)e=photo.getID();if(visible.photo())r=photo.json.title;else r=album.json.content[e].title;if(r=="")r="Untitled";n=[["Delete Photo",function(){album.json.content[e]=null;view.album.content.delete(e);if(!visible.albums())lychee.goto("a"+album.getID());t="deletePhoto&photoID="+e;lychee.api(t,"text",function(e){if(!e)loadingBar.show("error")})}],["Keep Photo",function(){}]];modal.show("Delete Photo","Are you sure you want to delete the photo '"+r+"'?<br>This action can't be undone!",n)},setTitle:function(e){var t="",n,r;if(!e)e=photo.getID();if(photo.json)t=photo.json.title;else if(album.json)t=album.json.content[e].title;n=prompt("Please enter a new title for this photo:",t);if(e!=null&&e&&n.length<31){if(visible.photo()){photo.json.title=n==""?"Untitled":n;view.photo.title(t)}album.json.content[e].title=n;view.album.content.title(e);r="setPhotoTitle&photoID="+e+"&title="+escape(encodeURI(n));lychee.api(r,"text",function(e){if(!e)loadingBar.show("error")})}else if(n.length>0)loadingBar.show("error","Error","New title to short or too long. Please try another one!")},setAlbum:function(e,t){var n;if(e>=0){if(visible.photo)lychee.goto("a"+album.getID());album.json.content[t]=null;view.album.content.delete(t);n="setAlbum&photoID="+t+"&albumID="+e;lychee.api(n,"text",function(e){if(!e)loadingBar.show("error")})}},setStar:function(e){var t;if(visible.photo()){photo.json.star=photo.json.star==0?1:0;view.photo.star()}album.json.content[e].star=album.json.content[e].star==0?1:0;view.album.content.star(e);t="setPhotoStar&photoID="+e;lychee.api(t,"text",function(e){if(!e)loadingBar.show("error")})},setPublic:function(e,t){var n;if(photo.json.public==2){modal.show("Public Album","This photo is located in a public album. To make this photo private or public, edit the visibility of the associated album.",[["Show Album",function(){lychee.goto("a"+photo.json.original_album)}],["Close",function(){}]]);return false}if(visible.photo()){photo.json.public=photo.json.public==0?1:0;view.photo.public();if(photo.json.public==1)contextMenu.sharePhoto(e,t)}album.json.content[e].public=album.json.content[e].public==0?1:0;view.album.content.public(e);n="setPhotoPublic&photoID="+e+"&url="+photo.getViewLink(e);lychee.api(n,"text",function(e){if(!e)loadingBar.show("error")})},setDescription:function(e){var t=photo.json.description,n=prompt("Please enter a description for this photo:",t),r;if(n.length>0&&n.length<160){if(visible.photo()){photo.json.description=n;view.photo.description(t)}r="setPhotoDescription&photoID="+e+"&description="+escape(n);lychee.api(r,"text",function(e){if(!e)loadingBar.show("error")})}else if(n.length>0)loadingBar.show("error","Error","Description to short or too long. Please try another one!")},share:function(e,t){var n="",r=photo.getViewLink(e),i,s="unknown";switch(t){case 0:n="https://twitter.com/share?url="+encodeURI(r);break;case 1:n="http://www.facebook.com/sharer.php?u="+encodeURI(r)+"&t="+encodeURI(photo.json.title);break;case 2:n="mailto:?subject="+encodeURI(photo.json.title)+"&body="+encodeURI(r);break;case 3:lychee.loadDropbox(function(){s=photo.json.title+"."+photo.getDirectLink().split(".").pop();Dropbox.save(photo.getDirectLink(),s)});break;default:n="";break}if(n.length>5)location.href=n},isSmall:function(){var e=[["width",false],["height",false]];if(photo.json.width<$(window).width()-60)e["width"]=true;if(photo.json.height<$(window).height()-100)e["height"]=true;if(e["width"]&&e["height"])return true;else return false},getDirectLink:function(){return $("#imageview #image").css("background-image").replace(/"/g,"").replace(/url\(|\)$/ig,"")},getViewLink:function(e){if(location.href.indexOf("index.html")>0)return location.href.replace("index.html"+location.hash,"view.php?p="+e);else return location.href.replace(location.hash,"view.php?p="+e)}};search={code:null,find:function(e){var t,n="",r="",i;clearTimeout($(window).data("timeout"));$(window).data("timeout",setTimeout(function(){if($("#search").val().length!=0){t="search&term="+e;lychee.api(t,"json",function(e){if(e&&e.albums){albums.json={content:e.albums};$.each(albums.json.content,function(){albums.parse(this);n+=build.album(this)})}if(e&&e.photos){album.json={content:e.photos};$.each(album.json.content,function(){album.parse(this);r+=build.photo(this)})}if(n==""&&r=="")i="error";else if(n=="")i=build.divider("Photos")+r;else if(r=="")i=build.divider("Albums")+n;else i=build.divider("Photos")+r+build.divider("Albums")+n;if(search.code!=hex_md5(i)){$(".no_content").remove();lychee.animate(".album, .photo","contentZoomOut");lychee.animate(".divider","fadeOut");search.code=hex_md5(i);setTimeout(function(){if(i=="error")$("body").append(build.no_content("search"));else{lychee.content.html(i);lychee.animate(".album, .photo","contentZoomIn")}},300)}})}else search.reset()},250))},reset:function(){$("#search").val("");$(".no_content").remove();if(search.code!=""){search.code="";lychee.animate(".divider","fadeOut");albums.load()}}};view={header:{show:function(){clearTimeout($(window).data("timeout"));if(visible.photo()){lychee.imageview.removeClass("full");lychee.loadingBar.css("opacity",1);lychee.header.css("margin-Top","0px");if($("#imageview #image.small").length>0){$("#imageview #image").css({marginTop:-1*($("#imageview #image").height()/2)+20})}else{$("#imageview #image").css({top:70,right:30,bottom:30,left:30})}}},hide:function(){if(visible.photo()&&!visible.infobox()){clearTimeout($(window).data("timeout"));$(window).data("timeout",setTimeout(function(){lychee.imageview.addClass("full");lychee.loadingBar.css("opacity",0);lychee.header.css("margin-Top","-45px");if($("#imageview #image.small").length>0){$("#imageview #image").css({marginTop:-1*($("#imageview #image").height()/2)})}else{$("#imageview #image").css({top:0,right:0,bottom:0,left:0})}},500))}},mode:function(e){var t;switch(e){case"albums":$("#tools_album, #tools_photo").hide();$("#tools_albums").show();break;case"album":$("#tools_albums, #tools_photo").hide();$("#tools_album").show();t=album.getID();if(t=="s"||t=="f")$("#button_edit_album, #button_trash_album, #button_share_album").hide();else if(t==0)$("#button_edit_album, #button_share_album").hide();else $("#button_edit_album, #button_trash_album, #button_share_album").show();break;case"photo":$("#tools_albums, #tools_album").hide();$("#tools_photo").show();break}}},albums:{init:function(){view.albums.title();view.albums.content.init()},title:function(){lychee.setTitle("Albums",null,false)},content:{init:function(){var e="",t="";albums.parse(albums.json.unsortedAlbum);albums.parse(albums.json.publicAlbum);albums.parse(albums.json.starredAlbum);if(!lychee.publicMode)e=build.divider("Smart Albums")+build.album(albums.json.unsortedAlbum)+build.album(albums.json.starredAlbum)+build.album(albums.json.publicAlbum);if(albums.json.content){if(!lychee.publicMode)t=build.divider("Albums");$.each(albums.json.content,function(){albums.parse(this);t+=build.album(this)})}if(e==""&&t=="")$("body").append(build.no_content("picture"));else lychee.content.html(e+t);$("img").retina()},title:function(e){var t="",n=albums.json.content[e].title;if(albums.json.content[e].password)t="<span class='icon-lock'></span> ";if(n.length>18)n=n.substr(0,18)+"...";$(".album[data-id='"+e+"'] .overlay h1").html(t+n)},"delete":function(e){$(".album[data-id='"+e+"']").css("opacity",0).animate({width:0,marginLeft:0},300,function(){$(this).remove()})}}},album:{init:function(){album.parse();view.album.title();view.album.public();view.album.content.init();album.json.init=1},title:function(){if((visible.album()||!album.json.init)&&!visible.photo()){switch(album.getID()){case"f":lychee.setTitle("Starred",album.json.num,false);break;case"s":lychee.setTitle("Public",album.json.num,false);break;case"0":lychee.setTitle("Unsorted",album.json.num,false);break;default:lychee.setTitle(album.json.title,album.json.num,true);break}}},content:{init:function(){var e="";$.each(album.json.content,function(){album.parse(this);e+=build.photo(this)});lychee.content.html(e);$("img").retina()},title:function(e){var t=album.json.content[e].title;if(t.length>18)t=t.substr(0,18)+"...";$(".photo[data-id='"+e+"'] .overlay h1").html(t)},star:function(e){$(".photo[data-id='"+e+"'] .icon-star").remove();if(album.json.content[e].star==1)$(".photo[data-id='"+e+"']").append("<a class='badge red icon-star'></a>")},"public":function(e){$(".photo[data-id='"+e+"'] .icon-share").remove();if(album.json.content[e].public==1)$(".photo[data-id='"+e+"']").append("<a class='badge red icon-share'></a>")},"delete":function(e){$(".photo[data-id='"+e+"']").css("opacity",0).animate({width:0,marginLeft:0},300,function(){$(this).remove();if(!visible.albums()){album.json.num--;view.album.title()}})}},"public":function(){if(album.json.public==1){$("#button_share_album a").addClass("active");$("#button_share_album").attr("title","Share Album");$(".photo .icon-share").remove()}else{$("#button_share_album a").removeClass("active");$("#button_share_album").attr("title","Make Public")}}},photo:{init:function(){photo.parse();view.photo.infobox();view.photo.title();view.photo.star();view.photo.public();view.photo.photo();photo.json.init=1},show:function(){view.header.mode("photo");$("body").css("overflow","hidden");lychee.animate(lychee.imageview,"fadeIn")},hide:function(){if(!visible.controls())view.header.show();if(visible.infobox)view.photo.hideInfobox();view.header.mode("album");$("body").css("overflow","scroll");lychee.animate(lychee.imageview,"fadeOut");setTimeout(function(){lychee.imageview.hide()},300)},showInfobox:function(){if(!visible.infobox())$("body").append("<div id='infobox_overlay'></div>");lychee.infobox.css("right","0px")},hideInfobox:function(){$("#infobox_overlay").remove();lychee.infobox.css("right","-320px")},title:function(e){if(photo.json.init)$("#infobox .attr_name").html($("#infobox .attr_name").html().replace(e,photo.json.title));lychee.setTitle(photo.json.title,null,true)},description:function(e){if(photo.json.init)$("#infobox .attr_description").html($("#infobox .attr_description").html().replace(e,photo.json.description))},star:function(){$("#button_star a").removeClass("icon-star-empty icon-star");if(photo.json.star==1){$("#button_star a").addClass("icon-star");$("#button_star").attr("title","Unstar Photo")}else{$("#button_star a").addClass("icon-star-empty");$("#button_star").attr("title","Star Photo")}},"public":function(){if(photo.json.public==1||photo.json.public==2){$("#button_share a").addClass("active");$("#button_share").attr("title","Share Photo");if(photo.json.init)$("#infobox .attr_visibility").html("Public")}else{$("#button_share a").removeClass("active");$("#button_share").attr("title","Make Public");if(photo.json.init)$("#infobox .attr_visibility").html("Private")}},photo:function(){if(visible.controls()&&photo.isSmall())lychee.imageview.html("<a id='previous' class='icon-caret-left'></a><a id='next' class='icon-caret-right'></a><div id='image' class='small' style='background-image: url("+photo.json.url+"); width: "+photo.json.width+"px; height: "+photo.json.height+"px; margin-top: -"+parseInt(photo.json.height/2-20)+"px; margin-left: -"+photo.json.width/2+"px;'></div>");else if(visible.controls())lychee.imageview.html("<a id='previous' class='icon-caret-left'></a><a id='next' class='icon-caret-right'></a><div id='image' style='background-image: url("+photo.json.url+")'></div>");else if(photo.isSmall())lychee.imageview.html("<a id='previous' style='left: -50px' class='icon-caret-left'></a><a id='next' style='right: -50px' class='icon-caret-right'></a><div id='image' class='small' style='background-image: url("+photo.json.url+"); width: "+photo.json.width+"px; height: "+photo.json.height+"px; margin-top: -"+parseInt(photo.json.height/2)+"px; margin-left: -"+photo.json.width/2+"px;'></div>");else lychee.imageview.html("<a id='previous' style='left: -50px' class='icon-caret-left'></a><a id='next' style='right: -50px' class='icon-caret-right'></a><div id='image' style='background-image: url("+photo.json.url+"); top: 0px; right: 0px; bottom: 0px; left: 0px;'></div>");if(!photo.json.nextPhoto||lychee.viewMode)$("a#next").hide();if(!photo.json.previousPhoto||lychee.viewMode)$("a#previous").hide()},infobox:function(){lychee.infobox.html(build.infobox(photo.json)).show()}}};visible={albums:function(){if($("#tools_albums").css("display")=="block")return true;else return false},album:function(){if($("#tools_album").css("display")=="block")return true;else return false},photo:function(){if($("#imageview.fadeIn").length>0)return true;else return false},infobox:function(){if(parseInt(lychee.infobox.css("right").replace("px",""))==-320)return false;else return true},controls:function(){if(lychee.loadingBar.css("opacity")<1)return false;else return true},message:function(){if($(".message").length>0)return true;else return false},contextMenu:function(){if($(".contextmenu").length>0)return true;else return false}}
