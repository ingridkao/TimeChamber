<template>
    <div class="box vertical_center" v-if="prepare">
        <h1>{{title}}</h1>
    </div>
    <div class="vertical_center center" v-else>
        {{title}}
    </div>
</template>

<script>
export default {
    name: 'no2',
    data() {
        return {
            prepare: false,
            title: 'Building ...'
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../scss/init.scss";
</style>