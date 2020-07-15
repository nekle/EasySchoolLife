<template style="text-align: center">
  <el-container style="text-align: center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="nicheng">
        <el-input type="textarea" v-model="ruleForm.nicheng"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="textarea" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input type="textarea" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>

import axios from 'axios'

export default {
  data () {
    return {
      ruleForm: {
        nicheng: '',
        email: '',
        phone: ''
      },
      rules: {
        nicheng: [
          { require: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { require: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { require: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这里写AXIOS 请求， 传修改后的信息
          var params = new URLSearchParams()
          params.append('nicheng', this.ruleForm.nicheng)
          params.append('phone', this.ruleForm.phone)
          params.append('email', this.ruleForm.email)
          axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/changeinfo', params).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
              alert('个人信息修改成功！')
            } else {
              alert('个人信息修改失败！')
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () { // 个人信息
    axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/getinfo').then(res => {
      console.log('修改个人信息列表')
      let jsonObj = JSON.parse(JSON.stringify(res.data))
      this.ruleForm.nicheng = jsonObj.data.info.nicheng
      this.ruleForm.email = jsonObj.data.info.email
      this.ruleForm.phone = jsonObj.data.info.phone
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
