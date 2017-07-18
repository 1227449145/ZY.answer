
// 返回上一页
$('#goBack').click(function(){
	history.go(-1)
})
// 首页
$('#home').click(function(){
	location.href = 'index.html'
})

// 上传头像的请求
$('form').submit(function(e){
	
	e.preventDefault();
//	alert('123890')
	// 获取表单的数据
	var data = new FormData(this);
	
	$.post({
		url: '/user/photo',
		data: data,
		contentType: false,
		processData: false,
		success: function(resData){
			$('.modal-body').text(resData.message);
			$('#myModal').modal('show').on('hide.bs.modal',function(){
				if(resData.code == 3){
					location.href = 'index.html';
				}
			});
		}
	})
	
})





