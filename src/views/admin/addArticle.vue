<template>
<div style="width:840px;margin:0 auto;">
  <h2 style="margin:40px 0;color:#464c5b;">发表文章<Button type="text" @click="toHome" style="margin-left: 8px">返回首页</Button></h2>
  <i-form ref="articleForm" :model="articleForm" :rules="ruleValidate" :label-width="80">
    <form-item label="标题" prop="title">
      <i-input v-model="articleForm.title" placeholder="输入标题"></i-input>
    </form-item>
    <form-item label="简介" prop="introduce">
      <i-input v-model="articleForm.introduce" placeholder="文章简介"></i-input>
    </form-item>
    <form-item label="作者" prop="author">
      <i-input v-model="articleForm.author" placeholder="输入作者" disabled></i-input>
    </form-item>
    <form-item label="分类" prop="classify">
      <RadioGroup v-model="articleForm.classify" style="float:left;">
        <Radio label="0">前端文章</Radio>
        <Radio label="1">后端文章</Radio>
        <Radio label="2">新闻杂文</Radio>
      </RadioGroup>
    </form-item>
    <form-item label="封面图" prop="headImg">
      <Upload
       style="width:148px;height:148"
        v-model="articleForm.headImg"
        type="drag"
        action= '111'
        :format="['jpg','jpeg','png']"
        :max-size="4098"
        :before-upload="upqiniu"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        >
        <img v-if="articleForm.headImg" :src="articleForm.headImg" alt="文章头图" style="width:148px;height:148px;">
        <div style="padding: 20px 0;width:148px;height:148" v-else >
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽上传</p>
        </div>
      </Upload>
    </form-item>
    <form-item label="文章内容" prop="content">
      <tinymce-editor v-model="articleForm.content" ref="editor"></tinymce-editor>
    </form-item>
    <form-item style="float:left;">
      <Button type="success" @click="handleSubmit('articleForm')">发布</Button>
      <Button type="error" @click="handleReset('articleForm')" style="margin-left: 8px">重置</Button>
    </form-item>
  </i-form>
</div>
</template>
<script>
import TinymceEditor from '@/components/tinymce/index'
import { insertArticle, uploadImg, getToken } from '@/api/baseApi'
export default {
  components: {
    TinymceEditor: TinymceEditor
  },
  data () {
    return {
      userinfo: '',
      uploadImg: uploadImg,
      articleForm: {
        title: '',
        author: '',
        headImg: '',
        classify: '0',
        content: '',
        introduce: ''
      },
      ruleValidate: {
        title: [
          {required: true, message: '文章标题不能为空', trigger: 'blur'},
          {max: 30, message: '最多30个字符', trigger: 'change'}
        ],
        headImg: [
          {required: true, message: '文章封面图不能为空', trigger: 'blur'}
        ],
        introduce: [
          {required: true, max: 60, message: '文章简介不能为空，最多60个字符', trigger: 'blur'}
        ],
        classify: [
          {message: '分类不能为空', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '内容不能为空', trigger: 'change'}
        ]
      },
      imageUrl: '',
      token: {},
      // 这是根据你创建空间时所选择的地区
      domain: 'http://up-z2.qiniup.com',
      // 这是七牛云空间的外链默认域名
      qiniuaddr: 'zzqlyy.com'

    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
      this.userinfo = userinfo
      this.articleForm.author = userinfo.username
    },
    toHome () {
      this.$router.push('/home')
    },
    // 上传文件到七牛云
    upqiniu (file) {
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'dfairy' + Date.parse(new Date()) + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      this.$axios.get(getToken).then(res => {
        console.log(res)
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('token', res.data.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$axios.post(this.domain, formdata, config).then(res => {
          console.log(res.data)
          this.articleForm.headImg = 'http://zzqlyy.com' + '/' + res.data.key
          console.log(this.articleForm.headImg)
        })
      })
    },
    // 发表文章
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '提示',
            content: '确认发表文章？',
            onOk: () => {
              let params = {
                title: this.articleForm.title,
                author: this.articleForm.author,
                headimg: this.articleForm.headImg,
                classify: this.articleForm.classify,
                content: this.articleForm.content,
                introduce: this.articleForm.introduce,
                creattime: (new Date()).getTime()
              }
              this.$axios.post(insertArticle, params).then(res => {
                this.$Message.info(res.data.message)
                // this.$router.push('/home')
                this.$refs['articleForm'].resetFields()
              }).catch(error => {
                console.log(error)
              })
            },
            onCancel: () => {
              this.$Message.info('取消发表文章')
            }
          })
        } else {
          this.$Message.error('请填写正确的信息!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.articleForm.author = this.userinfo.username
    },
    beforeUpload (file) {
      // let uploadData = new FormData()
      // uploadData.append('file', file)
      // this.$axios.post(uploadImg, uploadData).then(res => {
      //   console.log(res.data)
      //   console.log(preview + '/' + res.data.data)
      //   this.$axios.get(preview)
      //   this.articleForm.headImg = preview + '/' + res.data.data
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
      return false
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 4M。'
      })
      return false
    }
  }
}
</script>
