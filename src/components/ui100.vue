<template>
    <div class="components_ctn">
        <h1>Daily UI _</h1>
        <div class="sub_nav scroll scrollX">
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
    name: 'Daily_UI',
    data() {
        return {
            workUrl: [{
				path: 'week1',
                name: 'ToDo List',
                subTitle: 'No_1'
			},{
				path: 'week2',
                name: '--',
                subTitle: 'No_2'
/*			},{
				path: 'no3',
                name: '--',
                subTitle: 'No_3'
			},{
				path: 'no3',
                name: '--',
                subTitle: 'No_3'
			},{
				path: 'no4',
                name: '--',
                subTitle: 'No_4'
			},{
				path: 'no5',
                name: '--',
                subTitle: 'No_5'
*/
			}]
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/settings.scss";
</style>