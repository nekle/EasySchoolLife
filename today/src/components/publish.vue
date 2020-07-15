<template>
    <el-container class="mainContainer">
      <el-header >发布租借信息</el-header>
      <el-container>
        <el-header></el-header>
        <el-container>
          <h1>标题</h1>
          <el-input class="header" v-model="title" placeholder="请输入文章标题" maxlength="20"></el-input>
        </el-container>
        <el-divider></el-divider>
        <el-container>
          <h1>正文</h1>
          <el-input  type="textarea" class="content" v-model="content" placeholder="请输入文章正文"></el-input>
        </el-container>
        <el-divider></el-divider>
        <el-container>
          <h1>上传图片</h1>
          <upload/>
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
import upload from './upload'
export default {
  name: 'publish',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    upload
  }
}
</script>

<style scoped>
.header{
  width: 300px;
}
.content{
  width: 700px;
  height: 400px;
}
  .mainContainer{
    width: 800px;
    height: 700px;
    background-color: aliceblue;
  }
</style>
