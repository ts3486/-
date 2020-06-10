import Vue from "vue";
import firebase from "firebase";
import Vuex from "vuex";
import { db, createDocObject } from "@/firebase";
import "firebase/auth";

Vue.use(Vuex);

const state = {
  user: null,
  userProfile: null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile;
  },
  signOut(state) {
    state.user = null;
    state.userProfile = null;
  },
};

const actions = {
  // ログイン状態が変化するときに呼び出す
  setUserAndProfile({ commit }, { user, userProfile }) {
    commit("setUser", user);
    commit("setUserProfile", userProfile);
  },
  // ユーザーの情報を更新するときに呼び出す
  updateUserProfile({ state, commit }, userProfileDiff) {
    const userProfile = {
      ...state.userProfile,
      ...userProfileDiff,
    };
    if (state.user) {
      return db
        .collection("user_profiles")
        .doc(state.user.uid)
        .set(userProfile)
        .then(() => {
          commit("setUserProfile", userProfile);
        });
    }
  },
  // userSignOut: function({ commit }) {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       // alert("Logout!");
  //       commit("signOut");
  //       this.$router.push("/");
  //     });
  // },
  // createUser: function({ commit }, { email, password }) {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(
  //       email.toString().trim(),
  //       password.toString().trim()
  //     )
  //     .then(user => {
  //       user.updateProfile({
  //         displayName: this.displayName,
  //       });
  //       // alert(アカウント作成);
  //       commit("setUser", user);
  //       // dispatch("setUserAndProfile");
  //       this.$router.push("/login");
  //     })
  //     .catch(error => {
  //       alert("Error!", error.message);
  //     });
  // },
  // userSignIn: function({ dispatch }, { email, password }) {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       // alert("ログイン成功");
  //       // commit("setUser", user);
  //       dispatch("setUserAndProfile");
  //       this.$router.push("/mypage");
  //     })
  //     .catch(error => {
  //       alert("Error!", error.message);
  //     });
  // },
  // googleSignIn: function({ dispatch }) {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(() => {
  //       // alert("ログイン成功");
  //       dispatch("setUserAndProfile");
  //       this.$router.push("/mypage");
  //     })
  //     .catch(error => {
  //       alert("Error!", error.message);
  //     });
  // },
};

const getters = {
  user(state) {
    return {
      ...state.user,
      ...state.userProfile,
      // 例えば、state.user.photoURLをstate.userProfile.photoURLで上書きできる
    };
  },
  isSignedIn(state) {
    return !!state.user;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
export default store;

// userのログイン状態が変化したら、storeを更新
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const profileRef = db.collection("user_profiles").doc(user.uid);
    profileRef.get().then(doc => {
      const userProfile = doc.exists
        ? createDocObject(doc)
        : {
            id: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
          };
      store.dispatch("setUserAndProfile", {
        user,
        userProfile,
      });
      if (!doc.exists) {
        // 初めてのログインなので、userProfileをfirestoreに保存
        profileRef.set(userProfile);
      }
    });
  } else {
    store.dispatch("setUserandProfile", { user: null, userProfile: null });
  }
});
