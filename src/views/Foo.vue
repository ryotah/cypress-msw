<template>
  <div>
    <h1>Foo</h1>
    <form @submit.prevent="submit">
      <input v-model="todoId" /><button type="submit">
        Get
      </button>
    </form>
    <pre>{{ todo }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: undefined,
      todoId: "1"
    };
  },
  created() {
    // fetch(apiTodoRequest(this.todoId))
    //   .then(response => response.json())
    //   .then(json => console.log(json));

    this.axios.get(apiTodoRequest(this.todoId)).then(response => {
      console.log(response.data);
      this.todo = response.data;
    });
  },
  methods: {
    submit() {
      this.axios
        .get(apiTodoRequest(this.todoId))
        .then(response => (this.todo = response.data));
    }
  }
};

function apiTodoRequest(id) {
  return `https://jsonplaceholder.typicode.com/todos/${id}`;
}
</script>
