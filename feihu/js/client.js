/*-----------sitenav--------------*/

$(".sitenav .loginReg .login a").click(function(){
	location.href = "http://10.9.160.16/feihu/client/login.html";
});
$(".sitenav .loginReg .reg a").click(function(){
	location.href = "http://10.9.160.16/feihu/client/register.html";
});



$(".myAccount .menu a").mouseenter(function(){
	$(".myAccount .menu").css({
		"border":"1px solid #ccc",
		"border-bottom":"none",
		"background-color":"#fff",
		"padding-left":"9px",
		"width":"71px"
	});
	$(".myAccount .menu a").css({
		"line-height":"23px"
	});
	$(".myAccount .menu a b").css({
		"margin-top":"9px"
	});
	
	$("#menu_down").addClass("active").slideDown(200);
	$(".myAccount .menu a b").addClass("hover_up").removeClass("hover_down");
});
$(".myAccount .menu a").mouseleave(function(){
	$("#menu_down").removeClass("active");
	$(".myAccount .menu").css({
		"border":"none",
		"background-color":"none",
		"padding-left":"10px",
		"width":"70px"
	});
	$(".myAccount .menu a").css({
		"line-height":"24px"
	});
	$(".myAccount .menu a b").css({
		"margin-top":"10px"
	});
	$(".myAccount .menu a b").addClass("hover_down").removeClass("hover_up");
});
$("#menu_down").mouseenter(function(){
	$("#menu_down").addClass("active");
});
$("#menu_down").mouseleave(function(){
	$("#menu_down").removeClass("active");
	
});
/*--------help------*/
$(".help .menu a").mouseenter(function(){
	$(".help .menu").css({
		"border":"1px solid #ccc",
		"border-bottom":"none",
		"background-color":"#fff",
		"padding-left":"9px",
		"width":"69	px"
	});
	$(".help .menu a").css({
		"line-height":"23px"
	});
	$(".help .menu a b").css({
		"margin-top":"9px",
		"transition-duration":".3s",
		"transform":"rotate(180deg)",
		"-webkit-transform":"rotate(180deg)"
	});
	$("#help_down").addClass("active").slideDown(200);
});
$(".help .menu a").mouseleave(function(){
	$("#help_down").removeClass("active");
	$(".help .menu").css({
		"border":"none",
		"background-color":"none",
		"padding-left":"10px",
		"width":"70px"
	});
	$(".help .menu a").css({
		"line-height":"24px"
	});
	$(".help .menu a b").css({
		"margin-top":"10px",
		"transition-duration":".3s",
		"transform":"rotate(0deg)",
		"-webkit-transform":"rotate(0deg)"
	});

});

$(".header .search_bar .classify a").mouseenter(function(){
	$(".header .search_bar .classify a span").css({
		"transition-duration":".3s",
		"transform":"rotate(180deg)",
		"-webkit-transform":"rotate(180deg)"
	});
});

$(".header .search_bar .classify a").mouseleave(function(){
	$(".header .search_bar .classify a span").css({
		"transition-duration":".3s",
		"transform":"rotate(0deg)",
		"-webkit-transform":"rotate(0deg)"
	});
});
/*--------sidebar------*/


$(".sidebar .sidebar_tab ul li").mouseenter(function(){
	$(this).css({
		"background-color":"#C7012C"
	}).siblings().css({
		"background-color":"none"
	});
});
$(".sidebar .sidebar_tab ul li").mouseleave(function(){
	$(this).css({
		"background-color":"#000"
	})
})


$.get("../json/lunBoTu.json",function(data){
	for (var i=0;i<data[0].lbt.length;i++) {
		var html = '<li>'+
 		'<a href="#" style=" background: url('+ data[0].lbt[i] +') no-repeat center;"></a></li>'
		$(html).appendTo(".carousel_con");
	};
	$(".carousel .carousel_con li:first").show();
	
	
	
});






/*-----------carousel------------*/
$(".carousel").mouseenter(function(){
	$(".banner_prev").fadeIn(300);
	$(".banner_next").fadeIn(300);
	clearInterval(bannerAutoPlay);
	
});
$(".carousel").mouseleave(function(){
	$(".banner_prev").fadeOut(300);
	$(".banner_next").fadeOut(300);
	autoPlay();
});

var crrentIndex = 0;
$(".banner_next").click(function(){
	crrentIndex++;
	if(crrentIndex>=8){
		crrentIndex=0;
	};
	$(".carousel .carousel_con li").eq(crrentIndex-1).fadeOut(400);
	$(".carousel .carousel_con li").eq(crrentIndex).fadeIn(400);
	bannerTab();
});
$(".banner_prev").click(function(){
	crrentIndex--;
	if(crrentIndex<0){
		crrentIndex = 7;
	};
	$(".carousel_con li").eq(crrentIndex+1).fadeOut(400);
	$(".carousel_con li").eq(crrentIndex).fadeIn(400);
	bannerTab();
});

//自动轮播函数
var bannerAutoPlay;

function autoPlay(){
	bannerAutoPlay = setInterval(function(){
		crrentIndex++;
		if(crrentIndex>=8){
			crrentIndex=0;
		};
		$(".carousel .carousel_con li").eq(crrentIndex-1).fadeOut(400);
		$(".carousel .carousel_con li").eq(crrentIndex).fadeIn(400);
		bannerTab();
	},2000);
};
autoPlay();

//轮播图下标远点运动函数封装
function bannerTab(){
	$(".carousel_tab ul li").eq(crrentIndex).addClass("on").siblings().removeClass("on");
};
$(".carousel_tab ul li").click(function(){
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".carousel .carousel_con li").eq(index).fadeIn(400).siblings().fadeOut(400);
});


$(".search_bar .shopping .shopping_left a").mouseenter(function(){
	$(".header .shopping_con").show();
});

$(".search_bar .shopping .shopping_left a").mouseleave(function(){
	$(".header .shopping_con").hide();
});

$(".header .shopping_con").mouseenter(function(){
	$(".header .shopping_con").show();
})
$(".header .shopping_con").mouseleave(function(){
	$(".header .shopping_con").hide();
})













