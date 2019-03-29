<template>
  <p>Player Component: {{ status }}</p>
</template>

<script>
export default {
  data: function () {
    return {
      status: 'Visible'
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
