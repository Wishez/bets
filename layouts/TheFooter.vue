<template>
  <footer class="background-color_blueGradient footer color_white">
    <!-- begin container -->
    <div class="container relative endlessBottomBorder_white endlessBottomBorder padding-bottom_base padding-bottom_large-phone padding-top_small parent row wrap v-centered">
      <site-navigation 
        :logo-colored="false"
        navigation-style="white"
        logo-color-name="white"
        active-link-color="white"
        modifier="footer"
        label="Навигация по сайту в нижней части страницы" 
      />
      <subscribtion-form />
    </div>
    <!-- end container -->
    <!-- begin container -->
    <div class="padding-top_base container parent row wrap">
      <p class="copyright opacity_half grow text_centered-phone margin-top_zero-phone">&copy;2017. Все права защищены</p>
      <footer-games />
      <!-- end  games-->
    </div>
    <!-- end container -->
  </footer>
</template>

<script>
import SiteNavigation from "@/layouts/SiteNavigation";

import SubscribtionForm from "@/components/SubscribtionForm";
import FooterGames from "@/components/FooterGames";

export default {
  name: "TheFooter",
  components: {
    SubscribtionForm,
    SiteNavigation,
    FooterGames
  },

  computed: {
    // currentPage() {
    //   return localStorage.currentPage;
    // },
    // currentTime() {
    //   return moment().format();
    // }
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'



.footer
  background: linear-gradient(to top, darken(#3B68D4, 5%) 0%, #3B68D4 50%, lighten(#3B68D4, 1%) 100%), #3B68D4
.container:nth-of-type(1)
  padding-top: em(14)


.navigation_footer
  min-width: 61.6% $i
  @include breakpoint($phone-less)
      min-width: 100% $i

.copyright
  max-width: em(345, 13)
  font-size: em(13)


</style>
