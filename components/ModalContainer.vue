<template>
  <section class="popup position_base fixed parent centered index_big">
    <!-- begin litter -->
    <div class="litter  relative background-color_white shadow_spread">
      <slot />
      <base-button 
        :action="onCloseModal"
        class-name="absolute litter__closeButton"
        unstyled>
        <svg 
          width="1em" 
          height="1em" 
          viewBox="0 0 24 24"
        >
          <g 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            fill="none" 
            fill-rule="evenodd"
            class="shadow_spread">
            <path d="M18,6 L6,18"/>
            <path d="M6,6 L18,18"/>
          </g>
        </svg>
      </base-button>
    </div>
    <!-- end litter -->
  </section>
</template>

<script>
export default {
  name: "ModalContainer",
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
    },
    onCloseModal: {
      type: Function,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'

.popup
	width: 100vw
	height: 100vh	
	background-color: rgba($darkGray, .5)
	overflow-y: auto
.litter

  @include breakpoint($tablet)
    min-width: em(685)
    max-width: em(685)
    min-height: em(686)
    max-height: em(686)

  @include breakpoint($tablet-less)
    max-width: 90vw
    min-width: 85vw
    max-height: 90vh

  &__closeButton
    @include breakpoint($phone)
      top: 0
      right: em(-30)
      color: rgba($white, .5)
    @include breakpoint($phone-less)
      right: em(10)
      color: $darkGray
      top: em(10)

</style>
