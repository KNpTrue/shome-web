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
              :label= "$t(label) + '*'"
              type="password"
              required
              :rules="passwdRules"
              @click="onClickPassWord"
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
                  color="purple"
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
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import md5 from 'blueimp-md5'

  export default {
    data () {
      return {
        valid: true,
        loading: false,
        label: "password",
        password: '',
        passwdRules: [
          v=> !! v || this.$t('password is required')
        ]
      }
    },
    computed: {
      ...mapState('websocket', ['dialog'])
    },
    methods: {
      ...mapGetters('websocket', ['getOnline', 'getWebSocket']),
      ...mapActions('websocket', ['initWebSocket']),
      ...mapMutations('websocket', ['setPassword']),
      onClickClose() { //关闭
        window.opener=null;
        window.open('','_self');
        window.close();
      },
      onClickLogin() {
        if(this.password == '')  return;
        this.valid = false;
        if(!this.$refs.form.validate()) return;
        let passwdMd5 = md5(this.password); //md5加密
        this.initWebSocket(passwdMd5);
        this.loading = true;
        let i = 0;
        let handler = setInterval(() => { //循环查看是否
          i++;
          if(this.getOnline() == true) {
            this.loading = false;
            this.password = '';
            clearInterval(handler);
          } else {
            if (i > 5) {
              clearInterval(handler); //停止循环
              this.loading = false;
              this.label = "can't connect server or password error";
              this.$refs.form.reset();
            }
          }
        }, 1000)
      },      
      onClickPassWord() {
        this.label = 'password';
      },
    }
  }
</script>