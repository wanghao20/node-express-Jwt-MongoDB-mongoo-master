# node restful接口  

1. 数据库名-test
1. jwt 8.3.0
1. express  4.13.0
1. MongoDB 4.0.1  
1. mongoose 5.2.9 //https://mongoosejs.com/


此项目只提供restful接口没有页面,适合前后端分离后台
使用以上工具
,运行获取数据请先创建user生成token,或者注掉路由中间件

DBConnectionUtil.js //初始化数据库连接
returnResult.js //封装返回结果

routes.js //主路由控制子路由走向

dao.js //mongoose 封装对应实体,创建Schema(模式)对象
    