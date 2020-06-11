<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h2>Signup</h2>
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
            prepend-icon="mdi-lock"
            label="password"
            v-model="password"
            :rules="passwordRules"
          ></v-text-field>
          <!-- username追加 -->
          <v-text-field
            prepend-icon="mdi-account"
            label="user name"
            v-model="displayName"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              class="info"
              style="margin-left: auto;"
              @click="createUserAccount"
              >Signup</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
// import { createUserAccount } from "@/firebase";

export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      displayName: "",
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
    createUserAccount: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(created => {
          created.user
            .updateProfile({
              displayName: this.displayName,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch(error => {
          alert("Error!", error.message);
        });
      // createUserAccount,
      // createUserAccount: function() {
      //   this.$store.dispatch("createUser", {
      //     name: this.displayName,
      //     email: this.email,
      //     password: this.password,
      //   });
      //   this.$store.dispatch("updateUserProfile", { name: this.displayName });
      // },
    },
  },
};
</script>
