var crrentIndex;
$(".header .search_bar .classify").mouseenter(function() {
	$(".header .search_bar .classify .search_tab").addClass("active");
}).mouseleave(function() {
	$(".header .search_bar .classify .search_tab").removeClass("active");
})
$(".header .search_bar .classify .search_tab ul .mans").mouseenter(function() {
	crrentIndex = $(this).index();
	$(this).css({
		"border": "2px solid #C7012C",
		"border-right": "none",
		"height": "37px",
		"line-height": "37px",
		"padding-left": "9px",
		"background": "#fff",
		"width": "189px",
		"z-index": "111"
	}).children("h3").css({
		"height": "36px"
	}).children("a").css({
		"line-height": "36px"
	});
	$(this).children().find("b").hide();
	$(this).children(":last-child").addClass("active");
});
$(".header .search_bar .classify .search_tab ul .mans").mouseleave(function() {
	crrentIndex = $(this).index();
	$(this).css({
		"border": "none",
		"border-right": "1px solid #C7012C",
		"border-left": "1px solid #C7012C",
		"border-bottom": "1px solid #f8d4bc",
		"height": "40px",
		"line-height": "40px",
		"padding-left": "10px",
		"background": "#ffefe0",
		"width": "188px",
		"z-index": "96"
	}).children("h3").css({
		"height": "40px"
	}).children("a").css({
		"line-height": "40px"
	});
	$(this).children().find("b").show();
	$(this).children(":last-child").removeClass("active");
});

/*放大镜*/

$.get("../json/fangdajing.json", function(data) {
	for(var i = 0; i < data[0].img.length; i++) {
		var imgHtml = '<li><img src="' + data[0].img[i] + '" /></li>'; // first: class="active"
		var tabHtml = '<li>' + // first: class="active"
			'<a href="#">' +
			'<img src="' + data[2].tabImg[i] +
			'" /></a>' +
			'</li>';
		var bigHtml = '<li>' +
			'<img src="' + data[1].bigImg[i] + '" /></li>'; // first: class="active"

		$(imgHtml).appendTo(".comm_show_main ul");
		$(tabHtml).appendTo(".comm_show_tab_main ul");
		$(bigHtml).appendTo(".comm_bigImg_main ul");
	};
	$(".comm_show .comm_show_main ul li").eq(0).addClass("active");
	$(".comm_bigImg .comm_bigImg_main ul li").eq(0).addClass("active");
	$(".comm_show_tab .comm_show_tab_main ul li").eq(0).addClass("active");


	
	$(".comm_show").mouseenter(function() {
		$(".comm_show_main_tool").addClass("active");
		$(".mainShow .comm_bigImg").show();
	});
	$(".comm_show").mouseleave(function() {
		$(".comm_show_main_tool").removeClass("active");
		$(".mainShow .comm_bigImg").hide();
	});

	$(".comm_show").mousemove(function(e) {
		var x = e.pageX - $(this).offset().left - 10 - $(".comm_show_main_tool").width() / 2;
		var y = e.pageY - $(this).offset().top - 10 - $(".comm_show_main_tool").height() / 2;
		var moveX = Math.min(Math.max(x, 0), $(".comm_show_main").width() - $(".comm_show_main_tool").width() - 2);
		var moveY = Math.min(Math.max(y, 0), $(".comm_show_main").height() - $(".comm_show_main_tool").height() - 2);
		$(".comm_show_main_tool").css({
			left: moveX,
			top: moveY
		});
		$(".mainShow .comm_bigImg ul li").eq(thisIndex).css({
			left: -moveX * 3,
			top: -moveY * 3
		});
	});
	/*tab进入事件切换图片*/
	var thisIndex = 0;
	var ulWidth = $(".mainShow .comm_show_tab_main ul li").length * 70;
	$(".comm_show_tab_main ul").css({
		"width": ulWidth
	})
	$(" .comm_show_tab_main ul li").mouseenter(function() {
		thisIndex = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".comm_show_main ul li").eq(thisIndex).addClass("active").siblings().removeClass("active");
		$(".mainShow .comm_bigImg ul li").eq(thisIndex).addClass("active").siblings().removeClass("active");
	});
	var clickTimes = 0;

	var listWidth = $(".comm_show_tab_main").width();
	$(".comm_show_tab_next").click(function() {
		clickTimes++;

		if(listWidth * clickTimes > ulWidth) {
			clickTimes = 0;
		}
		$(" .comm_show_tab_main ul").animate({
			left: -listWidth * clickTimes
		}, 400)

	});
/*图片切换*/
	$(".comm_show_tab_prev").click(function() {
		clickTimes--;
		if(clickTimes < 0) {
			clickTimes = 0;
		}
		$(" .comm_show_tab_main ul").animate({
			left: listWidth * clickTimes
		}, 400)

	});
	$(".comm_show_tab_prev").mouseenter(function() {
		$(this).children("span").addClass("active");
	});
	$(".comm_show_tab_prev").mouseleave(function() {
		$(this).children("span").removeClass("active");
	});
	$(".comm_show_tab_next").mouseenter(function() {
		$(this).children("span").addClass("active");
	});
	$(".comm_show_tab_next").mouseleave(function() {
		$(this).children("span").removeClass("active");
	});
/*加入购物车*/
	$("#ccount").html(getTotalCount());
	$(".btn_addCart").click(function(){
		var pid = $(".identifier").html();
		
		var isSave = checkHasGoodsById(pid);
		if(isSave){
			updateGoodsById(pid,1);
		}else{
			var imgURL = data[2].tabImg[0];//图片路径
			var pName = $(".col_name").text(); //商品信息，商品名字
			var pNum = $(".choose_amount_txt").val();//商品数量
			var price = $(".particulars_price_sale em").html();//商品单价
			var totle = pNum*price;//商品总价
			console.log(imgURL);
			var obj = {pid:pid,imgUrl:imgURL,pName:pName,pNum:pNum,price:price,count:1};  
			addGoodsToCart(obj) //添加数据到购物车，添加数据到本地cookie
			
			console.log(obj);
		};
		$(".ccount").html(getTotalCount()); 
		console.log(getTotalCount());
	})

})


