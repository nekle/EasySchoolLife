<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
          <el-header style="text-align: center; font-size: 24px">我的租出</el-header>
          <el-main>
            <el-container>
              <li v-for="account in accounts.slice((currpage-1)*eachpage,currpage*eachpage)" :key="account.id">
                <div>
                  <el-container style=" border: 1px solid #eee; text-align: center">
                    <div id="app">
                      <div class="demo-image">
                        <span class="demonstration">{{ fit }}</span>
                        <el-container direction="vertical">
                          <el-image
                            style="width: 220px; height: 220px"
                            :src="require('@/assets/myLogo.png')"
                            :fits="fit"
                            @click="accountInfo(account.account,account.password,account.money,account.userid,account.create_time,account.type)"
                          ></el-image>
                          <el-container>
                            <span>{{account.type}}</span>
                          </el-container>
                          <el-container direction="vertical">
                            <el-container>
                              <el-avatar shape="square" :size="30" :fit="fit" :src="url_user"></el-avatar>
                              <div>{{account.userid}}</div>
                            </el-container>
                            <el-container>
                              <el-tag>{{account.money}} 元</el-tag>
                              <el-tag type="success">{{account.create_time}}</el-tag>
                              <el-tag type="info">标签三</el-tag>
                            </el-container>
                          </el-container>
                        </el-container>
                      </div>
                    </div>
                  </el-container>
                </div>
              </li>
            </el-container>
            <div>
              <el-button v-if="currpage>1" @click="currpage--" type="primary" icon="el-icon-arrow-left">上一页</el-button>
              <span>{{currpage}}</span>/<span>{{pagesum}}</span>
              <el-button v-if="currpage<pagesum" @click="currpage++" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
          </el-main>
        </el-container>
    </el-container>
</template>

<script>
import foodItem from './foodItem'
import mainPageAside from './mainPageAside'
import axios from 'axios'

export default {
  name: 'rent',
  methods: {
    accountInfo (account, password, money, userid, createtime, type) {
      console.log(account)
      this.$router.push({path: '/goodInfoTX',
        query: {
          account: account,
          password: password,
          money: money,
          userId: userid,
          create_time: createtime,
          type: type }})
    }
  },
  data () {
    return {
      accounts: [],
      url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=354689761,3252559900&fm=26&gp=0.jpg',
      url_user: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      // 默认显示第几页
      currpage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      pagesum: 1,
      // 默认每页显示的条数（可修改）
      eachpage: 8
    }
  },
  components: {
    foodItem,
    mainPageAside
  },
  mounted () {
    axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/getinfo').then(res => {
      console.log('出租列表')
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.accounts = jsonObj.data.rent
      this.pagesum = Math.ceil(jsonObj.data.rent.length / this.eachpage)
      console.log(this.accounts)
    }).catch(error => {
      console.log(error)
    })
  }

}
</script>

<style scoped>

</style>
