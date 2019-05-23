<template>
  <v-layout
    wrap
  >
    <v-flex
      sm12
      xs12
      md12
      lg12
    >
      <v-list
        three-line
      >
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("language") }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t("select display language") }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-menu
              bottom
              left
              content-class="dropdown-menu"
              offset-y
              transition="slide-y-transition"
            >
              <v-btn
                slot="activator"
                flat
                style="font-size:16px; padding-top: 10px; padding-bottom: 10px; text-transform: unset"
              >
                {{ $t(selectlang) }}
                <v-icon color="tertiary">mdi-chevron-down</v-icon>
              </v-btn>
              <v-card>
                <v-list dense>
                  <v-list-tile
                    v-for="lang in langlist"
                    :key="lang"
                    @click="setLanguage(lang)"
                  >
                    <v-list-tile-title
                      v-text="$t(lang)"
                    />
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      langlist: ['zh', 'en'],
      selectlang: this.$i18n.locale
    }
  },
  methods: {
    setLanguage (lang) {
      if(window.localStorage) {
        localStorage.language = lang
      }
      this.$i18n.locale = lang
      this.selectlang = this.$i18n.locale
    }
  }
}
</script>
