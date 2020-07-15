<template>
  <div style="text-align: center">
      <user-avatar/>
    <div>
      <i class="el-icon-cherry">用户积分:{{score}}</i>
    </div>
        <i class="el-icon-reading">用户成就:{{achievement}}</i>
  </div>
</template>

<script>
import axios from 'axios'
import userAvatar from './userAvatar'
export default {
  name: 'scoreAndAchievement',
  data () {
    return {
      score: '',
      achievement: ''
    }
  },
  mounted () {
    axios.get('http://' + this.$ip + ':' + this.$port + '/get_personal_info').then(res => {
      console.log(res)
      this.score = res.data.socre
      this.achievement = res.data.achievement
    }).catch(error => {
      console.log(error)
    })
  },
  components: {
    userAvatar
  }
}
</script>

<style scoped>
.exp{
  width: 400px;
  height: 40px;
}
</style>
