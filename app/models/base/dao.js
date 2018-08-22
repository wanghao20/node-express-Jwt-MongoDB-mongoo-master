/**
 * Created by wh 2018/8/21
 * mongo对应实体类
 */
var mongoose = require('../../utils/DBConnectionUtil').mongoose;
var Schema = mongoose.Schema;
// 创建Schema(模式)对象
/**
 * 用户对应实体
 */
var userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    roleId: String,
    roleName: String,
    departmentId: String,
    idCard: String,
    sex: String,
    phone: String,
    type: String,
    photo: String,
    numbering: String,
    remarks: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 权限对应实体
 */
var roleSchema = new Schema({
    numbering: String,
    name: String,
    roleType: String,
    remarks: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 模块对应实体
 */
var moduleSchema = new Schema({
    numbering: String,
     name: String,
     accessPermission: String,
     moduleLinkAaddress: String,
     description: String,
     pName: String,
     pId: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 授权信息对应实体
 */
var authorizationSchema = new Schema({
    numbering: String,
    moduleName: String,
    accessPermission: String,
    authorization: String,
    createDate: String,
    modifyDate: String,
})
/**
 * org对应实体
 */
var orgSchema = new Schema({
    zoning: String,
    orgCode: String,
    orgName: String,
    level: String,
    position: String,
    remarks: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 部门名称对应实体
 */
var departmentNameSchema = new Schema({
    departmentCode: String,
    departmentName: String,
    departmentUser: String,
    remarks: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 部门人员对应实体
 */
var departmentUserSchema = new Schema({
    name: String,
    idCard: String,
    sex: String,
    company: String,
    epartment: String,   
    duties: String,
    phone: String,
    type: String,
    photo: String,
    remarks: String,
    createDate: String,
    modifyDate: String,
})
/**
 * 系统日志对应实体
 */
var systemLogSchema = new Schema({
    accessTime: String,
    userName: String,
    modulName: String,
    operation: String,
    accessIp: String,
})

// 通过Schema来创建Model
// Model代表的是数据库中的集合，通过Model才能对数据库进行操作
// mongoose.model(modelName,schema) (集合名，Schema)
// modelName 就是要映射的集合名，mongoose会自动将集合名变成复数
var UserDao = mongoose.model("base_user",userSchema)
var RoleDao = mongoose.model("base_role",roleSchema)
var ModuleDao = mongoose.model("base_module",moduleSchema)
var AuthorizationDao = mongoose.model("base_authorization",authorizationSchema)
var OrgDao = mongoose.model("base_org",orgSchema)
var DepartmentNameDao = mongoose.model("base_department_name",departmentNameSchema)
var DepartmentUserDao = mongoose.model("base_department_user",departmentUserSchema)
var SystemLogDao = mongoose.model("base_system_log",systemLogSchema)
module.exports = {
    UserDao: UserDao,
    RoleDao: RoleDao,
    ModuleDao: ModuleDao,
    AuthorizationDao:AuthorizationDao,
    OrgDao:OrgDao,
    DepartmentNameDao:DepartmentNameDao,
    DepartmentUserDao:DepartmentUserDao,
    SystemLogDao:SystemLogDao,
}