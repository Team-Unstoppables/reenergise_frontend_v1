<template>
  <div class="flex flex-col lg:flex-row justify-center items-center gap-8 px-4">
      <div class="md:shadow-md bg-white h-[fit-content] md:px-4 py-4 w-full lg:w-2/6 mt-3 rounded-md flex flex-col gap-6">
        <div class="font-bold text-lg text-center text-primary-700">{{ $t("REenergise Rooftop Area Calculation") }}</div>
        <p class="text-sm text-gray-500 text-center">{{$t("Select your roof from the highlighted rooftops")}}</p>
        <div>
          <div>
            <label class="label">{{$t("Select roof number")}}</label>
            <select v-model="selectedRoof">
              <option disabled value="0" selected>{{$t("Please select one")}}</option>
              <option v-for="(item, index) in roof_number" :key="index" :value="item.index">{{item.label}}</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-4 items-center">
          <div class="w-full">
            <label class="label">AC temperature</label>
            <input type="number" class="text-input"
                   placeholder="Represents the operating temperature of the AC" v-model.number="acTemp" />
          </div>

          <div class="w-full">
            <label class="label">AC type</label>
            <select v-model="acType">
              <option disabled value="0" selected>Please select one</option>
              <option v-for="(item, index) in acTypes" :key="index" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-4 items-center">
          <div class="w-full">
            <label class="label">Model of AC (Watt)</label>
            <select v-model="acModel">
              <option disabled value="0" selected>Please select one</option>
              <option v-for="(item, index) in acModels" :key="index" :value="item">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="w-full">
            <label class="label">Cost / kwh ( in dollars)</label>
            <input type="number" class="text-input" placeholder="Cost per kWh unit electricity in dollars "
                   v-model.number="cost" />
          </div>
        </div>
        <div class="py-3 flex justify-center flex-col gap-8">
          <button @click="submit()" class="bg-primary-800 hover:bg-primary-700 text-white py-1 rounded-md">Submit</button>

          <p class="text-gray-400 font-semibold text-sm">Can't find your roof selected? you can <span @click="drawIt()" class="text-primary-600 hover(underline) cursor-pointer">draw</span> it</p>
        </div>
      </div>

      <div @load="getLocalisationImage()" class="w-full md:w-5/6 h-full">
        <div class="mt-3 w-full h-full">
          <div v-if="loading" class="w-full flex items-center justify-center h-full">
            <img class="w-40" src="~/assets/images/solar_animation.gif">
          </div>
          <div v-if="drawImage">

            <div class="output" id="output">
              <canvas  class="sm:h-[75vh] w-full bg-cover sm:bg-unset"></canvas>
              <div class="zoom"></div>
            </div>
          </div>
          <img v-else-if="image" class="sm:h-[75vh]  w-full rounded-md shadow-md" :src="image" alt="" />
        </div>
      </div>
    </div>
</template>

