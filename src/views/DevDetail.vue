<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    style="margin-top: -32px"
  >
    <v-layout
      wrap
    >
    <v-flex
        md12
        xs12
        style="padding-top: 0px; padding-bottom: 0px"
      >
        <material-card
          :color="getColor()"
          flat
          full-width
          style="margin-bottom:0px; padding-bottom:0px"
          :no_card_text="true"
        >
          <div slot="header">
            <div 
              style="flex: 1 1 100%; height: 30px; margin-top: -15px"
            >
              <span class="title font-weight-light mb-2" v-text="dev.name"></span>
              <v-btn
                flat
                icon
                style="margin-bottom: 15px"
                @click="onClickModName"
              >
                <v-icon size="16" >mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                style=" margin-top: 20px; float: right"
                v-if="isDevHaveSwitch(dev.keylist)"
                @click="onClickChangeBool('isOpen')"
              >
                <v-icon size="32">mdi-power</v-icon>
              </v-btn>
            </div>
            <p
              class="category font-weight-thin"
              style="margin-top: 15px"
              v-text="text"
            />
          </div>
        </material-card>
      </v-flex>
      <v-flex
        sm4
        xs6
        md4
        lg3
        style="padding-top: 0px; padding-bottom: 0px; height: 101px"
        v-for="(key, index) in dev.keylist"
        :key="key.name"
        v-if="key.name !== 'isOpen'"
      >
        <material-card
          :color="getColor()"
          flat
          full-width
          style="margin-bottom:0px; padding-bottom:0px; padding-top: 0px"
          :no_card_text="true"
        >
          <div slot="header" style="height: 51px">
              <span class="title font-weight-light mb-2" v-text="key.name"></span>
              <span
                class="font-weight-thin textlargebottom"
                style="float: right"
                v-text="getKeyValue(key) + key.unit"
                v-if="isShowKeyValue(key)"
              >
              </span>
              <v-slider
                dark
                style="margin-top:-5px"
                thumb-label
                color="white"
                v-model="values[index]"
                :max="getRange(key.value, 2)"
                :min="getRange(key.value, 1)"
                :step="1"
                v-if="isShowControl(key, 'slider')"
                @change="onClickChangeKey(key, values[index])"
              >
              </v-slider>
              <v-switch
                color="white"
                v-model="values[index]"
                style="float: right; margin-bottom: 0px; margin-top: 0px; padding-top: 25px"
                v-if="isShowControl(key, 'switch')"
                @change="onClickChangeKey(key, values[index])"
              >
              </v-switch>
              <v-text-field
              style="float: right; padding: 0px; margin-top: -5px"
                class="notextdetails"
                :type="key.type == keytype.number?'number':''"
                v-model="values[index]"
                v-if="isShowControl(key, 'text')"
                @change="onClickChangeKey(key, (key.type == keytype.number?parseFloat(values[index]):values[index]))"
              >
              </v-text-field>
          </div>
        </material-card>
      </v-flex>
      <dialog-setname 
        :dialog="dialog"
        @toCloseDialog="closeModNameDialog"
        @toModName="modName"
        :srcName="dev.name"
      >
      </dialog-setname>
    </v-layout>
  </v-container>
  
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {devIconColorList} from '@/utils/dev'
import KEY from '@/utils/key-enum'
import keyMethods from '@/utils/key-method'
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'

export default {
  data: () => ({
    text: '占位',
    values: [

    ],
    keytype: KEY.type, //引用变量KEY.type
    dialog: false,
  }),
  computed: {
    ...mapState(['devlist']),
    dev () {
      return this.devlist.find(item => item.id == this.$route.query.devId);
    }
  },
  methods: {
    ...mapActions('websocket', ['changeKeyValue']),
    ...mapMutations('websocket', ['sendToServer']),
    getColor () {
      return devIconColorList.find(item => item.type == this.dev.type).color;
    },
    isShowControl (key, controller) {
      if(key.mode == KEY.mode.readonly) return false;
      switch(key.type) {
      case KEY.type.range: return controller == 'slider';
      case KEY.type.bool: return controller == 'switch';
      case KEY.type.number: return controller == 'text';
      case KEY.type.string: return controller == 'text';
      }
    },
    isShowKeyValue (key) {
      return key.mode == KEY.mode.readonly;
    },
    getRange (value, index) {
      return parseInt(value.split('/')[index]);
    },
    onClickChangeKey (key, value) {
      this.changeKeyValue({dev: this.dev, keyname: key.name, value: value});
    },
    getKeyValue(key) {
      return keyMethods.getKeyValue(key);
    },
    onClickChangeBool(keyname) {
      this.changeKeyValue({dev: this.dev, keyname: keyname, value: !keyMethods.getKey(this.dev.keylist, keyname).value});
    },
    isDevOpen: keyMethods.isDevOpen,
    isDevHaveSwitch: keyMethods.isDevHaveSwitch,
    closeModNameDialog () {
      this.dialog = false;
    },
    onClickModName () {
      this.dialog = true;
    },
    modName (name) {
      this.dialog = false;
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.dev, {
        id: this.dev.id,
        who: 'name',
        what: name
    }));
    }
  }
}
</script>

<style lang="scss">
  .v-slider__thumb-label {
    span {
      color: black;
    }
  }
  .textlargebottom {
    margin-top: 25px; 
    font-size: 1.4rem
  }
  .v-input--switch__thumb.theme--dark {
    color:hsla(0, 0%, 100%, 0.21);
  }

  .notextdetails {
    color: white!important;
    caret-color: white!important;
    .v-text-field__details {
      display: none;
    }
    .v-input__slot {
      margin-bottom: 0px
    }
    .v-text-field__slot {
      input {
        padding-bottom: 0px
      }
    }
  }
</style>
