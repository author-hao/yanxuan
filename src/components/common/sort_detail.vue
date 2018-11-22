<template>
	<!-- 分类详情 -->
	<div class="sortdetail">
		<header class="Sortdetail_title">
			<span @click='Return'><i>&lt;</i></span>
		</header>
		<section class='sortdetail_title'>
			<div>
				还没有商品
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		methods: {
			Return () {
				this.$router.back()
			}
		},
		mounted () {
			let { id } = this.$route.query
			this.$http.post(global.data.api + '/shop/goods/detail?id=' + id).then(res => {
				let { data } = res
				// console.log(data)
			})
		}
	}
</script>

<style>
	
</style>