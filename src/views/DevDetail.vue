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
              <p
                class="category font-weight-thin"
                style="float: right;margin-top: 32px"
                v-text="getOpenState()"
              />
            </div>
            <p
              class="category font-weight-thin"
              style="margin-top: 15px"
              v-text="getRoomNameById(roomlist, dev.roomid, $t('no room set up'))"
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
        v-for="key in filterOpenKey()"
        :key="key.name"
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
                style="float: right; width: 100%"
                v-text="getKeyValue(key) + key.unit"
                v-if="isShowKeyValue(key)"
              >
              </span>
              <v-slider
                dark
                style="margin-top:-5px"
                thumb-label
                color="white"
                v-model="key.value"
                :max="key.top"
                :min="key.btn"
                :step="key.step"
                v-if="isShowControl(key, 'slider')"
                @change="onClickChangeKey(key, key.value)"
              >
              </v-slider>
              <v-switch
                color="white"
                v-model="key.value"
                style="float: right; margin-bottom: 0px; margin-top: 0px; padding-top: 25px"
                v-if="isShowControl(key, 'switch')"
                @change="onClickChangeKey(key, key.value)"
              >
              </v-switch>
              <v-text-field
              style="float: right; padding: 0px; margin-top: -10px; width: 100%"
                class="notextdetails"
                :type="key.type == keytype.number?'number':''"
                v-model="key.value"
                v-if="isShowControl(key, 'text')"
                @change="onClickChangeKey(key, (key.type == keytype.number?parseFloat(key.value):key.value))"
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
        :title="$t('modify name')"
      >
      </dialog-setname>
    </v-layout>
  </v-container>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { getIconColorItem } from '@/utils/dev'
import KEY from '@/utils/key-enum'
import keyMethods from '@/utils/key-method'
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'
import common from '@/utils/common'

export default {
  data: () => ({
    text: '占位',
    keytype: KEY.type, // 引用变量KEY.type
    values: [],
    dialog: false
  }),
  computed: {
    ...mapState(['devlist', 'roomlist']),
    dev () {
      return this.devlist.find(item => item.id === this.$route.query.devId)
    }
  },
  methods: {
    ...mapActions('websocket', ['changeKeyValue']),
    ...mapMutations('websocket', ['sendToServer']),
    getColor () {
      return getIconColorItem(this.dev.type).color
    },
    isShowControl (key, controller) {
      if (key.mode === KEY.mode.readonly) return false
      switch (key.type) {
        case KEY.type.range: return controller === 'slider'
        case KEY.type.bool: return controller === 'switch'
        case KEY.type.number: return controller === 'text'
        case KEY.type.string: return controller === 'text'
      }
    },
    isShowKeyValue (key) {
      return key.mode === KEY.mode.readonly
    },
    onClickChangeKey (key, value) {
      this.changeKeyValue({ dev: this.dev, keyname: key.name, value: value })
    },
    getKeyValue (key) {
      return keyMethods.getKeyValue(key)
    },
    onClickChangeBool (keyname) {
      this.changeKeyValue({ dev: this.dev, keyname: keyname, value: !keyMethods.getKey(this.dev.keylist, keyname).value })
    },

    closeModNameDialog () {
      this.dialog = false
    },
    onClickModName () {
      this.dialog = true
    },
    modName (name) {
      this.dialog = false
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.dev, {
        id: this.dev.id,
        who: 'name',
        what: name
      }))
    },
    getOpenState () {
      if (!keyMethods.isDevHaveSwitch(this.dev.keylist)) return ''
      return this.$t(keyMethods.getKeyValue(this.dev.keylist.find(item => item.name === 'isOpen')))
    },
    filterOpenKey () {
      return this.dev.keylist.filter(key => key.name !== 'isOpen')
    },
    isDevOpen: keyMethods.isDevOpen,
    isDevHaveSwitch: keyMethods.isDevHaveSwitch,
    getRoomNameById: common.getRoomNameById
  }
}
</script>

<style lang="scss">
  #core-view {
    .v-slider__thumb-label {
      span {
        color: black;
      }
    }
    .textlargebottom {
      //margin-top: 30px;
      text-align: right;
      font-size: 1.2rem
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
  }

</style>
