// 返回上一页
$('#goBack').click(function(){
	history.go(-1)
})
// 首页
$('#home').click(function(){
	location.href = 'index.html'
})

// 提交表单
$('form').submit(function(event){
	// 阻止默认提交事件
	event.preventDefault();
	// 比较密码和确认密码是否相同
	var password = $('input[type=password]').map(function(){
		// 遍历出两个密码输入框中的内容
		return $(this).val();
	})
	
	if(password[0] != password[1]){
		$('.modal-body').text('两次密码输入不一致，请重新输入')
		$('#myModal').modal('show');
		return;
	}
	// 用提交表单的元素值，编译成字符串
	var data = $(this).serialize();
//	console.log(data)
	$.post('/user/register',data,function(resData){
		// 提示用户的注册结果
		$('.modal-body').text(resData.message);
		// hide.bs.modal 模态消失后我们要做的操作
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData.code == 3){
				// 跳转到登录页面
				location.href = 'login.html';
			}
		});
	});
	
	
	
})







