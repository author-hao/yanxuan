<template>
<div class="personalData_con">
  <div class="personalData_wapper" ref='personalData_wapper'>
  <div class="personalData">
      <header class="head_portrait ">
            <div v-if='showLogin'>
                <p></p>
                <router-link to='/login'>
                    登录
                </router-link>
            </div>
          <dl v-else>
              <dt @click='out'>
                  <img src="../../../static/images/img_06.png" alt="">
              </dt>
              <dd>
                  <p>{{ user }}</p>
                  <span @click='jifen'>积分：20</span>
              </dd>
          </dl>
      </header>
       <div class="swiper-container broadcast">
          <div class="swiper-wrapper">

              <div class="swiper-slide"><i class="iconfont icon-laba"></i> <marquee behavior="scroll" width='100%' height='37' direction="right"  scrolldelay="30" scrollamount="5" loop='-1'>新上线更稳定的付费快递查询接口</marquee></div>
          </div>
      </div>
      <div class="hr"></div>
      <section class="order_from">
        <h3 @click='Orders'>
           <i class="iconfont icon-dingdan1"></i> 我的订单
        </h3>
        <ul>
            <li>
               <router-link to='/orderslist/staypayment'><i class="iconfont icon-qianbao"></i>
                <p>待付款</p></router-link>
                <span v-if='count_id_no_pay'>{{count_id_no_pay}}</span>
            </li>
            <li>
                <router-link to='/orderslist/staysend'><i class="iconfont icon-daifahuo"></i>
                <p>待发货</p></router-link>
                 <span v-if='count_id_no_transfer'>{{count_id_no_transfer}}</span>
            </li>
            <li>
                <router-link to='/orderslist/staygoods'><i class="iconfont icon-fahuo"></i>
                <p>待收货</p></router-link>
                <span v-if='count_id_no_confirm'>{{count_id_no_confirm}}</span>
            </li>
            <li>
               <router-link to='/orderslist/stayevaluate'><i class="iconfont icon-pingjia"></i>
                <p>待评价</p></router-link>
                <span v-if='count_id_no_reputation'>{{ count_id_no_reputation }}</span>
            </li>
        </ul>
        <div class="orders">
            <ol>
                <li>
                  <router-link to='/balance'><i class="iconfont icon-yue"></i>
                  <p>我的余额</p>
                  <span>0 元</span></router-link>
                </li>
                <li>
                  <router-link to=''><i class="iconfont icon-kanjia"></i>
                  <p>我的砍价</p></router-link>
                </li>
                <li>
                  <router-link to=''><i class="iconfont icon-youhuiquan"></i>
                  <p>我的礼券</p></router-link>
                </li>
                <li>
                  <router-link to=''><i class="iconfont icon-xingxing"></i>
                  <p>我的收藏</p></router-link>
                </li>
                <li>
                  <router-link to='/site'><i class="iconfont icon-LC_icon_gps_line_1"></i>
                  <p>我的地址</p></router-link>
                </li>
                <li>
                  <router-link to=''><i class="iconfont icon-kefu"></i>
                  <p>联系客服</p></router-link>
                </li>
            </ol>
        </div>
        <div class="foot">
            清欢严选 v2.2.0
        </div>
      </section>
  </div>
  </div>
  </div>
</template>

<script>
import '@/assets/font_iocn/iconfont.css'
import BScroll from 'better-scroll'
import { getCookie, delCookie } from '@/components/util/cookie.js'
export default {
  data () {
    return {
      showLogin: true,
      count_id_no_transfer: 0, // 待发货订单数
      count_id_no_pay: 0, // 未支付订单数
      count_id_no_confirm: 0, // 待确认收货订单数
      count_id_success: 0, // 交易完成订单数
      count_id_close: 0, // 关闭的订单数
      count_id_no_reputation: 0, // 待评价订单数
      user: '小苹果' // 用户名
    }
  },
  created () {
  	this.user = getCookie('user')
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.personalData_wapper, {
        click: true
      })
    }, 20)
    let token = getCookie('token')
    console.log(token)
    if (token) {
      this.showLogin = false
    } else {
      this.showLogin = true
    }
  },
  updated () {
    let token = getCookie('token')
    if (token) {
      this.showLogin = false
    } else {
      this.showLogin = true
    }
  },
  methods: {
    jifen () { // 签到页
      this.$router.push('/signin')
    },
    Orders () { // 订单列表
      this.$router.push('/orderslist/staypayment')
    },
    out () { // 退出
      this.$cookie.delete('token')
      delCookie('user')
      this.showLogin = true
      this.$router.replace('/login')
    }
  },
  mounted () { // 订单数据统计
    let token = getCookie('token')
    this.$http.get(global.data.api + '/order/statistics?' + 'token=' + token).then(res => {
      let { data } = res
      if (data.code === 0) {
        this.count_id_no_transfer = data.data.count_id_no_transfer
        this.count_id_no_pay = data.data.count_id_no_pay
        this.count_id_no_confirm = data.data.count_id_no_confirm
        this.count_id_success = data.data.count_id_success
        this.count_id_no_reputation = data.data.count_id_no_reputation
        this.count_id_close = data.data.count_id_close
        this.$store.commit('onPaySize', data.data.count_id_no_pay)
      }
    })
  }
}
</script>

<style>

</style>
