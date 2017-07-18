var express=require('express')
var fs=require('fs')
var multer=require('multer')
var cookies=require('cookie-parser')
var bodyParser=require('body-parser')
var template=require('art-template')
var mongoose=require('mongoose')

var app=express()
app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:true}))


//var storage=multer.diskStorage({
//	destination:'www/uploads',
//	filename:function(req,res,callback){
//		var name=req.cookies.username
//		callback(null,name+'.jpg')
//	}
//	
//})

mongoose.connect('mongodb://localhost:27017/user')
var db=mongoose.connection
db.on('open',function(){
	console.log('数据库开启成功')
})
db.on('error',function(){
	console.log('数据库开始失败')
})

var Schema=mongoose.Schema
var userSchema=new Schema({
	username:String,
	pwd:String,
	gender:Boolean,
	email:String,
	course:String,
},{collection:'userInfo'})

var User=mongoose.model('user',userSchema)



var questSchema=new Schema({
	user:String,
	content:String,
	time:String,
	ip:String,
	answerInfo:{type:Schema.Types.ObjectId,ref:'user'}
},{collection:'question'})

var Quest=mongoose.model('quest',questSchema)

var answerSchema=new Schema({
	user:String,
	content:String,
	time:String,
	ip:String,
	
},{collection:'answer'})

var Answer=mongoose.model('answer',answerSchema)



app.post('/register',function(req,res){
	console.log(req.body)
	var user=new User({username:req.body.username,
		pwd:req.body.pwd,
		gender:req.body.gender,
		email:req.body.email,
		course:req.body.course})
	
	User.find({username:req.body.username},function(err,data){
//		console.log(data)
		if(!err){
			if(data.length==0){
				user.save(function(err,data,status){
					console.log(data)
						if(!err){
							res.status(200).json({code:3,msg:'注册成功'})
						}else{
							res.status(200).json({code:2,msg:'储存失败'})
						}
					})
			}else{
				res.status(200).json({code:1,msg:'用户存在'})
			}
		}else{
			res.status(200).json({code:0,msg:'查找失败'})
		}
	})
	
	
})

app.post('/login',function(req,res){
//	console.log(req.body)
	User.find({username:req.body.username},function(err,data){
		
		var obj=data[0]
		console.log(obj)
		if(!err){
			if(data.length==0){
				res.status(200).json({code:0,msg:'用户不存在'})
			}else{
				if(obj.username==req.body.username){
					res.status(200).json({code:3,msg:'登录成功'})
				}else{
					res.status(200).json({code:2,msg:'密码错误'})
				}
			}
		}else{
			res.status(200).json({code:1,msg:'查找失败'})
		}
	})
})
//
//
app.post('/question',function(){
	var Time=new Date()
	var y = Time.getFullYear();
	var M = Time.getMonth() + 1;
	var d = Time.getDate();
	var h = Time.getHours();
	var m = Time.getMinutes();
	M = M < 10 ? '0' + M : M;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	var newTime=y + '-' + M + '-' + d + ' ' + h + ':' + m;
	
	
	var ip=req.ip
	
	

	Answer.findOne({content:req.body.AnswerContent},function(err,data){
		if(!err){
			if(data.length==0){
				return
			}else{
				var quest=new Quset({user:req.body.username,content:req.body.content,ip:ip,time:newTime,answerInfo:data._id})
				quest.save(function(err){
				if(!err){
						res.status(200).json({code:3,msg:'提问成功'})
					}else{
						res.status(200).json({code:2,msg:'提问失败'})
					}
				})
			}
		}else{
			res.status(200).json({code:1,msg:'查找失败'})
		}
		
		
		
	})
	
})


app.post('/answer',function(req,res){
	
	
	
	
	var answer=new Answer({user:req.body.username,content:req.body.content,ip:ip,time:newTime,})
	answer.save(function(err){
		if(err){
			res.status(200).json({code:0,msg:'回答失败'})
		}else{
			res.status(200).json({code:3,msg:'回答成功'})
		}
	})
})





app.listen(2000,function(){
	console.log('开启成功')
})
