<template>
  <div>
    <v-fade-transition group tag="div" class="flex align-center layout py-2">
      <div
        v-for="tab in tablist"
        :key="tab"
        v-ripple
        slot="activator"
        :class="{'toolbar-items': true, 'tab-active': selScene === tab, 'tab-disabled': selScene !== tab}"
        @click="toTab(tab)"
      >
          {{ $t(tab) }}
      </div>
      <div
        v-ripple
        class="toolbar-items"
        key="add"
        @click="dialog = true"
      >
        <span v-if="!textShow">{{ $t(addText) }}</span>
        <v-icon color="tertiary">mdi-plus</v-icon>
      </div>
    </v-fade-transition>
    <dialog-setname
      :dialog="dialog"
      @toCloseDialog="dialog = false"
      @toModName="addObj"
      :title="selScene === 'todo' ? $t('add todo') : $t('add set')"
    >
    </dialog-setname>
  </div>
</template>

<script>
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      tablist: ['todo','set'],
    }
  },
  props: {
    textShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['selScene']),
    addText () {
      return this.selScene === 'todo' ? 'add todo' : 'add set'
    },
  },
  methods: {
    ...mapMutations(['setSelScene']),
    ...mapMutations('websocket', ['sendToServer']),
    toTab (tab) {
      this.setSelScene(tab)
    },
    addObj (name) {
      this.dialog = false
      if(this.selScene === 'set') {
        this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.set, {
          id: -1,
          who: 'add',
          what: name
        }))
      } else {

      }
    }
  }
}
</script>

<style lang="scss">
  .tab-active {
    font-size: 20px;
    font-weight: 400;
  }
  .tab-disabled {
    color: #797575
  }
</style>
