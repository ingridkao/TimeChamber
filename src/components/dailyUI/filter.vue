<template>
    <div class="box">
        <header>
            <div class="subLogo">Week2_Filter</div>
            <div class="searchBox">
                <label>
                    <font-awesome-icon icon="search"/>
                </label>
                <input
                    type="text"
                    v-model.trim="searchText"
                    @keyup="getFilterData"
                    placeholder="Explore your own activities"/>
                <button v-show="searchText != ''" v-on:click="clearFilter()">
                    <font-awesome-icon icon="times-circle"/>
                </button>
            </div>
        </header>
        <div class="content">
            <div class="leftSlide">
                <div class="filterBox">
                    <div>
                        <h6>Location</h6>
                        <select @change="updateDataList()" v-model="locFilter">
                            <option value="" selected>所有區域</option>
                            <option 
                                v-for="(location, index) in locationList" 
                                :key="index" 
                                :value="location">
                                {{ location }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <h6>Categories</h6>
                        <div v-for="(category, index) in categoriesList" :key="index" class="checkBox">
                            <input type="checkbox" :id="category" :value="category" v-model="filterConditions" @click="onCheckFunc()">
                            <label :for="category">{{ category }}</label>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="boxLoading" v-if="loading"></div>
            <div class="rightSlide" v-else>
                <div class="listPage" v-show="showList">
                    <h5>Showing <span class="bold"> {{ travelList.length }} </span>results by ...</h5>
                    <div class="tagBox">
                        <button v-show="locFilter != ''" @click="reduseLoc()">
                            {{ locFilter }} <font-awesome-icon icon="times-circle"/>
                        </button>
                        <button v-for="(tag, index) in filterConditions" :key="index" @click="reduseTag(index)">
                            {{ tag }} <font-awesome-icon icon="times-circle" />
                        </button>
                    </div>
                    <div class="resultBox">
                        <div v-for="(item, index) in travelList" :key="index">
                            <div class="imgBox square">
                                <transition name="fade">
                                    <img :src="item.Picture1" :alt="item.Picdescribe1" v-on:load="onLoaded" v-show="imgLoading">
                                </transition>
                            </div>
                            <div class="textBox">
                                <h1>{{item.Name}}</h1>
                                <div class="subTitle">
                                    <span class="ticketinfo">{{item.Ticketinfo}}</span>
                                    <span class="zone">{{item.Zone}}</span>
                                </div>
                                <p>{{item.Description}}</p>
                                <div class="infoBox">
                                    <p>
                                        <font-awesome-icon icon="map-marker-alt" />
                                        {{item.Add}}
                                    </p>
                                    <p>
                                        <font-awesome-icon icon="calendar-alt" />
                                        {{item.Opentime}}
                                    </p>
                                    <p>
                                        <font-awesome-icon icon="phone" />
                                        <a :href="'callto:' + item.Tel" class="telHref">{{item.Tel}}</a>
                                    </p>
                                </div>
                            </div>
                            <button class="linkBtn" @click="openInfo(item)"></button>
                        </div>
                    </div>
                    <div class="pagination" v-if="travelList.length > 1">
                        <ul>
                            <li class="prev">
                                <button :disabled="page.curretPage == 1" @click="jumpToPage( 1 )">&#9669;</button>
                            </li>
                            <li class="page" v-for="(pageNum, index) in page.pageTotal" :key="index">
                                <button :class="{'active': (pageNum == page.curretPage)}" @click="jumpToPage( pageNum )">{{pageNum}}</button>
                            </li>
                            <li class="next">
                                <button :disabled="page.curretPage == page.pageTotal" @click="jumpToPage( page.pageTotal )">&#9659;</button>
                            </li>
                        </ul>
                    </div>



                </div>
                <div class="resultPage scroll scrollX" v-show="!showList">
                    <nav class="breadcrumbs">
                        <button @click="closeInfo()">Explore</button> / {{ dataInfo.Name }}
                    </nav>
                    <div>
                        <div class="imgBox original">
                            <img :src="dataInfo.Picture1" :alt="dataInfo.Picdescribe1">
                        </div>
                        <div class="textBox">
                            <h1>{{dataInfo.Name}}</h1>
                            <div class="subTitle">
                                <span class="zone">{{dataInfo.Zone}}</span>
                                <span class="ticketinfo">
                                    <font-awesome-icon icon="ticket-alt" />
                                    {{dataInfo.Ticketinfo}}
                                </span>
                                <span>
                                    <font-awesome-icon icon="calendar-alt" />
                                    {{dataInfo.Opentime}}
                                </span>
                            </div>
                            <div class="infoBox">
                                <p>
                                    <font-awesome-icon icon="map-marker-alt" />
                                    {{dataInfo.Add}}
                                </p>
                                <p>
                                    <font-awesome-icon icon="phone" />
                                    <a :href="'callto:' + dataInfo.Tel" class="telHref">{{dataInfo.Tel}}</a>
                                </p>
                            </div>
                            <p>{{dataInfo.Description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
    name: 'Building',
    data() {
        return {
            loading: true,
            imgLoading: false,
            showList : true,
            searchText:'',
            locationList:[],
            locFilter: '',
            categoriesList:['人文教育','自然公園','歷史古蹟','宗教廟宇','湖水河畔','溫泉區','休閒體驗','美食商圈','其他'],
            filterConditions:[],
            allData: [],
            filterData: [],
            travelList: [],
            page:{
                limit: 25,
                offset: null,
                curretPage: 1,
                prevPage: 1,
                nextPage: 1,
                pageTotal:[]
            },
            dataInfo:{}
        }
    },
    watch: {
    },
    computed: {},
    created() {
        this.getAllData();
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        updatePage: function(amount){
            if(amount == undefined)return;
            if(amount > 0){
                if(amount < this.page.limit){
                    this.page.nextPage = 1;
                    this.page.pageTotal = [1];
                }else{
                    let pageArray = [];
                    this.page.prevPage = this.page.curretPage;
                    this.page.nextPage = parseInt(amount / this.page.limit);
                    while (this.page.prevPage <= this.page.nextPage){
                        pageArray.push(this.page.prevPage)
                        this.page.prevPage ++
                    }   
                    this.page.pageTotal = pageArray
                }
            }else{
                this.page.pageTotal = [];
            }
        },
        getAllData: function(){
            this.loading = true;
            this.$axios.get('https://data.kcg.gov.tw/api/action/datastore_search',{
                params: {
                    resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
                    // limit: this.page.limit,
                    offset: this.page.offset,
                }
            }).then(res => {
                this.allData = res.data.result;
                this.updateDataList();
                // Update locationList
                this.locationList = _.map(_.uniqBy(res.data.result.records, 'Zone'), 'Zone');
                this.loading = false;
            }).catch(e => {
                this.errors.push(e);
            });   
        },
        getFilterData: function(){
            this.loading = true;
            this.$axios.get('https://data.kcg.gov.tw/api/action/datastore_search',{
                params: {
                    resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
                    q: this.searchText
                }
            }).then(res => {
                this.filterData = res.data.result;
                this.updateDataList();
                this.loading = false;
            }).catch(e => {
                this.errors.push(e);
            });   
        },
        clearFilter: function(){
            this.searchText = '';
            this.updateDataList();
        },
        onCheckFunc: function(){
            this.$nextTick(()=>{
                this.updateDataList();
            }); 
        },
        updateDataList: function(){
            if(this.searchText == '' && this.locFilter == '' && this.filterConditions.length == 0 ){
                // Use Vue-infinite-loading
                // this.travelList = this.allData.records;
                // 顯示前10筆
                this.travelList = this.allData.records.slice(0, 24)
                this.updatePage(this.allData.total);
            }else{
                if(this.searchText != ''){
                    if(this.filterData.records.length > 0){
                        this.travelList = this.filterData.records;
                    }else{
                        this.travelList = this.allData.records.filter(rs => {
                            return rs['Name'].indexOf(this.searchText) != -1;
                        });
                    }
                }
                this.travelList = _.filter(this.travelList, function(o) {
                    // switch(expression) {
                    //     case n:
                    //         code block
                    //         break;
                    //     case n:
                    //         code block
                    //         break;
                    //     default:
                    //         code block
                    // }
                    return o.Class1 == 1;
                });
                this.travelList = this.travelList.filter(rs => {
                    return rs['Zone'].indexOf(this.locFilter) != -1;
                });
                this.updatePage(this.travelList.length);
            }
        },
        onLoaded:function(){
            this.imgLoading = true;
        },
        jumpToPage: function(target){
            if(target == this.page.curretPage) return;
            if(this.page.curretPage >= 1){
                this.page.offset = (this.page.limit*target);
                this.page.curretPage = this.page.offset;
            }
            this.updateDataList();
        },
        openInfo: function(itemData){
            this.showList = false;
            this.dataInfo = itemData;
        },
        closeInfo:function(){
            this.dataInfo = {};
            this.showList = true;
        },
        reduseTag:function(index){
            this.filterConditions.splice(index, 1);
            // this.updateDataList();
        },
        reduseLoc:function(){
            this.locFilter = '';
            this.updateDataList();
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../../scss/filter.scss";
</style>