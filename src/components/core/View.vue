<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </div>
    <dialog-login></dialog-login>
    <core-footer></core-footer>
  </v-content>
</template>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>