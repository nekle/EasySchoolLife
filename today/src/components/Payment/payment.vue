<template>
  <el-card class="box-card">
    <ul class="msg-box">
      <li>
        <h4>我要充值</h4>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">充值金额</h4>
        <el-radio-group v-model="amountVal" @change="amountChange">
          <el-radio border :label="''+ 100">充值100</el-radio>
          <el-radio border :label="''+ 500">充值500</el-radio>
          <el-radio border :label="''+ 1000">充值1000</el-radio>
          <el-radio border :label="''+ 2000">充值2000</el-radio>
          <el-radio border :label="''+ 5000">充值5000</el-radio>
          <el-radio border :label="''">自定义</el-radio>
        </el-radio-group>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">充值方式</h4>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio border :label="''+ 0">微信</el-radio>
          <el-radio border :label="''+ 1">支付宝</el-radio>
        </el-radio-group>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">充值金额</h4>
        <el-input :disabled="disabled" clearable v-model="rechargeParams.money" placeholder="请输入金额" style="width: 150px;"></el-input>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 30px;">
      <el-button type="primary" @click="surePay">确认支付</el-button>
      <el-button type="primary" @click="canclePay">取消支付</el-button>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'payment',
  data () {
    return {
      amountVal: '',
      disabled: false,
      // 充值参数
      rechargeParams: {
        'money': '', // 金额
        'paymentType': '0', // 支付方式[0:微信,1:支付宝,2:余额,3:活动]
        'transType': '0' // 交易类型[0:充值,1:消费]
      }
    }
  },
  methods: {
    // 充值金额
    amountChange (val) {
      this.rechargeParams.money = val
      if (val === '') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    // 支付方式
    paymentTypeChange (val) {
      this.rechargeParams.paymentType = val
    },
    // 确认支付
    async surePay () {
      let params = new URLSearchParams()
      params.append('money', this.rechargeParams.money)
      axios.post('http://' + this.$ip + ':' + this.$port + '/user/account/money', params).then(res => {
        if (res.data.code === 0) {
          alert('充值成功')
          this.$router.push('/person')
        } else {
          alert('充值失败')
          this.$router.push('/person')
        }
      })
    },
    // 确认支付
    canclePay () {
      this.$router.push('/person')
    }
  }
}
</script>

<style scoped>
  /* 信息列表样式 */
  .msg-box > li {
    list-style: none;
    border-bottom: 1px solid #c5c5c5;
    padding: 20px 10px;
  }
</style>
