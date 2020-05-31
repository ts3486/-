<template>
  <div class="mypage">
    <v-container>
      <h1 class="MyPage">Profile</h1>
      <v-row>
        <v-col cols="12" offset="5" class="my-5">
          <h4>ユーザー情報</h4>
        </v-col>

        <v-col cols="12" offset="5" class="mb-5">
          <div v-if="isLogin">
            <img
              :src="photoUrl"
              alt="profile-image"
              width="40px"
              height="50px"
              class="center"
              accept="image/*"
            />
            <h2 class="center">{{ loginUser.displayName }}</h2>
          </div>
        </v-col>

        <v-col cols="12" offset="5" class="mb-5">
          <!--削除ボタン-->
          <button @click="deleteUser" class="btn btn-primary mt-3">
            ユーザー削除
          </button>
        </v-col>
      </v-row>
      <v-text-field></v-text-field>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";

// ユーザー情報取得

export default {
  name: "MyPage",
  data: () => ({
    isLogin: false,
    user: null,
    displayName: "",
    photoUrl: "",
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLogin = true;
      this.loginUser = user;
    });
  },
  methods: {
    deleteUser: function() {
      // ユーザー削除
      firebase
        .auth()
        .currentUser.delete()
        .then(function(res) {
          console.log("currentUser.delete", res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.MyPage {
  font-family: "Lobster", cursive;
  font-size: 60px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}
</style>
