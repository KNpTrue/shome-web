<template>
  <v-flex
    align-center
    layout
    py-2
  >
    <div
      v-ripple
      class="toolbar-items"
      @click="dialog = true"
    >
      <span v-if="!textShow">{{ $t('add_room') }}</span>
      <v-icon color="tertiary">mdi-plus</v-icon>
    </div>
    <dialog-setname
      :dialog="dialog"
      @toCloseDialog="dialog = false"
      @toModName="addRoom"
      :title="$t('add room')"
    >
    </dialog-setname>
  </v-flex>
</template>

<script>
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      dialog: false
    }
  },
  props: {
    textShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('websocket', ['sendToServer']),
    addRoom (name) {
      this.dialog = false
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: -1,
        who: 'add',
        what: name
      }))
    }
  }
}
</script>
