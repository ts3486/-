<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      > -->
      <router-link to="/login">
        <v-btn>
          <span class="mr-2">LOGIN</span>
          <v-icon class="mdi mdi-account-music"></v-icon>
          <v-icon>account-check</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-navigation-drawer app v-model="drawer" class="indigo">
      <v-list class="indigo">
        <v-list-item
          class="text-xs-center"
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          :style="{
            'align-items': 'center',
          }"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    links: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-music-note-plus", text: "Musicians", route: "/musicians" },
      { icon: "mdi-magnify", text: "Search", route: "/search" },
      { icon: "mdi-account-box", text: "MyPage", route: "/mypage" },
      { icon: "mdi-help", text: "About", route: "/about" },
    ],
  }),
};
</script>
