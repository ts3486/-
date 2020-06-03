<template>
  <div class="ma-5">
    <h1 class="musicians">Musicians</h1>

    <div class="scrollbackground">
      <div class="form-group">
        <div v-for="(image, index) in images" v-bind:key="index">
          <h1 class="imageusername">{{ image.username }}</h1>
          <!-- <img
            :src="image.url"
            alt=""
            width="400px"
            height="500px"
            class="center"
            accept="image/*"
          />

          <Comments /> -->

          <video
            :src="image.url"
            alt=""
            width="400px"
            height="500px"
            class="center"
            controls
          />
          <Comments :imageID_toComments="image.id" />
        </div>
      </div>
    </div>

    <!-- <v-container fluid class="ma-3">
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-btn block class="primary">1</v-btn>
        </v-flex>
        <v-flex xs12 md8>
          <v-btn block class="primary">2</v-btn>
        </v-flex>
        <v-flex xs12 md8>
          <v-btn block class="primary">3</v-btn>
        </v-flex>
      </v-layout>
    </v-container> -->

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
          <v-btn block class="primary" @click="onUpload">Upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid class="ma-3">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
        eligendi et ipsa, id tempore voluptatem quia. Ex, vel commodi eaque quod
        dolores consequatur veritatis numquam in cumque eius! Est, pariatur.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
        dolor enim molestiae, placeat dolorem dolorum, magni iusto neque id odit
        animi soluta reiciendis cumque, ad fugiat quisquam. Eos, magni dolorem.
      </p>
    </v-container>

    <!-- <h1>Commnts</h1>
    <div v-for="(comment, index) in comments" v-bind:key="index">
      {{ comment.text }}
    </div>
    <input type="text" v-model="inputText" />
    <button v-on:click="sendStore">Post</button> -->
  </div>
</template>

<script>
// import axios from "axios";
import firebase from "firebase";
import Comments from "@/components/Comments.vue";
import { db, storage } from "@/main";
// import user from "@/views/MyPage.vue";

export default {
  data() {
    return {
      selectedFile: null,
      images: [],
    };
  },
  methods: {
    // onFileSelect(event) {
    //   this.selectedFile = event.target.file[0];
    //   if (this.selectedFile.lastIndexOf(".") <= 0) {
    //     return alert("Please add a valid file");
    //   }

    onUpload(event) {
      this.$refs.currentFile.click();

      let file = event.target.files[0];

      const storageRef = storage.ref();

      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + file.name;
      // const imageID = Math.random();
      const username = firebase.auth().currentUser.displayName;

      let fileRef = storageRef.child("music_videos/" + uniqueFileName);

      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())
        .then(url => {
          const image = {
            name: file.name,
            username,
            url,
            createdAt,
          };

          this.images.unshift({ name, username, url, createdAt });

          return db.collection("images").add(image); //add
        });

      // let uploadTask = storageRef.put(file);

      //UploadTask Version
      // uploadTask.on(
      //   "state_changed",
      //   snapshot => {
      //     // Observe state change events such as progress, pause, and resume
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     var progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case firebase.storage.TaskState.PAUSED: // or 'paused'
      //         console.log("Upload is paused");
      //         break;
      //       case firebase.storage.TaskState.RUNNING: // or 'running'
      //         console.log("Upload is running");
      //         break;
      //     }
      //   },
      //   () => {
      //     // Handle unsuccessful uploads
      //   },
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
      //       this.images.push(downloadURL);
      //       console.log("File available at", downloadURL);
      //     });
      //   }
      // );

      //reset file input
      let defaultFile = this.$refs.currentFile;
      defaultFile.value = null;
    },

    // Comment Fucntion:
    // sendStore: function() {
    //   // firestore に追加
    //   firebase
    //     .firestore()
    //     .collection("tweets")
    //     .add({ text: this.inputText });
    //   this.inputText = "";
    // },

    getImages() {
      db.collection("images")
        // .orderBy("createdAt")
        .limit(5)
        .get()
        .then(collection => {
          this.images = collection.docs.map(doc => {
            return {
              id: doc.id,
              // username: username.
              ...doc.data(),
            };
          });
          // 上は下のコードと同じ意味
          // map については Array.prototype.map で調べてみてください
          //
          // const images = [];
          // for (const doc of collection.docs) {
          //   images.push({
          //     id: doc.id,
          //     ...doc.data()
          //   });
          // }
          // this.images = images;
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
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.center {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: auto;
  margin-top: 0px;
  padding: auto;
}

.musicians {
  font-family: "Lobster", cursive;
  font-size: 60px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}

.scrollbackground {
  overflow: auto;
  height: 600px;
  width: auto;
}

.imageusername {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
