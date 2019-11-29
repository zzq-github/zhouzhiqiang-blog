let baseHost = 'http://www.zzqlyy.com:3000'
// let baseHost = 'http://192.168.1.235:3000'

// 登录
export let login = baseHost + '/api/user/login'
// 注册
export let addUser = baseHost + '/api/user/addUser'
// 查询所有文章
export let queryAllArticle = baseHost + '/api/user/queryAllArticle'
// 查询八条文章
export let queryNewArticle = baseHost + '/api/user/queryNewArticle'
// 根据id查询文章详情
export let queryArticleId = baseHost + '/api/user/queryArticleId'
// 根据文章id查询文章评论
export let selectComment = baseHost + '/api/user/selectComment'
// 发表评论
export let postComment = baseHost + '/api/user/postComment'
// 后台接口
// 发表文章
export let insertArticle = baseHost + '/api/admin/insertArticle'
// 上传图片
export let uploadImg = baseHost + '/api/admin/uploadImg'
// 查看图片
export let preview = baseHost + '/api/admin/preview'
// 获取七牛云token
export let getToken = baseHost + '/api/admin/getToken'
