<template>
  <div class="scrollfield">
    <div class="limitbox">
      <p v-show="!commentList.length" class="defaultmessage"></p>
      <ul class="commentList">
        <li v-for="(commentList, index) in uniqueComments" v-bind:key="index">
          <p class="username">{{ commentList.name }}:</p>
          <div class="commentbox">
            <p class="comments">{{ commentList.comment }}</p>
          </div>
        </li>
      </ul>
      <CommentForm
        @comment-posted="addComment"
        :imageID_form="imageID_toComments"
      />
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
      uniqueComments: [],
      // relatedComments(
      //       this.imageID_toComments
      //     )
    };
  },

  props: ["imageID_toComments"],

  // props: [imageUniqueID],
  name: "Comments",

  methods: {
    addComment(commentContent) {
      // firestore に追加
      // firebase
      //   .firestore()
      //   .collection("comments")
      //   .add(commentContent);

      firebase
        .firestore()
        .collection("images")
        .doc(this.imageID_toComments)
        .collection("uniqueComments")
        .add(commentContent);

      this.commentList.push(commentContent);
      this.uniqueComments.push(commentContent);
      // this.commentList.push(name);
    },

    // relatedComments: function(id) {
    //   for (let i = 0; i < this.commentList.length; i++) {
    //     if (this.commentList[i]["imageID"] === id) {
    //       this.uniqueComments.push(this.commentList[i]);
    //     }
    //   }
    // },
  },

  components: {
    CommentForm,
  },

  created() {
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
    // this.relatedComments(this.imageID_toComments);
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
    firebase
      .firestore()
      .collection("images")
      .doc(this.imageID_toComments)
      .collection("uniqueComments")
      .onSnapshot(snapshot => {
        const docs = snapshot.docs;
        this.uniqueComments = [];
        for (const doc of docs) {
          this.uniqueComments.push(doc.data());
        }
      });
  },

  // computed: {
  //   relatedComments: function(id) {
  //     let array = [];
  //     for (let i = 0; i < this.commentList.length; i++) {
  //       if (this.commentList[i]["id"] === id) {
  //         array.push(this.commentList[i]);
  //       }
  //     }
  //     return array;
  //   },
  // },

  mounted() {},
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
