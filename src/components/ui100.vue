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
            // 之後將route傳過來
            workUrl: [{
                path: '/dailyUI/week1',
                name: 'ToDo_List',
                subTitle: 'No_1'
			},{
                path: '/dailyUI/week2',
                name: 'Filter',
                subTitle: 'No_2'
			},{
                path: '/dailyUI/week3',
                name: '--',
                subTitle: 'No_3'
			},{
                path: '/dailyUI/week4',
                name: 'Gallery',
                subTitle: 'No_4'
			}]
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/settings.scss";
</style>