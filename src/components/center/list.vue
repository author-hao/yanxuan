<template>
  <section class='wrapper' ref="wrapper">
  <div class="list content" >
      <div class='list_top' v-if='dropDown'>
        <span>{{ Onload }}</span>
    </div>
      <!-- 轮播图 -->
      <Shuffling class="lun"/>

    <div class="section" >

        <ul class="icon">
            <li>
                <router-link to='/signin'><i class='iconfont icon-tubiaozhizuomoban'></i>
                <span>签到</span></router-link>
            </li>
            <li>
                <router-link to=''><i class='iconfont icon-viphuiyuanhuangguan'></i>
                <span>礼券</span></router-link>
            </li>
            <li>
                <router-link to='/bargain'><i class="iconfont icon-baozhuanhuan"></i>
                <span>砍价</span></router-link>
            </li>
            <li>
                <router-link to='/theme'><i class='iconfont icon-deng'></i>
                <span>专栏</span></router-link>
            </li>
        </ul>
        <div class="template_con">
              <h2 @click='bargain'><img src="../../../static/images/img10_03.png" alt=""> 全民砍价 <img src="../../../static/images/img10_03.png" alt=""> <span>></span></h2>
              <div class="template_list">
                   <dl v-for='(item, i) in kanjia' :key='i'>
                      <dt>
                           <router-link :to='{ path:"/bargaindetail", query:{id: item.id } }'>
                              <img v-lazy="item.pic" alt="">
                           </router-link>
                      </dt>
                          <dd @click='detail(item.id)'>
                                <h4>{{ item.name }}</h4>
                                <span>{{ item.characteristic }}</span>
                                <ul>
                                    <li>
                                          <span>￥{{ item.minPrice }}</span>
                                         <p>底价</p>
                                    </li>
                                    <li>
                                        <span>￥{{ item.originalPrice }}</span>
                                          <p>原价</p>
                                    </li>
                                    <li>
                                        <span>{{ item.commission }}件</span>
                                        <p>限量</p>
                                    </li>
                                </ul>
                          </dd>
                      </dl>

              </div>
        </div>

        <!-- 主题 -->
        <div class="Selected_topics">
            <h3 @click='theme'>精选主题 <span>></span></h3>
            <section class="zhuti" ref='zhuti'>
                <ul>
                    <li v-for='item in zhuti' :key='item.id'>
                        <router-link :to="{ path:'/themeDetail', query: {id: item.id }}" > <img v-lazy="item.pic" alt=""></router-link>
                        <h4>{{ item.title }}</h4>
                        <p>{{ item.descript }}</p>
                    </li>

                </ul>
            </section>
        </div>
        <div class="rec-Sentiment">
              <h3>人气推荐 <span>></span></h3>
              <section class="rec-Sentiment_con">
                  <div v-for='(item, i) in tuijian' :key='i'>
                        <router-link :to="{ path:'/details', query:{id: item.id }}"><img v-lazy="item.pic" alt=""></router-link>
                        <p>{{ item.name }}</p>
                        <p>{{ item.characteristic }}</p>
                        <span>￥{{ item.originalPrice }}</span>
                  </div>
              </section>
        </div>
    </div>
  </div>
  </section>
</template>

<script>
import Shuffling from './shuffling'
import BScroll from 'better-scroll'
import { getCookie } from '@/components/util/cookie.js'
import { setTimeout } from 'timers';

