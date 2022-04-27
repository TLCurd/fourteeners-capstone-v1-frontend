<script>
import axios from "axios"

export default {
  data: function () {
    return {
      recArea: {},
      // name: this.recArea.name,
      // message: `All about ${name} `,
    };
  },
  created: function () {
    console.log("in created...");
    this.showRecArea()
  },
  methods: {
    showRecArea: function () {
      console.log("showing recArea...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/rec_areas/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.recArea = response.data;
      });
    }
  },
};
</script>

<template>
  <div class="rec-areas-show">
    <h1>{{ recArea.name }}</h1>
    <br>
    <!-- <img v-bind:src="recArea.photo"> -->
    <hr>
    <p><b>About {{ recArea.name }}:</b> {{ recArea.description }}</p>
    <p><b>Getting there:</b> {{ recArea.directions }}</p>
    <p>{{ recArea.official_14er }}</p>
    <p><b>Contact Information:</b>
      <i>Phone Number:</i> {{ recArea.phone_number }} <br>
      <i>Email:</i> {{ recArea.email }}

    </p>

  </div>
</template>

    <style>
</style>
