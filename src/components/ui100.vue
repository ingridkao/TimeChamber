<template>
    <div class="components_ctn">
        <h1>Daily UI</h1>
        <div class="sub_nav">
            <span v-for="i in workUrl">
                <router-link class="workLink" :to="i.path" :name="i.name">
                    <span>{{i.subTitle}}</span>
                    {{i.name}}
                </router-link>
            </span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'ui100',
    data() {
        return {
            workUrl: [{
				path: 'todoList',
                name: 'ToDo List',
                subTitle: 'No_1'
			},{
				path: 'no2',
                name: '--',
                subTitle: 'No_2'

			},{
				path: 'no2',
                name: '--',
                subTitle: 'No_3'
			}]
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/settings.scss";
</style>