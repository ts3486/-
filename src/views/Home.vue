<template>
  <v-app class="home" :style="backgroundStyle">
    <v-img
      alt="MA_Logo"
      class="logo"
      contain=""
      src="@/assets/musicAccelerator_logomaker.png"
      width="500"
    />

    <h1 class="webtitle">
      Music Accelerator
    </h1>

    <p class="hometext">
      Accelerate music careers...
    </p>

    <v-container class="homebuttons">
      <!-- <v-button class="musicianbutton">Musicians</v-button> -->
      <v-btn
        class="loginbutton"
        color="#00ced1"
        x-large=""
        text-color="white"
        router
        to="/login"
        >LOGIN <v-icon dark class="mdi mdi-account-music"></v-icon
      ></v-btn>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
    toolbar: false,
    backgroundStyle: {
      background: "#dc1469",
      transition: "0.3s",
    },
  }),
};
</script>

<style lang="scss" scoped>
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

.homebuttons {
  width: 300px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  float: left;
  position: relative;
  top: -150px;
}

.musicianbutton {
  margin: auto;
  color: white;
}
.loginbutton {
  margin: auto;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 5px;
  font-size: 30px;
  font-weight: 100px;
}
</style>
