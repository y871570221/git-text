/*-----------close--------------*/

$(".ui_tipsPop_close").click(function() {
	$(".ui_tipsPop").css({
		"display": "none"
	})
})

/*添加商品*/

var totalCount = getTotalCount(); //获取本地数据

//console.log(totalCount);
if(totalCount) { //若有
	$(".cart_nothing").css({
		"display": "none"
	});
	$(".account").css({
		"display": "block"
	});
	$(".account_list").css({
		"display": "block"
	});
	$(".divPriceTotal").css({
		"display": "block"
	});

	var goodsListObj = getGoosListObj(); //获取本地数据
	//	console.log(goodsListObj[0].imgURL)
	for(var i = 0; i < goodsListObj.length; i++) {
		var trHtml = '<tr pid="' + goodsListObj[i].pid + '">' +
			'<td class = "col_num">' +
			'<label>' +
			'<input type = "checkbox" class = "ck"/>' +
			'</label>' +
			'</td><td>' +
			'<div class = "col_content">' +
			'<div class = "col_img">' +
			'<div class = "ui_pimg175">' +
			'<a href = "#"class = "img">' +
			'<img width = "75px" src = "' + goodsListObj[i].imgURL + '" alt = "" / >' +
			'</a></div></div>' +
			'<div class = "item_content">' +
			'<div class = "col_name" >' +
			'<a href = "#" >' + goodsListObj[i].pName + '</a>' +
			'</div> <div class = "col_nums" >' +
			'<input type = "text" id = "nums_input" value = "' + goodsListObj[i].count + '" / >' +
			'<span class = "nums_plus"> </span> ' +
			'<span class = "nums_minu"> </span> ' +
			'</div> <div class = "col_price" >' +
			'<b>￥</b><span>' + goodsListObj[i].price + '</span></div> ' +
			'<div class = "col_total" >' +
			'<b>￥</b><span>' + goodsListObj[i].price * goodsListObj[i].count + '</span></div> ' +
			'<div class = "col_op" >' +
			'<span class="del" > 删除 </span>|<span>收藏</span> ' +
			'</div></div></div></td></tr>';

		$(trHtml).appendTo($("#tbody"))
	}
} else { //没有数据
	$(".cart_nothing").css({
		"display": "block"
	});
	$(".account").css({
		"display": "none"
	});
	$(".account_list").css({
		"display": "none"
	});
	$(".divPriceTotal").css({
		"display": "none"
	});
}

/*---------------计算总价格---------------------*/

function getTotalPrice() {
	var cks = $("#tbody .ck");
	var totalPrice = 0;
	for(var i = 0; i < cks.length; i++) {
		if(cks[i].checked) {
			//cks[i]
			var price = $(cks[i]).parents("tr").children(":eq(1)").children(".col_content").children(".item_content").children(".col_total").children("span").html() //单个商品的价格
			totalPrice = totalPrice + Number(price); //总价

		}
	}
	$("#totalPrice").html(totalPrice);
}

/*
 	为tbody下面的每一个checkbox添加一个change事件
 */
$("#tbody .ck").change(function() {
	getTotalPrice();
	checkAllcheckBox();
});

/*
 	循环遍历每一个tbody下checkbox，检测是否都被选中。
 	若都被选中，则全选应该也被选中。
 	否则，全选不被选中
 */
function checkAllcheckBox() {
	var cks = $("#tbody .ck");
	var flag = true;
	for(var i = 0; i < cks.length; i++) {
		if(!cks[i].checked) {
			flag = false;
			break;
		}
	}
	$("#allCheck")[0].checked = flag;
}

/*全选*/
$("#allCheck").change(function() {
		var cks = $("#tbody .ck")
		for(var i = 0; i < cks.length; i++) {
			cks[i].checked = this.checked;
		}
		getTotalPrice();
	})
	/*数量增加*/

$("#tbody .nums_plus").click(function() {
	var tr = $(this).parents("tr");
	var pid = tr.attr("pid"); //获取商品的编号

	tr.children(":eq(0)").children(":eq(0)").children()[0].checked = true; //判断当前商品的check为选中
	var num = $(this).prev().val(); //数量
	num++; //数量++
	$(this).prev().val(num); //重新放到里边
	var price = tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_price").children("span").html() //单价
	tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_total").children("span").html(price * num) //单价*数量

	//	console.log(tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_total").children("span").html())
	updateGoodsById(pid, 1); //本地cookie的数量增加1

	getTotalPrice(); //更新总价格
	checkAllcheckBox(); //检查所有的check是否全选
	//	console.log(num);
});

/*数量减少*/

$("#tbody .nums_minu").click(function() {
	var tr = $(this).parents("tr");
	var pid = tr.attr("pid"); //获取商品的编号
	tr.children(":eq(0)").children(":eq(0)").children()[0].checked = true; //判断当前商品的check为选中
	var num = $(this).prev().prev().val(); //数量
	console.log(num);
	num--; //数量--
	if(num == 0) {
		if(confirm("您真的不要了吗？")) {
			tr.remove();
			deleteGoodsById(pid);
			getTotalPrice();

			$(".cart_nothing").css({
				"display": "block"
			});
			$(".account").css({
				"display": "none"
			});
			$(".account_list").css({
				"display": "none"
			});
			$(".divPriceTotal").css({
				"display": "none"
			});
			return
		} else {
			num = 1
			downdateGoodsById(pid, 0);
			getTotalPrice(); //更新总价格
			checkAllcheckBox(); //检查所有的check是否全选
		}
	return;
	} else {
		$(this).prev().prev().val(num); //重新放到里边
		var price = tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_price").children("span").html() //单价
		tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_total").children("span").html(price * num) //单价*数量
			//	console.log(price);
			//	console.log(tr.children(":eq(1)").children(".col_content").children(".item_content").children(".col_total").children("span").html())
		downdateGoodsById(pid, 1); //本地cookie的数量减少1

		getTotalPrice(); //更新总价格
		checkAllcheckBox(); //检查所有的check是否全选
		return
	}
});

/*
 	删除商品操作
 */
$("#tbody .del").click(function() {

	if(confirm("您真的不要了吗？")) { //true

		var tr = $(this).parents("tr");
		var pid = tr.attr("pid");
		tr.remove();
		deleteGoodsById(pid);
		getTotalPrice();

		$(".cart_nothing").css({
			"display": "block"
		});
		$(".account").css({
			"display": "none"
		});
		$(".account_list").css({
			"display": "none"
		});
		$(".divPriceTotal").css({
			"display": "none"
		});
		return;
	};
});