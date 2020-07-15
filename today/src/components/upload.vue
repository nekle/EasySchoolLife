<template>
  <div>
  <label>图片</label>
  <div><el-avatar shape="square" :size="150" :src="imgurl"></el-avatar></div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :http-request="upLoad"
      accept=".png,.jpg"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      fileList: [],
      imgurl: ''
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    upLoad (file) {
      const formData = new FormData()
      file.name = 'av002.jpg'
      formData.append('headPicture', file.file)
      console.log(file.file)
      axios.post('http://' + this.$ip + ':' + this.$port + '/update_userHeadPicture', formData)
        .then(res => {
          console.log('headpicture')
          console.log(res)
          this.fileList = []
          if (res.data.result === 'success') {
            console.log(res.data.data.headpicture)
            this.imgurl = res.data.data.headpicture
          }
        })
    },
    beforeUploadVideo (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!')
        return false
      }
    },
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    handleVideoSuccess (res, file) { // 获取上传图片地址
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.status === 200) {
        this.videoForm.videoUploadId = res.data.uploadId
        this.videoForm.Video = res.data.uploadUrl
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-return-assign
    axios.get('http://' + this.$ip + ':' + this.$port + '/get_personal_info').then(res => {
      // this.squareUrl = 'http://' + this.$ip + ':' + this.$port + '/' + res.data.headpicture// headpicture: "user/1/weiqu.jpg"
      this.imgurl = res.data.headpicture
    }).catch(error => {
      console.log(error)
      this.$message.error('网络异常！')
    })
  }
}
</script>
