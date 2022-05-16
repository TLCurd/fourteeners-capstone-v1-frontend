<script>
import axios from "axios"


export default {
  data: function () {
    return {
      user: {},
      // name: this.user.name,
      message: `Account Information`,
    };
  },
  created: function () {
    console.log("in created...");
    this.showUser()
  },
  methods: {
    showUser: function () {
      console.log("showing user...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/users/profile.json`).then(response => {
        console.log(response.data);
        this.user = response.data;
      });
    }
  },
};
</script>

<template>
  <div class="users-show">
    <h1>Welcome to your account overview <b>{{ user.name }}</b></h1>
    <br>
    <br>

    <hr>
    <h4> <b>Information: </b></h4>
    <img v-bind:src="user.image" v-bind:key="user.id" class="img-fluid img-thumbnail">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Password: {{ user.password }}</p>
    <hr>
    <p><b><u>Your 14er Reviews:</u></b>
    <div v-for="review in user.peak_reviews">
      <!-- {{ review.name }} -->
      <i>{{ review.peak_name }} {{ review.created }}(Date review was posted)</i>:
      {{ review.review }}<br>
      - - - - - - - - - - - - - - - -
      <br>
    </div>
    </p>
    <p><b><u>Your Recreational Area Reviews:</u></b>
    <div v-for="review in user.rec_area_reviews">
      <!-- {{ review.name }} -->
      <i>{{ review.rec_area_name }} {{ review.created }}(Date review was posted)</i>:
      {{ review.review }}<br>
      - - - - - - - - - - - - - - - -
      <br>

    </div>
    </p>
  </div>
</template>

<style>
/* .img-fluid {
  width: 300px
} */
</style>