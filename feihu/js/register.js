$(".userName").focus(checkUserName); ///获得焦点
$(".userName").blur(checkUserName); //失去焦点
$(".userName").keyup(checkUserName); //键盘离开
//用户名
function checkUserName(e) {
	var val = $(".userName").val();
	var tips = $(".userName").parent().next().children();

	if(e) {
		if(e.type == "focus") {
			if(val.length == 0) {
				$(tips).show().html("5-20位字符，可由英文、数字组成");
			};
			return false;
		};
		if(e.type == "blur") {
			if(val.length == 0) {
				$(tips).html("用户名不能为空")
			};
			return false;

		};
	};
	if(val.length == 0) {
		$(tips).html("请输入用户名")
	} else {
		var reg = /^[A-Za-z0-9]+$/;
		if(reg.test(val)) {
			//验证通过
			if(val.length > 4 && val.length < 20) {
				$(tips).hide();
				return true;
			} else {
				$(tips).show().html("用户名长度必须在4-20位之间");
				return false;
			};
		} else {
			$(tips).show().html("用户名必须有字母数字组成");
			return false;
		};
	};
};

//密码
$(".pwd").focus(checkUserpwd); ///获得焦点
$(".pwd").blur(checkUserpwd); //失去焦点
$(".pwd").keyup(checkUserpwd); //键盘离开
function checkUserpwd(e) {
	var val = $(".pwd").val();
	var tips = $(".pwd").parent().next().children();

	if(e) {
		if(e.type == "focus") {
			if(val.length == 0) {
				$(tips).show().html("6-16位字符，可由英文、数字及特殊字符组成");
			};
			return false;
		};
		if(e.type == "blur") {
			if(val.length == 0) {
				$(tips).html("密码不能为空")
			};
			return false;
		};
	};
	if(val.length == 0) {
		$(tips).html("请输入密码")
	} else {
		if(val.length > 6 && val.length < 16) {

			var regNum = /\d+/; //数字
			var regWord = /[a-zA-Z]+/; //字母
			var regother = /[^a-zA-Z\d]+/; //除数字字母以外的
			var leval = 0;
			if(regNum.test(val)) {
				leval++;
			}
			if(regWord.test(val)) {
				leval++;
			}
			if(regother.test(val)) {
				leval++;
			};
			switch(leval) {
				case 1:
					$(tips).addClass("ruo").removeClass("zhong qiang");
					$(tips).html("");
					break;
				case 2:
					$(tips).addClass("zhong").removeClass("ruo qiang");
					$(tips).html("");
					break;
				case 3:
					$(tips).addClass("qiang").removeClass("zhong ruo");
					$(tips).html("");
					break;
			};

			return true;
		} else {
			$(tips).show().html("密码长度必须在6-16位之间");
			$(tips).removeClass("ruo zhong qiang");
			return false;
		};
	};
};

/*------------确认密码-----------------*/
$(".checkpwd").focus(checkCheckUserpwd); ///获得焦点
$(".checkpwd").blur(checkCheckUserpwd); //失去焦点
$(".checkpwd").keyup(checkCheckUserpwd); //键盘离开
function checkCheckUserpwd(e) {
	var val = $(".checkpwd").val(); //输入的内容
	var tips = $(".checkpwd").parent().next().children(); //提示信息
	var pwdVal = $(".pwd").val(); //

	if(e) {
		if(e.type == "focus") {
			if(val.length == 0) {
				$(tips).show().html("请再次输入密码");
			};
			return false;
		};
		if(e.type == "blur") {
			if(val.length == 0) {
				$(tips).html("请重新输入密码")
			};
			return false;

		};
	};
	if(val.length == 0) {
		$(tips).html("请再次输入密码");
		return false;
	} else {
		if(val == pwdVal) {
			$(tips).hide();
			return true;
		} else {
			$(tips).html("两次密码输入不一致");
			return false;
		}
	};
};

/*-------------邮箱-------------*/

$(".emall").focus(checkemall); ///获得焦点
$(".emall").blur(checkemall); //失去焦点
$(".emall").keyup(checkemall); //键盘离开
//用户名
function checkemall(e) {
	var val = $(".emall").val();
	var tips = $(".emall").parent().next().children();

	if(e) {
		if(e.type == "focus") {
			if(val.length == 0) {
				$(tips).show().html("请输入邮箱，用来找回密码、接受订单通知等");
			};
			return false;
		};
		if(e.type == "blur") {
			if(val.length == 0) {
				$(tips).html("邮箱格式不正确")
			};
			return false;

		};
	};
	if(val.length == 0) {
		$(tips).html("请输入邮箱")
	} else {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if(reg.test(val)) {
			//验证通过
			$(tips).hide();
			return true;
		} else {
			$(tips).show().html("邮箱格式不正确");
			return false;
		};
	};
};

