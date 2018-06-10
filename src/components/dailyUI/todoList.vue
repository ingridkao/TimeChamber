<template>
    <div class="box">
        <div class="content">
            <div class="leftSlide">
                <h6 class="unitTile">ToDo List</h6>
                <button class="btn addTodo" :class="{ open: !openAction }" @click="openAction = !openAction">New Task</button>
                <div class="inputBox" :class="{ open: openAction }">
                    <input
                        type="text"
                        placeholder="Title"
                        maxlength="22"
                        v-model.trim="todoData.title"/>
                    <input
                        type="text"
                        placeholder="Type your memo here ..."
                        maxlength="26"
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
                            <h6>item : {{ toggleChart.completeCount }}</h6>
                        </div>
                        <div class="uncompleted" :class="{ active: !toggleChart.toggle }">
                            <h4>{{ uncompleteRatio }}%</h4>
                            <p>Uncompleted</p>
                            <h6>item : {{ toggleChart.uncompleteCount }}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightSlide">
                <header class="actionGroup">
                    <button @click="filterTodos('all')">All</button>
                    <div>
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
                            <div class="dataBox">
                                <h5>Body building</h5>
                                <p>Go Work Out</p>
                            </div>
                        </li>
                        <draggable v-else v-model="todoList" @end="onEnd">
                        <transition-group name="list-complete" mode="out-in">
                                <li v-for="(todo, index) in todoList" :key="index">
                                    <div class="dataBox">
                                        <button :class="{ check: todo.complete }" @click="changeComplete(index)">
                                            <font-awesome-icon icon="check-circle" />
                                        </button>
                                        <div>
                                            <h5>{{ todo.title }}</h5>
                                            <p class="text">{{ todo.text }}</p>
                                            <div class="detail">
                                                <span v-if="todo.priority > 0" :style="{ color: priorityColor(index, todo.priority)}">
                                                    <font-awesome-icon icon="star"/>
                                                </span>      
                                               <span v-if="todo.alart != null && todo.alart != ''">
                                                    <font-awesome-icon icon="bell"/>
                                                    {{ todo.alart }}
                                                </span>
                                                <span v-if="todo.file != null && todo.file != ''">
                                                    <font-awesome-icon icon="folder"/>
                                                    {{ todo.file }}
                                                </span>
                                            </div>
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
                                            maxlength="22"
                                            v-model.trim="todoList[index]['title']"/>
                                        <input
                                            type="text"
                                            placeholder="Somethings..."
                                            maxlength="26"
                                            v-model.trim="todoList[index]['text']"/>
                                        <input
                                            type="date"
                                            v-model="todoList[index]['alart']"/>
                                        <div class="optionGroup">
                                            <button @click="priorityTodo(index)" :style="{ color: priorityColor(index, todo.priority)}">
                                                <font-awesome-icon icon="star"/>
                                            </button>
                                            <label class="btnLabel">
                                                <input type="file" @change="onFileChange($event)">
                                                Upload File 
                                            </label>
                                            <div class="fileName" v-if="todoData.file != ''">{{ todoData.file }}</div>
                                        </div>
                                        <footer class="actionGroup">
                                            <button @click="closeToggle(index)">Cancel</button>
                                            <button @click="editTodo(index)">Save</button>
                                        </footer>
                                    </div>
                                </li>
                                </transition-group>
                        </draggable>
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
import draggable from 'vuedraggable'

export default {
    name: 'ToDoList',
    data() {
        return {
            openAction: false,
            toggleChart: {
                toggle: true,
                completeRatio: 0,
                uncompleteRatio: 0,
                completeCount: 0,
                uncompleteCount: 0
            },
            todoData:{
                title:'',
                content: '',
                file:''
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
            this.toggleChart.completeCount = _.filter(this.todoTask, 'complete').length;
            return Math.round(this.toggleChart.completeCount / this.todoTask.length * 1000) / 10;
        },
        uncompleteRatio() {
            if(this.todoTask.length == 0) return 0;
            this.toggleChart.uncompleteCount = _.filter(this.todoTask, function(o) { return !o.complete; }).length;
            return Math.round(this.toggleChart.uncompleteCount / this.todoTask.length * 1000) / 10;
        }
    },
    created() {
        this.filterTodos('all');
    },
    components: {
        FontAwesomeIcon,
        draggable
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
                this.closeToggle();
                this.todoTask.push({
                    title: this.todoData.title,
                    text: this.todoData.content,
                    complete: false,
                    toggle: false,
                    priority: 0,
                    alart: null,
                    file:''
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
            this.todoList[index].complete = !this.todoList[index].complete;
            this.updateToDo();
        },
        priorityTodo: function(index) {
            if(this.todoList[index].priority >= 5){
                this.todoList[index].priority = 0;
            }else{
                this.todoList[index].priority = this.todoList[index].priority + 1;
            }
        },
        openToggle: function(index){
            this.openAction = false;
            this.todoData.file = this.todoList[index].file;
            if(this.todoList[index].toggle){
                this.todoList[index].toggle = false;
            }else{
                _.forEach(this.todoList, function(value, key) {
                    value.toggle = (key == index);
                });
            }
        },
        closeToggle: function(){
            _.forEach(this.todoList, function(value, key) {
                value.toggle = false;
            });
        },
        onFileChange: function(evt) {
            this.todoData.file = evt.target.files[0].name;
        },
        editTodo: function(index){
            this.todoList = _.orderBy(this.todoList, 'priority', 'desc');
            this.todoList[index].toggle = false;
            this.todoList[index].file = this.todoData.file;
            this.updateToDo();
            this.closeToggle();
        },
        updateToDo: function(){
            this.todoTask = _.cloneDeep(this.todoList);
        },
        deleteTodo: function(index) {
            this.todoTask.splice(index, 1);
            this.todoList = _.cloneDeep(this.todoTask);
        },
        onEnd: function(){
            this.updateToDo();
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../../scss/todolist.scss";
</style>