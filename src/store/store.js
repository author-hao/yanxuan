import Vue from 'vue'
import Vuex from 'vuex'
import { getCookie } from '@/components/util/cookie.js'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    cookie: getCookie('token'),
    scrollY: 0,
    cart_count: 0, // 购物车数量
    listData: [], // 加入购物车的数据
    site_dizhi: {}, // 地址
    listCont: 0,
    order_list: [], // 创建订单
    order_on_pay: {}, // 带支付订单
    order_site: {}, // 带支付订单的地址
    payNum: 0, // 待支付订单数
    kanjiaId: {} // 砍价的详情
  },
  mutations: {
    changeScrollY (state, num) {
      state.scrollY = num
    },
    // 加入购物车
    setListData (state, item) {
      // console.log(item)
      var flag = false
      state.listData.forEach(items => {
        if (items.id === item.id && items.propertyChildIds === item.propertyChildIds) {
          flag = true
        }
      })
      if (flag) {
        state.listData.map(i => {
          if (i.id === item.id) {
            i.number += item.number
          }
          return i
        })
      } else {
        state.listData.push(item)
      }
      let numAll = 0
      state.listData.forEach(item => {
        numAll += item.number
      })
      state.cart_count = numAll
    },
    // 获取地址
    setDizhi (state, site) {
      state.site_dizhi = site
    },
    // 数量++
    add (state, id) {
      state.listData = state.listData.map(item => {
        if (item.id === id) {
          item.number++
        }
        return item
      })
      let numAll = 0
      state.listData.forEach(item => {
        numAll += item.number
      })
      state.cart_count = numAll
    },
    // 数量减减
    odd (state, id) {
      state.listData = state.listData.map(item => {
        if (item.id === id) {
          if (item.number <= 1) { // 数量最少是 1, 到一后，不让减
            item.number = 1
          } else {
            item.number--
          }
        }
        return item
      })
      let numAll = 0
      state.listData.forEach(item => {
        numAll += item.number
      })
      state.cart_count = numAll
    },
    // 单选checked
    checkeds (state, id) {
      state.listData.map(item => {
        if (item.id === id) {
          item.paixu = !item.paixu
          console.log(item.paixu)
        }
        return item
      })
    },
    checkedA (state, bool) { // 全选
      state.listData = state.listData.map(item => {
        item.paixu = bool
        return item
      })
    },
    // 立即购买
    go_createOrder (state, item) {
      state.order_list = [] // 每次传递新的数据前，先初始化在添加
      state.order_list.push(item)
    },
    // 下订单
    create_order (state) {
      state.order_list = state.listData.filter(item => {
        return item.paixu === true
      })
    },
    delete (state) { // 删除购物车商品
      state.listData = state.listData.filter(i => {
        return i.paixu !== true
      })
      let Num = 0
      state.listData.map(ii => { // 重新计算数量
        Num += ii.number
      })
      state.cart_count = Num
    },
    orderOnpay (state, { site, As }) { // 接收待支付的订单
      // console.log(site, As)
      // console.log(state.listData)
      state.order_on_pay = As
      state.order_site = site
    },
    onPaySize (state, num) {
      state.payNum = num
    },
    getlistData (state, i) { // 获取本地存储

    // state.listData = i
    },
    kanjiaData (state, data) { // 砍价数据
      state.kanjiaId = data
    }

  }
})

export default Store
