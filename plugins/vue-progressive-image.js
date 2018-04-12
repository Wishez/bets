import Vue from "vue";
import VueProgressiveImage from "vue-progressive-image";
import LazyImage from "@/components/LazyImage";

Vue.use(VueProgressiveImage, {
  blur: 30,
  delay: 1000
});

Vue.component("lazyImage", LazyImage);
