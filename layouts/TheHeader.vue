<template>
  <header>
    <div class="headerContainer height_fill v-centered container parent row wrap h-between">
      <site-navigation 
        class-name="baseChild" 
        label="Навигация по сайту"
      />
      <!-- Для экранных читалок -->
      <div
        id="currentPage"
        hidden
      >
        Активная страница
      </div>

      <no-ssr>
        <!-- begin siteMeta -->
        <div class="siteMeta  parent row nowrap h-between baseChild font-size_12 index_big">
          <time 
            :datetime="accessibleTime"
            class="siteMeta__time color-paleGray"
            aria-label="Ткущее время"
          >
            {{ currentTime }}
          </time>
          <div class="relative siteMetaLanguages font-family_main parent centered"> 
        
            <base-button 
              id="openOrCloseLanguagesButton"
              :action="switchLanguageState"
              label="Показать открыть выбор языка"
              unstyled
            >
              {{ currentLanguage }}
              <chevron-icon 
                :position="isLanguagesShown ? 'up' : 'down'"
                aria-labeledby="openOrCloseLanguagesButton"
              />
              <!-- <icon name="chevron-down"/> -->
            </base-button>
            <transition 
              appear 
              name="fadeTranslateToBottom">    
              <ul 
                v-if="isLanguagesShown"
                :aria-expanded="isLanguagesShown"
                role="navigation" 
                class="absolute siteMetaLanguages__list font-size_18 popupList popupList_centered"
                aria-label="Навигация по страницам с разным переводом"
              >
                <li 
                  v-for="(language, index) in languages"
                  :key="index"
                >
                  <a 
                    :aria-label="`${language.label} перевод`"
                    href="/">
                    {{ language.name }}
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </no-ssr>
      <!-- end siteMeta -->

      <!-- begin userPanel -->
      <div class="parent h-end row nowrap userPanel  baseChild v-centered">
        <div class="userPanel__balance font-size_18 font-weight_semibold">
          &dollar; {{ userBalance }}
        </div>
        <no-ssr>
          <button-icon 
            :is-awesome-icon="false"
            :action="makeAction"
            modifier="blue"
            class-name="userButton color_white"
          >
            <lazy-image 
              :src="userIcon" 
              class-name="userButton__icon"
              relative/>
          </button-icon>
        </no-ssr>
        
      </div>
      <!-- end userPanel -->
    </div>
  </header>
</template>

<script>
import SiteNavigation from "@/layouts/SiteNavigation";

import ButtonIcon from "@/components/ButtonIcon";

import { user } from "@/assets/images/icons";
import moment from "moment-timezone";

export default {
  name: "TheHeader",
  components: {
    SiteNavigation,
    ButtonIcon
    // UserIcon
  },
  mixins: [],
  data: () => ({
    isLanguagesShown: false,
    currentLanguage: "RU",
    userBalance: 245.53,
    userIcon: user,
    // https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    accessibleTime: "",
    currentTime: "",
    languages: [
      {
        name: "RU",
        label: "Русский"
      },
      {
        name: "EN",
        label: "Английский"
      }
    ]
  }),
  computed: {
    // currentPage() {
    //   return localStorage.currentPage;
    // },
  },
  beforeMouted() {
    this.updateTime();
  },
  mounted() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    getCurrentTime(format) {
      return moment()
        .tz(this.timezone)
        .format(format);
    },
    setTime(property, format) {
      this.$set(this, property, this.getCurrentTime(format));
    },
    updateTime() {
      this.setTime("currentTime", "h:m z");
      this.setTime("accessibleTime", "L");
    },
    switchLanguageState() {
      this.$set(this, "isLanguagesShown", !this.isLanguagesShown);
    },
    makeAction() {}
  }
};
</script>

<style lang="sass">
  @import '../assets/sass/conf/_sizes.sass'
  @import '../assets/sass/conf/_colors.sass'
  @import '../assets/sass/conf/_breakpoints.sass'
  header
    // @include breakpoint($iphone)
    //     min-height: em(122)
    // @include breakpoint($tablet)
    //     min-height: em(66)
  .userButton
    margin-left: em(32)
    @include breakpoint($desktop)
      transform: translate(-1px, 4px)
    &__icon
      max-width: em(16)
      margin-top: .025em
    &__balance
      @include breakpoint($tablet)
          font-size: $s14
  .siteMetaLanguages__list
    top: calc(100% + #{$s9})
    left: -50%
    min-width: em(67.772816512)
  .userPanel

    @include breakpoint($tablet)
      max-width: em(250)
    &__balance
        color: rgba(49, 125, 239, 0.85)
  .siteMeta
    transform: translateY(1px)
    @include breakpoint($tablet)
        max-width: em(100, 12)
    @include breakpoint($desktop)
        max-width: em(146, 12)
  .siteMetaLanguages
    @include breakpoint($desktop)
        transform: translateX(em(-8, 12))

</style>
