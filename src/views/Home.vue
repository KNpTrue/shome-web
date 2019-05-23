<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout warp align-center justify-center class="text-xs-center" style="width:100%" v-if="filterNoSelRoomDev().length == 0">
      <h4 style="margin-top:200px">{{ $t('no devices') }}</h4>
    </v-layout>
    <v-layout wrap>
      <v-flex
        v-for="dev in filterNoSelRoomDev()"
        :key="dev.id"
        sm6
        xs12
        md6
        lg4
      >
        <material-stats-card
          :color="getIconColorItem(dev.type).color"
          :icon="getIconColorItem(dev.type).icon"
          :title="getRoomNameById(roomlist, dev.roomid, $t('no room set up'))"
          :value="dev.name"
          sub-icon="mdi-circle"
          :sub-icon-color="dev.online ? 'yellow' : ''"
          :sub-text="dev.online ? devMsg(dev) : $t('offline')"
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
            v-if="dev.online"
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
import { getIconColorItem } from '@/utils/dev'
import { mapState, mapMutations, mapActions } from 'vuex'
import common from '@/utils/common'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(['devlist', 'selroom', 'roomlist'])
  },
  methods: {
    ...mapMutations('websocket', ['sendToServer']),
    ...mapActions('websocket', ['changeKeyValue']),
    devMsg (dev) { // dev中的信息显示
      let msg = ''; let keylist = dev.keylist
      for (let i = 0, len = keylist.length; i < len; i++) {
        if (keylist[i].name === 'isOpen') {
          msg += this.$t(keyMethods.getKeyValue(keylist[i])) + ' '
        }
        if (keylist[i].mode === KEY.mode.readwrite) continue
        msg += keylist[i].name + keyMethods.getKeyValue(keylist[i]) + keylist[i].unit + ' '
      }
      return msg
    },
    isRoomSel (room) {
      return this.selroom === 'all' ? true : (room === undefined ? false : room.name === this.selroom)
    },
    onclickDetail (dev) {
      this.$router.push({ path: '/dev-detail', query: { devId: dev.id } })
    },
    filterNoSelRoomDev () {
      return this.devlist.filter(dev => this.isRoomSel(common.getItemById(this.roomlist, dev.roomid)))
    },
    isDevOpen: keyMethods.isDevOpen,
    isDevHaveSwitch: keyMethods.isDevHaveSwitch,
    getRoomNameById: common.getRoomNameById,
    getIconColorItem: getIconColorItem
  }
}
</script>
