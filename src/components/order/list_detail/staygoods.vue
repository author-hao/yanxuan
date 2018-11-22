<template>
	<!-- 待收货 -->
  <div class='staygoods'>
      <div>
     	还没有商品，去购买吧
     </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			status: 2
		}
	},
	mounted () { // 已发货待确认
		let token = this.$cookie.get('token')
        let query = new URLSearchParams()
        console.log(token)
        query.append('token', token)
        query.append('status', this.status)
        this.$http.post(global.data.api + '/order/list', query ).then(res => {
          let { data } = res
          console.log(data)
        })
	}
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}

.staygoods {
	width: 100%;
	
	>div {
		width:100%;
		line-height: rem(500);
		font-size:rem(40);
		text-align:center;
		color: #999;
	}
}

</style>