/*-----验证码-------*/
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var str = "";
for(var i = 0; i < 4; i++) {
	var index = Math.floor((Math.random() * arr.length));
	str += arr[index];
};

//console.log(ARR.split());
var span = $(".pic");
span.html(str);
//console.log(str)

$(".verify").focus(checkverify); ///获得焦点
$(".verify").blur(checkverify); //失去焦点
$(".verify").keyup(checkverify); //键盘离开
function checkverify(e) {
	var val = $(".verify").val();

	var tips = $(".verify").parent().next().children();

	if(e) {
		if(e.type == "focus") {
			if(val.length == 0) {
				$(tips).show().html("请输入图片中的数字");
			};
			return false;
		};
		if(e.type == "blur") {
			if(val.length == 0) {
				$(tips).html("请填写验证码")
			};
			return false;

		};
	};
	if(val.length == 0) {
		$(tips).html("请填写验证码");
		return false;
	} else {

		if($(".pic").html() == val) {
			$(tips).hide();

			return true;
		} else {
			$(tips).html("验证码错误，请重新输入！");
			return false
		}

	};
};

var flag = true;
$(".checkbox").change(function() {

	$(".checkbox")[0].checked = flag;
	if(flag) {
		//		console.log(1)//选中
		flag = false;
		$(".lastTd .text_tips").hide();
		return;
	} else {
		//		console.log(0)//未选中
		$(".lastTd .text_tips").show();
		$(".lastTd .text_tips").html("请先阅读并同意飞虎乐购用户协议");

		flag = true;
		return;
	}

})

/*----------注册按钮----------*/

$(".btn_register").click(function() {
	var flag = false;
	var checkbox = $(".checkbox")[0].checked;
	var tips = $(".checkbox").parent().parent().next().children();
	var userTips = $(".userName").parent().next().children();
	var pwdTips = $(".pwd").parent().next().children();
	var checkPwdTips = $(".checkpwd").parent().next().children();
	var emallTips = $(".emall").parent().next().children();
	var verifyTips = $(".verify").parent().next().children();
	var text_tips = $("lastTd .text_tips");
	/*账号*/
	if(checkUserName()) {
		/*密码*/
		if(checkUserpwd()) {
			/*确认密码*/
			if(checkCheckUserpwd()) {
				/*邮箱*/
				if(checkemall()) {
					/*验证码*/
					if(checkverify()) {
						if($(".checkbox")[0].checked) {
							//验证通过
							flag = true;
//							console.log(flag);
							if(flag) {
//								console.log(1);
								var userName = $(".userName").val();
								var userPwd = $(".pwd").val();
//								console.log(userName);
//								console.log(userPwd);
								var isHave = isHaveUserName(userName);
								if(isHave){//有
									alert("该用户名已注册，请重新注册")
								}else{//无
									var obj = {username:userName,pwd:userPwd};
									addNewsToCookie(obj);
									alert("注册成功，请登录");
									getUserNameObj();
									location.href = "http://localhost/feihu/client/login.html";
								}
								
								

							} else {
								return false;
							}
						} else {
							//							console.log(0)//验证不通过
							$(".lastTd .text_tips").show();
							$(".lastTd .text_tips").html("请先阅读并同意飞虎乐购用户协议");
						}

					} else {
						verifyTips.show();
						verifyTips.html("验证码错误，请重新输入！")
						alert("验证码错误，请重新输入！");
					};

				} else {
					emallTips.show();
					emallTips.html("邮箱格式不正确");
					alert("邮箱格式不正确");
				}
			} else {
				checkPwdTips.show();
				checkPwdTips.html("请重新输入密码");
				alert("请重新输入密码");
			};
		} else {
			$(tips).removeClass("ruo zhong qiang");
			pwdTips.show();
			pwdTips.html("密码不能为空");
			alert("密码不能为空");
		}
	} else {
		userTips.show();
		userTips.html("用户名不能为空");
		alert("用户名不能为空");
	};

})