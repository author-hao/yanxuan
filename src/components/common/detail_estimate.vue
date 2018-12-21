<template>
  <div class="estimate">
      <p v-if='!dataPing.length'>还没有评价</p>
      <div v-else class='estimate_con'>
          <dl v-for='(item, i) in dataPing' :key='i'>
              <dt>
                  <img :src='item.goods.pic' alt='' />
              </dt>
              <dd>
                  <ul>
                      <li>{{ item.goods.goodsName }} <span>{{ item.goods.goodReputationStr }}</span></li>
                      <li>{{ item.goods.property }}</li>
                      <li>{{ item.goods.dateReputation }}</li>
                  </ul>
              </dd>
          </dl>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
        dataPing: []
      }
  },
  mounted () {
    let { id } = this.$route.query
    this.$http.post(global.data.api + '/shop/goods/reputation', 'goodsId=' + id).then(res => {
      let { data } = res
      if (data.code === 0) {
        this.dataPing = data.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}

.estimate p {
          width: 100%;
          height: rem(1000);
          line-height: rem(300);
          font-size: rem(40);
          text-align: center;
      }
  .estimate {
      width: 100%;
      padding-bottom: rem(40);
    .estimate_con {
      width: 100%;
      dl {
        width: 100%;
        display: flex;
        height: rem(200);
        margin:rem(40) 0;
        dt {
          width: 15%;
          img {
            width: 100%;
            border-radius: 50%;
            padding: rem(10);
          }
        }
        dd {
          margin-left: rem(20);
          height: rem(200);
          ul {
              list-style: none;
              height: rem(180);
              font-size: rem(38);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              li {
                  span {
                    padding: rem(5) rem(10);
                    background: rgb(184, 31, 31);
                    border-radius: rem(6);
                    color: #fff;
                    font-size: rem(25);
                    margin-left: rem(20);
                  }
              }
              li:nth-child(2) {
                margin: rem(10) 0;
              }
              li:last-child {
                color: #999;
                font-size: rem(30);
              }
          }
        }
      }
    }
  }
 


</style>
