<template>
  <div class="scrollfield">
    <div class="limitbox">
      <p v-show="!commentList.length" class="defaultmessage"></p>
      <ul class="commentList">
        <li v-for="(commentList, index) in commentList" v-bind:key="index">
          <p class="username">{{ commentList.name }}:</p>
          <div class="commentbox">
            <p class="comments">{{ commentList.comment }}</p>
          </div>
        </li>
      </ul>
      <CommentForm @comment-posted="addComment" />
    </div>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      commentList: [],
    };
  },

  name: "Comments",

  methods: {
    addComment(commentContent) {
      // firestore に追加
      firebase
        .firestore()
        .collection("comments")
        .add(commentContent);

      this.commentList.push(commentContent);
    },
  },

  components: {
    CommentForm,
  },

  created() {
    firebase
      .firestore()
      .collection("comments")
      .onSnapshot(snapshot => {
        const docs = snapshot.docs;
        this.commentList = [];
        for (const doc of docs) {
          this.commentList.push(doc.data());
        }
      });
    // .get()
    // .then(collection => {
    //   this.commentList = collection.docs.map(doc => {
    //     return {
    //       name: doc.name,
    //       comment: doc.comment,
    //       ...doc.data(),
    //     };
    //   });
    // });
  },
};
</script>

<style lang="scss" scoped>
.pagetitle {
  border-bottom: 1px solid black;
  padding: 25px;
}

.commentstitle {
  border-bottom: 1px solid black;

  padding-top: 25px;
}

.namelabel {
  font-weight: bold;
}

.commentList {
  width: 100px;
  margin: auto;
  padding: auto;
}

.commentlabel {
  height: 25px;
  position: relative;
  top: -15px;
}

.defaultmessage {
  margin: auto;
  font-weight: bold;
  font-size: 20px;
}

.commentList {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.username {
  font-weight: bold;
  padding: 0px;
  margin: 0px;
}

.commentbox {
  background: rgb(100, 211, 211, 0.2);
  height: 40px;
  width: 300px;
  margin: 1px;
  padding: 1px;
  border-radius: 10px;
}

.comments {
  margin: 5px;
  padding: 5px;
}

.uploadform {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 50px;
}

.inputfile {
  margin: auto;
}

.uploadbutton {
  border-radius: 100px;
}

.content {
  margin-top: 20px;
  margin-bottom: 10px;
}

.scrollfield {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: auto;
}

.limitbox {
  max-height: 100px;
}
</style>
