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
import { addUser } from '@/api/baseApi'
export default {
  name: 'register',
  data () {
    return {
      msg: '注册',
      regForm: {
        userName: '',
        passWord: ''
      },
      userList: []
    }
  },
  methods: {
    addUser () {
      this.$axios.post(addUser, {
        username: this.regForm.userName,
        password: this.regForm.passWord
      }).then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          this.$router.push('/login')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    }
  }
}
</script>