/*+地址更改++*/

$(".particulars .repertory .repertoryPlace").mouseenter(function() {
	$(this).css({
		"border": "1px solid #7d4910",
		"z-index": "15"
	});
	$(this).children(".repertoryPlace_icon").addClass("active").removeClass("click");
});
$(".particulars .repertory .repertoryPlace").mouseleave(function() {
	$(this).css({
		"border": "1px solid #ccc"
	});
	$(this).children(".repertoryPlace_icon").removeClass("active click");
	$(this).children(".repertoryAllPlace").slideUp(400);
});
$(".particulars .repertory .repertoryPlace").click(function() {
	$(this).css({
		"border": "1px solid #7d4910",
		"z-index": "15"
	});
	$(this).children(".repertoryPlace_icon").addClass("click").removeClass("active");
	$(this).children(".repertoryAllPlace").slideDown(400);
});
/*--------------*/
var ulst = $(".repertoryPlace .repertoryAllPlace ul");
for(var i = 0; i < ulst.length; i++) {
	$(ulst).eq(i).children().click(function() {
		$(".particulars .repertory .repertoryPlace .repertoryPlace_html").html($(this).html());
		$(this).parent().parent().css({
			"display": "none"
		});
		console.log($(this).parent().parent())
	})
};
/*-----------数量加减---------*/
var pract = $(".ui_price em").html();
$(".choose_amount .choose_amount_plus").click(function() {
	var num = $(".choose_amount .choose_amount_txt").val();
	num++;
	$(".choose_amount .choose_amount_txt").val(num);
//	$(".ui_price em").html(pract*num);
	
});

$(".choose_amount .choose_amount_redu").click(function() {
	var num = $(".choose_amount .choose_amount_txt").val();
		num--;
	if(num<1){
		alert("商品数量最少为1");
		num =1;
	}
	$(".choose_amount .choose_amount_txt").val(num);
//	$(".ui_price em").html(pract*num);
});



/*选择颜色*/
$(".choose_color .colors li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	
	
	
	$(".ui_name .ui_name_color").html($(this).html())
	$(".chooseed .chooseed_color").html($(this).html())
	$(".crumb_bg .crumb_bg_color").html($(this).html())
	
});
/*选择大小*/
$(".choose_size .sizes li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	
	
	$(".particulars_name .anther_intro").html($(this).html())
	$(".ui_name .ui_name_size").html($(this).html())
	$(".chooseed .chooseed_size").html($(this).html())
	$(".crumb_bg .crumb_bg_size").html($(this).html())
	
});


/*侧边栏销售排行*/


$(".qubie_content li").eq(0).show();
$(".qubie .qubie_item").mouseenter(function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".qubie_content li").eq(index).show().siblings().hide();
});

$(".clearfix_information_tab li").click(function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".clearfix_information .product li").eq(index).show().siblings().hide();
});



$(".evaluate_content li").eq(0).show();

$(".evaluate li").click(function(){
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".evaluate_content .product li").eq(index).show().siblings().hide();
});

$(".consult li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});

/*返回顶部*/
$(".backTop").css({
	"display":"none"
});


$(document).lplmousewheel(function(){
	if($(window).scrollTop()>300){
		
		$(".backTop").fadeIn(300);
	}else{
		$(".backTop").fadeOut(300);
	}
});









$(".backTop").click(function(){
	$(".backTop").fadeOut(300);
})




//
//$(document).lplmousewheel(function(){
//	if($(window).scrollTop()>300){
//		
//		$(".backTop").fadeIn(300);
//	}else{
//		$(".backTop").fadeOut(300);
//	}
//});
//$(".backTop").click(function(){
//	$(".backTop").fadeOut(300);
//})


