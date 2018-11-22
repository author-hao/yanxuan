<template>
  <div class="footer">
      <ul>
          <li>
              <router-link exact to='/' ><i class="iconfont icon-shouye"></i>
              <span>首页</span></router-link>
          </li>
          <li>
            <router-link to='/classification'><i class='iconfont icon-guizi'></i>
              <span>分类</span></router-link>
          </li>
          <li>
             <router-link to='/cart'> <i class="iconfont icon-gouwuche"></i>
             <span>购物车 </span></router-link>
             <strong v-if='cartNum' >{{ cartNum }}</strong>
          </li>
          <li>
              <router-link to='/personal'><i class="iconfont icon-geren"></i>
              <span>个人</span></router-link>
              <strong v-if='ONpay' >{{ ONpay }}</strong>
          </li>
      </ul>
  </div>
</template>

<script>
import '@/assets/font/iconfont.css'
export default {
  computed: {
    cartNum () {
      return this.$store.state.cart_count
    },
    ONpay () {
    	return this.$store.state.payNum
    }
  },
  mounted () {
  	let token =  this.$cookie.get('token')
    this.$http.get(global.data.api + '/order/statistics?' + 'token=' + token).then(res => {
      let { data } = res
      if (data.code === 0) {
        this.$store.commit('onPaySize', data.data.count_id_no_pay)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
  .footer {
      width: 100%;
      height:rem(143);
      border-top: 1px solid rgb(226, 223, 223);
      background: #fff;
      z-index: 999;
  }
  .footer ul {
      display: flex;
      list-style: none;
  }
  .footer ul li {
      width: 25%;
      font-size:rem(18);
      text-align: center;
      position: relative;
      padding-top:rem(19);
  }
  .footer ul li a {
       color: #7d7d7d;
       -webkit-tap-highlight-color:#fff;
  }
  .footer ul li a:hover {
      text-decoration: none;
  }
  .footer ul li strong {
      position: absolute;
      right:rem(48);
      top: rem(15);
      width: rem(52);
      height: rem(52);
      line-height: rem(52);
      text-align: center;
      border-radius: 50%;
      font-size: rem(30);
      background: #ff383e;
      color: #ffebe8;
  }
  .footer ul li a i {
      display: block;
      font-size: rem(63);
      padding-bottom:rem(5);
  }
  .footer ul li a span {
      font-size: rem(25);
  }
  .footer ul li .router-link-active {
      color: #a42a2a;
      text-decoration: none;
      background:#fff;
  }
</style>
