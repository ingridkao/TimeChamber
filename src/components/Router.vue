<template>
	<ul>
		<li v-for="i in conf">
			<router-link class="typeLink" :to="i.path" :name="i.name">
				<span>{{i.name}}</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
		conf: [{
				path: '/about',
				name: 'About'
			},{
				path: '/resume',
				name: 'Resume'
			},{
				path: '/project',
				name: 'Project'
			},{
				path: '/dailyUI',
				name: 'Daily_UI'
			}
		]}
	}
}
</script>
<style lang="scss" scoped>
	@import "../scss/init.scss";
</style>