<template>
    <div class="components_ctn">
        <h1>works_</h1>
        <div class="sub_nav">
            <span v-for="i in workUrl">
                <router-link class="workLink" :to="i.path" :name="i.name">{{i.name}}</router-link>
            </span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'works',
    data() {
        return {
            workUrl: [{
				path: 'todoList',
				name: 'To-Do List'
			},{
				path: 'no2',
				name: 'no2'
			}]
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/settings.scss";
</style>