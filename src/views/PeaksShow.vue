<script>
import axios from "axios"
import mapboxgl from 'mapbox-gl'

export default {
  data: function () {
    return {
      peak: {},
      peak2: {}
      // name: this.peak.name,
      // message: `All about ${name} `,
    };
  },
  created: function () {
    console.log("in created...");
    this.showPeak();
    // this.makeMap()
  },
  mounted: function () {
    console.log("in mounted...");
    // this.makeMap()
  },
  methods: {
    showPeak: function () {
      console.log("showing peak...");
      console.log(this.$route.params.id);
      axios.get(`http://localhost:3000/peaks/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.peak = response.data;
      });
    },
    makeMap: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', // style URL
        center: [this.peak.long, this.peak.lat], // starting position [lng, lat]
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
      axios.get(`http://localhost:3000/peaks/${this.$route.params.id}.json`).then(response => {
        console.log(response.data);
        this.peak = response.data;
        var description = `${this.peak.name}<br>Elevation: ${this.peak.elevation}`;
        const marker = new mapboxgl.Marker({
          color: "red",
          rotation: 0,
        })
          .setLngLat([this.peak.long, this.peak.lat])
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
    <hr>
    <button v-on:click="makeMap()">See the peak on a map
    </button>
    <br>
    <a v-bind:href="`/peaks`" class="btn btn-outline-dark" role="button">Back to all 14ers</a>
    <div id='map' style='width: auto; height: 850px;'></div>

  </div>
</template>

    <style>
.mapboxgl-popup {
  max-width: 400px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>
