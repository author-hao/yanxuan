<template>
<!-- 余额 -->
  <div class="bio_balance">
      <header class="balance_title">
          <h3><span @click='Return'><i>&lt;</i></span></h3>

          <div class="price_list">
                <p>我的余额</p>
                <h2>￥0</h2>
                <span>付款时优先选择余额进行支付</span>
          </div>
      </header>
      <section class="price_con">
            <div>
                <p>提现金额</p>
                <div><label for="">￥</label><input type="text"></div>
                <p>提现金额100元起，1～5个工作日到账</p>
            </div>
            <button>提现</button>
            <button>取消</button>
      </section>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    Return () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
