<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>影视会员</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="AQY">爱奇艺</el-menu-item>
          <el-menu-item index="1-2" @click="TX">腾讯视频</el-menu-item>
          <el-menu-item index="1-3" @click="BILI">B站大会员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>网盘会员</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="BD">百度网盘</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>其他账号</template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: 'mainPageAside',
  methods: {
    AQY () {
      this.$router.push({path: '/goodAQY'})
    },
    TX () {
      this.$router.push({path: '/goods'})
    },
    BILI () {
      this.$router.push({path: '/goodB'})
    },
    BD () {
      this.$router.push({path: '/goodBD'})
    }
  }
}
</script>

<style scoped>

</style>