export default {
  components: {
    Shuffling
  },
  data () {
    return {
      Onload: '',
      dropDown: false,
      listData: [],
      kanjia: [], // 砍价
      tuijian: [], // 推荐
      zhuti: [] // 主题
    }
  },
  created () { // 拼团
    // 主题
    this.$http.get(global.data.api + '/cms/news/list').then(res => {
      let { data } = res
      if (data.code === 0) {
        this.zhuti = data.data
      }
      // console.log(data)
    })
    // 砍价商品
    this.$http.get(global.data.api + '/shop/goods/kanjia/list').then(res => {
      // console.log(res)
    })
  },
  methods: {
    bargain () {
      this.$router.push('/bargain')
    },
    theme () {
      this.$router.push('/theme')
    },
    detail (id) {
      this.$router.push({
        path: '/bargaindetail',
        query: { id: id }
      })
    },
    Scrollbar () {
      let Zhuti = document.getElementsByClassName('zhuti')[0]
      Zhuti.scroll = new BScroll(this.$refs.zhuti, {
        scrollY: false,
        scrollX: true, // 横向滚动
        click: true,
        probeType: 2, // 派发滚动事件
        bounce: { // 当滚动超过边缘的时候会有一小段回弹动画, false关闭
          left: true,
          right: false
        }
      })
      this.scroll = new BScroll(this.$refs.wrapper, {
	    scrollY: true, // 纵向滚动
        click: true,
        momentumLimitDistance: 0,
        bounceTime: 100,
        probeType: 2, // 派发滚动事件
      })
      this.scroll.on('scroll', (pos) => {
          if (pos.y > 1) {
              this.Onload = '释放立即刷新'
              this.dropDown = true
          }
      })
      this.scroll.on('touchEnd', (pos) => {
           if (pos.y > 30) {
               this.Onload = '正在加载中。。。'
           }
           setTimeout (() => {
               this.getData()
               this.Onload = '刷新成功'
               setTimeout (() => {
                 this.dropDown = false
               }, 1000)
             
           }, 1000)
        })
    },
    getData () { // 获取砍价的商品
        this.$http.get(global.data.api + '/shop/goods/list').then(res => {
      let { data } = res
      if (data.code === 0) {
        this.listData = data.data
        this.kanjia = data.data.filter(i => {
          return i.kanjia === true
        })
        this.tuijian = data.data.filter(item => {
          return item.recommendStatusStr === '推荐'
        })
      }
      this.$nextTick(() => {
        this.Scrollbar()
        setTimeout(() => {
          this.listData = this.listData
          this.scroll.refresh()
        }, 20)
      })
    })
    }
  },
  mounted () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    let token = getCookie('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 46.875 + rem;
}
.wrapper {
    width: 100%;
    height: 100%;
}
  .list {
      width: 100%;
      background: #e2e1e1;

    .list_top {
        width: 100%;
        height: rem(200);
        font-size: rem(30);
        text-align: center;
        transform: translate3d(0, -100, 0);
        
        span {
            display: block;
            width: 100%;
            line-height: rem(200);
            color: #666;
        }
    }


    .lun {
        z-index: 2;
         min-height: rem(300);
    }
      .section {
          width: 100%;
          .icon {
              width: 100%;
              margin-top: rem(-35);
              position: relative;
              z-index: 999;
              display: flex;
              list-style: none;
              overflow: hidden;
              box-sizing: border-box;
              background-color: #fff;
              border-top-left-radius: 14%;
              border-top-right-radius: 14%;
              li {
                  width: 25%;
                  color:#686868;
                  text-align: center;
                  padding-bottom: rem(45);
                 a {color:#686868;
                     i {
                      display: block;
                      padding-top:rem(36);
                      font-size:rem(56);
                        margin-bottom: rem(20);
                    }
                    i:first-child, i:last-child {
                        font-size: rem(60);
                        margin-bottom: rem(10);
                    }
                    span {
                        font-size: rem(26);
                    }
                 }
              }
          }
          // 全民砍价
          .template_con {
              width: 100%;
              margin-top: rem(20);
              background: #fff;
              h2 {
                  padding-top: rem(25);
                  font-size: rem(30);
                  text-align: center;
                  img {
                      vertical-align: middle;
                      width:rem(26);
                  }
                  span {
                      display: inline-block;
                      width:rem(33);
                      height: rem(33);
                      border-radius: 50%;
                      border: 1px solid #7f7f7f;
                      line-height: rem(33);
                      text-align: center;
                      color: #7f7f7f;
                  }
              }
              .template_list {
                  width: 100%;
                  padding-top: rem(50);
                  dl {
                      width: 100%;
                      display: flex;
                      padding-bottom: rem(14);

                      dt {
                          width: 32%;
                          font-size: rem(28);
                           padding: 0 rem(20);
                           a {
                              display: block;

                              >img {
                                width: 100%;
                                background: #f5f5ff;
                                border-radius: rem(5);
                            }
                           }
                      }
                      dd {
                          width: 68%;
                          display: flex;
                          overflow: hidden;
                          flex-direction: column;
                          justify-content: space-between;
                          padding: rem(10) 0;
                          h4 {
                              font-size: rem(27);
                              color:#333333;
                          }
                          >span {
                              font-size: rem(22);
                              width: 100%;
                              color: #9d9d9d;
                              display: block;
                              white-space: nowrap;
                              padding-right: rem(20);
                              overflow: hidden;
                              text-overflow: ellipsis;
                          }
                          ul {
                              display: flex;
                              justify-content: space-between;
                              padding-right: 25%;
                              list-style: none;

                              > li {
                                    font-size: rem(23);
                                    color: #a4a4a4;
                                    p {
                                        padding-top: rem(20);
                                    }

                              }
                              >li:first-child {
                                  > span {
                                        color: #9d3631;
                                    }
                              }
                          }
                      }
                  }
              }
          }

        // 精选主题
        .Selected_topics {
            width: 100%;
            background: #fff;
             h3 {
              text-align: center;
              font-size: rem(30);
              padding-top: rem(63);
              padding-bottom: rem(30);
              span {
                  margin-left: rem(13);
                  display: inline-block;
                  width: rem(34);
                  height: rem(34);
                  border-radius: 50%;
                  border: 1px solid #7f7f7f;
                  line-height: rem(34);
                  text-align: center;
                  color: #7f7f7f;
              }
          }
          section {
              width: 100%;
              overflow: auto;
             ul {
                width: 445%;
                padding: 0 rem(10);
                overflow: auto;
                display: flex;
                li {
                  width: 19.4%;
                  margin: 0 rem(10);
                  color: #9d9d9d;

                   a {
                        display: block;
                      img {
                        display: block;
                        width: 100%;
                        height: rem(350);
                    }
                   }
                    h4 {
                        font-size: rem(30);
                        white-space: nowrap;
                        overflow: hidden;
                        color: #333333;
                        text-overflow: ellipsis;
                        margin: rem(5) 0;
                        text-indent: 1em;
                    }
                    p {
                        font-size: rem(23);
                         white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-indent: 1em;
                    }
                }
             }
          }
        }

        // 人气推荐
      .rec-Sentiment {
          width: 100%;
          background: #fff;
          h3 {
              text-align: center;
              font-size: rem(30);
              padding-top: rem(63);
              padding-bottom: rem(30);
              span {
                  margin-left: rem(13);
                  display: inline-block;
                  width: rem(34);
                  height: rem(34);
                  border-radius: 50%;
                  border: 1px solid #7f7f7f;
                  line-height: rem(34);
                  text-align: center;
                  color: #7f7f7f;
              }
          }
          .rec-Sentiment_con {
              width: 100%;
              display: -webkit-flex;
              display: flex;
              flex-wrap: wrap;
              padding: 0 rem(13);
              div {
                  width: 50%;
                  margin-bottom:rem(20);
                  a {
                      display: block;
                       img {
                      width: 100%;
                      padding: 0 rem(13);
                      border-radius: rem(8);
                  }
                  }
                  p {
                      padding: 0 rem(13);
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                  }
                  p:nth-child(2) {
                      width: 100%;
                      font-size: rem(28);
                      white-space: nowrap;
                      text-overflow:ellipsis;
                      overflow:hidden;
                      padding-right: rem(13);
                  }
                  >p:nth-child(3) {
                      width: 100%;
                      font-size: rem(23);
                      color:#999999;
                      padding-top: rem(15);
                  }

                  span {
                      font-size: rem(23);
                      color: #9d3631;
                      padding-top: rem(10);
                      margin: 0 rem(13);
                  }
              }
          }
      }

      }

  }
</style>
