<template>
  <el-container direction="vertical">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-container>
      <el-aside width="200px" >
        <div class="demo-image__placeholder">
          <div class="block">
            <el-image :src="src"></el-image>
          </div>
        </div>
      </el-aside><!--账号图片-->
      <div style="margin: 40px"></div>
      <el-main><!--账号信息区域-->
        <div style="margin: 20px;"></div>
        <el-form :label-position="left" label-width="120px" :model="formLabelAlign">
          <el-form-item label="账号类型">
            <el-divider direction="vertical"></el-divider>
            <span>{{this.$route.query.type}}</span>
          </el-form-item>
          <el-form-item label="账号发布人">
            <el-divider direction="vertical"></el-divider>
            <span>{{this.$route.query.userId}}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-divider direction="vertical"></el-divider>
            <span>{{this.$route.query.create_time}}</span>
          </el-form-item>
          <el-form-item label="单价">
            <el-divider direction="vertical"></el-divider>
            <span>{{this.$route.query.money}}</span>
          </el-form-item>
          <el-form-item label="租借时间（天）" prop="price">
            <el-input-number v-model="time" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <el-popconfirm
          confirmButtonText='确认租借'
          cancelButtonText='不用了'
          icon="el-icon-info"
          iconColor="red"
          title="确认租借请求吗？"
          @onConfirm="borrow"
        >
          <el-button slot="reference">我要租借</el-button>
        </el-popconfirm>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'goodInfoTX',
  methods: {
    goBack () {
      this.$router.push('/mainPage')
    },
    borrow () {
      var params = new URLSearchParams()
      params.append('rentid', this.$route.query.id)
      params.append('time', this.time)
      axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/borrow', params).then(res => {
        console.log(res.data)
        alert(res.data)
        this.$router.push('/mainPage')
      }).catch(error => {
        console.log(error)
      })
    }
  },
  data () {
    return {
      src: 'http://img0.imgtn.bdimg.com/it/u=825208488,1292941794&fm=26&gp=0.jpg',
      type: 'BILIBILI大会员',
      owner: 'JACK',
      time: '20 小时',
      when: '2020.6.6',
      info: '出租意向',
      name: ''
    }
  }
}
</script>

<style scoped>

</style>
