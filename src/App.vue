<template>
  <v-app class="page" :style="backgroundStyle">
    <v-app-bar app color="#dc1469" dark opacity="0.5" height="80px">
      <v-app-bar-nav-icon
        @click="(drawer = !drawer), background()"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/musicAccelerator_logomaker.png"
          transition="scale-transition"
          width="40"
        /> -->

        <h1 class="toolbartitle">
          Music Accelerator
        </h1>

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <div v-if="user">
        <v-btn color="#dc1469" @click="signOut">
          <span class="mr-2">LOGOUT</span>
          <v-icon class="mdi mdi-account-music"></v-icon>
          <v-icon>account-check</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <router-link to="/login">
          <v-btn color="#dc1469">
            <span class="mr-2">LOGIN</span>
            <v-icon class="mdi mdi-account-music"></v-icon>
            <v-icon>account-check</v-icon>
          </v-btn>
        </router-link>
      </div>
    </v-app-bar>

    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

    <v-navigation-drawer app v-model="drawer" color="#f8f8f5" class="navbar">
      <v-list color="#f8f8f5">
        <v-list-item
          class="text-xs-center, red--text"
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          :style="{
            'align-items': 'center',
          }"
        >
          <v-list-item-action>
            <v-icon class="black--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view :drawerprop="drawer"></router-view>
    </v-content>

    <v-footer color="#dc1469" dark padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.text"
          color="white"
          text
          rounded
          class="my-2"
          router
          :to="link.route"
        >
          {{ link.text }}
        </v-btn>
        <v-col
          color="#FF7450"
          class="lighten-2 py-4 text-center white--text"
          cols="12"
        >
          &#169; {{ new Date().getFullYear() }} chobihige
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  data: () => ({
    drawer: false,
    backgroundStyle: {
      background: "#f8f8f5",
      transition: "0.3s",
    },

    links: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-music-note-plus", text: "Musicians", route: "/musicians" },
      { icon: "mdi-magnify", text: "Search", route: "/search" },
      { icon: "mdi-account-box", text: "MyPage", route: "/mypage" },
      { icon: "mdi-help", text: "About", route: "/about" },
    ],
    user: null,
  }),
  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logout!");
          this.$router.push("/");
        });
    },

    background: function() {
      if (this.drawer === true) {
        this.backgroundStyle.background = "rgba(0,0,0,0.4)";
      } else {
        this.backgroundStyle.background = "#F8F8FF";
      }
    },
  },
  created() {
    // firebase auth ログイン状態を確認
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  transition: 0.3s;
}

.toolbartitle {
  font-family: "Lobster", cursive;
}
</style>
