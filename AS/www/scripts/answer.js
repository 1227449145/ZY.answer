
// 返回上一页
$('#goBack').click(function(){
	history.go(-1);
});

// 返回首页的方法
$('#home').click(function(){
	location.href = 'index.html';
});

// 提交回答的方法
$('form').submit(function(event){
	// 阻止默认提交事件
	event.preventDefault();
	
	var data = $(this).serialize();
	$.post('/question/answer',data,function(resData){
		$('.modal-body').text(resData.message);
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData.code == 3){
				location.href = 'index.html';
			}
		});
	});
});
