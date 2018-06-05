<template>
	<div id="app">
		<h1>{{ msg }}</h1>
		<route-compunent></route-compunent>
		<router-view></router-view>
	</div>
</template>

<script>
import RouteCompunent from './components/Router.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
	  RouteCompunent
  }
}
</script>