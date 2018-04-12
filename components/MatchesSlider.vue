<template>
  <!-- begin matchesSlider -->
  <no-ssr>
    <div class="matchesSlider margin_centered  relative">
      <tiny-slider 
        :mouse-drag="true"
        :fixed-width="233"
        :loop="false"
        :gutter="29"
        :responsive="{
          1140: {
            items: 4
          },
          992: {
            items: 3
          },
          769: {
            items: 2,
            controls: true,
            
          },
          480: {
            items: 1,
            
          },
          0: {
            controls: false
          }
        }"
        controls-container=".sliderControls" 
        items="4" 
      >
        <!-- <div 
      v-swiper:mySwiper="swiperOption" 
    >
      <div class="swiper-wrapper"> -->
        <match-info
          v-for="(match, index) in $store.state.matches.matches"
          :key="index"
          :match-date="new Date(match.match.date)"
          :left-team-ratio="match.leftTeam.ratio"
          :left-team-name="match.leftTeam.name"
          :left-team-logo="match.leftTeam.logo"
          :right-team-ratio="match.rightTeam.ratio"
          :right-team-name="match.rightTeam.name"
          :right-team-logo="match.rightTeam.logo"
          :league-name="match.league.name"
          :league-stage="match.league.stage"
          :game-id="$store.state.matches.activeGameId"
        />
      </tiny-slider>
      <!-- </div>
    </div>     -->
      <!-- end -->

      <!-- begin sliderControls -->
      <div class="sliderControls absolute width_fill">
        <base-button 
          id="previousMatchButton"
          label="Предыдущие матчи"
          class="sliderControls__button sliderControls__button_previous absolute centered parent circle shadow_white-block"
          unstyled>
          <chevron-icon position="left"/>
        </base-button>

        <base-button 
          id="nextMatchButton"
          label="Следующие матчи"
          class="sliderControls__button sliderControls__button_next absolute centered parent circle shadow_white-block"
          unstyled>
          <chevron-icon position="right"/>
        </base-button>
            
      </div>
    <!-- end sliderControls -->

    </div>
    <!-- end matchesSlider -->
  </no-ssr>
</template>

<script>
import MatchInfo from "@/components/MatchInfo";

export default {
  name: "MatchesSlider",
  components: {
    MatchInfo
  },
  data: () => ({
    swiperOption: {
      slidesPerView: 4,
      // spaceBetween: 29,
      // centeredSlides: true,
      breakpoints: {
        1140: {
          slidesPerView: 3
          // spaceBetween: 29,
        },
        992: {
          slidesPerView: 2
        },
        769: {
          slidesPerView: 1
        },
        380: {
          slidesPerView: 1
        }
      },
      navigation: {
        nextEl: "#nextMatchButton",
        prevEl: "#previousMatchButton"
      }
      // pagination: {
      //   el: ".sliderControls"
      // }
      // some swiper options...
    }
  })
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'

.matchesSlider
  max-width: 92%

.sliderControls
  font-size: em(10)
  top: 48%
  left: 0
  @include breakpoint($phone-less)
    display: none

  &__button
    background-color: 
    min-width: em(23, 10)
    min-height: em(23, 10)
    &_previous
      right: calc(100% + 6px)
    &_next
      left: calc(100% + 5px)
.swiper-button-disabled
  opacity: .5
// .swiper-wrapper
  // overflow: hidden
</style>
