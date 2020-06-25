<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            type="email"
            prepend-icon="mdi-email"
            label="email"
            v-model="email"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="password"
            v-model="password"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-card-actions>
            <div>
              <v-btn class="info" style="margin-left: auto;" @click="userLogin"
                >Login</v-btn
              >
              <v-btn class="info" style="margin-left: 5px;" @click="googleLogin"
                >Google Login</v-btn
              >
              <router-link to="/signup">
                <v-btn class="info" style="margin-left: 30px;">Signup</v-btn>
              </router-link>
            </div>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      showPassword: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters",
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userProfile() {
      return this.$store.getters.userProfile;
    },
  },
  methods: {
    googleLogin: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/myprofile");
        })
        .catch(error => {
          alert("Error!", error.message);
        });
    },
    userLogin: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/mypage");
        })
        .catch(error => {
          alert("Error!", error.message);
        });
    },
  },
};
</script>
