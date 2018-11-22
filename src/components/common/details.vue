<template>
<div class="details">
    <header class="details_title">
        <span @click='Return'><i>&lt;</i></span>
    </header>
    <section class="details_warpper">
      <scroller ref="myScroller">
               <div class="details_con">
          <div class="swiper-container banner">
              <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for='(item, i) in imgSrc' :key='i'>
                    <img :src="item.pic" alt="图片加载失败" >
                </li>
            </ul>
             <div class="swiper-pagination"></div>
          </div>

           <!-- 普通 -->
            <div v-if='!title' class="details_data_pu">
                <h3>{{deatil_data.name}}</h3>
                <p>{{ deatil_data.characteristic }}</p>
                <ul>
                    <li>
                        <span>￥{{ deatil_data.minPrice }}</span>
                        <span>￥{{ deatil_data.originalPrice }}</span>
                    </li>
                    <li>
                        已售 {{ deatil_data.stores }}
                     </li>
                </ul>
                <h2></h2>
                <div @click='commonShow2' class="putong_xuanze">
                  <p>选择规格：选择版本选择服务</p>
                  <span>></span>
                </div>
                <h2></h2>
            </div>

      <!-- /////////////////////////////////////////////////////////////////////////////// -->
             <!-- 拼团 -->
            <div v-if='title' class="pintuan">
                <div class="details_data2">
                  <h3>{{deatil_data.name}}</h3>
                  <p>{{ deatil_data.characteristic }}</p>
                  <ul>
                      <li>
                            <div>拼团价 ￥<span>{{ deatil_data.pingtuanPrice }}</span></div>
                          <p>
                              <span>2人开团</span>
                              <span>原价 <s>￥{{ deatil_data.originalPrice }}</s></span>
                          </p>
                      </li>
                      <li>
                          已团{{ deatil_data.stores }}件
                      </li>
                  </ul>
              </div>
              <p class="hr"></p>
              <div class="flowpath">
                  <h3>拼团流程</h3>
                    <ol>
                        <li>
                            <i class="iconfont icon-gouwuche"></i>
                            <p>支付开团或拼团</p>
                        </li>
                        <li>
                            <i class="iconfont icon-gouwuche"></i>
                            <P>邀请好友一起拼团</P>
                        </li>
                        <li>
                            <i class="iconfont icon-gouwuche"></i>
                            <p>达到人数一起发货</p>
                        </li>
                        <li>
                            <i class="iconfont icon-gouwuche"></i>
                            <p>人数不够自动退款</p>
                        </li>
                    </ol>
                  <div @click='kuang' class="xuanze">
                        <p>选择规格：选择版本选择服务</p>
                        <span>></span>
                  </div>
              </div>
              <p class="hr"></p>
            </div>

        <!-- 商品介绍、评价 -->
            <div class="content_detail">
                <ul>
                    <li :class="{'active':isShow}" @click='Show'>
                       商品介绍
                    </li>
                    <li :class="{'active':!isShow}" @click='Hide'>
                        商品评价
                    </li>
                </ul>
            </div>
           <section id='detailContent'>
                 <div v-if='isShow'>
                  <Recommend :status='detail_content' />
              </div>
              <div v-else>
                  <Estimate />
              </div>
           </section>
        </div>
        </scroller>
    </section>

    <!-- /////////////////////////////////////////////////////////////////////////////////// -->
    <!-- 普通模式 -->
    <footer v-if='!title' class="details_commit">
        <ul>
            <li class="iocn">
                  <i class="iconfont icon-kefu"></i>
            </li>
            <li class="iocn" @click='cart_shoppng'>
                <i class="iconfont icon-gouwuche"></i>
                <span>{{ cartNum }}</span>
            </li>
            <li class="iocn">
                <i class="iconfont icon-xingxing"></i>
            </li>
            <li @click='commonShow'>
                <span>立即购买</span>
            </li>
            <li class="btn">
                <button @click='commonShow2'>加入购物车</button>
            </li>
        </ul>
    </footer>

    <!-- 开团按钮模式 -->
    <footer v-if='title' class="kaituanBtn">
        <ol>
            <li>
                <i class="iconfont icon-kefu"></i>
            </li>
            <li>
                <i class="iconfont icon-kefu"></i>
            </li>
            <li @click='kuang'>
                <span>￥{{ deatil_data.originalPrice }}</span>
                <span>原价购买</span>
            </li>
            <li @click="moTaiShow">
                <span>￥{{ deatil_data.pingtuanPrice }}</span>
                <span>一键开团</span>
            </li>
        </ol>
    </footer>



