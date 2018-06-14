<template>
    <div class="components_ctn">
        <h1>Works_</h1>
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
				path: '/works/no2',
				name: 'Building'
			}]
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/settings.scss";
</style>