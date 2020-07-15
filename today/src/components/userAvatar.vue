<template>
        <div>
          <label>用户头像</label>
          <div><el-avatar shape="square" :size="150" :src="squareUrl"></el-avatar></div>
        </div>
</template>
<script>

export default {
  data () {
    return {
      squareUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  }
}
</script>
