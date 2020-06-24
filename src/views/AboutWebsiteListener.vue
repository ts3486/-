<template>
  <div class="pagebox">
    <div class="title">
      <h2 class="text">「駆け出しアーティストのキャリアを加速させたい！」</h2>
    </div>

    <div class="container">
      <p>
        そんな思いで作られた音楽プラットフォームがミュージックアクセラレータ（MA）です。<br /><br />
        <b>数々のSNSが飽和状態にあるため、</b
        >才能があっても注目を得るのは難しい。ましてや今からスタートするのでは遅すぎるかもしれない。。。<br />
        MAはそんなアーティストの悩みを解決すべく、<b>アーティスト卒業システム</b>（十分に注目されたアーティストはプラットフォームを卒業するシステム）を導入し、本気でキャリアをスタートさせようとしている<b>アーティスト達がより注目を浴びられる環境</b>を提供しています。
        <br /><br />
        <b
          >リスナー
          としてまだ誰も知らない才能を発掘し、アーティスト達を世の中に送り出しましょう！</b
        >そしていつか、「あーこの人売れる前から知ってたんだよね〜」と古参ぶりましょう笑
      </p>
    </div>
    <container>
      <p></p>
    </container>

    <v-container class="homebuttons">
      <!-- <v-button class="musicianbutton">Musicians</v-button> :loading="loading"
        :disabled="loading"-->
      <v-btn
        class="loginbutton"
        color="#00ced1"
        x-large
        text-color="white"
        router
        to="/login"
        >LOGIN <v-icon dark class="mdi mdi-account-music"></v-icon
      ></v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutWebsiteListener",
};
</script>

<style lang="scss" scoped>
.pagebox {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 90px;
  margin-bottom: 30px;
}

.text {
  font-weight: bold;
  font-size: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  text-align: center;
  line-height: 50px;
  font-size: 17px;
}

.logo {
  margin: auto;
  position: relative;
  top: -60px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  transition: 0.3s;
}

.webtitle {
  margin: auto;
  font-family: "Lobster", cursive;
  color: white;
  font-size: 80px;
  position: relative;
  top: -180px;
}

.hometext {
  margin: auto;
  font-family: sans-serif;
  color: white;
  font-size: 30px;
  position: relative;
  top: -170px;
}

.homescreen {
  position: absolute;
}

.homebuttons {
  width: 300px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  float: left;
  position: relative;
  top: -30px;
}

.musicianbutton {
  margin: auto;
  color: white;
}
.loginbutton {
  margin: 30px;
  color: white;
  padding-top: 10px;
  padding-bottom: 300px;
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 5px;
  font-size: 30px;
  font-weight: 100px;
  opacity: 90%;
}
</style>
