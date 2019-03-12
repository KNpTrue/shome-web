<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout warp align-center justify-center class="text-xs-center" v-if="devlist.length == 0">
      <h4 style="margin-top:200px">{{ $t('no devices') }}</h4>
    </v-layout>
    <v-layout wrap>
      <v-flex
        v-for="dev in devlist"
        v-if="isRoomSel(dev.room)"
        :key="dev.id"
        sm6
        xs12
        md6
        lg4
      >
        <material-stats-card
          :color="getIconColorItem(dev.type).color"
          :icon="getIconColorItem(dev.type).icon"
          :title="dev.room"
          :value="dev.name"
          sub-icon="mdi-circle"
          :sub-icon-color="dev.online ? 'yellow' : ''"
          :sub-text="dev.online ? devMsg(dev) : '未在线'"
        >
          <v-btn flat 
            icon 
            v-if="isDevHaveSwitch(dev.keylist)"
            @click="changeKeyValue({dev: dev, keyname: 'isOpen', value: !isDevOpen(dev.keylist)})"
          >
              <v-icon :color="isDevOpen(dev.keylist) ? 'blue' : ''" style="margin-top:2px">mdi-power</v-icon>
          </v-btn>
          <v-btn flat 
            icon
            @click="onclickDetail(dev)"
          >
              <v-icon style="margin-top:2px">mdi-menu</v-icon>
          </v-btn>
        </material-stats-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import keyMethods from '@/utils/key-method'
import KEY from '@/utils/key-enum'
import {devIconColorList} from '@/utils/dev'
import { mapState, mapMutations, mapActions } from 'vuex'
import WEB from '@/utils/web-enum'
import webMethod from '@/utils/web-method'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(['devlist', 'selroom']),

  },
  methods: {
    ...mapMutations('websocket', ['sendToServer']),
    ...mapActions('websocket', ['changeKeyValue']),
    devMsg (dev) { //dev中的信息显示
      let msg = '', keylist = dev.keylist;
      for (let i = 0, len = keylist.length; i < len; i++) {
        if (keylist[i].name === 'isOpen') {
          msg += this.$t(keyMethods.getKeyValue(keylist[i])) + ' ';
        }
        if (keylist[i].mode == KEY.mode.readwrite)  continue;
        msg += keylist[i].name + keyMethods.getKeyValue(keylist[i]) + keylist[i].unit + ' ';
      }
      return msg;
    },
    isRoomSel (room) {
      return this.selroom == 'all' ? true : (room == this.selroom);
      //return true;
    },
    getIconColorItem (type) {
      return devIconColorList.find(item => item.type == type);
    },
    isDevOpen: keyMethods.isDevOpen,
    isDevHaveSwitch: keyMethods.isDevHaveSwitch,
    onclickDetail(dev) {
      this.$router.push({path: '/dev-detail', query: {devId: dev.id}});
    }
  }
}
</script>
