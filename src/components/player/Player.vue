<template>
  <div id="player"> {{ videoUrl }} World! </div>
</template>

<script>
module.export = {
  name: 'Player',
  data: () => ({
    videoUrl: 'Hello'
  })
}
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
