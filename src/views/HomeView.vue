<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Official (and unofficial!) 14ers",
      // image: require(`@/assets/images/Rocky-Mountains.jpg`)
    };
  },
  created: function () { },
  methods: {},
};

</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <!-- <a href="/peaks" class="image"><img v-bind:src="require('.assets/Rocky-Mountains.jpg')" /></a> -->


  <div id="app">
    <img src="/src/assets/images/rockyMountains.png" />
  </div>
</template >

  <style>
body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  /* background-image: url('./assets/Rocky-Mountains.jpg') */
}
</style>