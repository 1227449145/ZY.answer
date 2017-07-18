
// 返回上一页
$('#goBack').click(function(){
	history.go(-1);
});

// 返回首页的方法
$('#home').click(function(){
	location.href = 'index.html';
});

// 提交问题的方法
$('form').submit(function(event){
	// 阻止默认提交事件
	event.preventDefault();
	// 发送登录请求
	var data = $(this).serialize();
	$.post('/question/ask',data,function(resData){
		$('.modal-body').text(resData.message);
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData.code == 3){
				location.href = 'index.html';
			}
		});
	});
});



