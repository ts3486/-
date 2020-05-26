<template>
  <div class="ma-5">
    <h1 class="musicians">Musicians</h1>

    <div class="form-group">
      <div v-for="(image, index) in images" v-bind:key="index">
        <img :src="image" alt="" width="400px" height="500px" class="center" />

        <!-- <video
          :src="image"
          alt=""
          width="400px"
          height="500px"
          class="center"
        /> -->
      </div>
    </div>

    <v-container fluid class="ma-3">
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
    </v-container>

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

      <Comments />
    </v-container>

    <!-- <h1>Commnts</h1>
    <div v-for="(tweet, index) in tweets" v-bind:key="index">
      {{ tweet.text }}
    </div>
    <input type="text" v-model="inputText" />
    <button v-on:click="sendStore">Post</button> -->
  </div>
</template>

<script>
// import axios from "axios";
import firebase from "firebase";
import Comments from "@/components/Comments.vue";

export default {
  data() {
    return {
      selectedFile: null,
      inputText: "",
      tweets: [],
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

      let storageRef = firebase.storage().ref("music_videos/" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.images.push(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );

      //reset file input
      let defaultFile = this.$refs.currentFile;
      defaultFile.value = null;

      // this.$refs.fileInput.click();
      // const fd = new FormData();
      // fd.append("image", this.selectedFile, this.selectedFile.name);
      // axios
      //   .post(
      //     "https://us-central1-musely-7f3f3.cloudfunctions.net/helloWorld",
      //     fd
      //   )
      //   .then(res => {
      //     console.log(res);
      //   });
    },

    // Comment Fucntion:
    // sendStore: function() {s
    //   // firestore に追加
    //   firebase
    //     .firestore()
    //     .collection("tweets")
    //     .add({ text: this.inputText });
    //   this.inputText = "";
    // },
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
    firebase
      .firestore()
      .collection("tweets")
      .onSnapshot(snapshot => {
        const docs = snapshot.docs;
        this.tweets = [];
        for (const doc of docs) {
          this.tweets.push(doc.data());
        }
      });

    // firebase
    //   .storage()
    //   .ref("music_videos/")
    //   .then(snapshot => {
    //     snapshot.ref.getDownloadURL();
    //     console.log(snapshot);
    //   });
    // .then(downloadURL => {
    //   const imageFiles = downloadURL;
    //   this.images = [];
    //   console.log(imageFiles);
    //   for (const imageFile of imageFiles) {
    //     this.images.push(imageFile.data());
    //   }
    // });

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

  components: {
    Comments,
  },
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: auto;
  margin-top: 50px;
  padding: auto;
}

.musicians {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}
</style>
