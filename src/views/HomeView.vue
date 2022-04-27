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
  <div class="home-view">
    <h1>{{ message }}</h1>
  </div>

  <body>
    <a href="/peaks"><img class="img" :src="`${image}`" alt="Rocky Mountains" /></a>
  </body>

  <!-- <div id="app">
    <img src="~/images/rockyMountains.png" />
  </div> -->
</template >

  <style>
body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  /* background-image: url('./assets/Rocky-Mountains.jpg') */
}

/* body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
}
/*  */
.img {
  height: 800px;
  width: 700px
}
</style>