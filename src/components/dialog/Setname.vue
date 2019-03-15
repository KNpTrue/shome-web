<template>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            onsubmit="return false"
          >
            <v-text-field
              v-model="name"
              :label= "$t('name')"
              type="text"
              :counter="10"
              required
              :rules="nameRules"
              autofocus
            >
              <template v-slot:prepend>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  {{ $t('please input a new name') }}
                </v-tooltip>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="onClickCancel">{{ $t('cancel') }}</v-btn>
          <v-btn :disabled="!valid" color="green darken-1" flat @click="onClickMod">{{ $t('done') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>


export default {
  inheritAttrs: false,

  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v=> !! v || this.$t('name is required'),
        v => (v && v.length <= 10) || this.$t('name must be less than 10 characters')
      ],
    } 
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    srcName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    dialog (val) {
      if(!val)  return;
      this.name = this.srcName;
    }
  },
  methods: {
    onClickCancel () {
      this.$emit('toCloseDialog');
    },
    onClickMod () {
      this.valid = false;
      if(!this.$refs.form.validate()) return;
      this.$emit('toModName', this.name);
      this.$refs.form.reset();
    }
  }
}
</script>

