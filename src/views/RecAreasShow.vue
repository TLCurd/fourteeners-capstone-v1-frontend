<script>
import axios from "axios"
import mapboxgl from 'mapbox-gl'

export default {
  data: function () {
    return {
      recArea: {},
      recAreaReviews: [],
      newRecAreaReviewParams: {}
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
    },
    showPeaksWithinTenMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [this.recArea.long, this.recArea.lat],
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
          .addTo(map);

        var description = "";
        this.recArea.within_ten_miles.forEach(peak => {
          console.log(this.recArea.within_ten_miles.count);
          description = `<strong>${peak.peak_name}</strong><a href="http://localhost:8080/peaks/${peak.peak_id}"><img src=${peak.peak_photo} class="img-fluid" target="_blank" title="Learn more about ${peak.peak_name}" > </a> <p>Located in the ${peak.peak_range} mountain range</p>
          <p>Elevation:${peak.peak_elevation}</p>
          <p>Official 14er: ${peak.peak_official_14er}</p>
          <p>The summit is ${peak.peak_prominence} above the nearest peak.</p>`;
          const peakMarker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
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
    showPeaksWithinTwentyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [this.recArea.long, this.recArea.lat],
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
          .addTo(map);

        var description = "";
        this.recArea.within_twenty_miles.forEach(peak => {
          console.log(this.recArea.within_twenty_miles.count);
          description = `<strong>${peak.peak_name}</strong><a href="http://localhost:8080/peaks/${peak.peak_id}"><img src=${peak.peak_photo} class="img-fluid" target="_blank" title="Learn more about ${peak.peak_name}" > </a> <p>Located in the ${peak.peak_range} mountain range</p>
          <p>Elevation:${peak.peak_elevation}</p>
          <p>Official 14er: ${peak.peak_official_14er}</p>
          <p>The summit is ${peak.peak_prominence} above the nearest peak.</p>`;
          const peakMarker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
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
    showPeaksWithinThirtyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [this.recArea.long, this.recArea.lat],
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
          .addTo(map);

        var description = "";
        this.recArea.within_thirty_miles.forEach(peak => {
          console.log(this.recArea.within_thirty_miles.count);
          description = `<strong>${peak.peak_name}</strong><a href="http://localhost:8080/peaks/${peak.peak_id}"><img src=${peak.peak_photo} class="img-fluid" target="_blank" title="Learn more about ${peak.peak_name}" > </a> <p>Located in the ${peak.peak_range} mountain range</p>
          <p>Elevation:${peak.peak_elevation}</p>
          <p>Official 14er: ${peak.peak_official_14er}</p>
          <p>The summit is ${peak.peak_prominence} above the nearest peak.</p>`;
          const peakMarker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
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
    showPeaksWithinFortyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [this.recArea.long, this.recArea.lat],
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
          .addTo(map);

        var description = "";
        this.recArea.within_forty_miles.forEach(peak => {
          console.log(this.recArea.within_forty_miles.count);
          description = `<strong>${peak.peak_name}</strong><a href="http://localhost:8080/peaks/${peak.peak_id}"><img src=${peak.peak_photo} class="img-fluid" target="_blank" title="Learn more about ${peak.peak_name}" > </a> <p>Located in the ${peak.peak_range} mountain range</p>
          <p>Elevation:${peak.peak_elevation}</p>
          <p>Official 14er: ${peak.peak_official_14er}</p>
          <p>The summit is ${peak.peak_prominence} above the nearest peak.</p>`;
          const peakMarker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
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
    showPeaksWithinFiftyMiles: function () {
      console.log('making map...');
      mapboxgl.accessToken = process.env.VUE_APP_MAP_KEY;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v8',
        center: [this.recArea.long, this.recArea.lat],
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
          .addTo(map);

        var description = "";
        this.recArea.within_fifty_miles.forEach(peak => {
          console.log(this.recArea.within_fifty_miles.count);
          description = `<strong>${peak.peak_name}</strong><a href="http://localhost:8080/peaks/${peak.peak_id}"><img src=${peak.peak_photo} class="img-fluid" target="_blank" title="Learn more about ${peak.peak_name}" > </a> <p>Located in the ${peak.peak_range} mountain range</p>
          <p>Elevation:${peak.peak_elevation}</p>
          <p>Official 14er: ${peak.peak_official_14er}</p>
          <p>The summit is ${peak.peak_prominence} above the nearest peak.</p>`;
          const peakMarker = new mapboxgl.Marker({
            color: "red",
            rotation: 0,
          })
            .setLngLat([peak.long, peak.lat])
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
    createRecAreaReview: function () {
      console.log("Creating rec area review...");
      var newRecAreaReviewParams = {
        rec_area_id: this.recArea.id,
        review: this.newRecAreaReviewParams.review,
      }
      axios.post('/rec_area_reviews.json', newRecAreaReviewParams).then(response => {
        console.log(response.data);
        this.recAreaReviews.push(response.data);
        this.newRecAreaReviewParams = {};
        // this.$router.push(`/peaks/${this.peak.id}`)
        // this.$router.push(`/rec_areas/${this.$route.params.id}`)
        window.location.reload()
      })
        .catch((error) => {
          console.log("rec area reviews create error", error.response)
        });
    },
  },
};
</script>

<template>
  <div class="rec-areas-show">
    <h1>{{ recArea.name }}</h1>

    <img v-bind:src="recArea.photo" class="img-fluid">
    <hr>

    <div class="card" style="width: auto;">
      <div class="card-body">
        <h4 class="card-title"><b>About {{ recArea.name }}</b></h4>

        <p class="card-text">{{ recArea.description }}</p>
        <p> <b>Activities: </b>
        <div v-for=" activity in recArea.activities">
          <li><a v-bind:href="`/activities/${activity[1].toString()}`"
              alt="Click to view other areas offering this activity">{{ activity[0].toString() }}</a> </li>


        </div>
        </p>
      </div>
    </div>

    <p></p>

    <p>
    <h4>Getting there:</h4> {{ recArea.directions }}</p>
    <p><b>Contact Information:</b>
      <i>Phone Number:</i> {{ recArea.phone_number }} <br>
      <i>Email:</i> {{ recArea.email }}
      <hr>
    <h3><u>Reviews:</u></h3>
    <div class="container-rec-area-reviews">
      <div v-for="review in recArea.reviews">
        <b>{{ review.user_name }}:
          {{ review.review }}</b>
        <br>
        <i>Review Date: </i> {{ review.date }}
        <br>
        - - - - - - - - - - - - - - -
      </div>
    </div>
    <hr>
    <h4>Help the community out and add a review!</h4>
    <p>

    <div class="mb-3">
      <label for="recAreaReview" class="form-label">Enter your comments:</label>
      <textarea v-model="newRecAreaReviewParams.review" class="form-control" id="recAreaReview" rows="3"
        placeholder="Enter your text here..."></textarea>
    </div>

    </p>
    <button v-on:click="createRecAreaReview()">Add your review!</button>
    <hr>
    <button v-on:click="makeMap()">See the area on a map
    </button>
    <br>
    <br>

    <b>Checkout Nearby 14ers:</b><br>
    <div class="btn-group" role="group" aria-label="Peak Distance Buttons">
      <a v-on:click="showPeaksWithinTenMiles()" class="btn btn-primary" role="button">Within 10 Miles
      </a>
      <a v-on:click="showPeaksWithinTwentyMiles()" class="btn btn-primary" role="button">Within 20 Miles
      </a>
      <a v-on:click="showPeaksWithinThirtyMiles()" class="btn btn-primary" role="button">Within 30 Miles
      </a>
      <a v-on:click="showPeaksWithinFortyMiles()" class="btn btn-primary" role="button">Within 40 Miles
      </a>
      <a v-on:click="showPeaksWithinFiftyMiles()" class="btn btn-primary" role="button">Within 50 Miles
      </a>
    </div><br>
    <br>
    <div id='map' style='width: auto; height: 800px;'>
    </div>

    <a v-bind:href="`/rec_areas`" class="btn btn-warning" role="button">Back to all Rec Areas</a>
    <a v-bind:href="`/rec_areas/${this.recArea.id}`" class="btn btn-danger" role="button">Close Map</a>
    <a v-bind:href="`/rec_areas/map`" class="btn btn-info" role="button">Map of all Rec Areas</a>

    </p>

  </div>
</template>

    <style scoped>
.container-rec-area-reviews {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  background-color: whitesmoke;
  height: 200px;
  padding: 10px;
  width: auto;
  margin-left: 20px;
  margin-right: 0px;
  justify-content: center;
}

.img-fluid {
  width: auto;
  height: 400px
}
</style>
