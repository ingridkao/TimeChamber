<template>
    <div class="components_ctn aboutPage">
        <div class="pageTitle">About_</div>
        <div class="personalImg"></div> 
        <div class="content about">
            <h5>About</h5>
            <p>我是高慧芳，熱愛視覺藝術並喜歡與人互動的界面，為了實現這個喜好而不只停留在個人創作，從視覺藝術跨領域到程式中。</p>
            <ul>
                <li>樂於涉略多元技術及知識。</li>
                <li>樂於團隊溝通合作。</li>
            </ul>
        </div>
        <div class="content education">
            <h5>Education</h5>
            <h6>國立新竹教育大學藝術教育與創作碩士班</h6>
            <h6>2011/09 - 2014/08</h6>
        </div>
        <div class="content rightAlign contact">
            <a href="mailto:ingrid7613@gmail.com" target="_blank">
                <font-awesome-icon icon="envelope" />
                <span>ingrid7613@gmail.com</span>
            </a>
            <a href="tel:0911-220-154">
                <font-awesome-icon icon="phone" />
                <span>0911-220-154</span>
            </a>
            <a href="https://github.com/ingridkao" target="_blank">
                Git
                <span>Hub</span>
            </a>
        </div>
    </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    name: 'about',
    components: {
        FontAwesomeIcon
    }
}
</script>
<style lang="scss" scoped>
	@import "../scss/settings.scss";
    @import "../scss/about.scss";
</style>