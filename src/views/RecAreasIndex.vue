<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Outdoor Recreation Areas",
      recAreas: []
    };
  },
  created: function () {
    console.log("in recAreas...");
    this.recAreasIndex()
  },
  methods: {
    recAreasIndex: function () {
      axios.get(`http://localhost:3000/rec_areas.json`).then(response => {
        console.log(response.data);
        this.recAreas = response.data
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="recArea in recAreas" v-bind:key="recArea.id">
      <!-- <img v-bind:src="recArea.photo"> -->
      <h2>
        Recreational Area: {{ recArea.name }}
        <br>

      </h2>
      <p>About: {{ recArea.description }}</p>
      <br>
      <router-link v-bind:to="`/rec_areas/${recArea.id}`">Find out more about {{ recArea.name }}</router-link>
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
