<template style="text-align: center">
  <el-container style="text-align: center">
    <el-form el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="account"
        label="找回账号"
        :rules="[
      { required: true, message: '请输入账号', trigger: 'blur' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.account"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
        <span>密码将发送至邮箱</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">找回</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'forget',
  data () {
    return {
      dynamicValidateForm: {
        email: '',
        account: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这里写axios请求 传邮箱
          var params = new URLSearchParams()
          params.append('email', this.dynamicValidateForm.email)
          params.append('account', this.dynamicValidateForm.account)
          axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/findpw', params).then(res => {
            console.log(res.data)
            // 接收注册成功后，这里写跳转界面到mainPage
            this.$router.push('/login')
            if (res.data.code === 0) {
              alert('密码已经发送至邮箱!')
            } else {
              alert('找回密码失败!!')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('找回密码失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    back () {
      this.$router.push('/login')
    }
  }
}
</script>
