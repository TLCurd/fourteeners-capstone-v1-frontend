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
        zoom: 15, // starting zoom
        pitch: 30
      });

      map.on('load', () => {
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 16
        });

        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });


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
          .setPopup(new mapboxgl.Popup({ offset: 25 })
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
    },
    showRecAreasWithinTenMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [this.peak.long, this.peak.lat],
        zoom: 11,
        pitch: 30
      });

      map.on('load', () => {
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 16
        });

        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });


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
        const peakMarker = new mapboxgl.Marker({
          color: "red",
          rotation: 0,
        })
          .setLngLat([this.peak.long, this.peak.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }) //add popups
            .setHTML(
              description
            )
          )
          .addTo(map);
        var description = "";
        this.peak.within_ten_miles.forEach(recArea => {
          console.log(this.peak.within_ten_miles.count);
          description = `<strong>${recArea.rec_area_name}</strong>`;
          const recAreaMarker = new mapboxgl.Marker({
            color: "blue",
            rotation: 0,
          })
            .setLngLat([recArea.long, recArea.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                description
              )
            )
            .addTo(map);
        })

      });
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
      });

      map.addControl(nav, 'bottom-right');
    },
    showRecAreasWithinTwentyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [this.peak.long, this.peak.lat],
        zoom: 10,
        pitch: 30
      });

      map.on('load', () => {
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 16
        });

        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });


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
        const peakMarker = new mapboxgl.Marker({
          color: "red",
          rotation: 0,
        })
          .setLngLat([this.peak.long, this.peak.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }) //add popups
            .setHTML(
              description
            )
          )
          .addTo(map);
        var description = "";
        this.peak.within_twenty_miles.forEach(recArea => {
          console.log(this.peak.within_twenty_miles.count);
          description = `<strong>${recArea.rec_area_name}</strong>`;
          const recAreaMarker = new mapboxgl.Marker({
            color: "blue",
            rotation: 0,
          })
            .setLngLat([recArea.long, recArea.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                description
              )
            )
            .addTo(map);
        })

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
    <h1>Colorado 14er #{{ peak.id }} {{ peak.name }}</h1>
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
    <br>
    <hr>
    <b>
      <h3><u>Reviews:</u></h3>
      <br>
    </b>
    <div v-for="review in peak.reviews">
      <b>{{ review.user_name }}:
        {{ review.review }}
        <br>
        <i>Review Date: </i> {{ review.date }}
      </b>
      <br>
      - - - - - - - - - - - - -
    </div>
    <hr>
    <button v-on:click="makeMap()">See the peak on a map
    </button>
    <br>

    <b>Checkout Nearby Recreation Areas:</b><br>
    <button v-on:click="showRecAreasWithinTenMiles()">Within 10 Miles
    </button> | <button v-on:click="showRecAreasWithinTwentyMiles()">Within 20 Miles
    </button> |<br>
    <br>
    <a v-bind:href="`/peaks`" class="btn btn-warning" role="button">Back to all 14ers</a>
    <a v-bind:href="`/peaks/${this.peak.id}`" class="btn btn-danger" role="button">Close Map</a>
    <a v-bind:href="`/peaks/map`" class="btn btn-info" role="button">Map of all 14ers</a>
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
