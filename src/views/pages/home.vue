<template>
  <div class="wrap">
    <div class="layout_wrap" style="max-width:1170px;">
      <div style="width:200px;margin-top:20px;">
        <div class="card_wrap" style="width:100%;">
          <div class="avatar">
            <img src="../../assets/img/avater.jpg" alt="头像" title="帅照">
          </div>
          <p class="text_p" title="姓名">
           不讲道理的柯里昂
          </p>
          <p class="text_p" title="职业">
            web前端开发|JavaScript开发
          </p>
          <p class="text_p" title="邮箱">
            15096061897@163.com
          </p>
          <p class="text_p" title="签名">
            越刻意，越失去。
          </p>
        </div>
        <div class="card_wrap" style="width:100%;">
          <p style="margin-bottom:8px;padding:4px 0;font-size:14px;font-weight:500;border-bottom: 1px dashed #dcdee2;">
            往期精彩
          </p>
          <p class="article_list" title="查看详情" v-for="item in newArticList" :key="item.id" @click="toDetail(item.id)">
            <Icon type="ios-eye-outline" size="20"/>
            <span class="article_link">{{item.title}}</span>
          </p>
        </div>
      </div>
      <div style="width:870px;">
        <div title="查看详情" v-for="(item, index) in articleList" :key="item.id" @click="toDetail(item.id)" >
          <div class="article_wrap" v-if="(index+2)%2==0">
            <div class="article_img" style=" margin-right: 40px;">
              <img :src="item.headimg" alt="头图">
              <!-- <img :src="item.headimg" alt=""> -->
            </div>
            <div class="article_other">
              <h2 class="article_title" >{{item.title}}</h2>
              <p class="article_time">
                <span>{{switchTime(Number(item.creattime), 'YYYY-MM-DD hh:mm')}}</span>
              </p>
              <p class="article_time">
                <span style="color:#333;font-weight:600;">{{item.author}}</span>
              </p>
              <p class="article_content">{{item.introduce}}</p>
            </div>
          </div>
          <div class="article_wrap" v-else>
            <div class="article_other" style=" margin-right: 40px;">
              <h2 class="article_title" >{{item.title}}</h2>
              <p class="article_time">
                <span>{{switchTime(Number(item.creattime), 'YYYY-MM-DD hh:mm')}}</span>
              </p>
              <p class="article_time">
                <span style="color:#333;font-weight:600;">{{item.author}}</span>
              </p>
              <p class="article_content">{{item.introduce}}</p>
            </div>
            <div class="article_img">
              <img :src="item.headimg" alt="头图">
            </div>
          </div>
        </div>
        <Page :total="totalNum" size="small" prev-text="上一页" next-text="下一页" @on-change="pageChange" :page-size="pageSize" show-total style="margin: 20px 0;"/>
      </div>
    </div>
  </div>
</template>1
<script>
import { switchTime } from '@/uitls/tool'
import { queryAllArticle, queryNewArticle } from '@/api/baseApi'
export default {
  name: 'home',
  data () {
    return {
      totalNum: 0,
      pageSize: 5,
      pageData: {
        size: 5,
        num: 1
      },
      articleList: [],
      newArticList: [],
      switchTime: switchTime
    }
  },
  mounted () {
    this.queryAllArticle()
    this.queryNewArticle()
  },
  methods: {
    // 查看详情
    toDetail (id) {
      this.$router.push({path: '/articleDetail', query: {id: id}})
    },
    // 查询所有文章
    queryAllArticle () {
      this.$Spin.show()
      let mData = {
        pageSize: this.pageData.size,
        pageNum: this.pageData.num
      }
      this.$axios.post(queryAllArticle, mData).then(res => {
        console.log(res.data)
        this.articleList = []
        if (res.data.status === 200) {
          this.articleList = res.data.data.rows
          this.totalNum = res.data.data.total
          this.$Spin.hide()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 分页
    pageChange (val) {
      console.log()
      this.pageData.num = val
      this.queryAllArticle()
    },
    // 查询前8条文章
    queryNewArticle () {
      this.$axios.post(queryNewArticle).then(res => {
        console.log(res.data)
        // if (res.data.status === 402) {
        //   this.$router.push('/login')
        // }
        if (res.data.status === 200) {
          this.newArticList = res.data.data
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.wrap {
  max-width:100%;
  margin:0 auto;
  padding: 0 75px;
}
.layout_wrap {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.card_wrap{
  padding: 10px 12px;
  margin-bottom: 40px;
  border-radius: 4px;
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text_p{
  /* text-align: left; */
  padding: 4px 0;
  /* background-color: #f8f8f9;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap; */
  cursor: pointer;
}
.article_list{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;
  font-size: 13px;
}
.login_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.article_wrap {
  width: 92%;
  /* margin: 0 auto; */
  padding: 20px;
  margin-bottom: 40px;
  margin-top: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-around;
  transition: all 1s ease;
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.article_wrap:hover {
  transition: all 1s ease;
  box-shadow: 0px -1px 20px 1px #e8ecf4,-1px 0px 20px 1px #e8ecf4,1px 0px 20px 1px #e8ecf4,0px 1px 20px 1px #e8ecf4;
}
.article_img {
  width:200px;
  height: 138px;
  border-radius: 4px;
  overflow: hidden;
}
.article_img img {
  width: 100%;
  height: 100%;
  transition: all 1s ease;
}
.article_img img:hover {
  transform: scale(1.2);
  transition: all 1s ease;
}
/* @keyframes imgScale  */
.article_other {
  width: 520px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.article_link{
  text-align: left;
  font-size: 12px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.article_list:hover{
  color:#00b38a;
}
.article_title{
  text-align: left;
  cursor: pointer;
}
.article_title:hover{
  color:#00b38a;
}
.article_time{
  text-align: left;
  font-size: 12px;
  color: #808695;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  cursor: pointer;
}
.article_content{
  text-align: left;
  margin-top: 18px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  cursor: pointer;
}
.avatar{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom:6px;
  cursor: pointer;
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.avatar img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>
