<template>
  <div>
    <div class="relative slide">
      <div
          class="carousel-indicators absolute bottom-0 flex h-24 w-full justify-center items-center"
      >
        <ol class="z-50 flex w-4/12 justify-center items-center">
          <li
              v-for="(img, i) in headerCarousel"
              :key="i"
              :class="{
              'h-8 w-8 bg-blue-500': active === i,
              'h-4 w-4 bg-white': active !== i,
            }"
              class="w-2 h-2 rounded-full cursor-pointer mx-2"
          ></li>
        </ol>
      </div>
      <div
          class="carousel-inner h-[55vh] lg:h-[70vh] bg-gray-300 relative overflow-hidden w-full flex items-center"
      >
        <div
            v-for="(data, i) in headerCarousel"
            :id="`slide-${i}`"
            :key="i"
            :class="`${active === i ? 'active' : 'left-full'}`"
            class="flex flex-col lg:flex-row gap-4 justify-evenly items-center carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
        >
          <img
              :class="`${data.text?'md:w-2/5':'md:w-full'}`"
              class="block"
              :src="data.img"
              alt="First slide"
          />
          <div v-if="data.text" class="w-4/6 md:w-2/5 hidden lg:flex flex-col gap-4">
            <p class="text-xl md:text-4xl text-center md:leading-12">{{ data.text }}</p>
            <button
                @click="$router.push('/faq')"
                class="border border-black px-3 py-1 rounded-lg bg-[#2C0735] w-[fit-content] mx-auto hover:bg-black text-white"
            >
              {{ $t("pages.home.learn_more") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <section>
      <h1 class="text-primary-900 text-2xl font-bold text-center mt-4">REenergise</h1>
      <p class="p-6 md:p-2 md:w-4/5 text-justify text-center mx-auto text-md md:text-2xl font-gray-500" >
        {{ $t("pages.home.what_is_reenergise") }}
      </p>
    </section>

    <section>
      <div class="pt-4">
        <h1 class="text-primary-900 text-lg lg:text-2xl font-bold text-center">
          {{ $t("pages.home.calculate_steps") }}
        </h1>

        <section class="flex flex-col lg:flex-row gap-8 w-full justify-center mt-8 items-center">
          <div class="how-work-container bglocation hover:scale-125 cursor-pointer transition" >
            <div class="absolute w-full h-full bg-black top-0 left-0 right-0 opacity-40 rounded-lg"></div>
            <span class="how-work-text">1</span>
            <span class="how-work-text">{{ $t("pages.home.enter_coordinates") }}</span>
          </div>

          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" color="#147EB7" height="40" width="40" xmlns="http://www.w3.org/2000/svg" style="color: rgb(20, 126, 183);"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>


          <div class="how-work-container bgselectroof">
            <div class="absolute w-full h-full bg-black top-0 left-0 right-0 opacity-40 rounded-lg"></div>
            <span class="how-work-text">2</span>
            <span class="how-work-text">Select Roof From Images</span>
          </div>

          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" color="#147EB7" height="40" width="40" xmlns="http://www.w3.org/2000/svg" style="color: rgb(20, 126, 183);"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>

          <div class="how-work-container bggetresult">
            <div class="absolute w-full h-full bg-black top-0 left-0 right-0 opacity-40 rounded-lg"></div>
            <span class="how-work-text">3</span>
            <span class="how-work-text">Get Results</span>
          </div>
        </section>

        <section class="flex flex-col gap-8 w-full justify-center mt-24 items-center mb-12">
          <h1 class="text-primary-900 text-2xl font-bold text-center">
            Frequently Asked Questions
          </h1>

          <div class="mx-auto w-full max-w-4xl rounded-2xl bg-white p-2">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                  class="hshshhs"
              >
                <span class="font-bold text-lg">Do we save users’ data? </span>
                <svg :class="open ? 'rotate-270 transform' : ''" class="w-4 h-4" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.17605 5.13207L8.83305 1.47507C8.8996 1.40198 8.98015 1.34299 9.06991 1.30159C9.15968 1.26018 9.25683 1.23721 9.35563 1.23403C9.45443 1.23084 9.55287 1.24751 9.64511 1.28305C9.73735 1.31859 9.82153 1.37227 9.89266 1.44092C9.96378 1.50957 10.0204 1.59179 10.0592 1.68272C10.098 1.77364 10.1181 1.87143 10.1184 1.97028C10.1188 2.06913 10.0992 2.16704 10.061 2.25821C10.0228 2.34938 9.96673 2.43197 9.89605 2.50107L9.87805 2.51907L5.69905 6.69907C5.56046 6.83763 5.37252 6.91547 5.17655 6.91547C4.98058 6.91547 4.79263 6.83763 4.65405 6.69907L0.475048 2.52007C0.40525 2.45264 0.349418 2.37212 0.31074 2.2831C0.272061 2.19409 0.251293 2.09834 0.249621 2.0013C0.24795 1.90426 0.265408 1.80784 0.300998 1.71755C0.336588 1.62726 0.389614 1.54487 0.457048 1.47507C0.524482 1.40527 0.605003 1.34944 0.694014 1.31076C0.783025 1.27208 0.878783 1.25132 0.97582 1.24964C1.07286 1.24797 1.16927 1.26543 1.25956 1.30102C1.34985 1.33661 1.43225 1.38964 1.50205 1.45707L1.52005 1.47507L5.17605 5.13207Z" fill="#6F1DF4" stroke="#6F1DF4" stroke-width="0.5"/>
                </svg>
              </DisclosureButton>
              <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                We have transparent data usage policies, which can be found in privacy section. Data of users who wish to be contacted by our painting partners is stored in our servers and shared with trusted and verified partners.
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" class="mt-2" v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 focus-visible:ring-opacity-75"
              >
                <span class="font-bold text-lg">How accurate are our energy saving predictions?  </span>
                <svg :class="open ? 'rotate-270 transform' : ''" class="w-4 h-4" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.17605 5.13207L8.83305 1.47507C8.8996 1.40198 8.98015 1.34299 9.06991 1.30159C9.15968 1.26018 9.25683 1.23721 9.35563 1.23403C9.45443 1.23084 9.55287 1.24751 9.64511 1.28305C9.73735 1.31859 9.82153 1.37227 9.89266 1.44092C9.96378 1.50957 10.0204 1.59179 10.0592 1.68272C10.098 1.77364 10.1181 1.87143 10.1184 1.97028C10.1188 2.06913 10.0992 2.16704 10.061 2.25821C10.0228 2.34938 9.96673 2.43197 9.89605 2.50107L9.87805 2.51907L5.69905 6.69907C5.56046 6.83763 5.37252 6.91547 5.17655 6.91547C4.98058 6.91547 4.79263 6.83763 4.65405 6.69907L0.475048 2.52007C0.40525 2.45264 0.349418 2.37212 0.31074 2.2831C0.272061 2.19409 0.251293 2.09834 0.249621 2.0013C0.24795 1.90426 0.265408 1.80784 0.300998 1.71755C0.336588 1.62726 0.389614 1.54487 0.457048 1.47507C0.524482 1.40527 0.605003 1.34944 0.694014 1.31076C0.783025 1.27208 0.878783 1.25132 0.97582 1.24964C1.07286 1.24797 1.16927 1.26543 1.25956 1.30102C1.34985 1.33661 1.43225 1.38964 1.50205 1.45707L1.52005 1.47507L5.17605 5.13207Z" fill="#6F1DF4" stroke="#6F1DF4" stroke-width="0.5"/>
                </svg>
              </DisclosureButton>
              <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                We use a state-of-the-art image segmentation algorithm to segment rooftops. As the current approaches lack generalizability due to global architectural differences, to tackle this, we offer our users the option to manually highlight their rooftops.
              </DisclosurePanel>
            </Disclosure>

            <Disclosure as="div" class="mt-2" v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 focus-visible:ring-opacity-75"
              >
                <span class="font-bold text-lg">Do we offer consulations and/or cost estimates based on the results generated?   </span>
                <svg :class="open ? 'rotate-270 transform' : ''" class="w-4 h-4" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.17605 5.13207L8.83305 1.47507C8.8996 1.40198 8.98015 1.34299 9.06991 1.30159C9.15968 1.26018 9.25683 1.23721 9.35563 1.23403C9.45443 1.23084 9.55287 1.24751 9.64511 1.28305C9.73735 1.31859 9.82153 1.37227 9.89266 1.44092C9.96378 1.50957 10.0204 1.59179 10.0592 1.68272C10.098 1.77364 10.1181 1.87143 10.1184 1.97028C10.1188 2.06913 10.0992 2.16704 10.061 2.25821C10.0228 2.34938 9.96673 2.43197 9.89605 2.50107L9.87805 2.51907L5.69905 6.69907C5.56046 6.83763 5.37252 6.91547 5.17655 6.91547C4.98058 6.91547 4.79263 6.83763 4.65405 6.69907L0.475048 2.52007C0.40525 2.45264 0.349418 2.37212 0.31074 2.2831C0.272061 2.19409 0.251293 2.09834 0.249621 2.0013C0.24795 1.90426 0.265408 1.80784 0.300998 1.71755C0.336588 1.62726 0.389614 1.54487 0.457048 1.47507C0.524482 1.40527 0.605003 1.34944 0.694014 1.31076C0.783025 1.27208 0.878783 1.25132 0.97582 1.24964C1.07286 1.24797 1.16927 1.26543 1.25956 1.30102C1.34985 1.33661 1.43225 1.38964 1.50205 1.45707L1.52005 1.47507L5.17605 5.13207Z" fill="#6F1DF4" stroke="#6F1DF4" stroke-width="0.5"/>
                </svg>
              </DisclosureButton>
              <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                Yes, we offer painting services through affiliated and registered painting partners.
              </DisclosurePanel>
            </Disclosure>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
definePageMeta({layout: 'guest'})

const headerCarousel = ref([
  {
    img: 'https://i.ibb.co/BtTckJp/carousel.png',
    text: 'Assisting in Saving Energy by Reducing home cooling cost by reflective roof paints',
  },
  {
    img: 'https://uia.mic.gov.in/uia/assets/img/slider/UIA-Slider-PM-Banner-V3.jpg',
  },
  {
    img: 'https://uia.mic.gov.in/uia/assets/img/slider/UIA-Slider1-V1.jpg',
  },
])

const active = ref(0)

onMounted(() => {
  let i = 0
  setInterval(() => {
    if (i > headerCarousel.value.length - 1) {
      i = 0
    }
    active.value = i
    i++
  }, 3000)
})
</script>

<style>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}


.bglocation {
  background-image: url(../assets/images/location.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bgselectroof {
  background-image: url(../assets/images/roof.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bggetresult {
  background-image: url(../assets/images/results.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.how-work-container{
  @apply relative bg-gray-500 h-80 w-10/12 lg:w-2/12 rounded-lg flex flex-col justify-between px-2 py-2
}

.how-work-text{
  @apply text-4xl text-white font-bold z-50
}
.hshshhs{
  @apply flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 focus-visible:ring-opacity-75
}
</style>
