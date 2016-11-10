


$(".btn").click(function(){
	var userName = $(".userName").val();
	var userPwd = $(".userPwd").val();
	istrue(userName,userPwd);
	
})


function istrue(username,pwd){
	var userNameObj = getUserNameObj();
	for(var i = 0;i<userNameObj.length;i++){
		if(userNameObj[i].username==username){
			if(userNameObj[i].pwd==pwd){
				alert("登录成功");
				location.href = "http://localhost/feihu/client/client.html"
				return true;
			}else{
				alert("密码输入错误，请确认")
				return false;
			}
		}
	}
}



