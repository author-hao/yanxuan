<template>
	<div>
		
	</div>
</template>

<script>
import { getCookie } from '../util/cookie.js'
	export default {
		mounted () {
			let token = getCookie('token')
			console.log(token)
			// this.$http.post('')
		}
	}
</script>

<style>
	
</style>