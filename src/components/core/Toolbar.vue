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
        <v-fab-transition mode="out-in">
          <v-btn
            v-if="responsive && isShowBackBtn(routeName)"
            class="default v-btn--simple"
            dark
            icon
            @click.stop="onClickBack"
            key="btn1"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            v-if="responsive && !isShowBackBtn(routeName)"
            class="default v-btn--simple"
            dark
            icon
            @click.stop="onClickDrawer"
            key="btn2"
          >
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </v-fab-transition>
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
          <toolbar-home v-if="routeName == 'home'" :textShow="responsive"></toolbar-home>
          <toolbar-room-edit v-if="routeName == 'room-edit'" :textShow="responsive"></toolbar-room-edit>
        </v-fade-transition>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      //通知
    ],
    title: null,
    responsive: false,
    routeName: ''
  }),
  watch: {
    $route(to) { //监听路由改变
      this.title = this.$t(to.name);
      this.routeName = to.name;
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
    ...mapMutations(['setDrawer', 'toggleDrawer']),
    onClickDrawer () {
      this.setDrawer(!this.$store.state.drawer);
    },
    onClickBack () {
      if (window.history.length <= 1) { //判断是否有上一条历史
        this.$router.push({path:'/'});
      } else {
        this.$router.go(-1);
      }
    },
    onResponsiveInverted () { //响应式布局
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    isShowBackBtn(routeName) {
        return ['room-edit', 'dev-detail'].find(item => item == routeName) != undefined
    }
  }
};
</script>