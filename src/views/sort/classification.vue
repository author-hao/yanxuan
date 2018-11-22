<template>
  <!-- 分类 -->
  <div class="classification">
      <div class="search">
          <input type="text" placeholder="搜索商品"><i class="iconfont icon-fangdajing"></i>
      </div>
      <div class="classif_list">
          <div class="left_list">
              <ul>
                  <li v-for='(item, i) in list' :key='i' :class="{'active':red===i}" @click='list_filter(item.type, i)' >{{ item.name }}</li>
              </ul>
          </div>
          <div class="right_list" ref="right_list">
             <div class="right_list_con">
                <div class="swiper-container sort_banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../../static/images/banner3.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../../../static/images/banner3.jpg" alt=""></div>
                  </div>
                  <div class="swiper-pagination"></div>
                </div>
                <section class="sort_con">
                    <ul>
                        <li v-for='(item, i) in sortList' :key='i'>
                            <router-link :to="{path: '/sortDetail', query:{ id: item.id }}"><img v-lazy="item.icon" alt="图片加载失败">
                            <p>{{ item.name }}</p></router-link>
                        </li>
                    </ul>
                    <div v-if='loading' id='loading'>
                        <Loadding />
                    </div>
                </section>

          </div>
          </div>
      </div>

  </div>
</template>

<script>
import Swiper from 'swiper'
import BScroll from 'better-scroll'
import Loadding from '@/components/common/loadding'
export default {
  components: {
    Loadding
  },
  data () {
    return {
      loading: false,
      sortList: [],
      red: 0,
      list: [
        {
          name: '所有分类',
          type: 'all'
        },
        {
          name: '居家生活',
          type: 'jujia'
        },
        {
          name: '配件装饰',
          type: 'peishi'
        },
        {
          name: '新品服装',
          type: 'fuzhuang'
        }
      ]
    }
  },
  methods: {
    list_filter (type, i) {
      this.loading = true
      if (type && type !== 'all') {
        this.red = i
        this.$http.get(global.data.api + '/shop/goods/category/all').then(res => {
          let { data } = res
          if (data.code === 0) {
            setTimeout(() => {
              this.loading = false
            })
            let listData = data.data.filter(item => {
              return item.icon !== ''
            })
            this.sortList = listData.filter(item => {
              return (item.type === type + '2' && type)
            })
          }
        })
      } else {
        this.$http.get(global.data.api + '/shop/goods/category/all').then(res => {
          let { data } = res
          // console.log(data)
          if (data.code === 0) {
            setTimeout(() => {
              this.loading = false
            })
            this.red = 0
            this.sortList = data.data.filter(item => {
              return item.icon !== ''
            })
          }
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.right_list, {
          scrollY: true,
          click: true
        })
        this.scroll.refresh()
      })
    }, 20)
    this.list_filter()
    this.swiper = new Swiper('.sort_banner', {
      loop: true,
      autoplay: { // 可选选项，自动滑动
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }

}
</script>

<style scoped>

</style>
