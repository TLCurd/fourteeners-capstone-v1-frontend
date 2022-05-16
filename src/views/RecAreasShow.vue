<script>
import axios from "axios"
import mapboxgl from 'mapbox-gl'

export default {
  data: function () {
    return {
      recArea: {},
    };
  },
  created: function () {
    console.log("in created...");
    this.showRecArea();
    // this.makeMap()
  },
  mounted: function () {
    console.log("in mounted...");
    // this.makeMap()
  },
  methods: {
    showRecArea: function () {
      console.log("showing recArea...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/rec_areas/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.recArea = response.data;
      });
    },
    makeMap: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8', // style URL
        center: [this.recArea.long, this.recArea.lat], // starting position [lng, lat]
        zoom: 13, // starting zoom
        pitch: 70
      });
      map.on('load', () => {
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });
      });
      axios.get(`http://localhost:3000/rec_areas/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.recArea = response.data;
        var description = `${this.recArea.name}<br>Organization: ${this.recArea.organization}`;
        const marker = new mapboxgl.Marker({
          color: "blue",
          rotation: 0,
        })
          .setLngLat([this.recArea.long, this.recArea.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }) //add popups
            .setHTML(
              description
            )
          )
          .addTo(map)
      });
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
      });

      map.addControl(nav, 'bottom-right');
    }
  },
};
</script>

<template>
  <div class="rec-areas-show">
    <h1>{{ recArea.name }}</h1>

    <!-- <img v-bind:src="recArea.photo"> -->
    <hr>
    <p><b>About {{ recArea.name }}:</b> {{ recArea.description }}</p>
    <p> <b>Activities: </b>
    <div v-for=" activity in recArea.activities">
      <li><a v-bind:href="`/activities/${activity[1].toString()}`"
          alt="Click to view other areas offering this activity">{{ activity[0].toString() }}</a> </li>
      <!-- <li><a v-bind:href="`/activities/${activity.id}`">{{ thing }}</a> </li> -->

    </div>
    </p>
    <p><b>Getting there:</b> {{ recArea.directions }}</p>
    <p><b>Contact Information:</b>
      <i>Phone Number:</i> {{ recArea.phone_number }} <br>
      <i>Email:</i> {{ recArea.email }}
      <hr>
    <h3><u>Reviews:</u></h3>
    <div v-for="review in recArea.reviews">
      <b>{{ review.user_name }}:
        {{ review.review }}</b>
      <br>
      <i>Review Date: </i> {{ review.date }}
      <br>
      - - - - - - - - - - - - - - -

    </div>
    <hr>
    <button v-on:click="makeMap()">See the area on a map
    </button>
    <br>
    <a v-bind:href="`/rec_areas`" class="btn btn-warning" role="button">Back to all Rec Areas</a>
    <a v-bind:href="`/rec_areas/${this.recArea.id}`" class="btn btn-danger" role="button">Close Map</a>
    <a v-bind:href="`/rec_areas/map`" class="btn btn-info" role="button">Map of all Rec Areas</a>
    <div id='map' style='width: auto; height: 850px;'>
    </div>

    </p>

  </div>
</template>

    <style>
</style>
