<template>
    <div class="box">
        <div class="dataPicker">
            <button><</button>
            <ul>
                <li></li>
            </ul>
            <button>></button>
        </div>
        <div class="content">
            <div class="leftSlide">
                <h6>ToDo List</h6>
                <button class="btn addTodo" :class="{ open: !openAction }" @click="openAction = !openAction">New Task</button>
                <div class="inputBox" :class="{ open: openAction }">
                    <input
                        type="text"
                        placeholder="Title"
                        v-model.trim="todoData.title"/>
                    <input
                        type="text"
                        placeholder="Type your memo here ..."
                        v-model.trim="todoData.content"
                        @keyup.enter="actionAddTodo"/>
                    <button class="createTodo" @click="actionAddTodo" :disabled="todoData.title == ''">Add Task</button>
                </div>

                <div class="chartBox">
                    <div class="chartGauge">
                        <svg viewBox="0 0 173 173" preserveascpectratio="xMinYMin Meet">
                            <circle class="rail" cx="86.5" cy="86.5" r="73.5"></circle>
                            <path class="progress" d="M 86 13 a 73.5 73.5 0 1 0.1 0 Z" :style="{ strokeDashoffset: completeOffset(completeRatio) + 'px' }"></path>
                            <linearGradient id="linearGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stop-color="#fee4dd"></stop>
                                <stop offset="1" stop-color="#5761bb"></stop>
                            </linearGradient>
                        </svg>
                    </div>
                    <div class="circleScreen" @click="toggleChart.toggle = !toggleChart.toggle">
                        <div class="complete" :class="{ active: toggleChart.toggle }">
                            <h4>{{ completeRatio }}%</h4>
                            <p>Completed</p>
                        </div>
                        <div class="uncompleted" :class="{ active: !toggleChart.toggle }">
                            <h4>{{ uncompleteRatio }}%</h4>
                            <p>Uncompleted</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightSlide">
                <header class="actionGroup">
                    <button @click="filterTodos('all')">All</button>
                    <div class="rightGroup">
                        <button @click="filterTodos('uncomplete')">
                            Uncompleted
                        </button>
                        <button @click="filterTodos('complete')">
                            Completed
                        </button>
                    </div>
                </header>
                <div class="todoGroup scroll scrollY">
                    <ul>
                        <li v-if="todoTask == ''" class="nodata">
                            <h6>Body building</h6>
                            <p>Go Work Out</p>
                        </li>
                        <li v-else v-for="(todo, index) in todoList">
                            <div class="dataBox">
                                <button :class="{ check: todo.complete }" @click="changeComplete(index)">
                                    <font-awesome-icon icon="check-circle" />
                                </button>
                                <div>
                                    <h6>{{ todo.title }}</h6>
                                    <p>{{ todo.text }}</p>
                                </div>
                                <button @click="openToggle(index)">
                                    <font-awesome-icon icon="edit"/>
                                </button>
                                <button @click="deleteTodo(index)">
                                    <font-awesome-icon icon="trash"/>
                                </button>
                            </div>
                            <div class="collapse inputBox" :class="{show : todo.toggle}">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    v-model.trim="todoList[index]['title']"/>
                                <input
                                    type="text"
                                    placeholder="Somethings..."
                                    v-model.trim="todoList[index]['text']"/>
                                <div class="optionGroup">
                                    <!-- <button class="alarm">
                                        <font-awesome-icon icon="bell"/>
                                    </button> -->
                                    <button @click="priorityTodo(index)" :style="{ color: priorityColor(index, todo.priority)}">
                                        <font-awesome-icon icon="star"/>
                                    </button>
                                </div>
                                <footer class="actionGroup">
                                    <button @click="closeToggle(index)">Cancel</button>
                                    <button @click="editTodo(index)">Save</button>
                                </footer>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const STORAGE_KEY = 'todo-list'
const todoStorage = {
    fetch: function () {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return todos;
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    name: 'ToDoList',
    data() {
        return {
            openAction: false,
            toggleChart: {
                toggle: true,
                completeRatio: 0,
                uncompleteRatio: 0
            },
            todoData:{
                title:'',
                content: '',
            },
            toggleEdit: {
                title:'',
                content: '',
            },
            todoTask: todoStorage.fetch(),
            todoList: [],
            visibility: '',
        }
    },
    watch: {
        todoTask: {
            handler: function(todos) {
                todoStorage.save(todos);
            }
        }
    },
    computed: {
        completeRatio() {
            if(this.todoTask.length == 0) return 0;
            return Math.round((_.filter(this.todoTask, 'complete').length) / this.todoTask.length * 1000) / 10;
        },
        uncompleteRatio() {
            if(this.todoTask.length == 0) return 0;
            return Math.round((_.filter(this.todoTask, function(o) { return !o.complete; }).length) / this.todoTask.length * 1000) / 10;
        }
    },
    created() {
        this.filterTodos('all');
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        completeOffset(ratio) {
            return (Math.round(ratio)/100)*462 - 462;
        },
        priorityColor(index, lv) {
            if(lv == 0){
                return 'rgba(255, 255, 255, 0.25)';
            }else{
                return 'rgba(254, 228, 221, ' + (lv * 0.25) + ')';
            }
        },
        actionAddTodo() {
            if(this.todoData.title === ""){
                return false;
            }
            if(this.todoData.title){
                this.todoTask.push({
                    title: this.todoData.title,
                    text: this.todoData.content,
                    complete: false,
                    toggle: false,
                    priority: 0
                });
                this.todoList = _.cloneDeep(this.todoTask);
            }
            this.todoData.title = "";
            this.todoData.content = "";
            this.openAction = false;
        },
        filterTodos: function(filter) {
            this.visibility = filter;
            switch(filter) {
                case 'all':
                    this.todoList = this.todoTask;
                    break;
                case 'complete':
                    this.todoList = _.filter(this.todoTask, 'complete');
                break;
                case 'uncomplete':
                    this.todoList = _.filter(this.todoTask, function(o) { return !o.complete; });
                break;                    
            }
        },
        changeComplete: function(index) {
            this.todoTask[index].complete = !this.todoTask[index].complete;
            this.todoList = _.cloneDeep(this.todoTask);
        },
        priorityTodo: function(index) {
            if(this.todoTask[index].priority >= 5){
                this.todoTask[index].priority = 0;
            }else{
                this.todoTask[index].priority = this.todoTask[index].priority + 1;
            }
        },
        openToggle: function(index){
            this.openAction = false;
            if(this.todoList[index].toggle){
                this.todoList[index].toggle = false;
            }else{
                _.forEach(this.todoList, function(value, key) {
                    value.toggle = (key == index);
                });
            }
        },
        closeToggle: function(index){
            _.forEach(this.todoList, function(value, key) {
                value.toggle = false;
            });
        },
        editTodo: function(index){
            this.todoTask = _.cloneDeep(this.todoList);
            this.todoList = _.orderBy(this.todoTask, 'priority', 'desc');
            this.closeToggle(index);
        },
        deleteTodo: function(index) {
            this.todoTask.splice(index, 1);
            this.todoList = _.cloneDeep(this.todoTask);
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../../../scss/todolist.scss";
</style>