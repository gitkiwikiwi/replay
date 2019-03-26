<template>
  <v-speed-dial
    class="floating-button floatShepherd"
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
  >
    <v-btn
      slot="activator"
      v-model="fab"
      color="teal accent-4"
      :to="{ name: 'AddImage', params: { imageProp: null } }"
      dark
      fab
    >
      <v-icon>video_call</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green lighten-1"
      :to="{ name: 'AddImage', params: { imageProp: null } }"
    >
      <v-icon>video_call</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'FloatingButton',

  data: () => ({
    direction: 'left',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-x-reverse-transition'
  })
}
</script>

<style scoped>
    .floating-button {
      position: fixed;
      color: white;
    }
</style>
