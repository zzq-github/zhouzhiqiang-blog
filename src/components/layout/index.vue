<template>
  <div class="layout">
    <nav>
      <div class="header_wrap">
        <div class="logo">Blog</div>
        <div class="nav_wrap">
          <span v-for="(item, index) in navList" :key="index" :class="num==index?'active_span':''" @click="navClick(index)">{{item}}</span>
        </div>
      </div>
    </nav>
    <!-- <div class="banner"></div> -->
    <Carousel v-model="bannerValue" loop autoplay :autoplay-speed="6000" arrow='never'>
        <CarouselItem>
          <div class="demo-carousel banner3"></div>
        </CarouselItem>
        <!-- <CarouselItem>
          <div class="demo-carousel banner1"></div>
        </CarouselItem> -->
        <CarouselItem>
          <div class="demo-carousel banner2"></div>
        </CarouselItem>
        <!-- <CarouselItem>
          <div class="demo-carousel banner"></div>
        </CarouselItem> -->
    </Carousel>
    <Content style="min-height:520px;margin:40px 0 40px 0;">
      <router-view/>
    </Content>
    <Footer class="layout-footer-center">Copyright &copy;  2019 湘ICP备17010718号-1</Footer>
  </div>
</template>
<script>
export default {
  name: 'layout',
  data () {
    return {
      num: 0,
      navList: ['首页', '简历', '发表文章'],
      bannerValue: 0
    }
  },
  methods: {
    navClick (index) {
      this.num = index
      if (index === 0) {
        this.$router.push('/home')
      } else if (index === 1) {
        this.$router.push('/about')
      } else if (index === 2) {
        // 有登录信息直接跳转文章发布页面，否则跳转登录页面
        let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        if (!userinfo) {
          this.$router.push('/login')
        } else {
          this.$router.push('/addArticle')
        }
      } else {
        this.$router.push('/home')
      }
      // switch (index) {
      //   case 0: this.$router.push('/home'); break
      //   case 1: this.$router.push('/about'); break
      //   case 2: this.$router.push('/login'); break
      //   default: this.$router.push('/home'); break
      // }
    }
  }
}
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
  /* background-color:#f8f8f9; */
  overflow: hidden;
}
nav {
  width: 100%;
  margin: 0 auto;
  height: 58px;
  overflow: hidden;
  background-color:rgba(0,0,0,0.00);
  position: absolute;
  top: 0;
  z-index: 1;
}
.header_wrap {
  width: 70%;
  margin: 0 auto;
  height: 58px;
  overflow: hidden;
}
.logo {
  width: 100px;
  height: 58px;
  line-height: 58px;
  text-align: left;
  font-size: 28px;
  font-weight: 400;
  color: #00b38a;
  float: left;
  cursor:pointer;
}
.nav_wrap {
  width: 400px;
  height: 58px;
  line-height: 58px;
  text-align: right;
  float: right;
}
.nav_wrap span {
  width: 100px;
  height: 58px;
  margin: 0;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  transition:all 1s ease;
}
.nav_wrap span:hover {
  /* transform:perspective(800px) rotateX(360deg); */
  transition:all 1s ease;
  background-color: rgba(0,0,0,0.1);
}
.active_span {
  transition:all 1s ease;
  /* background-color: rgba(0,0,0,0.18); */
  color: #00b38a !important;
}
.banner {
  width: 100%;
  background: url(../../assets/img/login-bg.jpg) no-repeat;
  height: 328px;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  background-position: center 0;
}
.banner1 {
  width: 100%;
  background: url(../../assets/img/banner1.jpg) no-repeat;
  height: 328px;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  background-position: center 0;
}
.banner2 {
  width: 100%;
  background: url(../../assets/img/banner2.jpg) no-repeat;
  height: 328px;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  background-position: center 0;
}
.banner3 {
  width: 100%;
  background: url(../../assets/img/banner3.jpg) no-repeat;
  height: 328px;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  background-position: center 0;
}
.layout-footer-center{
  width: 100%;
  background-color: #eee;
  text-align: center;
}

@media (min-width: 768px) and (max-width: 992px) {
  .banner {
    height: 228px;
  }
}
@media (min-width: 320px) and (max-width: 768px) {
  .banner {
    height: 140px;
  }
}
</style>
