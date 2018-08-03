<template>
    <div class="components_ctn resumePage">
        <div class="content">
            <div class="title">
                <h6>Foxconn</h6>
                <p>2016/4 - {{ getTodate }}</p>
            </div>
            <div class="info">
                <h6>Front-end engineer</h6>
                <p>目前任職於鴻海I0T部門(2018年初轉入FII)，部門進行透過LoRa傳輸技術的網頁應用以及IoT網絡管理平台開發，在這裡的職位是前端工程師，工作內容包含網頁切版及前端程式與整合。</p>
                <p>由於同事擅長的領域皆不大相同並不排斥解說，因此在各個專案中從系統設計、資料庫規畫、LoRa傳輸通訊層觀念有著初步的了解，後期能夠參予討論並對RESTful API及使用介面設計都有著更明確的方向，以助於前端程式的實現與整合。在專案中也經常與同事相互討論改善方法，並學習新技術以運用在正式專案上，如Apache設定或是使用Docker佈署環境等。</p>
                <button class="">Project +</button>
            </div>
        </div>
    </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    name: 'resume',
    data() {
        return {
            resumeList:[
                {
                    title:'Foxconn',
                    time: '2016/4 - '+ this.getTodate,
                }
            ]
        }
    },
    computed:{
        getTodate:function(){
            return this.$moment().format('YYYY/MM');
        }
    },
    components: {
        FontAwesomeIcon
    },
}
</script>
<style lang="scss" scoped>
    @import "../scss/resume.scss";
</style>