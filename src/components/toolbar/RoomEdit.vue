<template>
  <v-flex
    align-center
    layout
    py-2
  >
    <div
      v-ripple
      class="toolbar-items"
    >
      <span v-if="!textShow">{{ $t('add_room') }}</span>
      <v-icon color="tertiary">mdi-plus</v-icon>
    </div>
  </v-flex>
</template>

<script>
export default {
    props: {
    textShow: {
      type: Boolean,
      default: false
    }
  },
}
</script>
