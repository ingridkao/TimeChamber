<template>
    <div class="components_ctn">
        <div class="content" v-for="project in projectList">
            <div class="title">{{ project.mainTitle }}</div>
            <div class="item" v-for="product in project.list">
                <div class="infoBox">
                    <div class="info">
                        <h6>{{ product.title}}</h6>
                        <p v-if="product.subtitle != null">{{ product.subtitle}}</p>
                        <p>開發時間：{{ product.devTimeStart }} - {{ (product.devTimeStart == null)? getTodate: product.devTimeStart}}</p>
                        <p v-if="product.maintainStart != null">維護時間：{{ (product.maintainStart == null)? getTodate: product.maintainStart}} - {{ (product.maintainEnd == null)? getTodate: product.maintainEnd}}</p>
                    </div>
                    <div class="desc">
                        <div v-for="j in product.desc">
                            <h6>{{ j.descTitle}}</h6>
                            <ul>
                                <li v-for="item in j.content">{{ item }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="imageBox" v-if="product.image != null">
                    <div :style="'background-image:' + product.image"></div>
                    <a v-if="product.webURL != null" :href="product.webURL" target="_blank">Go to {{ product.title }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'project',
    data() {
        return {
            projectList:[
                {
                    'mainTitle':'公司專案',
                    'list':[
                        {
                            'title':'New U-Things',
                            'subtitle':'裝置與網路連接管理系統',
                            'devTimeStart': '2018/03',
                            'devTimeEnd': null,
                            'maintainStart':null,
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'前端協作開發',
                                    'content':['以Vue2進行框架建構，使用Vue-router、Vuex等','以Webpack環境架構化開發','與UI/UX設計師合作，並透過iView規劃介面','以Sass撰寫介面排版','使用axio、lodash進行資料處理','使用momentJS處理時間格式','RESTful API格式定義','登入與權限機制討論','使用docker部署web App']
                                }
                            ],
                            'image': 'url(/src/img/hu.jpg)',
                            'webURL':'http://iot3.thingconnector.net/'
                        },
                        {
                            'title':'U-Things',
                            'subtitle':'LoRa裝置、基地台與網路連接管理系統',
                            'devTimeStart': '2016/08',
                            'devTimeEnd': '2017/12',
                            'maintainStart': '2017/12',
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'界面改版',
                                    'content':['利用JQuery進行DOM物件與AJAX操作，使用Vue-router、Vuex等','透過materializecss規劃整體網頁介面及RWD調整']
                                },
                                {
                                    'descTitle':'協作開發',
                                    'content':['裝置封包解撰寫','網路路由操作介面與操作功能程式撰寫','利用eChart繪製統計資料','程式優化與維護','hinkPHP權限功能維護','網站部署']
                                },
                                {
                                    'descTitle':'參與討論',
                                    'content':['資料庫設計']
                                }
                            ],
                            'image': 'url(/src/img/uthings.png)',
                            'webURL':'http://iot3.thingconnector.net/'
                        },
                        {
                            'title':'Parking system',
                            'subtitle':'停車場管理系統',
                            'devTimeStart': '2017/11',
                            'devTimeEnd': '2018/02',
                            'maintainStart': null,
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'協作開發',
                                    'content':['利用舊有程式快速建置網頁','Larevel協作']
                                },
                                {
                                    'descTitle':'參與討論',
                                    'content':['系統與介面邏輯設計','資料庫設計','ESTful API格式設計']
                                }
                            ],
                            'image':'url(/src/img/parking.png)',
                            'webURL':'https://210.200.142.111:8010/parking_system_v2'
                        },
                        {
                            'title':'Orion',
                            'subtitle':'即時定位與裝置管理系統',
                            'devTimeStart': '2016/05',
                            'devTimeEnd': '2017/06',
                            'maintainStart':'2017/06',
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'界面設計',
                                    'content':['利用JQuery進行DOM物件與AJAX操作','透過materializecss規劃整體網頁介面及RWD調整']
                                },
                                {
                                    'descTitle':'協作開發',
                                    'content':['Openalyers API 顯示即時定位、串接室內地圖、繪製電子圍籬','利用eChart繪製統計資料','程式優化與維護','ThinkPHP權限維護']
                                },
                                {
                                    'descTitle':'參與討論',
                                    'content':['系統與介面邏輯設計','資料庫設計']
                                }

                            ],
                            'image':'url(/src/img/orion.png)',
                            'webURL':''
                        },
                        {
                            'title':'巡更系統',
                            'subtitle':'巡邏人員與裝置管理系統',
                            'devTimeStart': '2018/01',
                            'devTimeEnd': '2018/03',
                            'maintainStart':null,
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'協作開發',
                                    'content':['利用舊有程式快速建置網頁','ThinkPHP API撰寫','以Sass撰寫介面排版']
                                },
                                {
                                    'descTitle':'參與討論',
                                    'content':['系統與介面邏輯設計','資料庫設計','RESTful API格式設計']
                                }

                            ],
                            'image':'url(/src/img/patrol.jpg)',
                            'webURL':'https://210.200.142.110/patrol/'
                        }
                    ]
                },
                {
                    'mainTitle':'接案專案',
                    'list':[
                        {
                            'title':'新北市古道地圖',
                            'subtitle':null,
                            'devTimeStart': '2016/05',
                            'devTimeEnd': null,
                            'maintainStart':null,
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'前端開發',
                                    'content':['使用Vue2進行框架建構','Webpack環境架構化開發','與設計師合作，SCSS客製化介面','使用Leaflet進行地圖路線顯示']
                                }
                            ],
                            'image':'url(/src/img/path.png)',
                            'webURL':'http://www.ingridkao.com/newtaipeipath'
                        }
                    ]
                },
                {
                    'mainTitle':'其他',
                    'list':[
                        {
                            'title':'履歷',
                            'subtitle': '將履歷與時光屋計劃合併成個人網頁',
                            'devTimeStart': '2018/07',
                            'devTimeEnd': null,
                            'maintainStart':null,
                            'maintainEnd': null,
                            'desc':[
                                {
                                    'descTitle':'主要開發',
                                    'content':['使用Vue2、Webpack進行框架建構','SCSS設計全站頁面','使用GitHub Page','透過GoDady架設個人網站']
                                }
                            ],
                            'image':null,
                            'webURL':null
                        }
                    ]
                }
            ]
        }
    },
    computed:{
        getTodate:function(){
            return this.$moment().format('YYYY/MM');
        }
    },
}
</script>

<style lang="scss" scoped>
	@import "../scss/project.scss";
</style>