<template>
  <v-layout row justify-center v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">{{ $t('login') }} Shome</v-card-title>
        <v-card-text>
            <v-text-field
              v-model="password"
              :label= "$t('password') + '*'"
              type="password"
              required
            >
            </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="onClickClose">{{ $t('close_window') }}</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">{{ $t('login') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    data () {
      return {
        dialog: true,
        password: ""
      }
    },
    methods: {
      onClickClose() { //关闭
        window.opener=null;
        window.open('','_self');
        window.close()
        //window.close();
      }
    }
  }
</script>