<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////// -->
     <!-- 拼团模态框 立即购买模式-->
    <div v-if='moT' class="motai">
          <div class="motai_list">
              <div class="motai_con">
                <p><span @click='kuangHide'>X</span></p>
                  <dl class="shangpin">
                      <dt><img :src="deatil_data.pic" alt=""></dt>
                      <dd>
                          <h5>{{deatil_data.name}}</h5>
                          <span>￥{{ deatil_data.originalPrice }}</span>
                      </dd>
                  </dl>
                  <div class='pin-xuanze'>
                  	  <p>选择版本</p>
	                  <ul>
	                     <li class="li">{{ category.name }}</li>
	                  </ul>
	                  <p>选择服务</p>
	                  <ol>
	                       <li :class="{'fuwu':getId === item.id }" v-for='(item) in  properties[0].childsCurGoods' @click='setId(item)' :key='item.id'>{{ item.name }}</li>
	                  </ol>
                  </div>
                  <dl class="num">
                      <dt>
                          购买数量
                      </dt>
                      <dd>
                          <span @click='odd_up'>-</span>
                          <span>{{ num }}</span>
                          <span @click='add_in'>+</span>
                      </dd>
                  </dl>
              </div>
              <footer class="mai">
                  <button @click='goumai'>立即购买</button>
              </footer>
          </div>
    </div>

    <!-- 拼团模态框 一键开团模式-->
    <div v-if='moTai' class="motai2">
          <div class="motai_list">
              <div class="motai_con">
                <p><span @click='moTaiHide'>X</span></p>
                  <dl class="shangpin">
                      <dt><img :src="deatil_data.pic" alt=""></dt>
                      <dd>
                          <h5>{{deatil_data.name}}</h5>
                          <span>￥{{ deatil_data.pingtuanPrice }}</span>
                      </dd>
                  </dl>
                  <div class='xuanze'>
                  	  <p>选择版本</p>
	                  <ul>
	                      <li class="li">{{ properties[0].name }}</li>
	                  </ul>
	                  <p>选择样式</p>
	                  <ol>
	                      <li :class="{'fuwu':getId === item.id }" v-for='(item) in childsCurGoods' :key='item.id' @click='setId(item)' >{{ item.name }}</li>

	                  </ol>
                  </div>
                  
                  <dl class="num">
                      <dt>
                          购买数量
                      </dt>
                      <dd>
                          <span @click='odd_up'>-</span>
                          <span>{{ num }}</span>
                          <span @click='add_in'>+</span>
                      </dd>
                  </dl>
              </div>
              <footer class="mai">
                  <button @click='pintuan'>立即开团</button>
              </footer>
          </div>
    </div>



<!--//////////////////////////////////////////////////////////////////////////////////////////////////////-->
    <!-- 普通立即购买模态框 -->
    <div v-if='general_kuang' class="moTai_putong">
        <div class="general">
            <div class="motai_con">
                <p><span @click='commonHide'>X</span></p>
                  <dl class="shangpin">
                      <dt><img :src="deatil_data.pic" alt=""></dt>
                      <dd>
                          <h5>{{deatil_data.name}}</h5>
                          <span>￥{{ deatil_data.originalPrice }}</span>
                      </dd>
                  </dl>
                   <div class='pu-xuanze'>
                   	   <dl v-for='item in properties' :key='item.id'>
                   	   		<dt>
                   	   			 {{item.name }}
                   	   		</dt>
                   	   		<dd>
                   	   			<span v-for='list in item.childsCurGoods' :key='list.id' :class="{'ol':getId === list.id }" @click='setId(list)'>{{ list.name }}</span>
                   	   		</dd>
                   	   </dl>
                   </div>

                  <dl class="num">
                      <dt>
                          购买数量
                      </dt>
                      <dd>
                          <span @click='odd_up'>-</span>
                          <span>{{ num }}</span>
                          <span @click='add_in'>+</span>
                      </dd>
                  </dl>
            </div>
              <footer class="mai">
                  <button @click='cheange_filter(deatil_data, num)'>立即购买</button>
              </footer>
        </div>
    </div>

    <!-- 普通加入购物车模态框 -->
    <div v-if='general_kuang2'  class="moTai_putong2">

        <div class="general">
            <div class="motai_con">
                <p><span @click='commonHide2'>X</span></p>
                  <dl class="shangpin">
                      <dt><img :src="deatil_data.pic" alt=""></dt>
                      <dd>
                          <h5>{{deatil_data.name}}</h5>
                          <span>￥{{ deatil_data.originalPrice }}</span>
                      </dd>
                  </dl>
                  <div class='xuanze2'>
                  	  <p>选择版本</p>
	                  <ul>
	                      <li :class="{'ul2':getPin == properties[0].id }" @click='setPin(properties[0])'>{{ properties[0].name }}</li>
	                  </ul>
	                  <p>选择样式</p>
	                  <ol>
	                      <li :class="{'ol2':getId === item.id }" v-for='(item) in  properties[0].childsCurGoods' :key='item.id' @click='setId(item)' >{{ item.name }}</li>

	                  </ol>
                  </div>
                  <dl class="num">
                      <dt>
                          购买数量
                      </dt>
                      <dd>
                          <span @click='odd_up'>-</span>
                          <span>{{ num }}</span>
                          <span @click='add_in'>+</span>
                      </dd>
                  </dl>
            </div>
              <footer class="mai">
                  <button @click="setItems(deatil_data, num)">加入购物车</button>
              </footer>
        </div>
    </div>

    <!-- ////////////////////////////////////////////////////// -->
    <!-- 弹框 -->
    <div v-if='success' class='success_tan'>
        <span>{{ inFo }}</span>
    </div>
    <div v-if='error' class='success_tan'>
        <span>请选择商品、规格</span>
    </div>
