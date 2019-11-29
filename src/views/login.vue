<template>
  <div>
    <h1 class="title">{{ flag=='0'?'账号登录':'账号注册' }}<Button type="text" @click="toHome" style="margin-left: 8px">返回首页</Button></h1>
    <Tabs style="width:300px;margin:0 auto;margin-top:40px;" @on-click="doChangge">
      <!-- 登录 -->
      <TabPane label="登录" name="0">
        <i-form ref="loginForm" :model="loginForm" :rules="loginRules" :label-width="0" style="width:300px;margin:0 auto;margin-top:20px;">
          <FormItem label="" prop="userName">
            <i-input v-model="loginForm.userName" placeholder="请输入账号">
              <Icon type="ios-person-outline" slot="prepend" :size="16"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="" prop="passWord">
            <i-input type="password" v-model="loginForm.passWord" @keyup.enter.native="doLogin('loginForm')" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend" :size="16"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="">
            <i-col span="6" style="text-align: center">
              {{loginForm.number1}}
            </i-col>
            <i-col span="3" style="text-align:center">+</i-col>
            <i-col span="6" style="text-align: center">
              {{loginForm.number2}}
            </i-col>
            <i-col span="3" style="text-align:center">=</i-col>
            <i-col span="6">
              <i-input ref="result" v-model="loginForm.result" @keyup.enter.native="doLogin('loginForm')"></i-input>
            </i-col>
          </FormItem>
          <FormItem>
            <div style="width:100%;margin:0 auto; text-align:center;">
              <Button style="width:100%;" type="primary" @click="doLogin('loginForm')" @keyup.enter.native="doLogin('loginForm')" :loading="loading">登录</Button>
            </div>
          </FormItem>
        </i-form>
      </TabPane>
      <!-- 注册 -->
      <TabPane label="注册" name="1" disabled>
        <i-form ref="regForm" :model="regForm" :label-width="0" :rules="regRules" style="width:300px;margin:0 auto;margin-top:20px;">
          <FormItem label="" prop="userName">
            <i-input v-model="regForm.userName" placeholder="请输入账号">
              <Icon type="ios-person-outline" slot="prepend" :size="16"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="" prop="passWord">
            <i-input type="password" v-model="regForm.passWord" placeholder="请输入密码" @keyup.enter.native="addUser('regForm')">
              <Icon type="ios-lock-outline" slot="prepend" :size="16"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="">
              <i-col span="6" style="text-align: center">
                {{regForm.number1}}
              </i-col>
              <i-col span="3" style="text-align:center">+</i-col>
              <i-col span="6" style="text-align: center">
                {{regForm.number2}}
              </i-col>
              <i-col span="3" style="text-align:center">=</i-col>
              <i-col span="6">
                <i-input ref="result" v-model="regForm.result" @keyup.enter.native="addUser('regForm')"></i-input>
              </i-col>
          </FormItem>
          <FormItem>
            <div style="width:100%;margin:0 auto; text-align:left;">
              <Button type="success" style="width:100%;" @click="addUser('regForm')" :loading="loading">注册</Button>
            </div>
          </FormItem>
        </i-form>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { login, addUser } from '@/api/baseApi'
export default {
  data () {
    const validatenName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 登录
      flag: 0,
      loading: false,
      loginForm: {
        userName: '',
        passWord: '',
        number1: '',
        number2: '',
        result: ''
      },
      userToken: '',
      loginRules: {
        userName: [{ validator: validatenName, trigger: 'blur' }],
        passWord: [{ validator: validatePass, trigger: 'blur' }]
      },
      // 注册
      regForm: {
        userName: '',
        passWord: '',
        number1: '',
        number2: '',
        result: ''
      },
      regRules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '最少6位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.doRandom()
  },
  methods: {
    ...mapMutations(['changeLogin']),
    doLogin (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let addNum = Number(this.loginForm.number1) + Number(this.loginForm.number2)
          if (Number(this.loginForm.result) !== addNum) {
            this.$Message.error('请输入正确的验证码')
            this.doRandom()
            this.$refs['result'].focus()
            return false
          }
          this.loading = true
          let mData = {
            username: this.loginForm.userName,
            password: this.$md5(this.loginForm.passWord)
          }
          console.log(mData)
          this.$axios.post(login, mData).then(res => {
            console.log(res.data)
            if (res.data.status === 200) {
              this.$Message.success(res.data.message)
              this.userToken = 'Bearer' + res.data.token
              this.changeLogin({ Authorization: this.userToken })
              sessionStorage.setItem('userinfo', JSON.stringify(res.data.data))
              this.$router.push('/addArticle')
            } else {
              this.$Message.error(res.data.message)
              this.doRandom()
            }
          }).catch(error => {
            console.log(error)
          }).finally(_ => {
            this.loading = false
          })
        } else {
          this.$Message.error('请选择完整的登录信息！')
          this.doRandom()
        }
      })
    },
    doChangge (value) {
      this.flag = value
      this.doRandom()
    },
    toHome () {
      this.$router.push('/home')
    },
    // 重置
    doReset (name) {
      this.$refs[name].resetFields()
    },
    toRegister () {
      this.$router.push('/register')
    },
    // 生成随机数
    doRandom () {
      this.loginForm.number1 = this.randomNum(1, 100)
      this.loginForm.number2 = this.randomNum(1, 100)
      this.regForm.number1 = this.randomNum(1, 100)
      this.regForm.number2 = this.randomNum(1, 100)
    },
    // 生成随机数字
    randomNum (lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower
    },
    // 注册账号
    addUser (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let addNum = Number(this.regForm.number1) + Number(this.regForm.number2)
          if (Number(this.regForm.result) !== addNum) {
            this.$Message.error('请输入正确的验证码')
            this.doRandom()
            this.$refs['result'].focus()
            return false
          }
          this.$axios.post(addUser, {
            username: this.regForm.userName,
            password: this.$md5(this.regForm.passWord)
          }).then((res) => {
            console.log(res.data)
            if (res.data.status === 200) {
              this.$Message.success('账号注册成功')
              this.$refs[name].resetFields()
            } else {
              this.$Message.error(res.data.message)
            }
          }).catch(error => {
            console.log(error)
          }).finally(_ => {
            this.loading = false
          })
        } else {
          this.$Message.error('请选择完整的登录信息！')
          this.doRandom()
        }
      })
    }
  }
}
</script>
<style scoped>
.title{
  width:100%;
  text-align:center;
  margin-bottom: 40px;
  padding:40px 0;
  border-bottom: 1px dashed #dcdee2;
}
</style>
