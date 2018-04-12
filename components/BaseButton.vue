<template>	
  <button 
    :class="{
      'unstyledButton': unstyled,
      'button round parent centered': !unstyled, 
      [`button_${modifier}`] : modifier, 
      [className]: className
    }"
    :aria-pressed="pressed" 
    :type="type ? type : 'button'"
    :aria-label="label"
    :disabled="disabled"
    tabindex="0"
    role="button"
    @click="onClick"
    @blur="makeActionByBlur"
	
  >
    <slot/>
  </button>
</template>

<script	>
export default {
  name: "BaseButton",
  props: {
    isDefaultPressed: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: [String, Array],
      required: false,
      default: ""
    },
    unstyled: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    className: {
      type: String,
      required: false,
      default: null
    },
    action: {
      type: [Function, Boolean],
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: ""
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    onBlur: {
      type: [Function, Boolean],
      required: false,
      default: false
    }
  },
  data: () => ({
    pressed: false
  }),
  mounted() {
    this.$set(this, "pressed", this.isDefaultPressed);
  },
  methods: {
    onClick: function(event) {
      this.$set(this, "pressed", !this.pressed);
      if (this.action) {
        this.action(event);
      }
    },
    makeActionByBlur: function(event) {
      this.$set(this, "pressed", false);

      if (this.onBlur) {
        this.onBlur(event);
      }
    }
  }
};
</script>
<style lang="sass" scoped>
  @import '../assets/sass/conf/_colors.sass'
  @import '../assets/sass/conf/_sizes.sass'
  
  .unstyledButton
    border-width: 0
    background: none
  button
    cursor: pointer
    &:disabled
      opacity: .5
      cursor: default
      &:hover, &:active, &:focus
        transform: none

  .button 
    position: relative
    padding: .8em 1.5em
    border-radius: 50px
    user-select: none
    z-index: 1
    transition: all 0.3s
    will-change: transform
    transform-style: preserve-3d
    &_blue
      background: linear-gradient(180deg, $blue 0%, rgba($blue, .85) 100%)
    &:hover, &:focus
      transform: scale(1.02)
    &:active
      transform: scale(1.02) translateY(2px)
    &_centered
      margin-left: auto
      margin-right: auto
    &_blue
      background: $buttonGradient
      color: $white
    &_gray
      background-color: #cccccc
      color: $white
   
  .button[aria-pressed]
    outline: none
    box-shadow: 1.5px 1.5px 1px #FFF, -1.5px -1.5px 1px #fff , -3px -3px 1px $blue, 3px 3px 1px $blue
</style>