</div>
</template>

<script>
import Swiper from 'swiper'
import Recommend from '@/components/common/detail_recommend'
import Estimate from '@/components/common/detail_estimate'
export default {
  components: {
    Recommend,
    Estimate
  },
  data () {
    return {
      inFo: '',
      imgSrc: [], // 轮播图
      deatil_data: {}, // 商品数据
      detail_content: '', // 商品介绍内容
      isShow: true, // 商品介绍和评价
      title: false, // 底部操作的切换
      general_kuang: false, // 普通模态框 立即购买
      general_kuang2: false, // 普通模态框 加入购物车
      moT: false, // 拼团立即购买模态框
      moTai: false, // 一键拼团模态框
      success: false, // 成功弹框
      error: false, // 错误弹框
      // category: {}, // 商品参数
      properties: [], // 商品样式选择
      getPin: '', // 商品 id
      getId: '', // 获取商品样式ID
      num: 1, // 普通加入购物车数量
      originalPrice: 0, // 挑选规格得到的价格
      guiName: '', // 挑选的商品信息
      chicun: '', // 挑选的尺寸
      token: this.$cookie.get('token')
    }
  },
  computed: {
    cartNum () { // 
      return this.$store.state.cart_count
    }
  },
  methods: {
    add_in () { // 加加操作
      this.num++
    },
    odd_up () { // 减减操作
      if (this.num <= 1) return
      this.num--
    },
    // 跳转到购物车
    cart_shoppng () {
      this.$router.push('/cart')
    },
    Return () { // 返回
      this.$router.back()
    },
    // 商品介绍
    Show () {
      this.isShow = true
    },
    Hide () { // 商品评价
      this.isShow = false
    },
    // 拼团立即购买模式
    kuang () {
      this.moT = true
    },
    // 拼团关闭立即购买模式
    kuangHide () {
      this.moT = false
    },
    moTaiShow () { // 开启一键开团模态框
      this.moTai = true
    },
    moTaiHide () { // 关闭一键开团模态框
      this.moTai = false
    },
    commonShow () { // 普通模式显示 模态框 立即购买
      this.general_kuang = true
    },
    commonHide () { //  关闭普通模式模态框 立即购买
      this.general_kuang = false
    },
    commonShow2 () { // 普通模式显示 加入购物车 模态框
      this.general_kuang2 = true
    },
    commonHide2 () { //  关闭普通模式加入购物车模态框
      this.general_kuang2 = false
    },
    setId (id) { // 商品尺寸
      this.getId = id.id
      this.chicun = id.name
    },
    setPin (id) { // 商品名
      this.getPin = id.id
      this.guiName = id.name
    },
    // //////////////////////////////////////////////////
    // 拼团
    goumai () { // 立即购买
      if (!this.getId) {
        alert('请选择规格')
        return 
      } else {
        let query = new URLSearchParams()
        query.append('goodsId', this.deatil_data.id)
        query.append('propertyChildIds', this.getPin + ':' + this.getId)
        this.$http.post(global.data.api + '/shop/goods/price', query).then(res => {
          console.log(res.data)
          let { data } = res
          if (data.code === 0) {
            
          }
        })
      }
    },
    pintuan () { // 拼团购买
    	console.log(this.token)
    	if (!this.getId) {
    		alert('请选择规格')
    		return
    	}
    	let query = new URLSearchParams()
    	query.append('token', this.token)
    	query.append('goodsId', this.deatil_data.id )
      this.$http.post(global.data.api + '/shop/goods/pingtuan/open', query).then(res => {
        let { data } = res
        console.log(data)
      })
    },

    // ////////////////////////////////////////////////////
    // 普通
    setItems (item, num) { // 加入购物车
      if (!this.getId && !this.getPin && this.getPin === '') {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 1000)
        return false
      } else if (this.getPin !== '' && this.getPin !== '') {
        let query = new URLSearchParams()
        query.append('goodsId', this.deatil_data.id)
        query.append('propertyChildIds', this.getPin + ':' + this.getId)
        this.$http.post(global.data.api + '/shop/goods/price', query).then(res => {
          let {data} = res
          if (data.code === 0) {
            this.general_kuang2 = false
            let JsonStr = data.data
            JsonStr.remark = ''
            JsonStr.inviter_id = 6938
            JsonStr.name1 = this.guiName
            JsonStr.name2 = this.chicun
            JsonStr.logisticsType = 0
            item.number = num
            let items = Object.assign(item, JsonStr)
            // console.log(items)
            this.$store.commit('setListData', items)
            this.inFo = '加入购物车成功'
            let a = setTimeout(() => {
              this.success = true
            }, 50)

            setTimeout(() => {
              clearTimeout(a)
              this.success = false
            }, 1000)
          } else if (data.code === 405) {
            this.inFo = data.msg
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 1000)
          } else {
            this.inFo = data.msg
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 1000)
          }
        })
      } else {
        this.inFo = '请继续选择规格'
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 1000)
      }
    },
    // 普通立即购买
    cheange_filter (item, num) { // 获取返回值 、、立即购买按钮
      if (!this.getId) {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 1000)
        return false
      } else if (this.getId !== '') {
        console.log(this.getId + ':' + this.properties[0].id)
        let query = new URLSearchParams()
        query.append('goodsId', this.deatil_data.id)
        query.append('propertyChildIds', this.properties[0].id + ':' + this.getId)
        this.$http.post(global.data.api + '/shop/goods/price', query).then(res => {
          let { data } = res
          this.inFo = '商品正在生成'
          this.success = true
          if (data.code === 0) {
            let sb = data.data
            item.number = num
            let a = {}
            a.name1 = this.guiName
            a.name2 = this.chicun
            sb.inviter_id = 6938
            sb.name = this.guiName
            sb.name2 = this.chicun
            sb.logisticsType = 0
            let ss = Object.assign(item, a, sb) // 把多个对象合并成一个
            // console.log(ss)
            setTimeout(() => {
              this.success = false
              this.$store.commit('go_createOrder', ss)
              this.$router.push('/confirm') // 直接跳到创建订单页
            }, 500)
          } else if (data.code === 405) {
            this.inFo = data.msg
            this.success = true
            setTimeout(() => {
              this.success = false
            }, 1000)
          } else {
            this.success = false
            alert('操作错误')
          }
        })
      } else {
        this.inFo = '请继续选择规格'
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 1000)
      }
    },
    // 立即购买
    go_order (item) {
      this.$store.commit('go_createOrder', item)
      // this.$router.push('/confirm') // 直接跳到创建订单页
    },

    initSwiper () { // 轮播图
      this.swiper = new Swiper('.banner', {
        loop: true,
        autoplay: {// 自动滑动
          disableOnInteraction: false
        },
        pagination: {// 如果需要分页器
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true
      })
    }
  },
  mounted () {
    let { id } = this.$route.query
    // console.log(id)
    this.$http.post(global.data.api + '/shop/goods/detail?id=' + id).then(res => {
      let { data } = res
      console.log(data)
      if (data.code === 0) {
        if (data.data.basicInfo.pingtuan === true) {
          this.title = false
        }
        this.imgSrc = data.data.pics // 轮播图
        this.deatil_data = data.data.basicInfo // 商品名称
        this.detail_content = data.data.content // 商品内容
        this.properties = data.data.properties
        console.log(this.properties)
        this.category = data.data.category
        this.$nextTick(() => { // 数据加载完成，在执行轮播
          this.initSwiper()
        })
      }
    })
    setTimeout(() => { // 滚动
      this.scroll = this.$refs.myScroller
    }, 20)
  }
}
</script>

<style>

</style>
