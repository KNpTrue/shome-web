<template>
  <v-toolbar
    id="core-toolbar"

    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-fade-transition mode="out-in">
          <v-menu
            v-if="responsiveRoomSelect"
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
        </v-fade-transition>
        <v-fade-transition mode="out-in">
          <div
            v-if="responsiveRoomSelect"
            v-ripple
            class="toolbar-items"
          >
            <span v-if="!responsive">{{ $t('room_edit') }}</span>
            <v-icon color="tertiary">mdi-pencil-box</v-icon>
          </div>
        </v-fade-transition>
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
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge" v-if="notifications.length != 0">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </div>
          <v-card v-if="notifications.length != 0">
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {
  mapMutations,
  mapState,
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      //通知
    ],
    title: null,
    responsive: false,
    responsiveRoomSelect: false
  }),
  computed: {
    ...mapState(['selroom', 'roomlist']),
  },
  watch: {
    $route(to) { //监听路由改变
      this.title = this.$t(to.name);
      this.responsiveRoomSelect = (to.name == 'home');
    }
  },
  mounted () {
    this.onResponsiveInverted();
    window.addEventListener('resize', this.onResponsiveInverted);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations(['setDrawer', 'toggleDrawer', 'setSelRoom']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.drawer);
    },
    onClickSelRoom (room) { //选择房间
      this.setSelRoom(room);
    },
    transRoom(room) { //翻译房间名
      return room == 'all' ? this.$t(room) : room;
    },
    onResponsiveInverted () { //响应式布局
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  }
};
</script>