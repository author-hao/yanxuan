<template>
  <div class="success">
          <header class="cuccess_head">
            <span @click='Confrim'><i>&lt;</i></span>
              订单详情
          </header>
          <section class="success_wrapper">
              <div class="success_con">
                  <dl>
                      <dt>
                          <i class="iconfont icon-yue"></i>
                      </dt>
                      <dd>
                          <div>商品总额：<span>￥{{ successData.amountReal }}</span></div>
                          <p>订单号：<span>{{ successData.orderNumber }}</span></p>
                      </dd>
                  </dl>
                  <ol>
                      <li>
                          <i class="iconfont icon-LC_icon_gps_line_1"></i>
                      </li>
                      <li>
                          <p>{{ successSite.linkMan }} <span>{{ successSite.mobile }}</span></p>
                          <span>{{ successSite.linkMan }}</span>
                      </li>
                  </ol>
              </div>
          </section>
        <footer class="zhifu">
            <button @click='pay'>确认支付</button>
        </footer>
        <div v-if='up' class="tanduang">
            <span>正在生成支付</span>
        </div>
        <div class='fanhui' v-if='out'>
        	<div>
        		<p>你还未支付，确认要离开吗？</p>
        		<button @click='Return'>狠心离开</button>
        		<button @click='delConfrim'>继续支付</button>
        	</div>
        </div>
  </div>
</template>

<script>
import { getCookie } from '@/components/util/cookie.js'
export default {
  data () {
    return {
      id: '',
      up: false,
      out: false
    }
  },
  computed: {
    successData () {
      return this.$store.state.order_on_pay
    },
    successSite () {
      return this.$store.state.order_site
    }
  },
  mounted () {
    // console.log(this.successData)
    // let params = new URLSearchParams()
    // params.append('token', getCookie('token'))
    // params.append('id', 'OD1811161921926935')
    // this.$http.post(global.data.api + '/order/detail', params).then(res => {
    //   let { data } = res
    //   console.log(data)
    // })
  },
  methods: {
  	Confrim () {
  		this.out = true
  	},
  	delConfrim () {
  		this.out = false
  	},
    Return () {
    	this.$router.back()
    },
    pay () {
      this.up = true
      setTimeout(() => {
        this.up = false
        let obj = {
        price: this.successData.amount, // 支付价钱
        id: this.successData.id // 生成订单后的id字段
        }
         window.location.href = 'http://www.wyunfei.com/pay.html'
      }, 1000)
    }
  }
}
</script>

<style>

</style>