<script  >
import axios from "axios"
import config from "../config";
definePageMeta({
  layout: 'guest',
})
export default {
  data() {
    return {
      image: '',
      loading: false,
      latitude: null,
      longitude: null,
      coord: '',
      roof_number: [],
      drawImage: false,
      xpoints: [],
      ypoints: [],
      selected: null,
      selectedRoof: 0,
      cost: null,
      acTemp: null,
      acType: 0,
      acModel: 0,
      acModels: [0.5, 1, 1.5, 2, 3],
      acTypes: ['split', 'window'],
      retry : 0


    }
  },
  mounted() {
    this.getSegmentedImage()
  },
  methods: {
    async getSegmentedImage() {
      let self = this
      self.coord = this.$router.currentRoute.value.query.coord.replace(' ','');
      self.loading = true
      const url = `${config.app_api_base_url}/segment/${this.coord}`
      axios.get(url,{
        responseType: 'json',
        headers : { "Content-Type": "application/json" }
      })
          .then( (data) => {
            self.loading = false
            self.image = data.data?.segmented_url ? data.data.segmented_url : data.data
            self.roof_number = []

            const roof_number = data.data.roof_number

            for (let i = 1; i<=roof_number; i++){
              self.roof_number.push({
                selected: false,
                index: i,
                label: `Roof ${i}`
              })
            }

          })
          .catch(async function (error) {
            self.loading = false
            console.log(error);

          })
          .then(function () {
            self.loading = false
            // dans tous les cas
          });
    },
    submit: async function () {
      const long = this.coord.split(',')[1]
      const lat = this.coord.split(',')[0]
      const index = this.drawImage ? 0 : this.selectedRoof
      console.log("index ="+index);
      const parameters = `${lat}/${long}/${index}/${this.acTemp}/${this.acType}/${this.acModel}/${this.cost}`

      const result = `${config.app_api_base_url}/results/${parameters}`;


      if (this.drawImage) {
        const url = `${config.app_api_base_url}/canvas/${this.xpoints[0]}/${this.xpoints[1]}/${this.xpoints[2]}/${this.xpoints[3]}/${this.ypoints[0]}/${this.ypoints[1]}/${this.ypoints[2]}/${this.ypoints[3]}/${lat}/${long}`

        await axios.get(url, {
          responseType: 'json',
          headers: { "Content-Type": "application/json" }
        })
        .then((data) => {
          this.area = data.data?.area
        })
        .catch(function (error) {
          console.log(error);
        })
      }

      this.$router.push(`/result?parameters=${parameters}`)

    },
    drawIt: async function () {
      this.loading = false
      this.drawImage = true

      await new Promise((resolve) => setTimeout(resolve, 600))
      let canvas = document.querySelector("canvas");
      let context = canvas.getContext("2d");
      //let infoPoints = document.querySelector(".points-info");
      let picker = document.querySelector("input")
      //let zoomWindow = document.querySelector(".zoom")
      let clickPoints = [];
      this.xpoints = [];
      this.ypoints = [];
      let coord = this.coord.replace(' ','');

      canvas.addEventListener("touchmove", function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);

      canvas.addEventListener("click", evt => {
        if (clickPoints.length > 4) {
          this.xpoints = [];
          this.ypoints = [];
        }
        clickPoints.push([evt.offsetX, evt.offsetY])
        this.xpoints.push(evt.offsetX)
        this.ypoints.push(evt.offsetY)
        drawDot(evt.offsetX, evt.offsetY)
        //infoPoints.textContent = clickPoints.join(" : ")
        if (clickPoints.length >= 4) {
          drawPoly(clickPoints)
        }
      })

      picker.addEventListener("change", evt => {
        newImage(evt.target.value)
      })

      // draw polygon from a list of 4 points
      const drawPoly = points => {
        context.lineWidth = 2
        context.clearRect(0, 0, canvas.width, canvas.height)
        var split = points.splice(0, 4)
        context.beginPath()
        context.moveTo(split[0][0], split[0][1])
        for (let i of split.reverse())
          context.lineTo(i[0], i[1])

        context.stroke()
        context.rect(split.reverse()[0], split.reverse()[1], split.reverse()[2], split.reverse()[3]);
        context.fillStyle = "#0000ff4d"
        context.fill();

      }

      // draw a dot.
      const drawDot = (x, y) => {
        context.beginPath()
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fillStyle = "black"
        context.fill()
      }

      // resize the canvas for the image
      var biggest = 500;
      var axis;
      const resize = (x, y) => {
        // console.log("resize :" + x + "; y:" + y);
        // so that the biggest axis is always {biggest} px
        var ratio = x > y ? x / biggest : y / biggest
        axis = [x / ratio, y / ratio]
        //axis = [x , y ]
        //canvas.height = axis[0]
        //canvas.width = axis[1]

        const canvas_width = document.querySelector('#output').clientWidth
        const canvas_h = document.querySelector('#output').clientHeight
        canvas.height = canvas_h
        canvas.width = canvas_width

        console.log(canvas);
      }

      // load a new image
      var rawImg = new Image()
      const newImage = src => {
        rawImg.src = src
        rawImg.onload = () => {
          canvas.style.backgroundImage = "url(" + src + ")"
          //zoomWindow.style.backgroundImage = "url(" + src + ")"
          resize(rawImg.height, rawImg.width)
        };
      }
      console.log(coord);
      const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=18&size=800x400&maptype=satellite&scale=4&key=${config.googleMapKey}`
      newImage(imageUrl)

      // move the preview to the mouse
      canvas.addEventListener("mousemove", (evt) => {
        drawZoom(evt.clientX, evt.clientY)
      })

      const drawZoom = (x, y) => {
        //zoomWindow.style.backgroundPosition = x + "% " + y + "%"
        //zoomWindow.position ? zoomWindow.position.top = x + "px" : ''
      }

    }
  }
};
</script>


<style scoped>
.radioLabel {
  vertical-align: super;
}

.label {
  size: 20px;
  font-weight: 400;
}



.btn {
  background: #2c0735;
  color: white;
  text-align: center;
  font-size: 18px;
  border-radius: 10px;
  max-width: 180px;
}

.map_img {
  width: 100%;
}

input[type='radio'] {
  border: 1px solid rgb(8, 8, 8);
  padding: 0.5em;
  -webkit-appearance: none;
}

input[type='radio']:checked {
  background: url('~/assets/images/checkmark.png') no-repeat center center;
  background-size: 19px 19px;
}

input[type='radio']:focus {
  outline-color: transparent;
}
</style>
