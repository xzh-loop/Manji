
var timer;
// -----前一兄弟节点-----
// Object.prototype.prev = function(){
// 	var x = this.previousSibling;
// 	while(x && x.nodeType!=1){
// 		x = x.previousSibling;
// 	}
// 	return x;
// }
// //-----后一兄弟节点-----
// Object.prototype.next = function(){
// 	var x = this.nextSibling;
// 	while(x && x.nodeType!=1){
// 		x = x.nextSibling;
// 	}
// 	return x;
// }

//-----设置banner切换计时器-----
var setToggleBannerTimer = function() {
	timer = window.setInterval(function(){
		nextBanner();
	}, 5000);
}

//-----前一个banner-----
var prevBanner = function() {
	var x = $(".active", "#banner .toggle-btn");
	var prev = x.prev().length>0 ? x.prev() : $("span", "#banner .toggle-btn").last();
	x.removeClass("active");
	prev.addClass("active");
	changeBanner();
	window.clearInterval(timer);
	setToggleBannerTimer();
}

//-----下一个banner-----
var nextBanner = function() {
	var x = $(".active", "#banner .toggle-btn");
	var next = x.next().length>0 ? x.next() : $("span", "#banner .toggle-btn").first();
	x.removeClass("active");
	next.addClass("active");
	changeBanner();
	window.clearInterval(timer);
	setToggleBannerTimer();
}

//-----切换banner-----
var changeBanner = function(index) {
	var index = index || $(".active", "#banner .toggle-btn").index();
	$("ul", "#banner").attr("class", "w"+index);
}

//-----获取所有指定类的元素-----
var getClassItems = function(cls, context){
	var arr = [],
		context = context || document;
	if(document.querySelectorAll){
		arr = context.querySelectorAll("."+cls);  // 虽然不是数组
		// arr = Array.prototype.slice.call(context.querySelectorAll("."+cls));
	}else{
		var all = context.all;
		for(var i=0;i<all.length;i++){
			if(all[i].className == cls){
				arr.push(all[i]);
			}
		}
	}
	return arr;
}

setToggleBannerTimer();
$(document).ready(function(){
	$("span", "#banner .toggle-btn").hover(function(){
		$(".active", "#banner .toggle-btn").removeClass("active");
		$(this).addClass("active");
		changeBanner($(this).index());
	});
	$("[class$=to-left]", "#banner").click(function(){
		prevBanner();
	});
	$("[class$=to-right]", "#banner").click(function(){
		nextBanner();
	});
});
window.onload = function(){
	var banner = document.getElementById("banner");
	var flip = getClassItems("to-left", banner);
	// 为商品图片绑定事件监听器，hover显示价格
	(function(){
		var content = document.getElementById("content");
		var photos = getClassItems("photo", content);
		for(var e in photos){
			photos[e].onmouseenter = function(){
				this.getElementsByTagName("span")[0].style.display = "block";
				this.onmouseleave = function(){
					this.getElementsByTagName("span")[0].style.display = "none";
				}
			}
		}
	})();
}