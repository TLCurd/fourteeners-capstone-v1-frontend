<script>
import axios from "axios"
import mapboxgl from 'mapbox-gl'

export default {
  data: function () {
    return {
      peak: {},
      peak2: {},
      peakReviews: [],
      newPeakReviewParams: {}
      // name: this.peak.name,
      // message: `All about ${name} `,
    };
  },
  created: function () {
    console.log("in created...");
    this.showPeak()
  },

  mounted: function () {
    console.log("in mounted...");
    // this.showPeak();
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
          description = `<a href="http://localhost:8080/rec_areas/${recArea.id}" <strong>${recArea.name}</strong></a> `;
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
          description = `<a href="http://localhost:8080/rec_areas/${recArea.rec_area_id}" <strong>${recArea.rec_area_name}</strong></a> `;
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
    showRecAreasWithinThirtyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [this.peak.long, this.peak.lat],
        zoom: 9,
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
        this.peak.within_thirty_miles.forEach(recArea => {
          console.log(this.peak.within_thirty_miles.count);
          description = `<a href="http://localhost:8080/rec_areas/${recArea.rec_area_id}" <strong>${recArea.rec_area_name}</strong></a> `;
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
    showRecAreasWithinFortyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [this.peak.long, this.peak.lat],
        zoom: 8.5,
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
        this.peak.within_forty_miles.forEach(recArea => {
          console.log(this.peak.within_forty_miles.count);
          description = `<a href="http://localhost:8080/rec_areas/${recArea.rec_area_id}" <strong>${recArea.rec_area_name}</strong></a> `;
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
    showRecAreasWithinFiftyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [this.peak.long, this.peak.lat],
        zoom: 8,
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
        this.peak.within_fifty_miles.forEach(recArea => {
          console.log(this.peak.within_fifty_miles.count);
          description = `<a href="http://localhost:8080/rec_areas/${recArea.rec_area_id}" <strong>${recArea.rec_area_name}</strong></a> `;
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
    createPeakReview: function () {
      console.log("Creating peak review...");
      var newPeakReviewParams = {
        peak_id: this.peak.id,
        review: this.newPeakReviewParams.review,
      }
      axios.post('/peak_reviews.json', newPeakReviewParams).then(response => {
        console.log(response.data);
        this.peakReviews.push(response.data);
        this.newPeakReviewParams = {};
        // this.$router.push(`/peaks/${this.peak.id}`)
        window.location.reload()
      })
        .catch((error) => {
          console.log("peak reviews create error", error.response)
        });
    },
  },
};
</script>

<template>
  <div class="peaks-show">
    <h1><b><u>Colorado 14er #{{ peak.id }} {{ peak.name }}</u></b></h1>
    <br>
    <img v-bind:src="peak.photo" class="img-fluid">


    <hr>
    <p>{{ peak.name }} is a Colorado 14er, located in the {{ peak.range }} mountain range. </p>
    <p>Located in the {{ peak.range }} mountain range. Typically, the majority of hikers use the {{ peak.route }} to
      reach the summit. In doing so, you can expect to hike a total of roughly {{ peak.distance }}, while gaining
      approximately {{ peak.elevation_gain }} over the course of the trail!</p>
    <p>When you reach the end of the trail, you'll be standing on the summit of a mountain peak that is situated at {{
        peak.elevation
    }} altitude! Expect to be breathing very thin air once you're standing atop this amazing
      geographical feature. The views are sure to be stunning, with panoramic views in every direction for miles on end
      - as you'll be roughly {{ peak.prominence }} above the nearest basin.</p>
    <p>Is this an official Colorado 14er? {{ peak.official_14er }} (Y = yes; N = No)</p>
    <p></p>
    <p>The difficulty of the trail is rated as {{ peak.difficulty }}. Please choose trails that best suit your skillset!
    </p>
    <p>In terms of overall trail traffic, this trail receives, in a given year, hiker volume from {{ peak.traffic_low
    }}, to
      {{ peak.traffic_high }}.</p>
    <br>
    <hr>
    <b>
      <h3><u>Reviews:</u></h3>
      <br>
    </b>
    <div class="container-peak-reviews">
      <div v-for="review in peak.reviews">
        <b>{{ review.user_name }}:
          {{ review.review }}
          <br>
          <i>Review Date: </i> {{ review.date }}
        </b>
        <br>
        - - - - - - - - - - - - -
      </div>
    </div>
    <hr>
    <h4>Help the community out and add a review!</h4>
    <p>

    <div class="mb-3">
      <label for="peakReview" class="form-label">Enter your comments:</label>
      <textarea v-model="newPeakReviewParams.review" class="form-control" id="peakReview" rows="3"
        placeholder="Enter your text here..."></textarea>
    </div>

    </p>
    <button v-on:click="createPeakReview()">Add your review!</button>
    <hr>
    <button v-on:click="makeMap()">See the peak on a map
    </button>
    <br>
    <br>

    <b>Checkout Nearby Recreation Areas:</b><br>
    <div class="btn-group" role="group" aria-label="RecArea Distance Buttons">
      <a v-on:click="showRecAreasWithinTenMiles()" class="btn btn-primary" role="button">Within 10 Miles
      </a>
      <a v-on:click="showRecAreasWithinTwentyMiles()" class="btn btn-primary" role="button">Within 20 Miles
      </a>
      <a v-on:click="showRecAreasWithinThirtyMiles()" class="btn btn-primary" role="button">Within 30 Miles
      </a>
      <a v-on:click="showRecAreasWithinFortyMiles()" class="btn btn-primary" role="button">Within 40 Miles
      </a>
      <a v-on:click="showRecAreasWithinFiftyMiles()" class="btn btn-primary" role="button">Within 50 Miles
      </a>
    </div><br>
    <br>
    <div id='map' style='width: auto; height: 825px;'></div>
    <a v-bind:href="`/peaks`" class="btn btn-warning" role="button">Back to all 14ers</a>
    <a v-bind:href="`/peaks/${this.peak.id}`" class="btn btn-danger" role="button">Close Map</a>
    <a v-bind:href="`/peaks/map`" class="btn btn-info" role="button">Map of all 14ers</a>

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

.container-peak-reviews {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  background-color: whitesmoke;
  height: 300px;
  padding: 10px;
  width: auto;
  margin-left: 20px;
  margin-right: 0px;
  justify-content: center;
}
</style>
