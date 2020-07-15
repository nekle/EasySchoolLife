<template>
  <div style="text-align: center">
    <h>
      testtest
    </h>
    <li v-for="sub in subs" :key="sub.data.title">
      <div id="history">
        <div class="demo-image">
          <span class="demonstration"></span>
            <el-image
              style="width: 200px; height: 200px"
              :src="sub.data.urls"
            ></el-image>
          <el-container>
            <el-header height="20dp">{{sub.data.name}}</el-header>
          </el-container>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'mySubscription',
  data () {
    return {
      subs: []
    }
  },
  mounted () {
    axios.get('http://' + this.$ip + ':' + this.$port + '/get_personal_friends').then(res => {
      console.log('subscribe')
      console.log(res)
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.subs = jsonObj
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .exp{
    width: 400px;
    height: 40px;
  }
</style>
