function getUserNameObj(username){
	var UserNameStr = $.cookie("userName");
	if(!UserNameStr){
		$.cookie("userName","[]");
		UserNameStr = $.cookie("userName");
	}
	var UserNameObj = JSON.parse(UserNameStr);
	return UserNameObj;
}

function checkHasUserName(username){
	var UserNameStr = $.cookie("userName");
	if(!UserNameStr){
		$.cookie("userName","[]");
		UserNameStr = $.cookie("userName");
	}
	var UserNameObj = JSON.parse(UserNameStr);
	return UserNameObj;
}

/*    根据name查找本地是否含有该用户名
 	  name 表示用户名
	 
  */
function isHaveUserName(name){
	var UserNameObj = getUserNameObj();
	var flag = false;           //默认没有
	for(var i=0;i<UserNameObj.length;i++){
		if(UserNameObj[i].username == name){
			flag = true;
			break;
		}
	}
	return flag;
}
/*添加新的用户名到本地cookie中
 user 代表一个用户名和密码
 * */
function addNewsToCookie(user){
	var userNameObj = getUserNameObj();
	userNameObj.push(user)
	var userNameStr = JSON.stringify(userNameObj);
	$.cookie("userName",userNameStr);
}


