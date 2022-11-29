<template>
  <div class="flex flex-col items-center justify-center min-h-[75vh] md:mx-12 my-7">
    <h1 class="text-primary-700 text-2xl font-semibold text-center mt-4">Savings Calculation Results</h1>

    <div class="flex flex-col lg:flex-row px-4 justify-between w-full items-center py-2 gap-6">
      <label class="text-md lg:text-lg text-gray-500 whitespace-nowrap px-4">Choose your future RooTop color To view
        Savings</label>
      <select @change="onColorChange()" v-model="roofColor">
        <option disabled value="0" selected>Please select one</option>
        <option v-for="(item, index) in roofColors" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="bg-white rounded-md shadow-md items-center justify-center w-full px-6 py-4">
      <div class=" rounded-md  w-full">
        <div class="md:flex flex-row gap-6">

          <!--        left card-->
          <div class="flex flex-col gap-3 justify-between items-center">
            <div class="md:shadow-md rounded-md flex flex-col gap-4 w-full md:w-full md:px-4 py-12">

              <div class="md:flex justify-between items-center">
                <span>RoofTop Area</span>
                <div class="px-2 py-2 w-full lg:w-32 shadow-md">
                  <span>{{ topArea }} m²</span>
                </div>
              </div>

              <div class="md:flex justify-between items-center">
                <span>Current Cost</span>
                <div class="px-2 py-2 w-full lg:w-32 shadow-md">
                  <span>$ {{ currentCost }}</span>
                </div>
              </div>

              <div class="md:flex justify-between items-center">
                <span>Cost With White Roof</span>
                <div class="px-2 py-2w-full lg:w-32 shadow-md">
                  <span>$ {{ whiteRoofCost }}</span>
                </div>
              </div>

              <div class="md:flex justify-between items-center">
                <span>Monthly Savings</span>
                <div class="px-2 py-2 w-full lg:w-32 shadow-md">
                  <span>$ {{ monthlySaving }}</span>
                </div>
              </div>

              <div class="md:flex justify-between items-center">
                <span>Yearly Savings</span>
                <div class="px-2 py-2 w-full lg:w-32 shadow-md">
                  <span>$ {{ yearlySaving }}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-3">
              <div></div>
              <div class="flex gap-3">
                <button class="bg-primary-700 text-white px-4 py-1 whitespace-nowrap rounded-md opacity-50">
                  Share with painting Partners
                </button>
                <button class="bg-primary-700 text-white px-4 py-1 rounded-md">
                  Download
                </button>
              </div>
            </div>
          </div>

          <!--rigth side-->
          <div class="flex flex-col mt-8 gap-12">
            <div v-if="show" class="flex flex-col w-full lg:flex-row gap-5">
              <div class="flex flex-col gap-3 px-3 py-3 overflow-x-auto w-full shadow-md rounded-md">
                <h3 class="text-center text-gray-500">Energy Savings for Each Color [Hourly]</h3>
                <client-only>
                  <apexchart width="350" type="bar" :options="optionsHourlySavings" :series="hourlySeries"></apexchart>
                </client-only>
              </div>


              <div class="flex flex-col gap-3 px-3 py-3 shadow-md rounded-md w-full">
                <h3 class="text-center text-gray-500">Percentage Savings</h3>
                <client-only>
                  <apexchart width="365" type="donut" :options="optionsDonut" :series="seriesDonut"></apexchart>
                </client-only>
              </div>
            </div>

            <div v-if="show" class="flex flex-col w-full lg:flex-row gap-5">
              <div class="flex flex-col gap-3 px-3 py-3 overflow-x-scroll  w-full  shadow-md rounded-md">
                <h3 class="text-center text-gray-500">Energy Savings for Each Color [Monthly]</h3>
                <client-only>
                  <apexchart width="350" type="bar" :options="monthlyOptions" :series="monthlySeries"></apexchart>
                </client-only>
              </div>


              <div class="flex flex-col gap-3 px-3 py-3 overflow-x-auto  w-full  shadow-md rounded-md">
                <h3 class="text-center text-gray-500">Energy Savings for Each Color [Yearly]</h3>
                <client-only>
                  <apexchart width="350" type="bar" :options="yearlyOptions" :series="yearlySeries"></apexchart>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

definePageMeta({
  layout: 'guest',
})


