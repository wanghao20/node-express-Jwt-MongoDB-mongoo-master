/**
 * Created by wh 2018/8/14
 * 数据库连接池配置实例化
 */
// NPM插件提供mongodb对象建模 //https://mongoosejs.com/
var mongoose = require('mongoose');
// mongoose config
var dbconfig = require('../../config/database');

var mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
mongoose.connect('mongodb://root:root@localhost:27017/test',options,function(err){

    　　if(err){
    
    　　　　console.log('连接 Error:' + err)
    
    　　}else{
    
    　　　　console.log('连接 success!') }
    
    });

mongoose.connection.once("open",function(){
    console.log('数据库连接成功');
});

module.exports = {
    mongoose: mongoose
}