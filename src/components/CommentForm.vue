<template>
  <div>
    <div class="commentformspace">
      <form class="comment-form" @submit.prevent="onPost">
        <div>
          <br /><label for="username" class="namelabel">Username:</label>
          <input id="name" v-model="username" required class="usernameinput" />
          <br /><label class="commentlabel" for="comment">Comment:</label>
          <textarea class="textarea" v-model="comment" required></textarea>
          <br />
          <p><input type="submit" value="Submit" class="button" /></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      comment: null,
    };
  },

  name: "CommentForm",

  methods: {
    onPost() {
      let commentContent = {
        name: this.username,
        comment: this.comment,
      };

      this.$emit("comment-posted", commentContent),
        (this.username = null),
        (this.comment = null);
    },
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

  padding-top: 10px;
}

.namelabel {
  font-weight: bold;
  padding-right: 5px;
}

.usernameinput {
  border: 1px solid black;
  width: 200px;
}

.commentList {
  margin: 10px;
  padding: 10px;
}

.textarea {
  border: 1px solid black;
  width: 200px;
  margin-top: 20px;
}

.commentlabel {
  font-weight: bold;
  height: auto;
  position: relative;
  top: -35px;
  padding-right: 8px;
}

.defaultmessage {
  margin: 20px;
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

.button {
  border: 1px solid black;
  display: flex;
  padding: auto;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 10px;
  margin-left: 120px;
  border-radius: 1px;
}

// .commentformspace {
//   display: flex;
//   justify-content: center;
//   padding-left: 290px;
// }
</style>
