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
                        v-model.trim="todoTitle"/>
                    <input
                        type="text"
                        placeholder="Somethings..."
                        v-model.trim="todoContent"
                        @keyup.enter="actionAddTodo"/>
                    <button class="createTodo" @click="actionAddTodo" :disabled="todoTitle == ''">Add Task</button>
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
                            <h4>{{completeRatio}}%</h4>
                            <p>Completed</p>
                        </div>
                        <div class="uncompleted" :class="{ active: !toggleChart.toggle }">
                            <h4>{{uncompleteRatio}}%</h4>
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
                            <div>
                                <button class="checkbox" :class="{ check: todo.complete }" @click="changeComplete(index)">
                                    <font-awesome-icon icon="check-circle" />
                                </button>
                                <div>
                                    <h6>{{ todo.title }}</h6>
                                    <p>{{ todo.text }}</p>
                                </div>

                                <button class="priority" @click="priorityTodo(index)" :style="{ color: priorityColor(index, todo.priority)}">
                                    <font-awesome-icon icon="star"/>
                                </button>
                                <button class="delete" @click="deleteTodo(index)">
                                    <font-awesome-icon icon="trash"/>
                                </button>
                                <button class="edit" @click="editToggle(index)">
                                    <font-awesome-icon icon="edit"/>
                                </button>
                            </div>
                            <div class="collapse" :class="{open}">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    v-model.trim="todoList[index]['title']"/>
                                <input
                                    type="text"
                                    placeholder="Somethings..."
                                    v-model.trim="todoList[index]['text']"/>
                                <!-- <button class="alarm">
                                    <font-awesome-icon icon="bell"/>
                                </button> -->
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
        var todos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
        return todos;
    },
    save: function (todos) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
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
            todoTitle:'',
            todoContent: '',
            todoTask: todoStorage.fetch(),
            todoList: [],
            visibility: 'all',
        }
    },
    watch: {
        todos: {
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
            }else if(lv > 5){
                this.todoTask[index].priority = 0;
            }else{
                return 'rgba(254, 228, 221, ' + (lv * 0.2) + ')';
            }
        },
        actionAddTodo() {
            if(this.todoTitle === ""){
                return false;
            }
            if(this.todoTitle){
                this.todoTask.push({
                    title: this.todoTitle,
                    text: this.todoContent,
                    complete: false,
                    priority: 0
                });
                this.todoList = _.cloneDeep(this.todoTask);
            }
            this.todoTitle = "";
            this.todoContent = "";
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
            this.todoTask[index].priority = this.todoTask[index].priority + 1;
            this.todoList = _.orderBy(this.todoTask, 'priority', 'asc');
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