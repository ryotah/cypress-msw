<template>
  <div>
    <h1>Foo</h1>
    {{ todo }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: undefined
    };
  },
  created() {
    const path = "https://jsonplaceholder.typicode.com/todos/1";

    fetch(path)
      .then(response => response.json())
      .then(json => console.log(json));
    // => { userId: 1, id: 1, title: "delectus aut autem", completed: false }

    this.axios.get(path).then(response => {
      console.log(response.data);
      // => { userId: 1, id: 1, title: "delectus aut autem", completed: false }

      this.todo = response.data;
    });
  }
};
</script>
