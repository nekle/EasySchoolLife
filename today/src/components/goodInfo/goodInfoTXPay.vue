<template>
  <el-container direction="vertical" style="text-align: center">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-container style=" border: 1px solid #eee; text-align: center">
      <el-aside width="260px" style=" border: 1px solid #eee; text-align: center" >
        <div class="demo-image__placeholder">
          <div class="block">
            <el-image :src="src"></el-image>
          </div>
        </div>
      </el-aside><!--账号图片-->
      <el-main><!--账号信息区域-->
        <div style="margin: 10px;"></div>
          <el-form :label-position="left" label-width="120px" :model="formLabelAlign" style="width: 1600px; border: 1px solid #eee; text-align: center">
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
  name: 'goodInfoPay',
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
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=354689761,3252559900&fm=26&gp=0.jpg',
      type: '腾讯视频会员',
      owner: 'JACK',
      time: 1,
      when: '2020.6.6',
      info: '出租意向',
      dialogVisible: false,
      password: '',
      name: ''
    }
  }
}
</script>

<style scoped>

</style>
