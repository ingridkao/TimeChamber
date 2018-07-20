<template>
    <div class="box">
        <div class="content">
            <div class="leftSlide map">
                <h6 class="unitTile">Week4_Product Gallery</h6>
            </div>
            <div class="rightSlide">

            </div>
        </div>
        <div class="modal">
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Gallery',
    data() {
        return {
            fifaUrl: [{
                path: '/week1',
                name: 'ToDo_List',
                subTitle: 'No_1'
			},{
                path: '/week2',
                name: 'Filter',
                subTitle: 'No_2'
			},{
                path: '/week3',
                name: '--',
                subTitle: 'No_3'
			},{
                path: '/week4',
                name: 'Gallery',
                subTitle: 'No_4'
			}]


        }
    },
    watch: {
    },
    computed: {
    },
    created() {
    },
    components: {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
</style>