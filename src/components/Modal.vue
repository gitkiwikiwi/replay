
this is a unused componet right now , but we are going to need it later as our project progresses

<template>
  <div>
    <modal name="hello-world" @before-open="beforeOpen">
      <div class="wrapper">
        <p>{{ itemToShow }}</p>
      </div>
    </modal>
    <modal name="my">
      <div class="wrapper justify-content">
        <h5>Create new task</h5>
        <form action="submit" class="form-control">
            <label for="Task">Enter task name </label>
            <input type="text">
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: function () {
      return {
        item: ''
      }
    },

    computed: {
      itemToShow: function () {
        return this.item
      }
    },

    methods: {
      beforeOpen (event) {
        this.item = event.params.item
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 35%;
    width: 35%;
    text-color: black;
    justify-content: center

  }
</style>
