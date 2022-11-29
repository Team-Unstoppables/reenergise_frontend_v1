<template>
  <div class="relative pb-1/2 lg:pb-1/8 min-h-screen font-poppins bg-white">

      <div class="flex justify-between bg-primary-700 py-0 pl-4 pr-4">
        <div class="flex gap-4 items-center">
          <img class="w-12" src="~/assets/images/saver.png"/>
          <span>ENERGY</span>
        </div>

        <div class="flex items-center gap-24">
          <div class="md:flex items-center gap-2 hidden">
            <span class="fontsize-button">-</span>
            <span class="fontsize-button">A</span>
            <span class="fontsize-button">+</span>
          </div>
          <div>
            <select v-model="localeSetting" class="bg-transparent text-black">
              <option v-for="lang in availableLocales" :key="lang.iso" :value="lang.iso">{{lang.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <nav style="z-index: 500" class="flex bg-primary-600 py-2 justify-between pr-4 md:pl-4 sticky top-0">
        <div class="flex gap-2 items-center">
          <Popover v-slot="{ open }" class="relative lg:hidden">
            <PopoverButton
                :class="open ? '' : 'text-opacity-90'"
                class="group inline-flex items-center ml-4 rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <svg width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                   viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve">
              <g>
                <g id="Menu">
                  <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
                    C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
                  <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
                    S379.58,180.455,372.939,180.455z"/>
                  <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909
                    c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
                </g>
                <g>
              </g>
              </g>
            </svg>
            </PopoverButton>

            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel class="absolute z-10 mt-3 left-0 w-[100vw] transform sm:px-0">
                <div class="overflow-hidden rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >

                  <div class="bg-gray-50 p-4">
                    <CoreMenuLinks/>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <NuxtLink to="/">
            <img class="w-[50px]" src="~/assets/images/logo.png"/>
          </NuxtLink>
        </div>

        <button
            @click="$router.push('/calcul_page')"
            class="border border-black px-2 rounded-full bg-[#2C0735] hover:bg-black text-white lg:hidden w-[fit-content] text-xs"
        >
          Calculate Savings
        </button>

        <CoreMenuLinks class="hidden lg:flex"/>
      </nav>

    <slot/>

    <footer
        class="absolute py-2 bottom-0 h-[fit-content] w-full bg-primary-700 flex flex-col justify-center lg:(flex-row justify-between items-center) px-8 gap-4"
    >
      <span class="font-semibold text-white text-center lg:text-start"> © 2022 | Team Unstoppables </span>

      <NuxtLink to="/" class="bg-white w-[fit-content] rounded-md py-1 px-1 hidden lg:flex">
        <img class="w-16" src="~/assets/images/logo.png"/>
      </NuxtLink>

      <a class="font-semibold text-white text-center lg:text-start"> Terms and Conditions | Privacy Policy </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { availableLocales } from '~~/utils/lang';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const localeSetting = useState<String>('locale.setting')
</script>
<style>
.fontsize-button{
  @apply px-1 w-5 py-0 border border-black rounded-md text-sm text-center cursor-pointer hover:(text-white border-white);
}

.text-input,
select {
  background: rgba(187, 173, 255, 0.13);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 42px;
  width: 100%;
  @apply text-gray-500 text-xs px-2
}
</style>
