<template>
  <div class="mypage" style="text-align: center;">
    <v-container>
      <!-- <h1 class="head">Profile</h1> -->
      <v-card width="500px" class="mx-auto mt-5 mb-5" raised rounded>
        <v-app-bar color="#c61469" dark>
          <v-toolbar-title class="mx-auto font-weight-bold"
            >My Profile</v-toolbar-title
          >
        </v-app-bar>
        <v-row align="center" justify="center">
          <v-col>
            <v-row>
              <v-col offset="1" cols="10" class="relative text-center mb-2">
                <v-avatar size="180">
                  <v-img
                    :src="user.photoURL"
                    alt="profile-image"
                    class="center"
                    accept="image/*"
                  />
                </v-avatar>
                <div>
                  <input
                    type="file"
                    id="imageInput"
                    hidden
                    @change="changeFile"
                  />
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2"
                        fab
                        small
                        absolute
                        right
                        color="white lighten-2"
                        @click="editImage"
                        v-on="on"
                        light
                      >
                        <v-icon dark>mdi-camera</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Profile Image</span>
                  </v-tooltip>
                </div>
              </v-col>
              <v-col offset="1" cols="10" class="background white--text">
                <v-row>
                  <v-col>
                    <div class="text-center mb-1 title font-weight-bold">
                      <v-icon class="mr-1" dark>mdi-account</v-icon
                      >{{ userName }}
                    </div>
                    <div
                      class="text-center mb-3"
                      style="opacity: 0.8; font-size: 14px;"
                    >
                      <v-icon class="mr-1" dark small>mdi-email</v-icon
                      >{{ user.email }}
                    </div>
                    <div class="text-center mb-3">
                      <v-icon class="mr-1">mdi-heart</v-icon>
                      <span class="mr-2">Liked: {{ totalLikes }}</span>
                      <span class="mr-1">卒業まで残り:</span>
                      <span class="mr-1">??</span>
                    </div>
                    <div class="text-center mb-5 pr-5 pl-5 font-weight-regular">
                      {{ user.description }}
                    </div>
                    <div class="text-center mb-2">
                      <v-btn @click="showDialog" class="px-5"
                        ><v-icon small>mdi-pencil</v-icon>Edit</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- profile編集dialog -->
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-container>
        <v-card>
          <v-card-title>
            Edit your profile
          </v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col cols="10">
                <v-text-field
                  type="text"
                  label="name"
                  v-model="inputName"
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  type="text"
                  value="user.description"
                  outlined
                  rows="3"
                  label="Describe yourself"
                  v-model="inputDescription"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text outlined @click="updateUserNameAndDescription"
              >Save</v-btn
            >
            <v-btn text outlined @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";

export default {
  name: "MyProfile",
  data: () => ({
    dialog: false,
    inputName: "",
    inputImage: null,
    name: "",
    email: "",
    inputDescription: "",
    totalLikes: 0,
    likesArray: [],
  }),

  watch: {
    totalLikes: function() {
      if (this.totalLikes >= 1000) {
        this.graduate();
      }
    },
  },

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
        let imagesRef = db.collection("images");
        imagesRef
          .where("postUserId", "==", this.user.uid)
          .get()
          .then(snapshot => {
            const docs = snapshot.docs;
            docs.forEach(doc => {
              doc.ref.update({ userName: this.inputName });
            }),
              this.$store
                .dispatch("updateUserProfile", {
                  name: this.inputName,
                  description: this.inputDescription,
                })
                .then(() => {
                  this.dialog = false;
                });
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
        let imagesRef = db.collection("images");
        imagesRef
          .where("postUserId", "==", this.user.uid)
          .get()
          .then(snapshot => {
            const docs = snapshot.docs;
            docs.forEach(function(doc) {
              doc.ref.update({ userName: this.inputName });
            }),
              this.$store
                .dispatch("updateUserProfile", {
                  name: this.inputName,
                  description: this.inputDescription,
                })
                .then(() => {
                  this.dialog = false;
                });
          });
      }
    },
    editImage() {
      const imageInput = document.getElementById("imageInput");
      imageInput.click();
    },

    // myFunc(total, num) {
    //   return total + num;
    // },

    //いいね数集計関数 (tao)
    getTotalLikes() {
      this.likesArray = [];

      db.collection("images").onSnapshot(snapshot => {
        //access the like collection of each image doc
        const docs = snapshot.docs;

        for (const doc of docs) {
          if (this.user.displayName === doc.get("username")) {
            // console.log(doc.get("username"));
            // console.log(doc.id);

            db.collection("images")
              .doc(doc.id)
              .collection("likes")
              .doc("likes.id")
              .get()
              .then(likenumber => {
                // this.likesArray.push(likenumber.data());
                this.totalLikes += likenumber.data().likecount;
              });
          }
        }
      });
    },

    graduate() {
      this.$router.push("/graduationpage");
    },
  },

  created() {
    this.getTotalLikes();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.head {
  font-family: "Lobster", cursive;
  font-size: 60px;
  color: white;
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
  opacity: 0.7;
  margin-bottom: 10px;
}
.profile {
  margin: 10px auto;
  width: 50%;
  color: white;
}
.background {
  // background-color: #db3768;
  background-color: rgba($color: #c61469, $alpha: 0.7);
  border-radius: 5px;
}
</style>
