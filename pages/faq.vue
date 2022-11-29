<template>
  <div class="pt-4">
    <h1 class="text-[#8E94F2] text-xl lg:3xl font-bold text-center">
      Calculate Passive Energy Savings in 3 Simple Steps
    </h1>

    <section class="flex flex-col lg:flex-row gap-8 w-full justify-center mt-8 items-center">
      <div class="bg-gray-500 h-80 w-10/12 lg:w-2/12 rounded-lg flex flex-col justify-between px-2 py-2 bglocation" >
        <span class="text-4xl text-white font-bold">1</span>
        <span class="text-4xl text-white font-bold">Enter Coordinates</span>
      </div>

      <svg width="31" height="52" viewBox="0 0 31 52" class="rotate-90 lg:rotate-0 transform" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30.8719 26L0.967958 51.1147L0.967958 0.885263L30.8719 26Z" stroke="black"/>
      </svg>


      <div class="bg-gray-500 h-80 w-10/12 lg:w-2/12 rounded-lg flex flex-col justify-between px-2 py-2 bgselectroof">
        <span class="text-4xl text-white font-bold">1</span>
        <span class="text-4xl text-white font-bold">Select Roof From Images</span>
      </div>

      <svg width="31" height="52" viewBox="0 0 31 52" class="rotate-90 lg:rotate-0 transform" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30.8719 26L0.967958 51.1147L0.967958 0.885263L30.8719 26Z" stroke="black"/>
      </svg>

      <div class="bg-gray-500 h-80 w-10/12 lg:w-2/12 rounded-lg flex flex-col justify-between px-2 py-2 bggetresult">
        <span class="text-4xl text-white font-bold">1</span>
        <span class="text-4xl text-white font-bold">Get Results</span>
      </div>
    </section>

    <section class="flex flex-col gap-8 w-full justify-center mt-24 items-center mb-12">
      <h1 class="text-[#8E94F2] text-xl lg:3xl font-bold text-center">
        Frequently Asked Questions
      </h1>

      <div class="mx-auto w-full max-w-4xl rounded-2xl bg-white p-2">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
              class="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 focus-visible:ring-opacity-75"
          >
            <span class="font-bold text-lg">Do we save users’ data? </span>
            <svg :class="open ? 'rotate-270 transform' : ''" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg :class="open ? 'rotate-270 transform' : ''" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.17605 5.13207L8.83305 1.47507C8.8996 1.40198 8.98015 1.34299 9.06991 1.30159C9.15968 1.26018 9.25683 1.23721 9.35563 1.23403C9.45443 1.23084 9.55287 1.24751 9.64511 1.28305C9.73735 1.31859 9.82153 1.37227 9.89266 1.44092C9.96378 1.50957 10.0204 1.59179 10.0592 1.68272C10.098 1.77364 10.1181 1.87143 10.1184 1.97028C10.1188 2.06913 10.0992 2.16704 10.061 2.25821C10.0228 2.34938 9.96673 2.43197 9.89605 2.50107L9.87805 2.51907L5.69905 6.69907C5.56046 6.83763 5.37252 6.91547 5.17655 6.91547C4.98058 6.91547 4.79263 6.83763 4.65405 6.69907L0.475048 2.52007C0.40525 2.45264 0.349418 2.37212 0.31074 2.2831C0.272061 2.19409 0.251293 2.09834 0.249621 2.0013C0.24795 1.90426 0.265408 1.80784 0.300998 1.71755C0.336588 1.62726 0.389614 1.54487 0.457048 1.47507C0.524482 1.40527 0.605003 1.34944 0.694014 1.31076C0.783025 1.27208 0.878783 1.25132 0.97582 1.24964C1.07286 1.24797 1.16927 1.26543 1.25956 1.30102C1.34985 1.33661 1.43225 1.38964 1.50205 1.45707L1.52005 1.47507L5.17605 5.13207Z" fill="#6F1DF4" stroke="#6F1DF4" stroke-width="0.5"/>
            </svg>
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            No.
          </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" class="mt-2" v-slot="{ open }">
          <DisclosureButton
              class="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 focus-visible:ring-opacity-75"
          >
            <span class="font-bold text-lg">Do we offer consulations and/or cost estimates based on the results generated?   </span>
            <svg :class="open ? 'rotate-270 transform' : ''" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.17605 5.13207L8.83305 1.47507C8.8996 1.40198 8.98015 1.34299 9.06991 1.30159C9.15968 1.26018 9.25683 1.23721 9.35563 1.23403C9.45443 1.23084 9.55287 1.24751 9.64511 1.28305C9.73735 1.31859 9.82153 1.37227 9.89266 1.44092C9.96378 1.50957 10.0204 1.59179 10.0592 1.68272C10.098 1.77364 10.1181 1.87143 10.1184 1.97028C10.1188 2.06913 10.0992 2.16704 10.061 2.25821C10.0228 2.34938 9.96673 2.43197 9.89605 2.50107L9.87805 2.51907L5.69905 6.69907C5.56046 6.83763 5.37252 6.91547 5.17655 6.91547C4.98058 6.91547 4.79263 6.83763 4.65405 6.69907L0.475048 2.52007C0.40525 2.45264 0.349418 2.37212 0.31074 2.2831C0.272061 2.19409 0.251293 2.09834 0.249621 2.0013C0.24795 1.90426 0.265408 1.80784 0.300998 1.71755C0.336588 1.62726 0.389614 1.54487 0.457048 1.47507C0.524482 1.40527 0.605003 1.34944 0.694014 1.31076C0.783025 1.27208 0.878783 1.25132 0.97582 1.24964C1.07286 1.24797 1.16927 1.26543 1.25956 1.30102C1.34985 1.33661 1.43225 1.38964 1.50205 1.45707L1.52005 1.47507L5.17605 5.13207Z" fill="#6F1DF4" stroke="#6F1DF4" stroke-width="0.5"/>
            </svg>
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
            No.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  definePageMeta({ layout: 'guest' })
</script>

<style>
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
</style>
