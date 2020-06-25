<template>
  <div>
    <button class="likebutton" @click="addLike()">
      <v-icon class="mdi mdi-cards-heart"></v-icon>
      <span class="totallikes">{{ this.likes.likecount }}</span>
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

  watch: {
    likes: function(val) {
      if (val.likecount >= 10000) {
        this.graduate();
      }
    },
  },

  props: ["imageID_toComments"],

  methods: {
    addLike() {
      this.likes.likecount += 1;

      // if (this.likes.likecount === 0) {
      //   db.collection("images")
      //     .doc(this.imageID_toComments)
      //     .collection("likes")
      //     .add(this.likes);
      // } else {}
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
          // this.likes = {};
          for (const doc of docs) {
            this.likes = doc.data();
          }
        });
    },

    graduate() {
      this.$router.push("/graduationpage");
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
  left: -300px;
  margin: auto;
  padding: auto;
  bottom: -20px;
  z-index: 100;
  color: black;
}

.totallikes {
  z-index: 100;
  color: black;
}
</style>
