<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/goods">商品列表</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/borrow">我的租入</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/rent">我的租出</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/publishArticle">我要出租</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/person">个人中心</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navigation'
}
</script>

<style scoped>

</style>
