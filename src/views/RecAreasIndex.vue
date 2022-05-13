<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Colorado's Outdoor Recreation Areas",
      recAreas: [],
      searchTerm: ""
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
    filterRecAreas: function () {
      return this.recAreas.filter(recArea => {
        var lowerName = recArea.name.toLowerCase();
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        return lowerName.includes(lowerSearchTerm);
      })
    }
  },
};
</script>

<template>
  <div class="rec-areas">
    <h1>{{ message }}</h1>
    <div class="row">
      <p>Search: <input type="text" v-model="searchTerm"> </p>
      <div class="col-sm-4 " v-for="recArea in filterRecAreas()" v-bind:key="recArea.id">
        <div class="card">
          <img v-bind:src="recArea.photo" class="img-fluid" alt="...">
          <div class="card-body">
            <h4 class="card-title">{{ recArea.name }}</h4>
            <h5>
              Directions: {{ recArea.directions }}
            </h5>
          </div>
          <b>Activities: </b>
          <div v-for="activity in recArea.activities">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{ activity[0].toString() }}</li>
            </ul>
          </div>
          <div class="card-body">
            <a v-bind:href="`/rec_areas/${recArea.id}`" class="btn btn-outline-dark" role="button">More information</a>
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
img {
  width: 800px;
  height: 800px
}
</style>
