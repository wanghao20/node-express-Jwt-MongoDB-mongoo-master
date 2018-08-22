
// 加载

// 框架
var express = require('express');
// 加密
var bcrypt = require('bcrypt-nodejs');
// 返回类型
var returnResult= require('../../utils/returnResult');
// 路由
var router = express.Router();

//用来创建和确认用户信息摘要
var jwt = require('jsonwebtoken');
var UserDao = require('../../models/base/dao').UserDao;//导入模型数据模块
	// 处理登录表单
	router.post('/login', function (req, res) {
				// 向数据库中插入一个文档
			// StuSchema.create(doc,function(){})
			// UserDao.create({
			// name: "测试",
			// username: 'admin',
			// password:'$10$shKTmA9KDPchzzu9Z9x5NeRptKGoLh92i5NT7ImTry4iG2kLS5GeG'
			// },function(err){
			// if(!err){
			// 	console.log("插入成功")
			// }
			// })
		UserDao.find({username: req.body.username,},function(err,docs){
			if(docs.length< 1){
				res.end(returnResult.ERRORMSG( '用户名错误!'));
				return;
			}
			// compareSync（用户输入，hash密码）
			if (!bcrypt.compareSync(req.body.password, docs[0].password)){
				res.end(returnResult.ERRORMSG( '密码错误!'));
				return;
			}
			// 创建token, exp: 设置过期时间
			var token = jwt.sign({
				exp: Math.floor(Date.now() / 1000) + (60 * 60),
				data: JSON.stringify(docs[0])
			  }, 'secret',);
			// json格式返回token
			var data={
				user:docs[0],
				access_token: token
			};
			// 验证成功
			res.end(returnResult.SUCCESSDATA(data));
		})

	
	});

module.exports = router;
