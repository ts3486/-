<template>
  <div>
    <p v-show="!commentList.length" class="defaultmessage">
      There are no comments yet.
    </p>
    <ul class="commentList">
      <li v-for="commentList in commentList" v-bind:key="item.id">
        <p class="username">{{ commentList.name }}:</p>
        <div class="commentbox">
          <p class="comments">{{ commentList.comment }}</p>
        </div>
      </li>
    </ul>
    <comment @comment-posted="addComment"></comment>
  </div>
</template>

<script>
export default {
  name: "Musicians",
  components: {},
  data() {
    return {
      commentList: [],
    };
  },
  methods: {
    addComment: function(commentContent) {
      this.commentList.push(commentContent);
    },
  },
};
</script>

<style lang="scss" scoped></style>
