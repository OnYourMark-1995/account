/**
 * 
 * @param {*} success 数据库连接成功时的回调
 * @param {*} error   数据库连接失败的回调
 */

module.exports = function (success, error) {
  //判断是否传入error回调函数，若没有，设置默认值
  if(typeof error !== 'function'){
    error = () => {
      console.log('连接失败！')
    }
  }
  
  const mongoose = require('mongoose')

  mongoose.set('strictQuery', true);

  const {DBHOST, DBPOST, DBNAME} = require('../config/config')

  mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`);

  mongoose.connection.once('open', () => {
    console.log('连接成功，请在浏览器中输入"http://127.0.0.1:3000/account"')
    success()
  })

  mongoose.connection.on('error', () => {
    error()
  })

  mongoose.connection.on('close', () => {
    console.log('close')
  })
}

