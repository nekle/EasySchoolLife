<template>
  <div   id="app">
    <Logo></Logo>
    <cover-pic/>
    <home/>
    <under/>
  </div>
</template>

<script>
import mainPageAside from './components/mainPageAside'
import Navigation from './components/navigation'
import Goods from './components/goodTX'
import login from './components/login'
import mainPage from './components/mainPage'
import home from './components/home/home'
import GoodInfo from './components/goodInfo/goodInfoTX'
import CoverPic from './components/cover/coverPic'
import Under from './components/cover/under'
import goodAQY from './components/goodAQY'
import Payment from './components/Payment/payment'
import PayPage from './components/Payment/payPage'
import Logo from './components/cover/Logo'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Logo,
    PayPage,
    Payment,
    Under,
    CoverPic,
    GoodInfo,
    Goods,
    Navigation,
    mainPageAside,
    login,
    mainPage,
    home,
    goodAQY
  },
  methods: {
    login () {
      this.$router.push('/login')
    }
  },
  created () {
    let account = this.$cookies.get('account')
    let password = this.$cookies.get('password')
    var params = new URLSearchParams()
    params.append('account', account)
    params.append('password', password)
    axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/login', params).then(res => {
      // eslint-disable-next-line eqeqeq
      if (res.data.code == 0) { // 判断登录返回值code，0则成功，其他则失败
        console.log('登录返回')
        console.log(res)
        console.log(res.data.data.token)
        this.userToken = res.data.data.token
        // 将用户token保存到vuex中
        // this.changeLogin({ token: this.userToken })
        // alert('登陆成功')
        this.$router.push('/mainPage')
      } else {
        // alert('登录失败')
      }
    }).catch(error => {
      alert('账号或密码错误或超时')
      console.log(error)
    })
  },
  mounted () {
    this.$router.push('/login')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
