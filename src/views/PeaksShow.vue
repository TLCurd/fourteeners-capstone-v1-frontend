<script>
import axios from "axios"

export default {
  data: function () {
    return {
      peak: {},
      // name: this.peak.name,
      // message: `All about ${name} `,
    };
  },
  created: function () {
    console.log("in created...");
    this.showPeak()
  },
  methods: {
    showPeak: function () {
      console.log("showing peak...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/peaks/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.peak = response.data;
      });
    }
  },
};
</script>

<template>
  <div class="peaks-show">
    <h1>All about {{ peak.name }}</h1>
    <br>
    <img v-bind:src="peak.photo" class="img-fluid">
    <hr>
    <p>{{ peak.name }}</p>
    <p>Located in the {{ peak.range }} mountain range</p>
    <p>This trail tops out at {{ peak.elevation }}</p>
    <p>Official: {{ peak.official_14er }}</p>
    <p>The summit is {{ peak.prominence }} above the nearest peak.</p>
    <p>Typically, the majority of hikers use the {{ peak.route }} to reach the summit. In doing so, you can expect to
      hike a total of roughly {{ peak.distance }}, while gaining approximately {{ peak.elevation_gain }} over the
      course
      of the trail!</p>
    <p>The difficulty of the trail is rated as {{ peak.difficulty }}.</p>
    <p>The amount of traffic this trail receives in a given year can vary from {{ peak.traffic_low }}, to
      {{ peak.traffic_high }}.</p>
  </div>
</template>

    <style>
</style>
