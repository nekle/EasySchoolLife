<template style="text-align: center">
  <el-container style="text-align: center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="old_pass">
        <el-input type="password" v-model="ruleForm.old_pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        account: '',
        old_pass: ''
      },
      rules: {
        old_pass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这里写AXIOS 请求， 传两次的密码
          var params = new URLSearchParams()
          params.append('password', this.ruleForm.old_pass)
          params.append('asset_pw', this.ruleForm.pass)
          params.append('again_pw', this.ruleForm.checkPass)
          axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/change', params).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
              alert('密码修改成功！')
            } else {
              alert('密码修改失败！')
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
  }
}
</script>
