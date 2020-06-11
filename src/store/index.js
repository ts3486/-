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
            description: user.description,
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
