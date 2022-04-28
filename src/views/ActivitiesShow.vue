<script>
import axios from "axios"
import RecAreaIndex from "../views/ActivitiesIndex.vue"

export default {
  data: function () {
    return {
      activity: {},
      // name: this.activity.name,
      // message: `All about ${name} `,
    };
  },
  created: function () {
    console.log("in created...");
    this.showActivity()
  },
  methods: {
    showActivity: function () {
      console.log("showing activity...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/activities/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.activity = response.data;
      });
    }
  },
};
</script>

<template>
  <div class="activities-show">
    <h1>So you're interested in {{ activity.name }}?</h1>
    <br>
    <h3> Well then have a look at all the recreation areas that you can find
      this activity!</h3>
    <br>
    <!-- <img v-bind:src="activity.photo" class="img-fluid"> -->
    <hr>
    <p> <b>Areas: </b>
    <div v-for=" rec_area in activity.rec_areas">
      <li><a v-bind:href="`/rec_areas/${rec_area[1].toString()}`">{{ rec_area[0].toString() }}</a> </li>


    </div>
    </p>

    <hr>
    <a v-bind:href="`/activities`" class="btn btn-outline-dark" role="button">Back to all activities</a>
  </div>
</template>

    <style>
</style>
