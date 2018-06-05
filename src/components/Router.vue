<template>
	<ul>
		<li v-for="i in conf">
			<router-link :to="i.path" :name="i.name">{{i.name}}</router-link>
		</li>
	</ul>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      conf: [
				{
					path: '/order',
					name: 'order',
					islink: ''
				},{
					path: '/slide',
					name: 'slide',
					islink: ''
				}
	  	]
    }
  }
}
</script>