export default {
  data() {
    return {
      topArea: 0,
      currentCost: 0,
      whiteRoofCost: 0,
      monthlySaving: 0,
      yearlySaving: 0,
      show: true,
      roofColors: ['black', 'brown', 'green', 'grey', 'red', 'white'],
      roofColor: 'white',
      optionsDonut: {
        labels: ['Percentage Savings', 'rest'],
        colors: ['#037c7c', 'gray'],
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%"
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      seriesDonut: [10, 90],
      loading: false,
      data: null,
      retry: 0,
      options: {
        grid: {
          show: false,
        },
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['black', 'brown', 'green', 'grey', 'red', 'white']
        },
        fill: {
          colors: ['#037c7c']
        }
      },
      showHourlySavings: false,
      optionsHourlySavings: {
        grid: {
          show: false,
        },
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        fill: {
          colors: ['#037c7c']
        }
      },
      //seriesPie: [44, 55, 13, 33],
      series: [{
        name: 'Energy saving',
        data: [30, 40, 45, 50, 20, 2]
      }],
      hourlySeries: [{
        name: 'Energy saving Hourly',
        data: [0,0,0,0,0,0]
      }],
      monthlyOptions: {
        grid: {
          show: false,
        },
        chart: {
          id: 'monthly'
        },
        xaxis: {
          categories: []
        },
        fill: {
          colors: ['#037c7c']
        }
      },
      monthlySeries: [{
        name: 'Energy saving Monthly',
        data: [0,0,0,0,0,0]
      }],
      yearlyOptions: {
        grid: {
          show: false,
        },
        chart: {
          id: 'yearly'
        },
        xaxis: {
          categories: []
        },
        fill: {
          colors: ['#037c7c']
        }
      },
      yearlySeries: [{
        name: 'Energy saving Yearly',
        data: [0,0,0,0,0,0]
      }],
      optionsPie: {
        size: '65%',
        background: 'transparent',
        strokeColor: '#037c7c',
        fillColor: '#037c7c',
        labels: {
          show: false,
          name: {
            show: true,
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
            formatter: function (val) {
              return val
            }
          },
          value: {
            show: true,
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            color: '#037c7c',
            offsetY: 16,
            formatter: function (val) {
              return val
            }
          },
          total: {
            show: false,
            showAlways: false,
            label: 'Total',
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: '#373d3f',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            }
          }
        }
      },
    }
  },
  mounted() {
    this.parameters = this.$route.query.parameters.replace(' ', '');
    this.getResults()
    //this.onColorChange()
    console.log(this.series[0].data);

  },
  methods: {
    updateSavings() {
      this.topArea = parseFloat(this.data.area).toFixed(2)
      this.currentCost = parseFloat(this.data.cost[this.roofColor]).toFixed(2)
      this.whiteRoofCost = parseFloat(this.data.cost.white).toFixed(2)
      this.monthlySaving = parseFloat(this.data.savings_month.black[this.roofColor]).toFixed(2)
      this.yearlySaving = parseFloat(this.data.saving_year.black[this.roofColor]).toFixed(2)



    //  update bars
      let temp_array = []
      for (const [key, value] of Object.entries(this.data.savings[this.roofColor])) {
        temp_array.push(key)
      }

      this.optionsHourlySavings = {
        grid: {
          show: false,
        },
        chart: {
          id: 'hourlySavings'
        },
        xaxis: {
          categories: temp_array
        },
        fill: {
          colors: ['#037c7c']
        }
      }
      console.log("Hourly series to append")
      let tem = []
      for(let i = 0; i< Object.values(this.data.savings[this.roofColor]).length; i++){
        tem.push(parseFloat(Object.values(this.data.savings[this.roofColor])[i]).toFixed(2))
      }
      this.hourlySeries = [
        {
          data: tem
        }
      ]

      console.log("Here are yearly savings")
      console.log(this.data.saving_year)


      // fill monthly
      let temp_monthly = []
      for (const [key, value] of Object.entries(this.data.savings_month[this.roofColor])) {
        temp_monthly.push(key)
      }

      this.monthlyOptions = {
        grid: {
          show: false,
        },
        chart: {
          id: 'monthlySavings'
        },
        xaxis: {
          categories: temp_monthly
        },
        fill: {
          colors: ['#037c7c']
        }
      }

      let tem_monthly = []
      for(let i = 0; i< Object.values(this.data.savings_month[this.roofColor]).length; i++){
        tem_monthly.push(parseFloat(Object.values(this.data.savings_month[this.roofColor])[i]).toFixed(2))
      }
      this.monthlySeries = [
        {
          data: tem_monthly
        }
      ]


    //  Fill yearly
      try{
        let temp_yearly = []
        for (const [key, value] of Object.entries(this.data.saving_year[this.roofColor])) {
          temp_yearly.push(key)
        }

        this.yearlyOptions = {
          grid: {
            show: false,
          },
          chart: {
            id: 'yearlySavings'
          },
          xaxis: {
            categories: temp_yearly
          },
          fill: {
            colors: ['#037c7c']
          }
        }

        let tem_yearly = []
        for(let i = 0; i< Object.values(this.data.saving_year[this.roofColor]).length; i++){
          tem_yearly.push(parseFloat(Object.values(this.data.saving_year[this.roofColor])[i]).toFixed(2))
        }
        this.yearlySeries = [
          {
            data: tem_yearly
          }
        ]
      }
      catch (e) {
        console.log("fail on yearly")
        console.log(e.toString())
      }

    },
    async getResults() {
      const url = `https://reenergise-ai.azurewebsites.net/results/${this.parameters}`
      //const url = `https://reenergise-ai.azurewebsites.net/results/77.4996383/28.4625375/0/23/split/1.5/0.8`
      this.loading = true
      axios.get(url, {
        responseType: 'json',
        headers: {"Content-Type": "application/json"}
      })
          .then(async (response) => {
            this.data = response.data
            //------------
            this.updateSavings()
          })
          .catch(async (error) => {
            console.log(error);
            if (this.retry < 2) {
              await new Promise((resolve) => setTimeout(resolve, 3000))
              this.retry++
              this.getResults()
            } else {
              // this.data = {"area":5684.0,"cost":{"black":28659.29102746716,"brown":26848.26190050281,"green":25037.23277353846,"grey":18698.630829163227,"red":18094.954453508446,"white":8737.970630859287},"energy":{"black":56401.48474205537,"brown":52837.37942018953,"green":49273.27409832369,"grey":36798.90547179323,"red":35610.87036450462,"white":17196.326201531076},"roof_temp":{"black":5916.7912,"brown":5543.69344,"green":5170.595679999999,"grey":3864.7535199999998,"red":3740.3875999999996,"white":1812.7158399999998},"room_temp":{"black":2766.347483289124,"brown":2592.1692186737396,"green":2417.990954058355,"grey":1808.367027904509,"red":1750.3076063660478,"white":850.3865725198938},"savings":{"black":{"black":0.0,"brown":891.0263304664599,"green":1782.0526609329197,"grey":4900.644817565535,"red":5197.653594387687,"white":9801.289635131074},"brown":{"black":-891.0263304664599,"brown":0.0,"green":891.0263304664599,"grey":4009.618487099075,"red":4306.627263921227,"white":8910.263304664613},"green":{"black":-1782.0526609329197,"brown":-891.0263304664599,"green":0.0,"grey":3118.592156632615,"red":3415.600933454767,"white":8019.236974198154},"grey":{"black":-4900.644817565535,"brown":-4009.618487099075,"green":-3118.592156632615,"grey":0.0,"red":297.00877682215213,"white":4900.644817565539},"red":{"black":-5197.653594387687,"brown":-4306.627263921227,"green":-3415.600933454767,"grey":-297.00877682215213,"red":0.0,"white":4603.636040743387},"white":{"black":-9801.289635131074,"brown":-8910.263304664613,"green":-8019.236974198154,"grey":-4900.644817565539,"red":-4603.636040743387,"white":0.0}}};
              // this.onColorChange()
            }
          })
          .then(() => {
            this.loading = false
          });

    },
    onColorChange() {
      this.options.xaxis = {categories: this.roofColors}
      this.series[0].data = []
      console.log(this.data.savings[this.roofColor]);
      for (const [key, value] of Object.entries(this.data.savings[this.roofColor])) {
        console.log(Math.floor(parseInt(value)));
        this.series[0].data.push(Math.floor(parseInt(value)));
      }
      //this.seriesPie = [this.data.savings.grey]
      console.log(this.series[0].data);
      const savingWhite = this.data.savings[this.roofColor].white;
      const energyWhite = this.data.energy[this.roofColor];
      const save = (savingWhite / energyWhite) * 100
      //this.topArea = Math.floor(this.data.area);
      //this.currentCost = Math.floor(this.data.cost[this.roofColor]);
      //this.whiteRoofCost = Math.floor(this.data.cost['white']);
      //this.monthlySaving = ;
      this.show = false
      this.seriesDonut = [Math.floor(save), 100 - Math.floor(save)];
      setTimeout(() => {
        this.show = true;
      }, 200);
      this.updateSavings()
    }
  }
}
</script>
