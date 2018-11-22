<template>
    <!-- 砍价 -->
    <div class="kanjia">
        <header class="head">
            <h3>
              <span @click='Return'>〈</span>
              砍价列表
          </h3>
        </header>
         <div class="wapper" ref='wapper'>
              <div class="template_list">
                   <dl v-for='(item, i) in kanjia' :key='i'>
                      <dt>
                           <router-link to=''>
                              <img :src="item.pic" alt="图片加载失败">
                           </router-link>
                      </dt>
                          <dd>
                                <h4>{{ item.name }}</h4>
                                <span>{{ item.characteristic }}</span>
                                <ul>
                                    <li>
                                          <span>￥{{ item.minPrice }}</span>
                                         <p>最低价</p>
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
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      kanjia: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wapper, {
        scrollY: true, // 纵向滚动
        click: true
      })
    })
    this.$http.get(global.data.api + '/shop/goods/list').then(res => {
      let { data } = res
      if (data.code === 0) {
        this.kanjia = data.data.filter(item => {
          return item.kanjia === true
        })
        this.scroll.refresh()
      }
    })
  },
  methods: {
    Return () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
  .kanjia {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .head {
           width: 100%;
           height: rem(156);
        > h3 {
            width: 100%;
            text-align: center;
            line-height: rem(150);
            font-size: rem(40);
            position: relative;
            span {
                font-size: rem(54);
                position: absolute;
                left: rem(58);
            }
        }
      }
      .wapper {
            width: 100%;
            flex: 1;
            overflow: auto;
            background: #fff;
              .template_list {
                  width: 100%;
                  dl {
                      width: 100%;
                      display: flex;
                      padding: rem(50) 0;

                      dt {
                          width: 32%;
                          font-size: rem(30);
                           padding: 0 rem(30);
                           a {
                              display: block;

                              >img {
                                width: 100%;
                                height: rem(332);
                                border-radius: rem(10);
                            }
                           }
                      }
                      dd {
                          width: 68%;
                          padding-left: rem(18);
                          h4 {
                              padding-top: rem(31);
                              font-size: rem(40);
                              color:#333333;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                          }
                          >span {
                              padding-top: rem(28);
                              display: block;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                              font-size: rem(22);
                              color: #9d9d9d;
                          }
                          ul {
                              display: flex;
                              margin-top: rem(58);
                              justify-content: space-between;
                              padding-right: 25%;
                              list-style: none;

                              > li {
                                    font-size: rem(32);
                                    color: #a4a4a4;
                                    p {
                                        padding-top: rem(20);
                                    }

                              }
                              >li:first-child {
                                  > span {
                                        color: #9d3631;
                                    }
                                    p {
                                        color: #282828;
                                    }
                              }
                          }
                      }
                  }
              }
      }
  }
</style>
