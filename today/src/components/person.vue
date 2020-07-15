<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" tab-position="top">
      <el-tab-pane label="用户个人信息管理" name="first" >
        用户管理
        <modify-person>
        </modify-person>
      </el-tab-pane>
      <el-tab-pane label="收藏夹" name="second">
        我的收藏夹
        <el-container>
          <li v-for="foodCollection in foodCollections" :key="foodCollection.title">
            <div id="collection" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
              <div class="demo-image">
                <span class="demonstration"></span>
                <div v-if="foodCollection.type === 'video'">
                  <el-image
                    style="width: 200px; height: 200px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                    :src="foodCollection.data.pictureurl"
                  ></el-image>
                </div>
                <div v-else>
                  <el-image
                    style="width: 200px; height: 200px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                    :src="foodCollection.data.urls"
                  ></el-image>
                </div>
                <el-container>
                  <el-header height="20dp">{{foodCollection.data.title}}</el-header>
                  <el-container>
                    <i class="el-icon-view"></i>
                    <div > {{ foodCollection.data.readnum }}</div>
                    <i class="el-icon-chicken"></i>
                    <div > {{ foodCollection.data.praisenum }}</div>
                    <i class="el-icon-chat-line-square"></i>
                    <div > {{ foodCollection.data.commentnum }}</div>
                  </el-container>
                  <el-container direction="vertical">
                    <el-container>
                      <el-tag>标签一</el-tag>
                      <el-tag type="success">标签二</el-tag>
                      <el-tag type="info">标签三</el-tag>
                    </el-container>
                  </el-container>
                </el-container>
              </div>
            </div>
          </li>
        </el-container>
        <el-footer>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="10">
          </el-pagination>
        </el-footer>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="third">
        我的浏览记录
        <el-container>
          <li v-for="foodHistory in foodHistorys" :key="foodHistory.data.title">
            <div id="history" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
              <div class="demo-image">
                <span class="demonstration"></span>
                <div v-if="foodHistory.type === 'video'">
                  <el-image
                    style="width: 200px; height: 200px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                    :src="foodHistory.data.pictureurl"
                  ></el-image>
                </div>
                <div v-else>
                  <el-image
                    style="width: 200px; height: 200px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                    :src="foodHistory.data.urls"
                  ></el-image>
                </div>
                <el-container>
                  <el-header height="20dp">{{foodHistory.data.title}}</el-header>
                  <el-container>
                    <i class="el-icon-view"></i>
                    <div > {{ foodHistory.data.readnum }}</div>
                    <i class="el-icon-chicken"></i>
                    <div > {{ foodHistory.data.praisenum }}</div>
                    <i class="el-icon-chat-line-square"></i>
                    <div > {{ foodHistory.data.commentnum }}</div>
                  </el-container>
                  <el-container direction="vertical">
                    <el-container>
                      <el-tag>标签一</el-tag>
                      <el-tag type="success">标签二</el-tag>
                      <el-tag type="info">标签三</el-tag>
                    </el-container>
                  </el-container>
                </el-container>
              </div>
            </div>
          </li>
        </el-container>
        <el-footer>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="10">
          </el-pagination>
        </el-footer>
      </el-tab-pane>
      <el-tab-pane label="私信" name="fourth">
      私信箱
      <mailbox/>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="10">
      </el-pagination>
    </el-tab-pane>
      <el-tab-pane label="积分与成就" name="fifth">
        积分与成就
        <score-and-achievement/>
      </el-tab-pane>
      <el-tab-pane label="我的关注" name="sixth">
        <el-container>
          <li v-for="sub in subs" :key="sub.username">
            <div id="subscription" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
              <div class="demo-image">
                <span class="demonstration"></span>
                <el-image
                  style="width: 200px; height: 200px"
                  :src="sub.headpicture"
                ></el-image>
                <el-container>
                  <el-header height="20dp">{{sub.username}}</el-header>
                  <div>
                    <i class="el-icon-reading">用户成就:{{sub.achievement}}</i>
                  </div>
                  <div>
                    <el-button type="text" @click="open(sub.userid)" icon="el-icon-message" circle>发送私信</el-button>
                    <el-dialog title="回复私信" :visible.sync="dialogFormVisible" :append-to-body="true">
                      <el-input v-model="msgContent" autocomplete="off"></el-input>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="postMail">发 送</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </el-container>
              </div>
            </div>
          </li>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="我的账户" name="seventh">
        <el-container direction="vertical">
          <el-container>
            <el-image
              style="width: 20px; height: 20px;"
              :src="moneySRC"
            >
            </el-image><span>账户余额 :{{money}} 元</span>
          </el-container>
          <el-button style="width: 100px" @click="chongzhi">充值</el-button>
        </el-container>
      </el-tab-pane>
    </el-tabs>
</template>
<script>
import foodItem from './foodItem'
import modifyPerson from './modifyPerson'
import mailbox from './mailbox'
import scoreAndAchievement from './scoreAndAchievement'
import axios from 'axios'
import mySubscription from './mySubscription'
export default {
  data () {
    return {
      chongzhiNum: 1,
      money: '',
      activeName: 'first',
      foodHistorys: [],
      foodCollections: [],
      subs: [],
      content: '',
      toId: '',
      msgContent: '',
      dialogFormVisible: false,
      moneySRC: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592137260978&di=4f6581118f94441fc398c755caceb42d&imgtype=0&src=http%3A%2F%2Fpic.sucaibar.com%2Fpic%2F201307%2F05%2F09a1778bc8.png'
    }
  },
  methods: {
    chongzhi () {
      this.$router.push('/Payment/payment')// 跳转到支付界面
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    open (value) {
      this.toId = value
      this.dialogFormVisible = true
    },
    postMail () {
      let params = new URLSearchParams()
      params.append('msg', this.msgContent)
      params.append('to', this.toId)
      axios.post('http://' + this.$ip + ':' + this.$port + '/send_message', params).then(res => {
        console.log('successfully sent message')
        this.dialogFormVisible = false
        alert('发送成功')
        this.form.content = ''
      })
    }
  },
  components: {
    foodItem,
    modifyPerson,
    mailbox,
    scoreAndAchievement,
    mySubscription
  },
  mounted () { // 个人信息
    axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/getinfo').then(res => {
      console.log('租号列表')
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.money = jsonObj.data.info.money
      console.log(this.accounts)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
