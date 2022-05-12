<script>
import axios from "axios"

export default {
  data: function () {
    return {
      message: "Activities Offered at Colorado's Outdoor Recreation Areas",
      activities: [],
      currentActivity: {}
    };
  },
  created: function () {
    console.log("in activities...");
    this.activitiesIndex()
  },
  methods: {
    activitiesIndex: function () {
      axios.get(`http://localhost:3000/activities.json`).then(response => {
        console.log(response.data);
        this.activities = response.data
      })
    },
    showActivity: function (theActivity) {
      console.log(theActivity);
      console.log('showing Activity')
      this.currentActivity = theActivity;
      this.editActivityParams = theActivity;
      document.querySelector("#activity-details").showModal();
    },
  },
};
</script>

<template>
  <div class="home">
    <h1><u>{{ message }}</u></h1>
    <br>
    <h4>Here, you can explore Colorado's federally managed recreation areas by choosing an activity of your liking. Just
      click on an activity name and you can view all areas offering that activity!</h4>
    <div v-for="activity in activities" v-bind:key="activity.id">
      <!-- <img v-bind:src="recArea.photo"> -->
      <!-- <h2>
        activity: {{ activity.name }}


      </h2> -->

      <!-- <div v-for=" activity in recArea.activities">
        <p>Activities: {{ activity }}</p>
      </div> -->

      <li>
        <button v-on:click="showActivity(activity)">{{ activity.name }}</button>
        <br />
      </li>

      <dialog id="activity-details">
        <form method="dialog">
          <h1><u>Areas offering {{ currentActivity.name }}:</u></h1>
          <div v-for="recArea in currentActivity.rec_areas">
            <p>
              <b>Recreational Area: </b><a v-bind:href="`/rec_areas/${recArea.id}`">{{ recArea.name }}</a>
              <br>
              <b>Contact information:</b> <i>{{ recArea.email }}</i> <b>|</b> <i>{{ recArea.phone_number }} </i>
            </p>
            <hr>
          </div>


          <button>Close</button>
        </form>
      </dialog>

    </div>
  </div>
</template>

<style>
img {
  width: 800px;
  height: 800px
}
</style>
