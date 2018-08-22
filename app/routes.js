// 基本信息路由控制
var baseRoutes = require('./routeList/baseRoutes/baseRoutes');
var loginRoutes = require('./routeList/login/loginRoutes');
// 返回类型
var returnResult = require('./utils/returnResult');
//用来创建和确认用户信息摘要
var jwt = require('jsonwebtoken');
//导入模型数据模块
var Dao = require('../app/models/base/dao');
// app/routes.js
module.exports = function (app) {

	// 处理基本管理模块
	app.use('/base', isLoggedIn, baseRoutes);
	// 处理系统模块
	app.use('/sys', loginRoutes);

};

// 路由中间件
function isLoggedIn(req, res, next) {

	//检查post的信息或者url查询参数或者头信息
	var token = req.headers['authentication'];
	// 解析 token
	if (token) {
		// 确认token
		jwt.verify(token, 'secret', function (err, decoded) {
			if (err) {
				return res.end(returnResult.ERRORMSG('token信息错误'));;
			} else {
				// 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
				// req.api_user = decoded;
				// console.dir(req.api_user);
				// 保存增删改操作记录
				// 获取url
				var url = req.originalUrl;
				if ((req.body.table !== 'base_system_log') && ((url.indexOf("delete") != -1) || (url.indexOf("save") != -1))) {
					var modulUrl = url.substring(url.indexOf("/", 0) + 1, url.indexOf("/", 1));
					var myDate = new Date(); // 获取系统当前时间
					var nowTime = myDate.toLocaleString();
					var modulName;
					if (modulUrl === 'base') {
						modulName = '基础管理';
					}
					// 获取子模块
					var tableName = req.body.table
					if (tableName === 'base_user')
						tableName = '用户管理';
					if (tableName === 'base_role')
						tableName = '角色管理';
					if (tableName === 'base_module')
						tableName = '模块管理';
					if (tableName === 'base_authorization')
						tableName = '授权管理';
					if (tableName === 'base_org')
						tableName = '组织机构';
					if (tableName === 'base_department_name')
						tableName = '部门名称';
					if (tableName === 'base_department_user')
						tableName = '部门人员';
					var operation;
					if (url.indexOf("delete") != -1) {
						operation = '删除';
					} else {
						// 因为保存和修改方法写在一起这里要进行判断
						if (req.body.data.id == undefined || req.body.data.id == '' || req.body.data.id == null) {
							operation = '新增';
						} else {
							operation = '修改';
						}
					}
					// 获取访问ip
					var ipInfo = req.connection.remoteAddress.substring(req.connection.remoteAddress.lastIndexOf(':') + 1);
					var data = {
						accessTime: nowTime,
						userName: JSON.parse(decoded.data).username,
						modulName: modulName+'/'+tableName,
						operation: operation,
						accessIp: ipInfo,
					}
					Dao.SystemLogDao.create(data, function (err) {
						if (!err) {
							console.log('保存操作成功');
						}
					})
				}
				next();
			}
		});
	} else {
		// 如果没有token，则返回错误
		// 验证错误
		res.end(returnResult.ERRORMSG('请登录'));;
	}


}



