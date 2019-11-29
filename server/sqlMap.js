// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(userid, username, password) value (0, ?, ?)',
    queryByName: 'select 1 from user where username =? limit 1',
    queryAllUser: 'select * from user',
    login: 'select * from user where username=? and password=?',
    queryAllArticle: 'select * from article order by creattime',
    queryNewArticle: 'select * from article limit 8',
    queryArticleId: 'select * from article where id=?',
    addComment: 'insert into comment(commentid,articleid,visitor,email,content,commenttime) value (0, ?,?,?,?,?)',
    queryComment: 'select * from comment where articleid=?'
  },
  admin: {
    insertArticle: 'insert into article(id,title,headimg,creattime,author,content,introduce,classify) value (0,?,?,?,?,?,?,?)'
  }
}

module.exports = sqlMap
