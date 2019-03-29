<template>
  <p> {{ videopath }} World! </p>
</template>

<script>
module.export = {
  name: 'player',
  data: function () {
    return {
      videopath: 'Hello'
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
