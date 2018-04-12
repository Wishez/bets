<template>
  <aside class="banner relative">

    <lazy-image 
      :src="banner"
      :is-image-fill-container="true"
      absolute
    />

    <div class="container h-around v-centered height_fill parent row wrap">
      <p class="banner__paragraph color_white font-size_26 margin-top_zero line-height_4">
        Получите гарантированный бонус на счет при регистрации аккаунта и ставьте на любимую команду!
      </p>
      <base-button
        :action="takeBonus"
        class-name="banner__button"
        modifier="blue"
      >
        Получить бонус
      </base-button>
        
    </div>
  </aside>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import banner from "@/assets/images/cybersport.png";

export default {
  name: "TheBanner",
  components: {
    BaseButton
  },
  mixins: [],
  props: {
    className: {
      type: String,
      required: false,
      default: ""
    },
    modifier: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: () => ({
    banner
  }),
  methods: {
    takeBonus() {}
  }
};
</script>


<style lang="sass" scoped>
  @import '../assets/sass/conf/_colors.sass'
  @import '../assets/sass/conf/_sizes.sass'
  @import '../assets/sass/conf/_breakpoints.sass'
  .banner
    min-height: 221px
    height: 1px
    &__paragraph
      max-width: em(460, 26)
      margin-right:  em(25, 26)
      @include breakpoint($phone)
        font-size: em(18)
      @include breakpoint($tablet)
        font-size: em(26)
      @include breakpoint($phone-less)
        font-size: 4.5vw
    &__button
      @include breakpoint($phone-less)
        font-size: 4vw
        margin-top: -2em
      font-size: em(25.4)
      min-width: em(270, 26.4)
      @include breakpoint($desktop)
          position: relative
          left: em(-103, 26.4)
</style>
