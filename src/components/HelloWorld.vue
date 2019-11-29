<template>
  <div>
    <h1 style="text-align:center;padding:40px 0;">{{ msg }}</h1>
    <i-form ref="regForm" :label-width="80" style="width:40%;margin:0 auto;">
      <FormItem label="用户名" prop="userName">
        <i-input v-model="regForm.userName"></i-input>
      </FormItem>
      <FormItem label="密码" prop="passWord">
        <i-input type="password" v-model="regForm.passWord"></i-input>
      </FormItem>
      <FormItem>
        <div style="width:100%;margin:0 auto; text-align:left;">
          <Button type="success" @click="addUser">注册</Button>
        </div>
      </FormItem>
    </i-form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Express',
      regForm: {
        userName: '',
        passWord: ''
      },
      userList: []
    }
  },
  mounted () {
    this.queryAllUser()
  },
  methods: {
    addUser () {
      var name = this.userName
      var passWord = this.passWord
      this.$axios.post('/api/user/addUser', {
        username: this.regForm.userName,
        password: this.regForm.passWord
      }).then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          this.$router.push('/login')
        }
        else {
          this.$Message.error(res.data.message);
          
        }
      })
    },
    queryAllUser () {
      this.$axios.post('/api/user/queryAllUser', {}).then((res) => {
        console.log(res.data)
        this.userList = res.data.data
      })
    }
  }
}
</script>
