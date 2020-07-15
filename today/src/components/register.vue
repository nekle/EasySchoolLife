<template style="text-align: center">
  <el-container style="text-align: center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="age">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nicheng">
        <el-input type="text" v-model="ruleForm.nicheng" autocomplete="off"></el-input>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('账号至少为两位数字'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
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
        account: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAge, trigger: 'blur' }
        ],
        nicheng: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('注册成功')
          // 这里写axios请求 传账号和密码
          var params = new URLSearchParams()
          params.append('account', this.ruleForm.account)
          params.append('password', this.ruleForm.pass)
          params.append('again_password', this.ruleForm.checkPass)
          params.append('nicheng', this.ruleForm.nicheng)
          axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/sign', params).then(res => {
            console.log(res.data)
            // 接收注册成功后，这里写跳转界面到mainPage
            this.$router.push('/login')
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('注册失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
