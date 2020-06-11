<template>
  <div>
    <button class="likebutton" @click="addLike()">
      <v-icon class="mdi mdi-cards-heart"></v-icon>
      <span>{{ this.likes.likecount }}</span>
    </button>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "LikeButton",
  data() {
    return {
      likes: {
        likecount: 0,
      },
    };
  },

  props: ["imageID_toComments"],

  methods: {
    addLike() {
      this.likes.likecount += 1;

      db.collection("images")
        .doc(this.imageID_toComments)
        .collection("likes")
        .doc("likes.id")
        .set(this.likes);
    },

    getLikes() {
      db.collection("images")
        .doc(this.imageID_toComments)
        .collection("likes")
        .onSnapshot(snapshot => {
          const docs = snapshot.docs;
          // this.likes = [];
          for (const doc of docs) {
            this.likes = doc.data();
          }
        });
      // .doc("likes.id")
      // .get("likecount")
      // .then(likenumber => {
      //   (this.likes = []), (this.likes.likecount = likenumber);
      // });
    },
  },

  created() {
    this.getLikes();
  },
};
</script>

<style lang="scss" scoped>
.likebutton {
  display: flex;
  position: relative;
  justify-content: center;
  margin: auto;
  padding: auto;
  bottom: -20px;
}
</style>
