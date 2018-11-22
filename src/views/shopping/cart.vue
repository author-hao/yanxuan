<template>
    <div class="cart">
      <h3><span v-if='cart_data.length' @click='updata_resover'>{{ updata }}</span>  购物车</h3>

       <section class="myCart"  ref="myCart">

          <div class="wapper">
                  <div class="my_list">
                    <div v-if='!cart_data.length' class="empty">
                  <img src="../../../static/images/gwc.jpg" alt="">
                  <p>去加点什么吧</p>
              </div>
            <!-- 购物车 -->
            <section class="cart_list">
                <dl v-for='(item, i) in cart_data' :key='i' >
                    <dt @click='checkbox(item.id)'>
                        <span>
                            <i :class="{'check':item.paixu }"></i>
                        </span>
                        <img :src="item.pic" alt="">
                    </dt>
                    <dd>
                        <h3>{{ item.name }}</h3>
                        <span>￥{{ item.originalPrice }}</span>
                        <!-- 加减操作 -->
                        <div class="operation">
                            <span @click='odds(item.id)' :class="{'reduce':item.number <= 1}">-</span>
                            <span>{{ item.number }}</span>
                            <span @click='adds(item.id)'>+</span>
                        </div>
                    </dd>
                </dl>
            </section>
            <h2></h2>
            <div class="like">
                <h3>猜你喜欢</h3>
                <section class="rec-Sentiment_con">
                      <div v-for='item in common_list' :key='item.id'>
                            <router-link :to='{ path: "/details", query: {id: item.id }}'><img :src="item.pic" alt=""></router-link>
                            <div>全场使用优惠券立减88元</div>
                            <p>{{ item.name }}</p>
                            <span>￥{{ item.originalPrice }}</span>
                      </div>
                  </section>
            </div>
              </div>
        </div>
      </section>

      <!-- 底部下单 -->
       <footer class="orders" v-if="cart_data.length" v-show='!updelete' >
          <div>
              <input type="checkbox"  @change='checkedAll(isShow)' v-model="isShow" id='checked'><label for="checked"></label>
              <span>全选</span>
          </div>
          <div>
              <span>合计：<i>￥{{ zjAll }}</i></span>
              <button :disabled='!checked_dan' @click='Confirm' :class="{'button': isShow |checked_dan }">下单</button>
          </div>
       </footer>

       <!-- 删除 -->
       <footer v-if="cart_data.length" v-show="updelete" class="deleteAll">
           <div @click='checkedAll(isShow)'>
              <input type="checkbox" @change='checkedAll(isShow)' v-model="isShow" id='checked2'><label for="checked2"></label>
              <span>全选</span>
          </div>
          <div>
              <span v-if='zjAll' >合计：<i>￥{{ zjAll }}</i></span>
              <button :disabled='!checked_dan' @click='delList' :class="{'button2':checked_dan }">删除</button>
          </div>
       </footer>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      isShow: false,
      updelete: false,
      common_list: []
    }
  },
  computed: {
    updata () {
      return this.updelete ? '完成' : '编辑'
    },
    cart_data () { // 获取用户加入购物车的数据
      return this.$store.state.listData
    },
    checked () { // 全部单选返回 true
      return this.cart_data.every(item => {
        return item.paixu === true
      })
    },
    checked_dan () { // 单选
      return this.$store.state.listData.some(i => {
        return i.paixu === true
      })
    },
    zjAll () { // 总价
      let zjnum = 0
      this.cart_data.forEach(i => {
        if (i.paixu === true) {
          zjnum += i.originalPrice * i.number
        }
      })
      return zjnum
    }
  },
  mounted () { // 猜你喜欢列表
    this.$http.post(global.data.api + '/shop/goods/list').then(res => {
      let { data } = res
      if (data.code === 0) {
        this.common_list = data.data.filter(item => {
          return item.recommendStatusStr === '普通'
        })
        this.$nextTick(() => {
         this.ScrollBar() 
         this.scroll.on('touchEnd', () => {
         	if (this.scroll.y <= this.scroll.maxScrollY) {
         		this.scroll.refresh()
         	}
         })
         setTimeout(() => {
         	this.common_list
         	this.scroll.refresh()
         }, 20)
       })
      }
    })
  },
  methods: {
    updata_resover () { // 切换header 编辑按钮
      this.updelete = !this.updelete
    },
    Confirm () { // 跳转到订单创建页
      this.$router.push('/confirm')
      this.$store.commit('create_order')
    },
    adds (id) { // 数量加加
      console.log(id)
      this.$store.commit('add', id)
    },
    odds (id) { // 数量减减
      this.$store.commit('odd', id)
    },

    checkbox (id) { // 单个选中、取消
      this.$store.commit('checkeds', id)
    },

    checkedAll (bool) { // 全选
      this.$store.commit('checkedA', bool)
    },
    delList () {
      this.$store.commit('delete')
      if (this.cart_data.length === 0) this.isShow = false
    },
	ScrollBar () {
    this.scroll = new BScroll(this.$refs.myCart, {
        scrollY: true,
        tap: true,
        click: true,
    })
	}

  },
  watch: { // 监听 CheckBox
    checked () {
      this.isShow = this.checked === true ? this.checked : false
    }
  },
}
</script>

<style>

</style>
