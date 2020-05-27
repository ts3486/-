<template>
  <div>
    <div>
      <p v-show="!commentList.length" class="defaultmessage">
        There are no comments yet.
      </p>
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

export default {
  data() {
    return {
      commentList: [],
    };
  },

  name: "Comments",

  methods: {
    addComment(commentContent) {
      this.commentList.push(commentContent);
    },
  },

  components: {
    CommentForm,
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
  margin: 5px;
}

.username {
  font-weight: bold;
  padding-top: 20px;
}

.commentbox {
  background: rgb(100, 211, 211, 0.2);
  height: 100px;
  width: 500px;
  border-radius: 10px;
}

.comments {
  margin: 10px;
  padding: 15px;
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
</style>
