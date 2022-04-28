<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Outdoor Recreation Areas",
      activities: []
    };
  },
  created: function () {
    console.log("in activities...");
    this.activitiesIndex()
  },
  methods: {
    activitiesIndex: function () {
      axios.get(`http://localhost:3000/activities.json`).then(response => {
        console.log(response.data);
        this.activities = response.data
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="activity in activities" v-bind:key="activity.id">
      <!-- <img v-bind:src="recArea.photo"> -->
      <h2>
        Activity: {{ activity.name }}
        <br>

      </h2>
      <p>About: {{ activity.rec_areas }}</p>
      <!-- <div v-for=" activity in recArea.activities">
        <p>Activities: {{ activity }}</p>
      </div> -->
      <br>
      <router-link v-bind:to="`/activities/${activity.id}`">View a list of recreation areas where you can find {{
          activity.name
      }}.</router-link>
      <hr>
    </div>
  </div>
</template>

<style>
img {
  width: 800px;
  height: 800px
}
</style>
