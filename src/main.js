import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import store from "./store";

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
// export const FirebaseAuth = firebase.auth();
// export const user = FirebaseAuth.getInstance().getCurrentUser();

// firebaseからログイン状態を取得
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");

// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import vuetify from "./plugins/vuetify";
// import firebase from "firebase";

// import "@fortawesome/fontawesome-free/css/all.css";
// import "@fortawesome/fontawesome-free/js/all.js";
// import store from "./store";

// Vue.config.productionTip = false;

// const firebaseConfig = {
//   apiKey: "AIzaSyCnx--XbW1BEWJf58zXC7Mo9mI0KZt6oqw",
//   authDomain: "musely-7f3f3.firebaseapp.com",
//   databaseURL: "https://musely-7f3f3.firebaseio.com",
//   projectId: "musely-7f3f3",
//   storageBucket: "musely-7f3f3.appspot.com",
//   messagingSenderId: "43013159235",
//   appId: "1:43013159235:web:1f463a5ad97afcda3d97f6",
//   measurementId: "G-M9TK8RNHTX",
// };

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const db = firebase.firestore();
// export const storage = firebase.storage();
// // export const FirebaseAuth = firebase.auth();
// // export const user = FirebaseAuth.getInstance().getCurrentUser();

// // firebaseからログイン状態を取得
// firebase.getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//       unsubscribe();
//       resolve(user);
//     }, reject);
//   });
// };

// new Vue({
//   router,
//   vuetify,
//   store,
//   render: h => h(App),
// }).$mount("#app");
