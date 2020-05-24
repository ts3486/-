import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBDoJMAXbTzIL3OCRNkYpTd-2232Nr99T4",
  authDomain: "first-firebase-ad660.firebaseapp.com",
  databaseURL: "https://first-firebase-ad660.firebaseio.com",
  projectId: "first-firebase-ad660",
  storageBucket: "first-firebase-ad660.appspot.com",
  messagingSenderId: "998901032404",
  appId: "1:998901032404:web:7563de48061f1bc550a241",
  measurementId: "G-P7Q35QKF5V",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount("#app");
