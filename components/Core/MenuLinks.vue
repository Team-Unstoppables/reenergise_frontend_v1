<template>
  <div class="flex flex-col lg:flex-row gap-8 items-center ">
    <ul class="flex flex-col lg:flex-row items-center justify-center gap-8 font-bold">
      <li class="hover:text-white cursor-pointer">
        <NuxtLink to="/about-us" :class="{'text-white': $route.name == 'about-us'}">
          About Us
        </NuxtLink>
      </li>
      <!--          <NuxtLink to="/calcul_page">calcul page</NuxtLink>-->
      <!--          <NuxtLink to="/select_roof">roof page</NuxtLink>-->
      <!--          <NuxtLink to="/result">result page</NuxtLink>-->
      <li class="hover:text-white cursor-pointer" :class="{'text-white': $route.name == 'testimonial'}">
        <NuxtLink to="/testimonial" :class="{'text-white': $route.name == 'testimonial'}">
        Testimonial
        </NuxtLink>
      </li>
      <li class="hover:text-white cursor-pointer">
        <NuxtLink to="/contact-us" :class="{'text-white': $route.name == 'contact-us'}">
        Contact Us
        </NuxtLink>
      </li>
      <li class="hover:text-white cursor-pointer" :class="{'text-white': $route.name == 'join-us'}">Join Us</li>
    </ul>
    <button
        @click="$router.push('/calculate-savings')"
        class="border hidden lg:flex border-black px-3 py-1 rounded-lg bg-primary hover:bg-primary-900 text-white w-full lg:w-[fit-content]"
    >
      Calculate Savings
    </button>
  </div>
</template>
