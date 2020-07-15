<template>
  <el-container style=" border: 1px solid #eee; text-align: center">
    <div id="app">
      <div class="demo-image">
        <span class="demonstration">{{ fit }}</span>
        <el-container direction="vertical">
          <el-image
            style="width: 220px; height: 220px"
            :src="url"
            :fits="fit"></el-image>
          <el-container>
            <i class="el-icon-view"></i>
            <div > {{viewNumber}}</div>
            <i class="el-icon-chicken"></i>
            <div > {{viewNumber}}</div>
            <i class="el-icon-chat-line-square"></i>
            <div > {{viewNumber}}</div>
          </el-container>
          <el-container direction="vertical">
            <el-container>
              <el-avatar shape="square" :size="30" :fit="fit" :src="url"></el-avatar>
              <div>{{author}}</div>
            </el-container>
            <el-container>
              <el-tag>标签一</el-tag>
              <el-tag type="success">标签二</el-tag>
              <el-tag type="info">标签三</el-tag>
            </el-container>
          </el-container>
        </el-container>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'foodItem',
  data () {
    return {
      fits: 'fill',
      url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1569235928,3316338571&fm=26&gp=0.jpg',
      viewNumber: '999',
      author: 'JackStevenson',
      title: 'burn'
    }
  }
}
</script>
