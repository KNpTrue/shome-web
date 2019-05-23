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
        v-for="room in filterAllRoom()"
        :key="room.id"
        sm6
        xs12
        md6
        lg4
        style="padding-top: 0px; padding-bottom: 0px"
      >
        <material-card
          :color="color"
          style="margin-bottom:0px; padding-bottom:0px"
        >
          <div slot="header">
            <div
              style="flex: 1 1 100%; height: 45px; margin-top: -15px"
            >
              <span class="title font-weight-light mb-2" v-text="room.name"></span>
              <v-btn
                flat
                icon
                style="margin-bottom: 15px"
                @click="onClickModName(room)"
              >
                <v-icon size="16" >mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                dark
                icon
                flat
                style="float: right"
                @click="delRoom(room)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-menu
                style="float:right"
                bottom
                left
                content-class="dropdown-menu"
                offset-y
                transition="slide-y-transition">
                <v-btn
                  flat
                  icon
                  slot="activator"
                >
                  <v-icon size="24">mdi-plus</v-icon>
                </v-btn>
                <v-card>
                  <v-list dense>
                    <v-list-tile
                      v-for="dev in getNoSetterDev()"
                      :key="dev.id"
                      @click="addDev(room, dev.id)"
                      :disabled="dev.name === 'no devices'"
                    >
                      <v-list-tile-title
                        v-text="dev.name === 'no devices' ? $t(dev.name) : dev.name"
                      />
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
          <v-data-table
            :headers="headers"
            :items="getDevListByRoomId(room.id)"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="$t(header.text)"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>
                <v-icon>
                  {{ getIconColorItem(item.type).icon }}
                </v-icon>
              </td>
              <td>
                <v-btn
                  icon
                  flat
                  style="float: right; margin:0px"
                  @click.prevent="delDev(room, item.id)"
                >
                  <v-icon color="tertiary">mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:no-data>
              <H4 class="text-xs-center">{{ $t('no devices') }}</H4>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <dialog-setname
      :dialog="dialog"
      @toCloseDialog="dialog = false"
      @toModName="modName"
      :srcName="editRoom.name"
      :title="$t('modify name')"
    >
    </dialog-setname>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import webMethods from '@/utils/web-method'
import WEB from '@/utils/web-enum'
import { getIconColorItem } from '@/utils/dev'

export default {
  data () {
    return {
      dialog: false,
      editRoom: {},
      headers: [
        {
          sortable: false,
          text: 'dev',
          value: 'name'
        },
        {
          sortable: false,
          text: 'type',
          value: 'type'
        },
        {
          sortable: false,
          text: 'delete',
          value: 'delete',
          align: 'right'
        }
      ],
      items: []
    }
  },
  computed: {
    ...mapState(['roomlist', 'devlist', 'color'])
  },
  methods: {
    ...mapMutations('websocket', ['sendToServer']),
    onClickModName (room) {
      this.dialog = true
      this.editRoom = room
    },
    modName (name) {
      this.dialog = false
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: this.editRoom.id,
        who: 'name',
        what: name
      }))
    },
    getDevListByRoomId (id) {
      var array = []
      for (let i = 0, len = this.devlist.length; i < len; i++) {
        if (this.devlist[i].roomid === id) { array.push(this.devlist[i]) }
      }
      return array
    },
    addDev (room, devid) {
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: room.id,
        who: 'adddev',
        what: devid
      }))
    },
    delDev (room, devid) {
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: room.id,
        who: 'deldev',
        what: devid
      }))
    },
    delRoom (room) {
      this.sendToServer(webMethods.packageMsg(WEB.method.set, WEB.type.room, {
        id: room.id,
        who: 'del',
        what: 0
      }))
    },
    getNoSetterDev () {
      var array = []
      for (var i = 0, len = this.devlist.length; i < len; i++) {
        if (this.devlist[i].roomid === -1) {
          array.push(this.devlist[i])
        }
      }
      if (array.length === 0) array.push({ name: 'no devices' })
      return array
    },
    filterAllRoom () {
      return this.roomlist.filter(room => room.name !== 'all')
    },
    getIconColorItem: getIconColorItem
  }
}

</script>
