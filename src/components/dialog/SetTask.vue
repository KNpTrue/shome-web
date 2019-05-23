<template>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card class="mx-auto">
        <v-card-title class="headline">{{ title + ' > ' + $t(stepTitle[step - 1]) }}</v-card-title>
        <v-card-text>
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-select
                v-model="seldev"
                :items="devlist"
                item-text="name"
                :label="$t('dev')"
                return-object
                required
              ></v-select>
            </v-window-item>
            <v-window-item :value="2">
              <v-select
                v-model="selkey"
                :items="seldev.keylist"
                item-text="name"
                :label="$t('attributes')"
                return-object
                required
              ></v-select>
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
      task: {},
      valid: true,
      seldev: {},
      selkey: {}
    }
  },
  computed: {
    ...mapState(['devlist', 'color'])
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
        console.log(this.seldev)
        this.valid = false
        if (!this.$refs.form.validate()) return
        this.$emit('toModTask', this.task)
        this.$refs.form.reset()
      } else {
        this.step++
      }
    }
  }
}
</script>
