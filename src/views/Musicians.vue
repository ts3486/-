<template>
  <div class="ma-5">
    <h1 class="musicians">Musicians</h1>

    <div class="scrollbackground">
      <div class="form-group">
        <div v-for="(image, index) in images" v-bind:key="index">
          <v-card class="postContainer">
            <!-- :class="[drawerprop ? drawerPulled : postContainer] -->
            <div class="post-container2">
              <h1 class="imageusername">
                <v-avatar class="grey lighten-2 avatar" size="40px">
                  <!-- <img src="@/assets/musicAccelerator_logomaker.png" /> -->
                  <v-img>
                    <v-img
                      :src="user.photoURL"
                      alt="profile-image"
                      class="center"
                      accept="image/*"
                    />
                  </v-img>
                </v-avatar>
                {{ user.name }}
              </h1>

              <video
                :src="image.url"
                alt=""
                width="700px"
                height="400px"
                class="video"
                controls
              />

              <LikeButton :imageID_toComments="image.id" />

              <Comments :imageID_toComments="image.id" />
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <v-container fluid class=" ma-1 pa-1">
      <v-layout row wrap justify-center>
        <input
          type="file"
          style="display: none"
          ref="currentFile"
          @change="onUpload"
        />
      </v-layout>
    </v-container>

    <v-container fluid class="ma-5 pa-1">
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-btn
            block
            class="uploadButton"
            color="primary
          "
            @click="onUpload"
            >Upload Your Content!</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import axios from "axios";
import firebase from "firebase";
import Comments from "@/components/Comments.vue";

import LikeButton from "@/components/LikeButton.vue";
import { db, storage } from "@/main";

export default {
  data: () => ({
    toolbar: true,
    selectedFile: null,
    images: [],
    defaultStyle: {
      background: "#fcfaf6",
    },

    drawer_pulledStyle: {
      background: "#00ced1",
    },
  }),

  props: ["drawerprop"],

  // computed: {
  //   user() {
  //     return this.$store.getters.user;
  //   },
  //   userName() {
  //     return this.user.name || this.user.displayName;
  //   },
  //   // userProfile() {
  //   //   return this.$store.getters.userProfile;
  //   // },
  // },

  methods: {
    // onFileSelect(event) {
    //   this.selectedFile = event.target.file[0];
    //   if (this.selectedFile.lastIndexOf(".") <= 0) {
    //     return alert("Please add a valid file");
    //   }

    onUpload(event) {
      this.$refs.currentFile.click();

      if (!event.target.files) {
        return;
      }

      let file = event.target.files[0];

      const storageRef = storage.ref();

      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + file.name;
      // const imageID = Math.random();
      const userName = firebase.auth().currentUser.displayName;
      const postUserId = firebase.auth().currentUser.uid;

      let fileRef = storageRef.child("music_videos/" + uniqueFileName);

      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())
        .then(url => {
          const image = {
            name: file.name,
            userName,
            url,
            createdAt,
            postUserId,
          };

          this.images.unshift({ name, userName, url, createdAt, postUserId });

          return db.collection("images").add(image); //add
        });
      //reset file input
      let defaultFile = this.$refs.currentFile;
      defaultFile.value = null;
    },
    // getName() {
    //   db.collection("images")
    //     .get()
    //     .then(collection => {
    //       this.userName = collection.docs.map(doc => {
    //         return {
    //           id: doc.id,
    //           ...doc.data(),
    //         };
    //       });
    //     });
    // },
    getImages() {
      db.collection("images")
        .get()
        .then(collection => {
          this.images = collection.docs.map(doc => {
            return {
              id: doc.id,
              // username: username.
              ...doc.data(),
            };
          });
        });
    },
    // getUsernames(){
    //   db.collection("users").
    // }
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
    // firebase
    //   .firestore()
    //   .collection("comments")
    //   .onSnapshot(snapshot => {
    //     const docs = snapshot.docs;
    //     this.commentList = [];
    //     for (const doc of docs) {
    //       this.commentList.push(doc.data());
    //     }
    //   });
    // requires rules version 2
    // firebase
    //   .storage()
    //   .ref("music_videos/")
    //   .listAll()
    //   .then(res => {
    //     // for files like images
    //     res.items.forEach(item => {
    //       this.images.push(item.getDownloadURL);
    //     });
    //   });
  },

  mounted() {
    this.getImages();
  },

  components: {
    Comments,
    LikeButton,
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.video {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: auto;
  margin-top: 0px;
  padding: auto;
}

.musicians {
  font-family: "Lobster", cursive;
  font-size: 50px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
}

.scrollbackground {
  overflow: auto;
  height: 600px;
  width: auto;
}

.imageusername {
  display: flex;
  justify-content: center;
  position: relative;
  left: -230px;
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: monospace;
}

.postContainer {
  margin: 80px;
  color: #fcfafa;
}

.drawerPulled {
  margin: 80px;
  background: #00ced1;
}

.post-container2 {
  margin: auto;
  padding: 1px;
}

.uploadButton {
  position: relative;
  top: -50px;
}

.avatar {
  position: relative;
  top: -4px;
  left: -10px;
}
</style>
