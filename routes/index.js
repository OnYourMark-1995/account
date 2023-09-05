var express = require('express');
var router = express.Router();


const AccountModel = require('../models/AccountMode');
const moment = require('moment');

/* 记账本列表 */
router.get('/account', function(req, res, next) {
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if(err){
      res.status(500).send('读取失败')
    }

    res.render('list', {accounts: data, moment: moment})
  })
});

/* 添加记录页面 */
router.get('/account/create', function(req, res, next) {
  res.render('create')
});

//添加记录，并返回添加成功的提示
router.post('/account', (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if(err){
      res.status(500).send('插入失败')
      return;
    }
    res.render('success', {msg: '添加成功', url:'/account'})
  })
})

//删除记录
router.get('/account/:id', (req, res) => {
  let id = req.params.id

  AccountModel.deleteOne({_id: id}, (err, data) => {
    if(err){
      res.status(500).send('删除失败')
      return;
    }
    res.render('success', {msg: '删除成功', url:'/account'})
  })
})

module.exports = router;
