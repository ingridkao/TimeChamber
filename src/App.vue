<template>
	<div id="app">
		<header class="homeHeader">
			<div class="logo"></div>
			<div class="main_nav">
				<route-compunent></route-compunent>
			</div>
			<!-- <div class="menu"></div> -->
			<div class="btnGroup langGroup rightSlide">
				<button>En</button>
				|
				<button class="active">ZhTw</button>
			</div>
		</header>

		<router-view></router-view>
	</div>
</template>

<script>
import RouteCompunent from './components/Router.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components:{
	  RouteCompunent
  }
}
</script>

<style lang="scss" scoped>
	@import "scss/init.scss";
</style>
