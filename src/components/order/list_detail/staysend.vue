<template>
	<!-- 待发货 -->
  <div class='staysend'>
     <section class='staysend_con'> 
			 	<div>
						还没有商品，去购买吧
				</div>
				
		 </section>
  </div>
</template>

<script>
export default {
	data () {
		return {
			status: 1
		}
	},
	mounted () { // 已支付待发货
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
.staysend {
	width: 100%;
	.staysend_con {
			>div {
				width:100%;
				line-height: rem(500);
				font-size:rem(40);
				text-align:center;
				color: #999;
			}
	}
}

</style>
