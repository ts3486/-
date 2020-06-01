<template>
  <div class="mypage">
    <h1 class="MyPage">Profile</h1>
    <h3>ログイン成功しました</h3>
  </div>
</template>

<script>
export default {
  name: "MyPage",
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Merriweather:wght@300&display=swap");

.MyPage {
  font-family: "Lobster", cursive;
  font-size: 60px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
}
</style>
