<template>
  <div class="flex flex-col gap-12 mt-4">
    <div class="flex flex-col gap-4">
      <h1 class="text-primary-900 text-2xl font-bold text-center uppercase">
        HOW IS ENERGY EFFICIENCY OF COOL ROOFS MEASURED?
      </h1>
      <div class="flex flex-col justify-center items-center mt-4 gap-4">
        <p class="md:w-1/2 text-justify lg:text-center px-4">
          Cool roofs have the ability to reflect sunlight and repel heat because the roofs are prepared, covered or coated with materials that have special characteristics. These are typically white roofs and they reduce the heat island phenomenon, minimising thermal impact on the microclimate and on the local environment. Modern cool roofs include highly reflective thermoplastic and liquid-applied membranes and coatings that provide a full range of benefits over a long service life.
        </p>

        <div class="flex md:flex-row flex-col gap-4 md:gap-10 w-full lg:w-2/3 px-4 items-center justify-center">
          <img class="w-100 h-64 rounded-3xl" src="~/assets/images/solar_refraction_1.png">
          <img class="w-100" src="~/assets/images/solar_refraction_2.png">
        </div>
      </div>
    </div>


    <div class="flex flex-col gap-4">
      <h1 class="text-primary-900 text-2xl font-bold text-center uppercase">
        Cool Roofs and Green Building Certification Systems
      </h1>
      <div class="flex flex-col justify-center items-center">
        <p class="md:w-1/2 text-justify lg:text-center px-4">
          The benefits of cool roofs and their value to communities, the environment and
          building owners is recognized by green building certification systems such as Leadership in Energy and Environmental Design (LEED).
          LEED is the world's best known and largest green building certification system.
          It provides third party verification that a building has been designed and built using
          strategies to improve its sustainability performance.
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h1 class="text-primary-900 text-2xl font-bold text-center uppercase">
        Some Typical Cool Roof Colours and Initial SRI Values
      </h1>
      <div class="flex flex-col justify-center items-center">
        <div class=" items-center justify-center">
          <img class="max-w-[100%] mt-5 px-4" src="~/assets/images/roof_color_value.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({layout: 'guest'})
</script>
