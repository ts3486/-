<template>
  <div class="graduationpage">

    <v-container class="container">
      <v-img
        alt="graduationimage"
        class="graduationimage"
        src="@/assets/graduation.jpg"
      />
    </v-container>

  </div>
</template>

<script>
export default {
  name: "GraduationPage",
};
</script>

<style lang="scss" scoped>
.graduationpage {
  overflow-y: hidden;
}

.container {
  position: relative;
  text-align: center;
}

.graduationimage {
  position: absolute;
  height: 500px;
  width: 800px;
  right: 160px;
}

.container {
  position: absolute;
}

.graduation {
  position: relative;
  right: -20px;
  bottom: -125px;
}

// .box {
//   position: relative;
//   background: rgb(222, 222, 222);
//   height: 150px;
//   width: 400px;
//   bottom: -220px;
//   right: -420px;
//   background-blend-mode: normal;
// }
</style>
