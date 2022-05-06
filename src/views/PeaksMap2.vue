<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
// import * as turf from '@turf/turf'





export default {
  data: function () {
    return {
      message: "Welcome to the map of Colorado's 14ers!",
      peaks: [],
      recAreas: []
    };
  },
  mounted: function () {
    // this.peaksIndex();
    // this.recAreasIndex();
    this.makeMap();
  },
  methods: {
    peaksIndex: function () {
      console.log('indexing Peaks...');
      axios.get(`http://localhost:3000/peaks.json`).then(response => {
        console.log(response.data);
        this.peaks = response.data
      })
    },
    recAreasIndex: function () {
      axios.get(`http://localhost:3000/rec_areas.json`).then(response => {
        console.log('indexing rec areas...')
        console.log(response.data);
        this.recAreas = response.data
      })
    },
    makeMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', // style URL
        center: [-105.634722, 38.985833], // starting position [lng, lat]
        zoom: 6.5, // starting zoom
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

      axios.get(`http://localhost:3000/peaks.json`).then(response => {
        console.log(response.data);
        this.peaks = response.data;
        var description = "";
        this.peaks.forEach(peak => {
          console.log(this.peaks.count);
          description = `<strong>${peak.name}</strong><p> <a href="http://localhost:8080/peaks/${peak.id}"><img src=${peak.photo} class="img-fluid" target="_blank" title="Learn more about ${peak.name}" ></a> <p>Located in the ${peak.range} mountain range</p>
          <p>Elevation:${peak.elevation}</p>
          <p>Official 14er: ${peak.official_14er}</p>
          <p>The summit is ${peak.prominence} above the nearest peak.</p>`;
          const marker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }) //add popups
              .setHTML(
                description
              )
            )
            .addTo(map)
        }),
          this.recAreas.forEach(recArea => {
            console.log(this.recAreas.count);
            description = `<p> <a href="http://localhost:8080/rec_areas/${recArea.id}" <strong>${recArea.name}</strong></a> 
          </p>`
            const marker = new mapboxgl.Marker({
              color: "blue",
              rotation: 0,
            })
              .setLngLat([recArea.long, recArea.lat])
              .setPopup(new mapboxgl.Popup({ offset: 25 }) //add popups
                .setHTML(
                  description
                )
              )
              .addTo(map)
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
  <div class="home">
    <h1>{{ message }}</h1>
    <hr>
    <!-- {{ peaks }} -->
    <!-- <button v-on:click="makeMap()">Make Map</button> -->
    <div id='map' style='width: auto; height: 850px;'></div>

  </div>
</template>

<style>
/* .img {
  width: 50px
} */

.mapboxgl-popup {
  max-width: 400px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>