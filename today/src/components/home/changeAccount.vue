<template>
  <div>
    <el-popover
      placement="left"
      width="400"
      trigger="click">
      <el-container>
        <el-header >用户登录</el-header>
        <el-container>
          <h1 class="headerText" for = 'user'>用户名</h1>
          <el-input id = 'user' class="inputbox" v-model="loginForm.email" placeholder="请输入内容"></el-input>
        </el-container>
        <el-container>
          <h1 class="headerText" >密码</h1>
          <el-input class="inputbox" v-model="loginForm.password" placeholder="请输入内容" show-password></el-input>
        </el-container>
        <el-container style="text-align: center">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button  type="primary" @click="change">更改</el-button>
          <el-button  type="primary" @click="register">注册新用户</el-button>
        </el-container>
      </el-container>
      <el-button type="primary" slot="reference">{{loginOrChange}}</el-button>
    </el-popover>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'changeAccount',
  data () {
    return {
      loginOrChange: '更换账号',
      my_cls: 'btn',
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    register () {
      this.$router.push('/register')
    },
    change () {
      var params = new URLSearchParams()
      params.append('password', '111111')
      params.append('asset_pw', '222222')
      params.append('again_pw', '222222')
      axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/change', params).then(res => {
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    login () {
      let _this = this
      var params = new URLSearchParams()
      params.append('account', this.loginForm.email)
      params.append('password', this.loginForm.password)
      axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/login', params).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.data.code == 0) { // 判断登录返回值code，0则成功，其他则失败
          console.log('登录返回')
          console.log(res)
          console.log(res.data.data.token)
          _this.userToken = res.data.data.token
          // 将用户token保存到vuex中
          _this.changeLogin({ token: _this.userToken })
          alert('登陆成功')
          this.$router.push({ path: '/mainPage' })
        } else {
          alert('登录失败')
          console.log(res)
        }
      }).catch(error => {
        alert('账号或密码错误或超时')
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>

  .el-container{
    width: 350px;
  }
  .headerText{
    width: 100px;
  }
  .el-header{
    text-align: center;
  }
</style>
