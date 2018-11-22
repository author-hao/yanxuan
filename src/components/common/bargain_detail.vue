<template>
	<!-- 砍价页面 -->
<div class="details">
    <header class="details_title">
        <span @click='Return'><i>&lt;</i></span>
    </header>
    <section class="details_warpper">
      <scroller ref="myscroller">
        <div class="details_con">
          <div class="swiper-container banner">
              <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for='(item, i) in imgSrc' :key='i'>
                    <img :src="item.pic" alt="图片加载失败" >
                </li>
            </ul>
             <div class="swiper-pagination"></div>
          </div>

            <div class="details_data">
                <h3>{{deatil_data.name}}</h3>
                <p>{{ deatil_data.characteristic }}</p>
                <ul>
                    <li>
                        <span>底价 <i>￥{{ kanjiaPrice.minPrice }}</i></span>
                        <span>原价 ￥{{ kanjiaPrice.originalPrice }}</span>
                    </li>
                    <li>
                        库存 {{ deatil_data.stores }}
                     </li>
                </ul>
            </div>
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
    <footer class="details_commit_Btn">
          <button @click='go_kanjia'>立即发起砍价，最低可砍到99元</button>
    </footer>
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
      imgSrc: [],
      deatil_data: {},
      kanjiaPrice: {},
      detail_content: '',
      isShow: true
    }
  },
  methods: {
    Return () {
      this.$router.back()
    },
    Show () {
      this.isShow = true
    },
    Hide () {
      this.isShow = false
    },
    go_kanjia () { // 进入砍价页面
      let list = Object.assign( this.deatil_data, this.kanjiaPrice)
      console.log(list)
      this.$store.commit('kanjiaData', list)
      this.$router.replace('/kanjiaDetail')
    },
    MyScroll () {
      this.$nextTick(() => {
        this.scroll = this.$refs.myscrolle
      })
    },
    MySwiper () { // 滚动
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
    let { id } = this.$route.query // 详情
    this.$http.post(global.data.api + '/shop/goods/detail?id=' + id).then(res => {
      let { data } = res
      console.log(data)
      if (data.code === 0) {
        this.imgSrc = data.data.pics // 轮播图
        this.deatil_data = data.data.basicInfo // 商品名称
        this.detail_content = data.data.content // 商品内容
      }
      this.$nextTick(() => {
        this.MySwiper()
      })
      this.MyScroll()
    })
    // 砍价详情
    this.$http.get(global.data.api + '/shop/goods/kanjia/list').then(res => {
    	let { data } = res
    	console.log(data.data)
    	if (data.code === 0) {
        let { id } = this.$route.query

    	  let aa = data.data.result.filter(i => {
    		  return  i.goodsId == id
        })
        // this.kanjiaPrice = JSON.parse(JSON.stringify(aa).replace(/\[|]/g,'')) // 正则去掉数组中括号 []
         console.log(this.kanjiaPrice)
    	}
   })
  }
}
</script>

<style>

</style>
