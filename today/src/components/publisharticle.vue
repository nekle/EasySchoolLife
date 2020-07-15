<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item>
      <el-container>
        <el-header height="50px" class="header">
          发布账号租借信息
        </el-header>
      </el-container>
    </el-form-item>
    <el-form-item label="账号类型" prop="name">
      <el-select v-model="ruleForm.name" placeholder="请选择">
        <el-option
          v-for="item in ruleForm.options"
          :key="item.name"
          :label="item.label"
          :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="添加标签" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="视频会员" name="type"></el-checkbox>
        <el-checkbox label="超级会员" name="type"></el-checkbox>
        <el-checkbox label="3天" name="type"></el-checkbox>
        <el-checkbox label="独享" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="正文" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="account">
        <el-input class="inputbox" v-model="ruleForm.account" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input class="inputbox" v-model="ruleForm.password" placeholder="请输入内容" show-password></el-input>
    </el-form-item>
    <el-form-item label="单价（元/天）" prop="price">
      <el-input-number v-model="ruleForm.price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import upload from './upload'
import axios from 'axios'
export default {
  components: {
    upload
  },
  data () {
    return {
      ruleForm: {
        options: [{
          name: '腾讯视频',
          label: '腾讯视频'
        }, {
          name: '爱奇艺视频',
          label: '爱奇艺视频'
        }, {
          name: '哔哩哔哩',
          label: '哔哩哔哩'
        }, {
          name: '百度网盘',
          label: '百度网盘'
        }],
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        account: '',
        password: '',
        price: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入账号名称(百度网盘,腾讯会员等)', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个账号标签', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写正文,简要说明出租意向', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入要出租的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入要出租的密码', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('account', this.ruleForm.account)
          params.append('password', this.ruleForm.password)
          params.append('type', this.ruleForm.name)
          params.append('money', this.ruleForm.price)
          // post表单
          axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/push', params).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.data.code == 0) { // 判断登录返回值code，0则成功，其他则失败
              console.log('发布返回')
              console.log(res)
              alert('发布账号租借信息成功')
              this.$router.push({path: '/mainPage'})
            } else {
              alert('发布账号租借信息失败')
            }
          }).catch(error => {
            alert('错误或超时')
            console.log(error)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
<style>

</style>
