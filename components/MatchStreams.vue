<template>
  <!-- begin stream -->
  <div :class="`streams margin-bottom_base-phone margin_centered-phone parent column ${className}`">
    <!-- begin streamChoice -->
    <div class="streamChoice relative index_big parent row shadow_spread margin-bottom_small margin-top_small">    	
      <span class="streamChoice__name font-weight_semibold baseChild h-between">
        {{ !selectedStream ? 'Выбрать стрим' : selectedStream }}
      </span>
      <base-button
        :action="switchListChoicesState"
        class-name="baseChild streamChoice__button"
        label="Открыть "
        unstyled
      >
        <chevron-icon 
          :position="isStreamChoicesOpened ? 'up' : 'down'"
        />
              
      </base-button>
      <!-- begin streamList -->
      <transition 
        appear 
        name="fadeTranslateToBottom">
        <ul 
          v-if="isStreamChoicesOpened"
          :aria-expended="isStreamChoicesOpened"
          class="streamsList popupList absolute" 
        >
          <!-- begin streamName -->
          <li 
            v-for="(channel, index) in channels"
            :key="index"
            class="streamName">
            <base-button 
              :action="selectStream(channel)"
              label="Выбрать стрим"
              unstyled
            >
              {{ channel }}
            </base-button>

          </li>
          <!-- end streamName -->
        </ul>

      </transition>
      <!-- end streamList -->
    </div>
    <!-- end streamChoice -->
    <!-- begin streamFrame -->
    <div class="streamFrame">
      <iframe
        :src="selectedStreamUrl"
        height="168"
        class="width_fill-phone"
        width="230"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"/>
		
    </div>
    
    <!-- end streamFrame -->
  </div>
  <!-- end stream -->
</template>

<script>
export default {
  name: "MatchStreams",
  props: {
    className: {
      type: String,
      required: false,
      default: ""
    },
    channels: {
      type: Array,
      required: true,
      validator: function(value) {
        // Валидация каналов передаваемых для отображения.
        return value.every(channelName => typeof channelName === "string");
      }
    }
  },
  data: () => ({
    isStreamChoicesOpened: false,
    selectedStreamUrl: "",
    twitchUrl: "https://player.twitch.tv/?autoplay=false&channel=",
    selectedStream: ""
  }),
  computed: {
    // selectedStream: {
    //   get() {
    //     return "";
    //   },
    //   set(streamName) {
    //     this.setStreamUrl(streamName);
    //   }
    // }
  },
  mounted() {
    this.setStreamUrl(this.channels[0]);
  },
  methods: {
    switchListChoicesState() {
      this.$set(this, "isStreamChoicesOpened", !this.isStreamChoicesOpened);
    },
    setStreamUrl(streamName) {
      this.$set(this, "selectedStreamUrl", this.twitchUrl + streamName);
    },
    // Каррированная функция для смены имени стрима.
    selectStream(streamName) {
      return () => {
        this.setStreamUrl(streamName);

        this.$set(this, "selectedStream", streamName);

        this.switchListChoicesState();
      };
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'
.streams
  @include breakpoint($phone-less)
      margin-top: 1.5em

.popupMatchStreams
  @include breakpoint($tablet-less)
      justify-content: center
.streamChoice
	&__name
		padding: em(5) 0 em(5) em(11)
	&__button
		max-width: em(34, 12)
.streamFrame > iframe 
    max-width: em(230, 12)
    max-height: em(126, 12)
  	
</style>
