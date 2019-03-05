<template>
  <v-flex
    align-center
    layout
    py-2
  >
    <v-menu
      bottom
      left
      content-class="dropdown-menu"
      offset-y
      transition="slide-y-transition">
      <div
        v-ripple
        slot="activator"
        class="toolbar-items"
      >
          {{ transRoom(selroom) }}
          <v-icon color="tertiary">mdi-chevron-down</v-icon>
      </div>
      <v-card v-if="roomlist.length != 0">
        <v-list dense>
          <v-list-tile
            v-for="room in roomlist"
            :key="room.name"
            @click="onClickSelRoom(room.name)"
          >
            <v-list-tile-title
              v-text="transRoom(room.name)"
            />
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
    <router-link
      v-ripple
      class="toolbar-items"
      to="/room-edit"
      tag="div"
    >
      <span v-if="!textShow">{{ $t('room-edit') }}</span>
      <v-icon color="tertiary">mdi-pencil-box</v-icon>
    </router-link>
  </v-flex>
</template>

<script>
import {
  mapMutations,
  mapState,
} from 'vuex'

export default {
  props: {
    textShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['selroom', 'roomlist']),
  },
  methods: {
    ...mapMutations(['setSelRoom']),
    onClickSelRoom (room) { //选择房间
      this.setSelRoom(room);
    },
    transRoom(room) { //翻译房间名
      return room == 'all' ? this.$t(room) : room;
    },
  }
}
</script>

