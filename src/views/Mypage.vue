<template>
  <div class="mypage">
    <v-container>
      <h1 class="head">Profile</h1>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div style="text-align: center;">
            <div class="profile-image">
              <img
                :src="user.photoURL"
                alt="profile-image"
                class="center"
                accept="image/*"
                width="150"
                height="150"
              />
            </div>
            <div class="display-name">
              {{ userName }}
            </div>
            <div class="email">
              <v-flex>{{ user.email }}</v-flex>
            </div>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="mr-2">100</span>
            <span class="mr-1">卒業まで残り:</span>
            <span class="mr-1">??</span>
            <div class="profile">
              <!-- <v-subheader>profile</v-subheader> -->
              <v-text-field multi-line label="profile"></v-text-field>
            </div>
            <v-btn @click="showDialog">edit</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- profile編集dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Profile
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="name" v-model="inputName"></v-text-field>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="updateUserName">save</v-btn>
          <v-btn text @click="closeDialog">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import firebase from "firebase";
// import Dialog from "./views/dialogs/MypageProfile.vue";

export default {
  name: "MyPage",
  data: () => ({
    // dialogs: {
    //   dialog: false,
    // },
    dialog: false,
    inputName: "",
    inputImage: null,
    name: "",
    email: "",
  }),
  // components: {
  //   appDialog: Dialog,
  // },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userName() {
      return this.user.name || this.user.displayName;
    },
    userProfile() {
      return this.$store.getters.userProfile;
    },
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    updateUserName() {
      if (this.inputName === "") {
        // 入力した値が空
        this.dialog = false;
      } else {
        this.$store
          .dispatch("updateUserProfile", {
            name: this.inputName,
          })
          .then(() => {
            this.dialog = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.head {
  font-family: "Lobster", cursive;
  font-size: 60px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}
.profile-image {
  margin: 15px auto;
}
.display-name {
  font-size: 1.3rem;
  font-weight: 500;
}
.email {
  font-size: 0.8rem;
  opacity: 0.5;
}
.profile {
  margin: 0 auto;
  margin-top: 15px;
  width: 50%;
}
</style>
