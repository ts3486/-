<template>
  <div class="mypage">
    <v-container>
      <h1 class="head">Profile</h1>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div style="text-align: center;">
            <div class="profile-image">
              <v-avatar size="150" tile>
                <v-img
                  :src="user.photoURL"
                  alt="profile-image"
                  class="center"
                  accept="image/*"
                />
              </v-avatar>
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
              <v-textarea
                disabled
                auto-grow
                v-model="user.description"
              ></v-textarea>
            </div>
            <v-btn @click="showDialog">Edit</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- profile編集dialog -->
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-container>
          <v-card-title>
            Profile
          </v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col cols="10">
                <v-text-field label="name" v-model="inputName"></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-col>
                  <v-avatar size="150" tile>
                    <v-img
                      :src="user.photoURL"
                      alt="profile-image"
                      class="mx-auto"
                      accept="image/*"
                      v-model="inputImage"
                    />
                  </v-avatar>
                </v-col>
                <v-col>
                  <input type="file" @change="changeFile" value="Choose file" />
                  <!-- <v-btn @click="updateUserImage">Update</v-btn> -->
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  auto-grow
                  outlined
                  label="Describe yourself"
                  v-model="inputDescription"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" text @click="updateUserNameAndDescription"
              >Save</v-btn
            >
            <v-btn class="primary" text @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { storage } from "@/firebase";

export default {
  name: "MyPage",
  data: () => ({
    dialog: false,
    inputName: "",
    inputImage: null,
    name: "",
    email: "",
    inputDescription: "",
  }),
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
    updateUserNameAndDescription() {
      if (this.inputName === "" && this.inputDescription === "") {
        // 入力した値が空
        this.dialog = false;
      } else {
        this.$store
          .dispatch("updateUserProfile", {
            name: this.inputName,
            description: this.inputDescription,
          })
          .then(() => {
            this.dialog = false;
          });
      }
    },
    changeFile(e) {
      this.inputImage = e.target.files[0];
      if (!this.inputImage) {
        // 画像が選択されていない
      } else {
        // アップロード先を指定する
        // ファイル名がかぶらないように、 user.id を先頭につける
        const fileName = this.user.id + "_" + this.inputImage.name;
        const photoRef = storage.ref("/user_photos/" + fileName);
        photoRef
          .put(this.inputImage)
          .then(() => photoRef.getDownloadURL())
          .then(photoURL => {
            this.$store.dispatch("updateUserProfile", { photoURL });
          });
      }
    },
    updateUserImage() {
      // if (!this.inputImage) {
      //   // 画像が選択されていない
      // } else {
      //   // アップロード先を指定する
      //   // ファイル名がかぶらないように、 user.id を先頭につける
      //   const fileName = this.user.id + "_" + this.inputImage.name;
      //   const photoRef = storage.ref("/user_photos/" + fileName);
      //   photoRef
      //     .put(this.inputImage)
      //     .then(() => photoRef.getDownloadURL())
      //     .then(photoURL => {
      //       this.$store.dispatch("updateUserProfile", { photoURL });
      //     });
      // }
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
  margin: 10px auto;
}
.display-name {
  font-size: 1.3rem;
  font-weight: 500;
}
.email {
  font-size: 0.8rem;
  opacity: 0.5;
  margin-bottom: 10px;
}
.profile {
  margin: 10px auto;
  width: 50%;
  color: black;
}
</style>
