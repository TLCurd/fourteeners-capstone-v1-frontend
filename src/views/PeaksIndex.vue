<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Official (and unofficial!) 14ers",
      peaks: [],
      searchTerm: ""
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
    filterPeaks: function () {
      return this.peaks.filter(peak => {
        var lowerName = peak.name.toLowerCase();
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        return lowerName.includes(lowerSearchTerm);
      })
    }
  },
};
</script>

<template>
  <div class="peaks-index">
    <h1>{{ message }}</h1>
    <div class="row">
      <p>Search: <input type="text" v-model="searchTerm"> </p>
      <div class="col-sm-4 " v-for="peak in filterPeaks()">
        <div class="card">
          <img v-bind:src="peak.photo" class="img-fluid" alt="...">
          <div class="card-body">
            <h4 class="card-title">{{ peak.name }}</h4>
            <h5>
              Elevation at summit: {{ peak.elevation }}
            </h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Difficulty: </b>{{ peak.difficulty }}</li>
            <li class="list-group-item"><b>Elevation at Summit</b>{{ peak.elevation }}</li>
            <li class="list-group-item"><b>Trail Length: </b>{{ peak.distance }}</li>
          </ul>
          <div class="card-body">
            <a v-bind:href="`/peaks/${peak.id}`" class="btn btn-outline-dark" role="button">More information</a>
          </div>
        </div>




        <!-- DIFFERENT ATTEMPTS FOR BUTTONS OUTSIDE OF BS CARD COMPONENT  -->
        <!-- <a class="btn btn-primary" href="#" role="button">Link</a> -->
        <!-- <a v-bind:href="`/peaks/${peak.id}`" class="btn btn-outline-dark" role="button">More information</a> -->
        <!-- <router-link v-bind:to="`/peaks/${peak.id}`">Find out more about {{ peak.name }}</router-link> -->
        <hr>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
</style>

<style scoped>
.img-fluid {
  width: auto;
  height: auto
}
</style>