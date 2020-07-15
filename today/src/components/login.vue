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
          <el-button  type="primary" @click="forget">忘记密码</el-button>
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
  name: 'login',
  data () {
    return {
      loginOrChange: '登录',
      my_cls: 'btn',
      loginForm: {
        email: '',
        password: ''
      },
      info: {},
      name: ''
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    register () {
      this.$router.push('/register')
    },
    forget () {
      this.$router.push('forget')
    },
    login () {
      let _this = this
      var params = new URLSearchParams()
      params.append('account', this.loginForm.email)
      params.append('password', this.loginForm.password)
      this.$cookies.set('account', this.loginForm.email)
      this.$cookies.set('password', this.loginForm.password)
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
        } else {
          alert('登录失败')
        }
      }).catch(error => {
        alert('账号或密码错误或超时')
        console.log(error)
      })
      axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/getinfo').then(res => {
        let jsonObj = JSON.parse(JSON.stringify(res.data))
        this.info = jsonObj.data.info
        this.$router.push({path: '/mainPage', query: {name: this.info.nicheng}})
        this.name = this.info.nicheng
        this.$cookies.set('name', this.name)
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
