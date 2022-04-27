<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Official (and unofficial!) 14ers",
      peaks: []
    };
  },
  created: function () {
    console.log("in peaks...");
    this.peaksIndex()
  },
  methods: {
    peaksIndex: function () {
      axios.get(`http://localhost:3000/peaks.json`).then(response => {
        console.log(response.data);
        this.peaks = response.data
      })
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="peak in peaks" v-bind:key="peak.id"><img v-bind:src="peak.photo" class="img-fluid">
      <h2>
        Trail Summit: {{ peak.name }}
        <br>
        Height: {{ peak.elevation }}
      </h2>
      <br>
      <router-link v-bind:to="`/peaks/${peak.id}`">Find out more about {{ peak.name }}</router-link>
    </div>
  </div>
</template>

<style>
/* img {
  width: 400px;
  height: 400px
} */
</style>