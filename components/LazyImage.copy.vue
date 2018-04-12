<template>
  <div 
    :class="{
      'imageContainer': true,
      ['imageContainer_' + modifier]: modifier,
      [className]: className,
      'imageContainer_circle': circle,
      'imageContainer_relative': relative,
      'imageContainer_absolute': absolute,
      'imageContainer_imageFill': isImageFillContainer
  }">
    <progressive-img
      :src="src"
      :placeholder="src"
      :alt="alt"
      no-ratio
    />
    
  </div>
</template>

<script>
export default {
  name: "LazyImage",
  props: {
    circle: {
      type: Boolean,
      required: false,
      default: false
    },
    modifier: {
      type: String,
      required: false,
      default: ""
    },
    relative: {
      type: Boolean,
      required: false,
      default: false
    },
    absolute: {
      type: Boolean,
      required: false,
      default: false
    },
    isImageFillContainer: {
      type: Boolean,
      required: false,
      default: true
    },
    alt: {
      type: String,
      required: false,
      default: ""
    },
    src: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false,
      default: ""
    }
  }
};
</script>

<style lang="sass">
.imageContainer
  // max-width: 100%
  &_circle
    & .progressive-image-main
      clip-path: circle()
  &_imageFill
    .progressive-image-main, .progressive-image-wrapper
      height: 100%

  &_relative
    .progressive-image-main
      position: relative
      display: block
  &_absolute
    &, .progressive-image-wrapper, .progressive-image-main
      height: 100%
    position: absolute
    width: 100%
    z-index: -1
</style>

