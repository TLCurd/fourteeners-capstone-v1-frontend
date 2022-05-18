<script>
import axios from "axios"


export default {
  data: function () {
    return {
      user: {},
      // name: this.user.name,
      message: `Account Information`,
      editRecAreaReviewParams: {},
      errors: []
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
    },
    editRecAreaReview: function () {
      axios
        .patch(`rec_area_reviews/${this.$route.params.id}.json`, this.editRecAreaReviewParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push('/users/profile');
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
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
    <img v-bind:src="user.image" v-bind:key="user.id" class="img-fluid img-thumbnail rounded-circle">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <!-- <p>Password: {{ user.password }}</p> -->
    <hr>
    <p><b><u>Your 14er Reviews:</u></b>
    <div class="container-reviews">
      <div v-for="review in user.peak_reviews">
        <!-- {{ review.name }} -->
        <i>{{ review.peak_name }} {{ review.created }}(Date review was posted)</i>:
        {{ review.review }}<br>
        - - - - - - - - - - - - - - - -
        <br>
      </div>
    </div>
    </p>
    <p><b><u>Your Recreational Area Reviews:</u></b>
    <div class="container-reviews">
      <div v-for="review in user.rec_area_reviews">
        <!-- {{ review.name }} -->
        <i>{{ review.rec_area_name }} {{ review.created }}(Date review was posted)</i>:
        {{ review.review }}<br>
        <br>

        <!-- <div class="rec-area-reviews-edit">
          <form v-on:submit.prevent="editRecAreaReview()">
            <h4>Edit your rec area review:</h4>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div>
              <label>Review:</label>
              <input type="text" v-model="editRecAreaReviewParams.review" />
            </div>
            <input type="submit" value="Update your Review" />
          </form>

        </div> -->

        - - - - - - - - - - - - - - - -
        <br>

      </div>
    </div>
    </p>
  </div>
</template>

<style scoped>
.container-reviews {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  background-color: whitesmoke;
  height: 300px;
  padding: 10px;
  width: auto;
  margin-left: 20px;
  margin-right: 0px;
  justify-content: center;
}

.img-fluid {
  width: 300px
}
</style>