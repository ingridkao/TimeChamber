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
                    <h5 v-if="page.amount < 100">Finding <span class="bold"> {{ page.amount }} </span>results by ...</h5>
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
                                    <span class="ticketinfo">{{(item.Ticketinfo == '')? 'Free':item.Ticketinfo}}</span>
                                    <span class="zone">{{item.Zone}}</span>
                                </div>
                                <p>{{item.Description}}</p>
                                <div class="infoBox">
                                    <p>
                                        <font-awesome-icon icon="map-marker-alt" />
                                        {{item.Add}}
                                        <a class="mapBtn" :href="'https://www.google.com/maps/place/'+item.Add" target="_blank">Map</a>
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
                    <!-- <div class="pagination" v-if="travelList.length > 1">
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
                    </div> -->



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
                                    {{(dataInfo.Ticketinfo ="")?'Free':dataInfo.Ticketinfo}}
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
                                    <a class="mapBtn" :href="'https://www.google.com/maps/place/'+dataInfo.Add" target="_blank">Map</a>
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
            categoriesList:['人文教育','自然公園','歷史古蹟','宗教廟宇','河畔漁港','溫泉區','休閒體驗','美食商圈','其他'],
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
                pageTotal:[],
                amount: null
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
            this.page.amount = amount;
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
            var vm = this;
            vm.loading = true;
            vm.$axios.get('https://data.kcg.gov.tw/api/action/datastore_search',{
                params: {
                    resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
                    // limit: vm.page.limit,
                    offset: vm.page.offset,
                }
            }).then(res => {
                vm.allData = res.data.result.records;

                //101-200
                vm.$axios.get('https://data.kcg.gov.tw/api/action/datastore_search',{
                    params: {
                        resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
                        offset: vm.page.offset + 100,
                    }
                }).then(res => {
                    vm.allData = _.concat(res.data.result.records, vm.allData);

                    let total = res.data.result.total - 1;
                    //201-268
                    vm.$axios.get('https://data.kcg.gov.tw/api/action/datastore_search',{
                        params: {
                            resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97',
                            offset: total,
                        }
                    }).then(res => {
                        vm.allData = _.concat(res.data.result.records, vm.allData);
                        vm.updateDataList();
                        // Update locationList
                        vm.locationList = _.map(_.uniqBy(vm.allData, 'Zone'), 'Zone');
                        vm.loading = false;
                    });

                });
            }).catch(e => {
                vm.errors.push(e);
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
            if(this.searchText == '' && this.locFilter == '' && this.filterConditions.length == 0){
                this.travelList = this.allData;
            }
            if(this.searchText == ''){
                this.travelList = this.allData.filter(rs => {
                    return rs['Zone'].indexOf(this.locFilter) != -1;
                });
            }else{    
                if(this.filterData.records.length > 0){
                    this.travelList = this.filterData.records;
                }else{
                    // custom search
                    this.travelList = this.allData.filter(rs => {
                        return rs['Name'].indexOf(this.searchText) != -1;
                    });
                }
                if(this.locFilter != ''){
                    this.travelList = this.travelList.filter(rs => {
                        return rs['Zone'].indexOf(this.locFilter) != -1;
                    });
                }
            }
            // Filter
            if(this.filterConditions.length > 0){
                let vm = this;
                let concatArray = [];
                if(_.includes(vm.filterConditions , '人文教育')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 1 || o.Class1 == 2 || o.Class1 == 5;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '自然公園')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 11 || o.Class1 == 13;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '歷史古蹟')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 3;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '宗教廟宇')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 4;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '河畔漁港')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 12;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '溫泉區')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 10;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '休閒體驗')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 9 || o.Class1 == 14;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '美食商圈')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 6;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                if(_.includes(vm.filterConditions , '其他')){
                    let filterArray = _.filter(this.travelList, function(o) {
                        return o.Class1 == 7 || o.Class1 == 8 || o.Class1 == 15 || o.Class1 == 16 || o.Class1 == 17 || o.Class1 == 18;
                    });
                    concatArray = _.concat(concatArray, filterArray);
                }
                vm.travelList = concatArray;
            }
            // Use Vue-infinite-loading
            // 顯示前25筆
            this.updatePage(this.travelList.length);
            this.travelList = this.travelList.slice(0, 25)
        },
        onLoaded:function(){
            this.imgLoading = true;
        },
        // jumpToPage: function(target){
        //     if(target == this.page.curretPage) return;
        //     if(this.page.curretPage >= 1){
        //         this.page.offset = (this.page.limit*target);
        //         this.page.curretPage = this.page.offset;
        //     }
        //     this.updateDataList();
        // },
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