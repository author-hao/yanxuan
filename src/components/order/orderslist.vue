<template>
  <div class="orderslist">
        <header class="site_title">
          <h3>
              <span @click='Return'><img src="../../../static/images/lefttou.svg" alt=""></span>
          订单列表
          </h3>
          <ul>
              <li class="site_red">
                 <router-link exact to='/orderslist/staypayment'>待付款</router-link>

              </li>
              <li>
                  <router-link to='/orderslist/staysend'>待发货</router-link>

              </li>
              <li>
                  <router-link to='/orderslist/staygoods'>待收货</router-link>

              </li>
              <li>
                  <router-link to='/orderslist/stayevaluate'>待评价</router-link>

              </li>
              <li>
                  <router-link to='/orderslist/hascompleted'>已完成</router-link>
              </li>
          </ul>
      </header>
      <section class="orders_list" ref='orders_list'>
      	  <div class='orders_list_con'>
      	  	<router-view />
      	  </div>
      </section>
       <!-- 取消订单的弹框 -->
    <div class='quxaioOrder' v-if='isTankuang'>
        <ul>
          <li>确认要取消吗？</li>
          <li><button @click='BtnOff'>狠心取消</button> <button @click='cancel'>去支付</button></li>
        </ul>
    </div>
  </div>
</template>

<script>
import bus from '@/components/util/bus.js'
import BScroll from 'better-scroll'
export default {
	data () {
		return {
			isTankuang: false // 根据字段来显示隐藏 弹框
		}
	},
	created () { // 显示弹框，接收数据
    bus.$on('Btnoutorder', value => {
      this.isTankuang = value
    })
  },
  methods: {
    Return () { // 返回
      this.$router.push('/personal')
    },
    cancel () { // 关闭弹框
      this.isTankuang = false
    },
    BtnOff () { // 删除待支付
    	bus.$emit('outPay')
    }
  },
  mounted () { // 滚动
  	 this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.orders_list, {
          scrollY: true, // 纵向滚动
          click: true
        })
     	this.scroll.refresh()
     })
  }
}
</script>

<style>

</style>
