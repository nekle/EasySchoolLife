<template>
  <el-row :gutter="10">
    <el-col :span="6"><div class="grid-content bg-purple-light">日期</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light">用户昵称</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light">私信内容</div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple-light">操作</div></el-col>
    <el-col :span="1"><div class="grid-content bg-purple-light"><el-button type="text" @click="refresh" icon="el-icon-refresh">刷新</el-button></div></el-col>
    <ol v-for="mail in mails" :key="mail.id">
      <el-col :span="6" style="text-align: center">{{formatDate(mail.message.timestamp)}}</el-col>
      <el-col :span="6" style="text-align: center">{{mail.username}}</el-col>
      <el-col :span="6" style="text-align: center">{{mail.message.content}}</el-col>
      <el-button type="text" @click="open(mail.userid)" icon="el-icon-message">回复</el-button>
      <el-dialog title="回复私信" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-input v-model="content" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postMail">发 送</el-button>
        </div>
      </el-dialog>
      <el-button type="text" @click="deleteBtn(mail.message.msgid)" icon="el-icon-delete">删除</el-button>
      <el-dialog title="删除私信" :visible.sync="dialogDeleteVisible" :append-to-body="true">
        <el-alert
          title="警告:请确认是否删除这条私信"
          type="warning"
          show-icon>
        </el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteMail">删 除</el-button>
        </div>
      </el-dialog>
    </ol>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    // 格式化时间戳
    formatDate: function (value) {
      var date = new Date(value)
      let Y
      let m
      let d
      let H
      let i
      let s
      Y = date.getFullYear()
      m = date.getMonth() + 1
      d = date.getDate()
      H = date.getHours()
      i = date.getMinutes()
      s = date.getSeconds()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      if (H < 10) {
        H = '0' + H
      }
      if (i < 10) {
        i = '0' + i
      }
      if (s < 10) {
        s = '0' + s
      }
      var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i
      return t
    },
    open (value) {
      this.toId = value
      this.dialogFormVisible = true
    },
    deleteBtn (value) {
      this.deleteId = value
      this.dialogDeleteVisible = true
    },
    postMail () {
      let params = new URLSearchParams()
      params.append('msg', this.content)
      params.append('to', this.toId)
      axios.post('http://' + this.$ip + ':' + this.$port + '/send_message', params).then(res => {
        console.log('successfully sent message')
        this.dialogFormVisible = false
        alert('发送成功')
        this.form.content = ''
        axios.get('http://' + this.$ip + ':' + this.$port + '/read_message').then(res => {
          console.log('mailbox')
          console.log(res.data)
          let jsonObj = JSON.parse(JSON.stringify(res.data))
          this.mails = jsonObj
        }).catch(error => {
          console.log(error)
        })
      })
    },
    deleteMail () {
      let params = new URLSearchParams()
      params.append('msgId', this.deleteId)
      axios.post('http://' + this.$ip + ':' + this.$port + '/delete_message', params).then(res => {
        console.log('successfully delete message')
        this.dialogDeleteVisible = false
        alert('删除成功')
        axios.get('http://' + this.$ip + ':' + this.$port + '/read_message').then(res => {
          console.log('mailbox')
          console.log(res.data)
          let jsonObj = JSON.parse(JSON.stringify(res.data))
          this.mails = jsonObj
        }).catch(error => {
          console.log(error)
        })
      })
    },
    refresh () {
      axios.get('http://' + this.$ip + ':' + this.$port + '/read_message').then(res => {
        console.log('mailbox')
        console.log(res.data)
        let jsonObj = JSON.parse(JSON.stringify(res.data))
        this.mails = jsonObj
      }).catch(error => {
        console.log(error)
      })
    }
  },

  data () {
    return {
      toId: '',
      dialogFormVisible: false,
      mails: [],
      content: '',
      formLabelWidth: '120px',
      message: '',
      dialogDeleteVisible: false,
      deleteId: ''
    }
  },
  mounted () {
    axios.get('http://' + this.$ip + ':' + this.$port + '/read_message').then(res => {
      console.log('mailbox')
      console.log(res.data)
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.mails = jsonObj
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
<style scoped>
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
