<template>
    <el-container direction="vertical">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
      <el-container>
        <el-aside width="200px" >
          <div class="demo-image__placeholder">
            <div class="block">
              <el-image :src="require('@/assets/myLogo.png')" fit="fit"></el-image>
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
            <el-form-item label="账号">
              <el-divider direction="vertical"></el-divider>
              <span>{{this.$route.query.account}}</span>
            </el-form-item>
            <el-form-item label="密码">
              <el-divider direction="vertical"></el-divider>
              <span>{{this.$route.query.password}}</span>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'goodInfo',
  methods: {
    goBack () {
      this.$router.push('/mainPage')
    }
  },
  data () {
    return {
      src: 'src\\assets\\myLogo.png',
      type: '腾讯视频会员',
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
