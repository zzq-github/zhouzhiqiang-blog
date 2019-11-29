<template>
  <div style="overflow: hidden;">
    <div class="detail_title">
      <h1 style="color:#00b38a;">{{articleObj.title}}</h1>
      <p style="margin-top:20px;">
        <span>发布时间：{{switchTime(Number(articleObj.creattime), 'YYYY-MM-DD hh:mm')}}</span>
        <span style="margin:0 12px;"></span>
        <span style="margin-right: 12px;">作者：{{articleObj.author}}</span>
        <span>分类：{{articleObj.classify == '0'?'前端文章':articleObj.classify == '1'?'后台文章':'新闻杂谈'}}</span>
      </p>
    </div>
    <div class="detail_content" id="content">
      <div v-html="articleObj.content"></div>
      <!-- {{articleObj.content}} -->
    </div>
    <Button type="success" icon="ios-thumbs-up" ghost style="margin-top:40px;">点个赞</Button>
    <div class="comment">
      <h1 style="color:#00b38a;text-align:left;padding-bottom:40px;">发表评论</h1>
      <i-form ref="commentForm" :model="commentForm" :rules="ruleValidate" :label-width="80">
        <form-item label="姓名" prop="username">
          <i-input v-model="commentForm.username" placeholder="输入用户名"></i-input>
        </form-item>
        <form-item label="邮箱" prop="email">
          <i-input v-model="commentForm.email" placeholder="输入邮箱"></i-input>
        </form-item>
        <form-item label="内容" prop="content">
          <i-input type="textarea" v-model="commentForm.content" placeholder="评论内容" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </form-item>
        <form-item>
          <div style="width:100%;text-align:left;">
            <Button type="success" @click="commentSubmit('commentForm')" :loading="loading">提交评论</Button>
          </div>
        </form-item>
      </i-form>
    </div>
    <!-- 评论列表 -->
    <div class="comment_list" v-for="item in commentList" :key="item.commentid">
      <div class="comment_wrap">
        <div class="avatar">
          <img src="../../../../assets/img/avater.jpg" alt="">
        </div>
        <div>
          <div class="info">
            <span style="font-size: 10px;color:#00b38a;">{{item.visitor}}</span>
            <span style="font-size: 10px;margin:0 12px;">{{switchTime(Number(item.commenttime), 'YYYY-MM-DD hh:mm')}}</span>
            <!-- <span :id="item.commentid" style="color:#5cadff;" title="回复">评论</span> -->
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { switchTime } from '@/uitls/tool'
import { queryArticleId, selectComment, postComment } from '@/api/baseApi'
export default {
  name: 'articleDetail',
  data () {
    return {
      commentList: [],
      commentForm: {
        username: '',
        email: '',
        content: ''
      },
      ruleValidate: {
        username: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {pattern: /^([a-zA-Z0-9])*[a-zA-Z0-9]+@([a-zA-Z0-9])*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '邮箱格式不正确', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '评论内容不能为空', trigger: 'blur'}
        ]
      },
      id: '',
      articleObj: {},
      switchTime: switchTime,
      loading: false
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.queryArticle()
    this.queryComment()
  },
  methods: {
    // 根据id 查询文章详情
    queryArticle () {
      this.$Spin.show()
      this.$axios.get(`${queryArticleId}?id=${this.id}`).then(res => {
        console.log(res.data)
        this.articleObj = res.data.data
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.$Spin.hide()
      })
    },
    // 查询评论
    queryComment () {
      this.$axios.get(`${selectComment}?id=${this.id}`).then(res => {
        console.log(res.data)
        this.commentList = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 发表评论
    commentSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '提示',
            content: '确认发表评论？',
            onOk: () => {
              this.loading = true
              let params = {
                articleid: Number(this.id),
                visitor: this.commentForm.username,
                email: this.commentForm.email,
                content: this.commentForm.content,
                commenttime: (new Date()).getTime()
              }
              console.log(params)
              this.$axios.post(postComment, params).then(res => {
                this.$Message.info(res.data.message)
                this.$refs[name].resetFields()
                this.queryComment()
              }).catch(error => {
                console.log(error)
              }).finally(_ => {
                this.loading = false
              })
            },
            onCancel: () => {
              this.$Message.info('取消发表评论')
            }
          })
        } else {
          this.$Message.error('请填写正确的信息!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    onClick () {
      console.log(111)
    }
  }
}
</script>

<style scoped>
.detail_title{
  width: 60%;
  margin: 0 auto;
  border-bottom: 1px dashed #dcdee2;
  padding-bottom: 40px;
  margin-bottom: 40px;
}
.detail_content{
  width: 50%;
  margin: 0 auto;
  min-height: 380px;
  text-align: left;
}
.comment{
  width: 60%;
  margin: 0 auto;
  border-top: 1px dashed #dcdee2;
  border-bottom: 1px dashed #dcdee2;
  padding-top: 40px;
  margin-top: 40px;
}
.comment_list{
  width: 60%;
  margin: 20px auto;
  padding: 10px 0;
  border-bottom: 1px dashed #dcdee2;
}
.comment_wrap{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.avatar{
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius:50%;
  overflow: hidden;
}
.avatar img{
  width: 100%;
  height: 100%;
}
.info{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #808695;
  margin-right: 28px;
  cursor: pointer;
  margin-bottom: 16px;
}
.content{
  max-width: 800px;
  max-height: 80px;
  color: #000;
  letter-spacing: 1.5px;
  text-align: left;
}
</style>
