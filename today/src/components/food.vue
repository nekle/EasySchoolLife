<template>
    <div>
        <el-container>
            <toplist/>
        </el-container>
        <el-divider content-position="center"><span class="divider">菜谱专区</span></el-divider>
        <el-container>
                <el-row :gutter = '10'>
                    <el-col :key="item.label" v-for = 'item in items.fourArticle' :span="5" :offset="1" style="margin-bottom:30px">
                        <el-card :body-style="{ padding: '0px', height:'400px'}" shadow="hover" style="width: 260px;height: 340px;">
                            <img src="item.src" class="image">
                            <el-container>
                                <span class="txt">{{item.name.title}}</span>
                                <span class="txt">{{item.username}}</span>
                            </el-container>
                            <el-container>
                                <el-tag>{{item.tag}}</el-tag>
                                <el-tag type="success">{{item.tag}}</el-tag>
                                <el-tag type="info">{{item.tag}}</el-tag>
                            </el-container>
                            <el-container>
                                <i class="el-icon-view"></i>
                                <div > {{item.name.commentnum}}</div>
                                <i class="el-icon-chicken"></i>
                                <div > {{item.name.praisenum }}</div>
                                <i class="el-icon-chat-line-square"></i>
                                <div > {{item.name.readnum }}</div>
                            </el-container>

                        </el-card>
                    </el-col>
                </el-row>
            </el-container>
        <el-divider content-position="center"><span class="divider">视频专区</span></el-divider>
        <el-container>
            <el-row :gutter = '10'>
                <el-col :key="item.label" v-for = 'item in items.fourviedolists' :span="5" :offset="1" style="margin-bottom:30px">
                    <el-card :body-style="{ padding: '0px', height:'400px'}" shadow="hover" style="width: 260px;height: 340px;">
                        <img src="item.src" class="image">
                        <el-container>
                            <span class="txt">{{item.title}}</span>
                            <span class="txt">{{item.owner}}</span>
                        </el-container>
                        <el-container>
                            <el-tag>{{item.tag}}</el-tag>
                            <el-tag type="success">{{item.tag}}</el-tag>
                            <el-tag type="info">{{item.tag}}</el-tag>
                        </el-container>
                        <el-container>
                            <i class="el-icon-view"></i>
                            <div > {{item.name.commentnum}}</div>
                            <i class="el-icon-chicken"></i>
                            <div > {{item.name.praisenum }}</div>
                            <i class="el-icon-chat-line-square"></i>
                            <div > {{item.name.readnum }}</div>
                        </el-container>
                    </el-card>
                </el-col>
            </el-row>
        </el-container>
        <el-divider content-position="center"><span class="divider">积分商城</span></el-divider>
        <el-container>
            <el-row :gutter = '10'>
                <el-col :key="item.label" v-for = 'item in items.fourgoodlists' :span="5" :offset="1" style="margin-bottom:30px">
                    <el-card :body-style="{ padding: '0px', height:'400px'}" shadow="hover" style="width: 260px;height: 340px;">
                        <img src="item.src" class="image">
                        <el-container>
                            <span class="txt">{{item.name.name}}</span>
                            <span class="txt">"数量:"{{item.name.number}}</span>
                        </el-container>
                        <el-container>
                            <i class="el-icon-view"></i>
                            <div > {{item.name.commentnum}}</div>
                            <i class="el-icon-chicken"></i>
                            <div > {{item.name.praisenum }}</div>
                            <i class="el-icon-chat-line-square"></i>
                            <div > {{item.name.readnum }}</div>
                        </el-container>

                    </el-card>
                </el-col>
            </el-row>
        </el-container>
        </div>
</template>

<script>
import toplist from './TopList.vue'
import axios from 'axios'
export default {
  mounted: function () {
    this.getMain()
  },
  methods: {
    getMain () {
      axios
        .get('http://' + this.$str1 + '/home')
        .then(successResponse => {
          var jsonObj = JSON.parse(JSON.stringify(successResponse.data))
          console.log(jsonObj)
          this.items = jsonObj
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  },
  components: {
    toplist
  },
  data () {
    return {
      repositoryUrl: '',
      repositoryName: '',
      items: []
    }
  }
}
</script>

<style scoped>

    .demo-image{
        width: 230px;
        height: 230px;
    }
    .txt{
        font-size: 10px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }
    .divider{
        font-size: 20px;

        color:  #B3C0D1;
    }
    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
