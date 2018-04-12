// https://github.com/hilongjw/vue-lazyload
import Vue from "vue";
import VueLazyload from "vue-lazyload";
// import Lazyload from "vue-lazyload-img";
import LazyImage from "@/components/LazyImage";

Vue.component("lazy-image", LazyImage);
// Vue.use(Lazyload, {
//   // default false, recommand true
//   fade: true,
//   // it's better not set the speed now
//   // speed: 20,
//   // default 300, it's not necessary to set it I think
//   time: 300
// });

Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
});
