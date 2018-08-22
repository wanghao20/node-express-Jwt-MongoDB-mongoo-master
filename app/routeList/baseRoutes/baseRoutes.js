/**
 * Created by wh 2018/8/21
 * 基本信息路由含通用方法
 */
// 框架
var express = require('express');
// 加密
var bcrypt = require('bcrypt-nodejs');
// 返回类型
var returnResult = require('../../utils/returnResult');
// 路由
var router = express.Router();
//导入模型数据模块
var Dao = require('../../models/base/dao');
// number-random，生成随机数字
const random = require('number-random');


// 获取数据字典数据
router.get('/getDictionary', function (req, res) {


})
// 根据Pid获取模块
router.get('/getModuleByPid', function (req, res) {

	Dao.ModuleDao.find(function (err, data) {
		res.end(JSON.stringify(data))
	});
})
/**
 * 获取all数据(用于client分页)
 * 传入表名自动返回对应数据
 */
router.get('/getListAll', function (req, res) {

	if (req.query.table == '' || req.query.table == null || req.query.table == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数Table'));
		return;
	}
	var dao;
	// 判断请求是否是user表
	if (req.query.table == 'base_user') {
		dao=Dao.UserDao
	}
	if (req.query.table == 'base_role'){
		dao=Dao.RoleDao;
	}
	if (req.query.table == 'base_module'){
		dao=Dao.ModuleDao;
	}
	if (req.query.table == 'base_authorization'){
		dao=Dao.AuthorizationDao;
	}
	if (req.query.table == 'base_org'){
		dao=Dao.OrgDao;
	}
	if (req.query.table == 'base_department_name'){
		dao=Dao.DepartmentNameDao;
	}
	if (req.query.table == 'base_department_user'){
		dao=Dao.DepartmentUserDao;
	}
	if (req.query.table == 'base_system_log'){
		dao=Dao.SystemLogDao;
	}

	if(dao)
	dao.find(function (err, data) {
		res.end(JSON.stringify(data))
	});
})

// 获取单个数据
router.get('/getOne', function (req, res) {
	if (req.query.id == '' || req.query.id == null || req.query.id == undefined || req.query.table == '' || req.query.table == null || req.query.table == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数id或者table'));
		return;
	}
})

// 删除单个信息
router.post('/delete', function (req, res) {

	if (req.body.id == '' || req.body.id == null || req.body.id == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数id'));
		return;
	}
	if (req.body.table == '' || req.body.table == null || req.body.table == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数Table'));
		return;
	}
	var dao;
	// 判断请求是否是user表
	if (req.body.table == 'base_user') {
		dao=Dao.UserDao
	}
	if (req.body.table == 'base_role'){
		dao=Dao.RoleDao;
	}
	if (req.body.table == 'base_module'){
		dao=Dao.ModuleDao;
	}
	if (req.body.table == 'base_authorization'){
		dao=Dao.AuthorizationDao;
	}
	if (req.body.table == 'base_org'){
		dao=Dao.OrgDao;
	}
	if (req.body.table == 'base_department_name'){
		dao=Dao.DepartmentNameDao;
	}
	if (req.body.table == 'base_department_user'){
		dao=Dao.DepartmentUserDao;
	}
	if (req.body.table == 'base_system_log'){
		dao=Dao.SystemLogDao;
	}
	if(dao)
	dao.deleteOne({ _id: req.body.id }, function (err) {
		if (!err) {
			res.end(returnResult.SUCCESS());
		}
	});

})
// 保存用户信息(新增/修改)
router.post('/save', function (req, res) {

	if (req.body.data == '' || req.body.data == null || req.body.data == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数id'));
		return;
	}
	if (req.body.table == '' || req.body.table == null || req.body.table == undefined) {
		res.end(returnResult.ERRORMSG('请传入参数Table'));
		return;
	}
	var data=req.body.data;
	var dao;
	var myDate = new Date();
	// 判断请求是否是user表
	if (req.body.table == 'base_user') {
		dao = Dao.UserDao
		var user =data;
		var password = bcrypt.hashSync(user.password, null, null)
		user.password = password;
		if (user.id == undefined || user.id == '' || user.id == null) {
			user.createDate = myDate.toLocaleString();
			user.numbering = random(9000000000);
			//新增
			// 判断登录名是否存在
			dao.find({ username: user.username, }, function (err, docs) {
				if (docs.length > 0) {
					res.end(returnResult.ERRORMSG('登录名已存在!'));
					return;
				}
			})
			dao.create(user, function (err) {
				if (!err) {
					res.end(returnResult.SUCCESS());
				}
			})

		} else {
			user.modifyDate = myDate.toLocaleString()
			// 修改
			dao.updateOne({ _id: user.id }, { $set: user }, function (err, docs) {
				if (!err) {
					res.end(returnResult.SUCCESS());
				}
			})

		}

	}
	// 判断是否是role
	if(req.body.table == 'base_role'){
		dao = Dao.RoleDao
	}
	if (req.body.table == 'base_module'){
		dao=Dao.ModuleDao;
	}
	if (req.body.table == 'base_authorization'){
		dao=Dao.AuthorizationDao;
	}
	if (req.body.table == 'base_org'){
		dao=Dao.OrgDao;
	}
	if (req.body.table == 'base_department_name'){
		dao=Dao.DepartmentNameDao;
	}
	if (req.body.table == 'base_department_user'){
		dao=Dao.DepartmentUserDao;
	}
	if(dao && req.body.table !== 'base_user')
	if (data.id == undefined || data.id == '' || data.id == null) {
		data.numbering = random(9000000000);
		data.createDate = myDate.toLocaleString();
		dao.create(data, function (err) {
			if (!err) {
				res.end(returnResult.SUCCESS());
			}
		})

	} else {
		data.modifyDate = myDate.toLocaleString()
		// 修改
		dao.updateOne({ _id: data.id }, { $set: data }, function (err, docs) {
			if (!err) {
				res.end(returnResult.SUCCESS());
			}
		})

	}


})
module.exports = router;
