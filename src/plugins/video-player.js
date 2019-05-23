import Vue from 'vue'
import VideoPlayer from 'vue-video-player'

VideoPlayer.config({
  youtube: true, // default false
  switcher: false, // default true
  hls: false // default true
})

Vue.use(VideoPlayer)
