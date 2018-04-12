<template>
  <base-button
    :action="action"
    :label="label"
    :class="{ 
      'circle checkButton parent centered color_white margin-top_quarter margin-bottom_quarter margin_vertical-littleOffsets': true,
      [className]: className
    }"
    modifier="blue"
    unstyled>
    <svg 
      width="1em" 
      height="1em" 
      viewBox="0 0 20 16"
      aria-hidden="true"
      role="img"
    >
      <g 
        stroke="currentColor" 
        stroke-width="1.25" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        fill-rule="evenodd">
        <path d="M3,8 L9,12.5" />
        <path d="M9,12.5 L18,3.5" />
      </g>
    </svg>
  </base-button>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    className: {
      type: String,
      required: false,
      default: ""
    },
    action: {
      type: Function,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'
@import '../assets/sass/conf/_easing.sass'

.checkButton
	height: em(21)
	width: em(21)


</style>
