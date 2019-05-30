<template>
  <div>
    <v-slider
      thumb-label
      color="green"

      v-model="value"
      :max="srckey.top"
      :min="srckey.btn"
      :step="srckey.step"
      v-if="isShowControl(srckey, 'slider')"
    >
    </v-slider>
    <v-text-field
      :type="srckey.type === keytype.number ? 'number' : ''"
      v-model="value"
      v-if="isShowControl(srckey, 'text')"
    >
    </v-text-field>
    <v-select
      v-model="value"
      :items="[true, false]"
      :label="$t('value')"
      required
      v-if="isShowControl(srckey, 'select')"
    >
    </v-select> 
  </div>
</template>

<script>
import KEY from '@/utils/key-enum'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      keytype: KEY.type,
    }
  },
  computed: {
    ...mapState(['color'])
  },
  watch: {
    value (val) {
      this.$emit('toChangeVal', val)
    }
  },
  props: {
    srckey: {
      type: Object,
      default: {}
    },
    value: undefined
  },
  methods: {
    isShowControl (key, controller) {
      if (key === undefined)  return false
      if (key.mode === KEY.mode.readonly) return false
      switch (key.type) {
        case KEY.type.range: return controller === 'slider'
        case KEY.type.bool: return controller === 'select'
        case KEY.type.number: return controller === 'text'
        case KEY.type.string: return controller === 'text'
        default: return false
      }
    },
  }
}
</script>
