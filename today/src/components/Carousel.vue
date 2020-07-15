<template>
  <div class="block">
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="image in images" :key="image">
        <h3 class="medium"><el-image :src="image"></el-image></h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Carousel',
  data () {
    return {
      images: [
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3493960861,2784859708&fm=26&gp=0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591356261394&di=57f4c7b05c6917c33c56a803ff41480f&imgtype=0&src=http%3A%2F%2Fimg.myuall.com%2Funiv%2Fimgs%2Fi%2Fi16006867.jpeg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4045434540,2496666034&fm=26&gp=0.jpg']
    }
  },
  mounted () {
    axios.get('http://' + this.$ip + ':8083/get_personal_info').then(res => {
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.images = jsonObj
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .block{
    width: 600px;
    height: 200px;
  }
</style>
