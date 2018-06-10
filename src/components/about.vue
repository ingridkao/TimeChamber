<template>
    <div class="components_ctn">
        <h1>About_</h1>
        <div class="content">
            <div class="timeLine">
                <div>
                    <span class="year">2006</span>
                    <font-awesome-icon icon="circle" />
                    <span class="title">Studying process</span>
                </div>
                <div>
                    <span class="year">2010</span>
                    <font-awesome-icon icon="circle" />
                    <span class="title">Educator | Artist | Muralist</span>
                </div>
                <div>
                    <span class="year">2015</span>
                    <font-awesome-icon icon="circle" />
                    <span class="title">Learning program</span>
                </div>
                <div>
                    <span class="year">2016</span>
                    <font-awesome-icon icon="circle" />
                    <span class="title">F2E</span>
                </div>
            </div>
            <div>
                <div class="map"></div>
                <div class="info"></div>
            </div>
        </div>

    </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    name: 'about',
    data() {
        return {
        }
    },
    components: {
        FontAwesomeIcon
    },
}
</script>
<style lang="scss" scoped>
	@import "../scss/settings.scss";
    @import "../scss/about.scss";
</style>