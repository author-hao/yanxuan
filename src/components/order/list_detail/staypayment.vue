<template>
 <!-- 待付款 -->
  <div class="staypayment">
    <section class='Nopay_warpper'>
        <div class='Nopay_con'>
          <div v-if='!noPayData.length'>
              还没有商品去购买吧
          </div>
          <ul v-if='noPayData.length' class='Nopay_danhao' v-for='i in noPayData' :key='i.id'>
              <li>下单时间：{{ i.dateAdd }}
              <span>待支付</span></li>
              <li>订单号：{{ i.orderNumber }}</li>
              <li>
                  <div>
                      <img src='../../../../static/images/img_06.png' alt='' />
                      <img src='../../../../static/images/img_04.png' alt='' />
                  </div>
              </li>
              <li>
                  <span>合计：{{ i.amount }}</span>
                  <p><button @click='outorder(i.id)'>取消订单</button> <button>立即支付</button></p>
              </li>
          </ul>
        </div>
    </section>
  </div>
</template>

<script>
import { getCookie } from '@/components/util/cookie.js'
import bus from '@/components/util/bus.js'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      status: 0, // 0 字段接收待支付
      noPayData: [], // 数据
      noPayimg: {},
      delId: '' // 接收id
    }
  },
  mounted () {
    this.nopayList() // 获取订单列表
  },
  created () {
     bus.$on('outPay', () => { // 删除取消订单
       this.delOrder()
     })
  },
  methods: {
    outorder (id) { // 开启弹框
        this.delId = id
        bus.$emit('Btnoutorder', true)
    },
    delOrder () { // 删除
        let token = getCookie('token')
        let query = new URLSearchParams()
        query.append('token', token)
        query.append('orderId', Number(this.delId))
        this.$http.post(global.data.api + '/order/close', query).then(res => {
            let { data } = res
            console.log(data)
            if (data.code === 0) {
                bus.$emit('Btnoutorder', false)
                this.nopayList() // 重新执行一次
            } else {
               alert('取消失败')
               this.nopayList()
            }
        }).catch(err => {
           // console.log(err)
             bus.$emit('Btnoutorder', false)
            alert('删除失败')
        })
    },
    nopayList () { // 获取待支付订单列表
        let token = getCookie('token')
        let query = new URLSearchParams()
        query.append('token', token)
        query.append('status', this.status)
        this.$http.post(global.data.api + '/order/list', query ).then(res => {
        let { data } = res
        if (data.code === 0) {
          this.noPayData = data.data.orderList
          this.noPayimg = data.data.goodsMap
        }
      })
    }
  }
}
</script>

<style>

</style>
