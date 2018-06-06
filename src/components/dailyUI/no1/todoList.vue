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
                <div class="chartBox"></div>
            </div>
            <div class="rightSlide">
                <header class="actionGroup">
                    <button>All</button>
                    <div class="rightGroup">
                        <button>
                            Incomplete
                        </button>
                        <button>
                            Complete
                        </button>
                    </div>
                </header>
                <div class="todoGroup">
                    <ul>
                        <li v-if="todoTask == ''" class="nodata">
                            <button>●</button>
                            <h6>Body building</h6>
                            <p>Go Work Out</p>
                        </li>
                        <li v-else v-for="(todo, index) in todoTask">
                            <button>●</button>
                            <h6>{{ todo.title }}</h6>
                            <p>{{ todo.content }}</p>
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
export default {
    name: 'todoList',
    data() {
        return {
            openAction: false,
            todoTitle:'',
            todoContent: '',
            todoTask: todoStorage.fetch(),
            visibility: 'all'
        }
    },
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos);
            }
        }
    },
    // computed: {
    //     filteredTodos: function () {
    //         return filters[this.visibility](this.todos);
    //     }
    // },
    methods: {
        actionAddTodo() {
            if(this.todoTitle === ""){
                return false;
            }
            if(this.todoTitle){
                this.todoTask.push({
                    title: this.todoTitle,
                    text: this.todoContent,
                    complete: false
                });
            }
            this.todoTitle = "";
            this.todoContent = "";
        },
        filterTodos: function(filter) {
            this.visibility = filter;
            switch(filter) {
                case 'all':
                    return todoTask;
                    break;
                case 'complete':
                    return todoTask.filter(function(todo) {
                        return todo.complete;
                    });
                break;
                case 'incomplete':
                    return todoTask.filter(function(todo) {
                        return !todo.complete;
                    });
                break;                    
            }
        },
        deleteTodo: function(index) {
            this.todos.splice(index, 1);
        }
    }
}
</script>

<style lang="scss" scoped>
	@import "../../../scss/todolist.scss";
</style>