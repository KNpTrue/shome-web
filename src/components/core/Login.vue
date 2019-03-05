<template>
  <v-layout row justify-center v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">{{ $t('login') }} Shome</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            onsubmit="return false"
          >
            <v-text-field
              v-model="password"
              :label= "$t('password') + '*'"
              type="password"
              required
              :rules="passwdRules"
            >
              <template v-slot:prepend>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  {{ $t('please input password to login') }}
                </v-tooltip>
              </template>
              <template v-slot:append>
                <v-progress-circular
                  v-if="loading"
                  size="24"
                  color="info"
                  indeterminate
                ></v-progress-circular>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="onClickClose">{{ $t('close_window') }}</v-btn>
          <v-btn :disabled="!valid" color="green darken-1" flat @click="onClickLogin">{{ $t('login') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        valid: true,
        dialog: true,
        loading: false,
        password: "",
        passwdRules: [
          v=> !! v || this.$t('password is required')
        ]
      }
    },
    methods: {
      ...mapActions(['initWebSocket']),
      onClickClose() { //关闭
        window.opener=null;
        window.open('','_self');
        window.close();
      },
      onClickLogin() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 4000)
        if(!this.$refs.form.validate()) return;
        this.initWebSocket(this.password);
        //this.dialog = false;
      }
    }
  }
</script>