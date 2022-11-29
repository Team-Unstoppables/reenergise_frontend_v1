<template>
  <div class="flex flex-col lg:flex-row items-center gap-8 justify-center py-12 px-3">
    <div class="shadow-md w-full lg:w-1/3 bg-white px-6 py-12 flex flex-col gap-8 rounded-md">
      <div class="mb-8 md:mb-4 text-lg lg:text-xl m-auto font-bold text-center">
        Energy Rooftop Area Calculation
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <label class="label" for="">Enter coordinates of your location (latitude, longitude) </label>
          <div class="relative">
            <input
                class="text-input px-2"
                type="text"
                placeholder="Eg: xx.xxxx, xx.xxxxx"
                v-model="coords"
            />

            <i @click="located()" title="get current location" class="absolute right-12 top-2 cursor-pointer hover:text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
            </i>
            <i @click="find()" title="find location" class="absolute right-4 top-2 cursor-pointer hover:text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
            </i>
          </div>
        </div>

        <!--            <div class="mb-8">-->
        <!--              <label class="label" for="">Current rooftop color</label>-->
        <!--              <input-->
        <!--                type="text"-->
        <!--                class="text-input mt-2 px-2"-->
        <!--                placeholder="Black default"-->
        <!--              />-->
        <!--            </div>-->
      </div>

      <div class="flex items-center gap-3">
        <input id="shareDate" type="checkbox" name="shareDate"/>
        <label for="shareDate" class="text-xs text-gray-400">Yes, I want to be conatacted by REenergise painting
          partners.</label>
      </div>
      <div class=" flex justify-center">
        <button @click="submit()" class="py-1 text-white bg-primary hover:bg-primary-700 rounded-md w-full">
          Submit
        </button>
      </div>
    </div>

    <div class="w-full lg:w-3/5 h-full">
      <div v-if="loading" class="w-full flex items-center justify-center h-full">
        <img class="w-40" src="~/assets/images/solar_animation.gif">
      </div>
      <div v-else-if="!image" class="w-full flex items-center justify-center h-full">
        <p>Please submit your location to calculate savings</p>
      </div>
      <div v-else>
        <p v-if="isLoadingLocation">Loading.. please wait</p>
        <img v-show="!isLoadingLocation" class="rounded-md shadow-md" @load="locationLoaded" @loadstart="locationLoadStart" @progress="loadingProgress($event)" :src="image" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import VueGoogleAutocomplete from "vue-google-autocomplete";
import config from "../config";

definePageMeta({
  layout: 'guest',
})
export default {
  data() {
    return {
      isLoadingLocation: false,
      image: '',
      loading: false,
      latitude: null,
      longitude: null,
      coords: '',
    }
  },
  methods: {
    //12.5858331, -7.9302106
    //41.3385528,28.6836353
    setPlace() {
    },
    submit() {
      //this.getLocalisationImage(`https://reenergise-ai.azurewebsites.net/segment/${this.coords}`)
      this.$router.push(`/select_roof?coord=${this.coords}`)

    },
    locationLoaded(){
      console.log("location loaded")
      this.isLoadingLocation = false
    },
    locationLoadStart(){
      this.isLoadingLocation = true
    },
    loadingProgress($event){
      var str, p;

      if ($event.lengthComputable) {   // does the progress know what's coming
        p = ($event.loaded / $event.total) * 100;   // get the percent loaded
        str = Math.floor(p) + "%";    // create the text
      } else {
        p = $event.loaded / 1024;   // show the kilobytes
        str = Math.floor(p) + "k"; // the text
        p = ((p / 50) % 1) * 100;   // make the progress bar cycle around every 50K
      }

      console.log(p)
    },
    async getLocalisationImage(url) {
      this.loading = true
      axios.get(url, {
        responseType: 'json',
        headers: {"Content-Type": "application/json"}
      })
          .then((data) => {
            console.log(data);
            this.loading = false
            this.image = data.data?.segmented_url ? data.data.segmented_url : data.data
            console.log(this.image)
          })
          .catch(function (error) {
            this.loading = false
            console.log(error);
          })
          .then(function () {
            this.loading = false
            // dans tous les cas
          });
    },
    located() {
      console.log('located')
      const success = (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.coords = `${this.longitude}, ${this.latitude}`
        this.image = `https://maps.googleapis.com/maps/api/staticmap?center=${this.coords}&zoom=18&size=800x400&maptype=satellite&scale=4&key=${config.googleMapKey}`
      };
      const error = (err) => {
        console.log(error)
      };
      if (process.client)
        navigator.geolocation.getCurrentPosition(success, error);
    },
    find() {
      this.image = `https://maps.googleapis.com/maps/api/staticmap?center=${this.coords}&zoom=18&size=800x400&maptype=satellite&scale=4&key=${config.googleMapKey}`
    }

  },
  created() {
    // this.located()
  }
}

</script>

<style scoped>
.text-input {
  background: rgba(187, 173, 255, 0.13);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 42px;
  width: 100%;
}

</style>


