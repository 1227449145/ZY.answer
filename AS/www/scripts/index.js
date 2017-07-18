// 从本地缓存 cookie 中取出 petname 的值
var petname = $.cookie('petname');

// 点击了提问按钮
$('#ask').click(function(){
	console.log(petname);
	petname ? location.href = 'ask.html' : location.href = 'login.html';
});

// 判断有没有登录，决定 user 图片样式和行为
if(petname){
	// 如果用户登录了 则可以将用户名显示出来
	$('#user').find('span').last().text(petname);
}else{
	$('#user').find('span').last().text('登录').end().end().
	removeAttr('data-toggle').click(function(){
		location.href = 'login.html';
	});
}

// 获取首页的数据
$.get('/question/all',function(resData){
	console.log(resData);

	// 拼接HTML标签和上面要显示的内容
	var htmlStr = '';
	for(var i = 0;i < resData.length; i++){
		var question = resData[i];
		// 这是外层
		htmlStr += '<div class="media" data-question="' + new Date(question.time).getTime() + '">'
		// 内层第一块,显示头像的地方 pull-left
		htmlStr += '<div class="media-left"><a>'
		htmlStr += '<img class="media-object" src="../uploads/' + question.petname + '.jpg" onerror="defaultHeaderImage(this)">'
		htmlStr += '</a></div>'
		// 内层第二块,显示问题用的
		htmlStr += '<div class="media-body">'
		htmlStr += '<h4 class="media-heading">' + question.petname + '</h4>'
		htmlStr += question.content
		htmlStr += '<div class="media-footing">' + formatDate(new Date(question.time)) + '&#x3000;' + formatIp(question.ip) + '</div>';
		htmlStr += '</div></div>'
		
	
	
	// 判断这个问题 是否有人回答过
		if(question.answers){
			// 有人回答过,显示回答
			for(var j = 0; j < question.answers.length; j++){
				var answer = question.answers[j];
				// 内部的外层
				htmlStr += '<div class="media media-child">'
				// 内层的第一块
				htmlStr += '<div class="media-body">'
				htmlStr += '<h4 class="media-heading">' + answer.petname + '</h4>'
				htmlStr += answer.content
				htmlStr += '<div class="media-footing">' + formatDate(new Date(answer.time)) + '&#x3000;' + formatIp(answer.ip) +'</div>';
				htmlStr += '</div>'
				// 内层第二块
				htmlStr += '<div class="media-right"><a>'
				htmlStr += '<img class="media-object" src="../uploads/' + answer.petname + '.jpg" onerror="defaultHeaderImage(this)">'
				htmlStr += '</a></div></div>'
			}	
		}
		htmlStr += '<hr>'
	}
		
		$('.questions').html(htmlStr);
});

// 封装一个方法,解析 date用的
function formatDate(time){
	var y = time.getFullYear();
	var M = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var m = time.getMinutes();
	M = M < 10 ? '0' + M : M;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	// 返回例如 : 2017-03-23
	return y + '-' + M + '-' + d + ' ' + h + ':' + m;
}
// 封装一个方法,解析 ip 用的
function formatIp(ip){
	console.log(ip);
	if(ip.startsWith('::1')){
		return 'localhost';
	}
	else{
		return ip.substr(7);
	}
}

// 如果没有上传头像,那么加载默认图片
function defaultHeaderImage(th){
	th.src = '../images/user.png'
}

//    排序问题
//    XSS 跨网站攻击
//    

// 退出登录
$('#logout').click(function(){
	$.get('/user/logout',function(resData){
		// 重新刷新当前页面
		location.reload();
	});
});


// 给每个问题添加点击事件
$('.questions').on('click','.media[data-question]',function(){
	if(petname){
		// 用户已登录
		var cook = $(this).data('question');
//		alert(cook)
		$.cookie('question',cook);
		location.href = 'answer.html'
	}
	else{
		// 用户未登录，请先进行登录
		location.href = 'login.html';
	}
});

