let models = require('../db')
let express = require('express')
let router = express.Router()
var multer = require('multer')
// var fs = require('fs')
let mysql = require('mysql')
let $sql = require('../sqlMap')

const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'LLC-jiYN2jRp2aLm-5CdDQiHViOZjyLrG9-s6k3F'
const secretKey = 'szqZl3tVVxUfVbqdIUmmRdK_fM94g1JY-3XCojo9'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'zzqblog', // 对象存储空间名字
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

let conn = mysql.createConnection(models.mysql)

conn.connect()

let jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 获取七牛云上传token
router.get('/getToken', (req, res, next) => {
  const token = uploadToken
  jsonWrite(res, {status: 200, message: '上传凭证获取成功', data: token})
})

var upload = multer({ dest: 'upload/' })
router.post('/uploadImg', upload.single('file'), function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  // res.json({ name: req.file.filename })
  jsonWrite(res, {status: 200, message: '上传成功！', data: req.file.filename})
})
router.get('/preview/:name', (req, res) => {
  console.log(req.params.name)
  res.sendFile(`upload/${req.params.name}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  }, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})
// router.post('/uploadImg', upload.single('file'), function (req, res, next) {
//   var file = req.file
//   console.log(file)
//   res.set({'content-type': 'application/json; charset=utf-8'})
//   jsonWrite(res, {status: 200, message: 'success', data: 'http://192.168.1.235:3000/upload/' + file.filename})
//   // res.send('12')
// })
// let storage = multer.diskStorage({
//   // 设置上传后文件路径，"d:/myapp/public/uploads文件夹"会自动创建。
//   destination: function (req, file, cb) {
//     cb(null, '/upload')
//   },
//   // 给上传文件重命名，获取添加后缀名
//   filename: function (req, file, cb) {
//     var fileFormat = (file.originalname).split('.')
//     cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
//   }
// })
// var upload = multer({ storage: storage })
// // 访问路径
// // 单文件上传获取信息
// router.post('/uploadImg', upload.single('myfile'), function (req, res, next) {
//   var file = req.file
//   console.log('original file name is ' + file.originalname) // original file name is 20170615_211619.jpg
//   console.log('file name is ' + file.filename) // file name is myfile-1511013577361.jpg
//   jsonWrite(res, {status: 200, message: '上传成功！', data: file.filename}) // 这行代码必须要有，否则Browser会处于wait状态。
// })
// 上传图片
// 注意：1、'upload_file'  对应于 form 表单中的 name 属性值。
// 2、代码 执行完 upload.single('upload_file') 的时候，文件就已经上传了，但是没有后缀名，得手动改一下
// router.post('/uploadImg', multer({dest: 'upload'}).single('file'), function (req, res, next) {
//   if (req.file.length === 0) {
//     res.render('error', {message: '上传文件不能为空！'})
//   } else {
//     let file = req.file
//     // let fileInfo = {}
//     // fs.renameSync('./upload/' + file.filename, './upload/' + file.originalname)
//     // // 获取文件信息
//     // fileInfo.mimetype = file.mimetype
//     // fileInfo.originalname = file.originalname
//     // fileInfo.size = file.size
//     // fileInfo.path = file.path
//     // console.log(fileInfo)
//     // // 设置响应类型及编码
//     // res.set({'content-type': 'application/json; charset=utf-8'})
//     // // res.end('上传成功！')
//     // // let mDATA =
//     jsonWrite(res, {status: 200, message: '上传成功！', data: 'http://192.168.1.235:3000/api' + fileInfo.path})
//   }
// })
// 添加文章
router.post('/insertArticle', (req, res) => {
  let params = req.body
  console.log(params)
  conn.query($sql.admin.insertArticle, [params.title, params.headimg, params.creattime, params.author, params.content, params.introduce, params.classify], (error, result) => {
    if (error) {
      throw error
    } else {
      jsonWrite(res, {status: 200, message: '文章发表成功', data: result})
    }
  })
})
module.exports = router
