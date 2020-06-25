<template>
  <v-app class="home" :style="backgroundStyle">
    <v-img
      alt="MA_Logo"
      class="homescreen"
      contain=""
      src="@/assets/home.jpg"
      width="10000"
    />

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
      <!-- <v-button class="musicianbutton">Musicians</v-button> :loading="loading"
        :disabled="loading"-->
      <v-btn
        class="listenerbutton"
        color="#00ced1"
        x-large
        text-color="white"
        router
        to="/aboutwebsitelistener"
        >LISTENER <v-icon dark class="mdi mdi-account-music"></v-icon
      ></v-btn>

      <v-btn
        class="artistbutton"
        color="#00ced1"
        x-large
        text-color="white"
        router
        to="/aboutwebsiteartist"
        >ARTIST<v-icon dark class="mdi mdi-account-music"></v-icon
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
      background: "#c61469",
      transition: "0.3s",
      opacity: "90%",
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
  top: -150px;
  z-index: 100;
}

.musicianbutton {
  margin: auto;
  color: white;
}
.listenerbutton {
  margin: 20px;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 100px;
  // opacity: 90%;
  position: relative;
  left: -20px;
  z-index: 100;
}

.artistbutton {
  margin: 20px;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 100px;
  // opacity: 90%;
  z-index: 100;
}
</style>
