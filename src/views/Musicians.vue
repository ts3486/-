<template>
  <div class="ma-5">
    <h1 class="musicians ma-5">Musicians</h1>
<<<<<<< HEAD

    <v-container fluid class="ma-3">
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-btn outline block class="primary">1</v-btn>
        </v-flex>
        <v-flex xs12 md8>
          <v-btn outline block class="primary">2</v-btn>
        </v-flex>
        <v-flex xs12 md8>
          <v-btn outline block class="primary">3</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid class=" ma-1 pa-1">
      <v-layout row wrap justify-center>
        <input type="file" @change="onFileSelect" />
      </v-layout>
    </v-container>

    <v-container fluid class="ma-5 pa-1">
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-btn outline block class="primary" @click="onUpload">Upload</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

=======
>>>>>>> origin/master
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileSelect(event) {
      this.selectedFile = event.target.file[0];
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      axios
        .post(
          "https://us-central1-musely-7f3f3.cloudfunctions.net/helloWorld",
          fd
        )
        .then(res => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
