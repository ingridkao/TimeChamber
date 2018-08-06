<template>
    <div class="components_ctn resumePage">
        <div class="content">
            <div class="title">
                <h5>鴻海</h5>
                <h6>Front-end engineer</h6>
                <p>2016/04 - {{ getTodate }}</p>
            </div>
            <div class="info">
                <p>目前任職於鴻海網通IoT部門(2018年初轉入FII)，部門進行透過LoRa傳輸技術的網頁應用以及IoT網絡管理平台開發，在這裡的職位是前端工程師，工作內容包含網頁切版及前端程式與整合。早期公司尚未找尋到設計師，需要同時負責視覺設計規劃及網頁切版與程式撰寫。後期與UI/UX設計師討論如何優化用戶體驗時，除了解釋系統程式設計並可以即時判斷程式編寫難易度，使的來回討論時間更為快速及精準，經常成為其他工程師和設計師之間的橋梁。項目包含：</p>
                <h6>網站前端主要開發者</h6>
                <ul>
                    <li>與設計師討論撰寫頁面: 管理系統整體介面、轉場動畫...等等</li>
                    <li>討論系統資料庫設計與RESTful API，並串接後端API與介面應用</li>
                    <li>Openlayer、Leaflet 地圖API 串接與應用</li>
                    <li>使用jquery、Vue2進行框架建構</li>
                    <li>使用Lodash、Axio、MomentJs處理資料與時間格式</li>
                    <li>利用Webpack操作函式庫並架設開發環境</li>
                </ul>
                <h6>維護及部署公司專案</h6>
                <ul>
                    <li>Apache與Redis server初步部署</li>
                    <li>實作SSL Certificate</li>
                    <li>使用Docker部署Web App</li>
                </ul>
                <h6>其他</h6>
                <ul>
                    <li>使用Git進行版本控制</li>
                </ul>
                <div class="btnzone">
                    <router-link to="/project">Project +</router-link>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h5>接案</h5>
                <h6>Web designer</h6>
                <!-- <h6>Piecework</h6> -->
            </div>
            <div class="info">
                <p>偶然機會下，設計師朋友詢問是否可以短期合作媒體性質宣傳專案，與PM及設計師討論規格與設計稿製作具視覺效果的網頁。</p>
                <h6>主要開發者</h6>
                <ul>
                    <li>與設計師討論撰寫頁面: 主要頁面排版及建立RWD頁面架構</li>
                    <li>Leaflet等API進圖地圖等操作</li>
                    <li>介接Facebook OAuth API實現登入機制</li>
                    <li>使用Git在GitHub進行版本控制</li>
                    <li>使用GitHub Page建立靜態網頁</li>
                </ul>
                <div class="btnzone">
                    <router-link to="/project">Project +</router-link>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h5>資訊工業策進會</h5>
                <h6>Web/APP</h6>
                <h6>前端設計工程師養成班</h6>
                <p>2015/09 - 2016/02</p>
            </div>
            <div class="info">
                <p>擔任教職工作前後約五年，在這期間深刻感受到少子化衝擊以及正視未來人生規畫，在朋友的介紹之下前往中壢資策會，由於視覺藝術背景因此選擇報名前端課程，開始從零開始學習HTML5(HTML、CSS、Javascript)、MySQL、PHP等。</p>
                <p>在這半年之中累積一件個人網頁及團體網站，前者從整體設計、RWD規劃、網頁切版與功能；最後三個月的作品則是從規畫使用者情境、資料庫設計到撰寫前後端程式。</p>
                <h6>團體專案：登入頁面及首頁</h6>
                <ul>
                    <li>頁面主要設計者並負責頁面切版及功能撰寫<li>
                    <li>後端功能以PHP撰寫顯示新增修改功能</li>
                    <li>使用者故事規劃及資料庫設計<li>
                    <li>前端程式整合</li>
                </ul>
                
                <div class="btnzone">
                    <a href="http://140.115.236.72/demo-personal/ZD703/web/C1500350/" target="_blank">Personal Web</a>
                    <a href="http://140.115.236.72/demo-projects/zd703/zd703g2/front/index.php" target="_blank">Project Web</a>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <h6>Teacher</h6>
                <h6>Artist & Mural</h6>
                <p>2011/07 - 2015/11</p>
            </div>
            <div class="info">
                <h6>教學經驗</h6>
                <p>
                    大學期間開始在畫室教授美術，教學對象年齡層從幼稚園到成人，研究所畢業後繼續在畫室、家教、學校等地方跑堂四年，工作內容從課程規畫、帶班管理到發掘學生潛能並提升其能力，經常需要控管時程以安排混雜的課程及零散的時間，在教學經驗中也磨練出與人溝通的耐心及觀察力。 
                </p>
                 <h6>壁畫經驗</h6>
                <p>
                    就學期間除了教學額外有壁畫工作，包括小家庭牆面到幼稚園整體視覺規劃，或是大型公寓停車場視覺動線，從空無一物的牆面開始規劃工期到施工完畢，內容包含與客戶洽談需求、材料選用及施工方法、定稿報價、繪製牆面。由於必須避免工程延宕以及工法無法隨意重來以免浪費成本，因此訓練出快速應對突如其來的問題以及臨場決策判斷能力。
                </p>
                <div class="btnzone">
                    <a href="https://drive.google.com/file/d/1GXIj9acbdzhXxaAfng612m4kl7MgfPCg/view?usp=sharing" target="_blank">portfolio</a>
                </div>
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