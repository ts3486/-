<template>
  <div class="mypage">
    <!-- <v-container>
      <h1 class="MyPage">Profile</h1>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div v-if="isLogin" style="text-align: center;">
            <v-avatar>
              <img
                :src="user.photoUrl"
                alt="profile-image"
                class="center"
                accept="image/*"
              />
            </v-avatar>
            <v-flex>{{ user.displayName }}</v-flex>
            <v-flex>{{ user.email }}</v-flex>
            <v-subheader>profile</v-subheader>
            <v-text-field></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "MyPage",
  data: () => ({
    isLogin: false,
    user: null,
    displayName: "",
    photoUrl: "",
    totalLikes: "",
  }),

  methods: {
    addUserData() {
      const userinfo = {
        name: this.user.displayName,

        totalLikes: firebase
          .firestore()
          .collection("images")
          .onSnapshot(snapshot => {
            //access the like collection of each image doc
            console.log(snapshot);
            const docs = snapshot.docs;
            this.totalLikes = 0;
            for (const doc of docs) {
              if (this.name === this.user.displayName) {
                this.totalLikes = doc
                  .data()
                  .collection("likes")
                  .doc("likes.id")
                  .get();
              }
            }
          }),
      };

      console.log(userinfo);

      firebase
        .firestore()
        .collection("users")
        .add(userinfo);
    },
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.isLogin = true;
      this.user = user;

      this.addUserData();
    });
  },
  mounted() {},
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
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}
</style>
