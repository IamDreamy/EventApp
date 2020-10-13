<template>
  <section class="container debug-grid-16-solid">
    <header>
      <h1 class="title">To-do's</h1>
      <input
        v-model="currentTodo"
        @keydown.enter="addTodo()"
        placeholder="What needs to be done?"
      />
    </header>
    <section>
      <ul class="todos">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{
            todo: true,
            editing: editedTodo === todo,
            completed: todo.completed,
          }"
          @dblclick="editTodo(todo)"
        >
          <div class="view">
            <input class="check" type="checkbox" v-model="todo.completed" />
            <div class="title">{{ todo.label }}</div>
            <button @click="removeTodo(todo)">&times;</button>
          </div>
          <input
            class="edit"
            v-model="todo.label"
            v-todo-html-focus="todo == editedTodo"
            @blur="cancelEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
            @keyup.enter="doneEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer>
      <div class="items-left">{{ completed }} Items Left</div>
      <div class="static">
        <div
          @click="visibility = 'all'"
          :class="{ 'items-all': true, selected: visibility === 'all' }"
        >
          All
        </div>
        <div
          @click="visibility = 'active'"
          :class="{ 'items-active': true, selected: visibility === 'active' }"
        >
          Active
        </div>
        <div
          @click="visibility = 'completed'"
          :class="{
            'items-completed': true,
            selected: visibility === 'completed',
          }"
        >
          Completed
        </div>
      </div>
      <div
        class="items-clear-completed"
        v-if="completed !== todos.length"
        @click="removeCompleted"
      >
        Clear completed
      </div>
    </footer>
  </section>
</template>

<script>
////@ts-check
import Vue from "vue";
let filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed: function(todos) {
    return todos.filter((todo) => todo.completed);
  },
};
export default Vue.extend({
  data() {
    return {
      todos: [],
      currentTodo: "",
      editedTodo: null,
      originalEditedTodoValue: "",
      visibility: "all",
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: Date.now().toString(36),
        label: this.currentTodo,
        completed: false,
      });
      this.currentTodo = "";
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    removeCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    editTodo(todo) {
      console.log("editTodo");
      // todo.completed = !todo.completed;
      this.editedTodo = todo;
      this.originalEditedTodoValue = todo.label;
    },
    doneEdit(todo) {
      console.log("doneEdit");
      this.editedTodo = null;
      if (!todo.label) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      console.log("cancelEdit");
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.label = this.originalEditedTodoValue;
    },
  },
  computed: {
    completed() {
      let remaining = 0;
      this.todos.forEach((todo) => {
        if (!todo.completed) {
          remaining++;
        }
      });
      return remaining;
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "todo-html-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
});
</script>

<style>
.todos {
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  color: green;
}

.items-left {
  font-size: 20px;
  color: red;
}

.items-all,
.items-active,
.items-completed {
  color: lightslategray;
  font-size: 20px;
}

* {
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  background-color: lightyellow;
}
</style>
