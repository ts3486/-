import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCnx--XbW1BEWJf58zXC7Mo9mI0KZt6oqw",
  authDomain: "musely-7f3f3.firebaseapp.com",
  databaseURL: "https://musely-7f3f3.firebaseio.com",
  projectId: "musely-7f3f3",
  storageBucket: "musely-7f3f3.appspot.com",
  messagingSenderId: "43013159235",
  appId: "1:43013159235:web:1f463a5ad97afcda3d97f6",
  measurementId: "G-M9TK8RNHTX",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount("#app");
