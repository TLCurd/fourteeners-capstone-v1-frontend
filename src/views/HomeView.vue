<script>
import axios from "axios"
import image from "/images/rockyMountains.png"
export default {
  data: function () {
    return {
      message: "Colorado's Official (and unofficial!) 14ers",
      image: image
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
  <a href="/peaks" class="image"><img v-bind:src="`${image}`" /></a>


  <!-- <div id="app">
    <img src="~/images/rockyMountains.png" />
  </div> -->
</template >

  <style>
/* body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  /* background-image: url('./assets/Rocky-Mountains.jpg') */
/* } */

*/ body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
}

img {
  width: 800px;
  height: 600px;
}
</style>