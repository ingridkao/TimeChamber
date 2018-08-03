<template>
    <div class="components_ctn aboutPage">
        <div class="pageTitle">About_</div>
        <div class="personalImg"></div> 
        <div class="content about">
            <h5>About</h5>
            <p>{{ infoText }}</p>
        </div>
        <div class="content education">
            <h5>Education</h5>
            <div v-for="(educate, index) in educList">
                <h6>{{ educate.time }}</h6>
                <p>
                    {{ educate.name }}
                </p>
            </div>
        </div>
        <div class="content rightAlign contact">
            <a href="mailto:ingird7613@gmail.com" target="_top">
                <font-awesome-icon icon="envelope" />
                <span>ingird7613@gmail.com</span>
            </a>
            <a href="tel:0911-220-154">
                <font-awesome-icon icon="phone" />
                <span>0911-220-154</span>
            </a>
        </div>
    </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    name: 'about',
    data() {
        return {
            infoText:'我是高慧芳，熱愛視覺藝術並喜歡與人互動的界面，為了實現這個喜好而不只停留在個人創作，從視覺藝術跨領域到程式中。',
            educList:[{
                name:'國立新竹教育大學藝術教育與創作碩士班',
                time:'2011/9 - 2014/8'
            },{
                name:'國立新竹教育大學藝術與設計學系 ',
                time:'2005/9 - 2009/6'
            }]
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