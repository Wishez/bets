<template>
  <div class="layouts">
    <the-header/>
    <the-banner/>
    <main-page />
    <the-footer/>
    {{ phpCode }}
    <nuxt/>
  </div>
</template>
<script>
import TheHeader from "@/layouts/TheHeader";
import TheBanner from "@/layouts/TheBanner";
import TheFooter from "@/layouts/TheFooter";
import MainPage from "@/layouts/MainPage";

export default {
  components: {
    TheHeader,
    TheBanner,
    TheFooter,
    MainPage
  },
  data: () => ({
    phpCode: `<?php 
      Hello World
    ?>`
  })
};
</script>
<style lang="sass">
  @import '../assets/sass/conf/_breakpoints.sass'
  *,
  *:before,
  *:after 
    box-sizing: inherit
    margin: 0
    /*font-family: inherit;*/
</style>
