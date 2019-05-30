<template>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card class="mx-auto">
        <v-card-title class="headline">{{ title + ' > ' + $t(stepTitle[step - 1]) }}</v-card-title>
        <v-card-text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-select
                v-model="seldev"
                :items="filterNoOnlineDev()"
                item-value="id"
                :label="$t('dev')"
                return-object
                required
                no-data-text="no device"
              >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }}({{ getRoomNameById(roomlist, data.item.roomid, $t('no room set up')) }})
              </template>
              <template slot='item' slot-scope="data">
                {{ data.item.name }}({{ getRoomNameById(roomlist, data.item.roomid, $t('no room set up')) }})
              </template>
              </v-select>
            </v-window-item>
            <v-window-item :value="2">
              <v-select
                v-model="selkey"
                :items="filterReadOnlyKey(seldev.keylist)"
                item-text="name"
                item-value="name"
                :label="$t('attributes')"
                return-object
                required
                no-data-text="no key"
              ></v-select>
              <helper-keyedit
                :srckey="selkey"
                :value="keyvalue"
                @toChangeVal="toChangeVal"
              >
              </helper-keyedit>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat @click="onClickCancel">{{ step === 1 ? $t('cancel') : $t('back') }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" :color="color" @click="onClickMod">{{ step === maxstep ? $t('done') : $t('next') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import KEY from '@/utils/key-enum'
import common from '@/utils/common'

export default {
  inheritAttrs: false,

  data () {
    return {
      step: 1,
      maxstep: 2,
      stepTitle: [
        'select device',
        'select attributes to change'
      ],
      valid: true,
      task: {},
      seldev: {},
      selkey: {},
      keyvalue: undefined
    }
  },
  computed: {
    ...mapState(['devlist', 'color', 'roomlist'])
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    srcTask: {  // { idx: xx, devid: xx, key: { type: xx, value: xx } }
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      this.task = this.srcTask
      
      if (this.dialog) {
        this.seldev = this.getItemById(this.devlist, this.srcTask.devid)
        this.selkey = this.srcTask.key
        this.keyvalue = this.selkey.value
      }
    }
  },
  methods: {
    onClickCancel () {
      if (this.step === 1) {
        this.$emit('toCloseDialog')
      } else {
        this.step--
      }
    },
    onClickMod () {
      if(this.step === this.maxstep) {
        var key = {
          name: this.selkey.name,
          type: this.selkey.type,
          value: this.keyvalue
        }
        this.$emit('toSetTask', this.seldev.id, key)
        this.step = 1
      } else {
        this.step++
      }
    },
    filterNoOnlineDev () {
      return this.devlist.filter(dev => dev.online === true)
    },
    filterReadOnlyKey (keylist) {
      if (keylist === undefined)  return []
      return keylist.filter(key => key.mode === KEY.mode.readwrite)
    },
    toChangeVal (val) {
      this.keyvalue = val
    },
    getRoomNameById: common.getRoomNameById,
    getItemById: common.getItemById
  }
}
</script>
