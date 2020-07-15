<template>
  <div class="payBox">
    <div class="img-logo">
      <img src="http://img.huoxingbeidiao.com/public/WePayLogo.png" alt="">
    </div>
    <div class="info-box">
      <div style="padding-bottom: 20px;">
        <qrcode-vue :value="qrurl" :size="200" level="H"></qrcode-vue>
      </div>
      <img src="http://img.huoxingbeidiao.com/public/WePayInfo.png" alt="">
      <p class="price">¥&nbsp;{{amt}}</p>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'payPage',
  data () {
    return {
      amt: 0,
      qrurl: '',
      timer: null
    }
  },
  components: {
    QrcodeVue
  },
  methods: {
    getOrderInfo () {
      if (sessionStorage.qrurl && sessionStorage.amt) {
        this.qrurl = sessionStorage.qrurl
        this.amt = sessionStorage.amt
      }
    },
    startLoop () {
      this.timer = setInterval(() => {
        this.isPaySuccess()
      }, 3000)
    },
    async isPaySuccess () {
      const orderId = sessionStorage.order_id
      const res = await this.$http.get('orderInfo/queryOrder?orderId=' + orderId)
      const {
        code,
        msg
        // resultList
      } = res.data
      if (code === '200') {
        clearInterval(this.timer)
        this.timer = null
        sessionStorage.removeItem('qrurl')
        sessionStorage.removeItem('amt')
        sessionStorage.removeItem('order_id')
        sessionStorage.removeItem('returnUrl')
        setTimeout(() => {
          this.$router.push({
            name: 'order'
          })
        }, 3000)
      } else if (code === 401) {
        clearInterval(this.timer)
        this.timer = null
        sessionStorage.removeItem('qrurl')
        sessionStorage.removeItem('amt')
        sessionStorage.removeItem('order_id')
        sessionStorage.removeItem('returnUrl')
        this.$message.error(msg)
        this.$router.push({
          name: 'login'
        })
      } else {

      }
    }
  },
  created () {
    this.getOrderInfo()
    this.startLoop()
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style scoped>
  .payBox {
    width: 1000px;
    margin: 0 auto;
  }

  .payBox .img-logo {
    padding: 20px 0;
    text-align: center;
  }

  .payBox .img-logo img {
    width: 180px;
  }

  .info-box {
    padding: 60px 0;
    border-top: 3px solid #F43B66;
    -webkit-box-shadow: 0 0 32px 0 rgba(0, 0, 0, .18);
    box-shadow: 0 0 32px 0 rgba(0, 0, 0, .18);
    text-align: center;
  }

  .info-box .price {
    color: #F43B66;
    font-size: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
</style>
