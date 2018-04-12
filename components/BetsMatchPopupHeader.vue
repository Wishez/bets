<template>
  <!-- begin matchHeader -->
  <div 
    v-lazy:background-image="cup_bg"
    class="popupMatchHeader popupMatchHeaderGrid shadow_spread display_grid font-size_12">        
    <!-- begin matchMeta -->
    <div class="grow matchMeta parent row wrap_phone">
          
      <h2 class="lagueName padding-left_half-quarter parent column font-weight_semibold line-height_3 width_fill-phone">
        {{ bet.league.name }}
        <span class="lagueStage">{{ bet.league.stage }}</span>
      </h2>

      <time 
        :datetime="accessibleDate"
        class="matchDate padding-right_base padding-top_quarter order_first parent column relative after after_absolute row_phone h-end_phone v-centered_phone padding-bottom_small-phone width_fill-phone"
      >
        <span class="matchDate__date">
          {{ date }}
        </span>
        <span class="matchDate__time margin-left_quarter-phone">
          {{ time }}
        </span>
      </time>
    </div>
    <!-- end matchMeta -->

    <match-teams 
      :left-team-ratio="bet.leftTeam.ratio"
      :left-team-name="bet.leftTeam.name"
      :left-team-logo="bet.leftTeam.logo"
      :left-team-country="bet.leftTeam.country"
      :right-team-ratio="bet.rightTeam.ratio"
      :right-team-name="bet.rightTeam.name"
      :right-team-logo="bet.rightTeam.logo"
      :right-team-country="bet.rightTeam.country"
      :match-id="bet.match.id"
      class-name="popupMatchTeams"
      team-name-class="text_centered-phone-force"
      team-logo-class="margin-top_small max-width_40 max-height_40"
      ratio-container-class="max-width_28"
      versus-class="popupTeamsVersus"
      left-team-name-class="margin-top_small-tabletLess"
      right-team-class="popupRightTeam popupTeam"
      left-team-class="popupLeftTeam popupTeam"
      names-beneath-logo
      is-big-versus
      is-small-ratio
    />

    <match-streams 
      :channels="$store.state.bets.bet.channels"
      :autoplay="false"
      class-name="popupMatchStreams"
    />
  </div>
  <!-- end matchHeader -->
</template>

<script>
import MatchTeams from "@/components/MatchTeams";
import MatchStreams from "@/components/MatchStreams";

import { transformDate } from "@/constants/pureFunctions";
import { cup_bg } from "@/assets/images/backgrounds";
export default {
  name: "BetsMatchPopupHeader",
  components: {
    MatchStreams,
    MatchTeams
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
    },
    bet: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    cup_bg
  }),
  computed: {
    date() {
      return this.getFormatedTime("D MMMM");
    },
    time() {
      return this.getFormatedTime("HH:mm");
    },
    accessibleDate() {
      return this.getFormatedTime("L");
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},

  methods: {
    getFormatedTime(format) {
      return transformDate(this.bet.match.date, format);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/conf/_colors.sass";
@import "../assets/sass/conf/_sizes.sass";
@import "../assets/sass/conf/_breakpoints.sass";
@import "../assets/sass/conf/_easing.sass";

.matchDate {
  @include breakpoint($phone-less) {
    order: 2;
  }
  &:after {
    top: 8px;
    right: 0;
    width: 1px;
    height: 100%;
    background-color: #ccc;
    max-height: 34px;
    @include breakpoint($phone-less) {
      top: auto;
      bottom: 0;

      width: 100%;
      height: 1px;
    }
  }

  &__date {
    font-size: em(11, 12);
  }

  &__time {
    font-size: em(20, 12);
  }
}
.lagueName {
  font-size: em(16, 12);
  padding-top: 0.2em;
}
.matchMeta {
  grid-area: meta;
}
.matchStatus {
  &Results {
    margin-left: em(-18, 10);
  }
}

.popupMatchHeader {
  padding: em(20, 12) 2em 2em em(26, 12);
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: em(29, 12);

  grid-gap: 0 22px;
  grid-template-areas: "meta meta stream" "teams teams stream";

  @include breakpoint($phone) {
    // grid-template-rows: 1fr 150px;
    grid-template-columns: 1fr 230px;
    grid-template-rows: 50px 155px;
  }
  @include breakpoint($tablet) {
    // grid-template-rows: 1fr 95px;
  }

  @include breakpoint($phone-less) {
    grid-gap: 15px 10px;
    grid-template-areas: "meta" "teams" "stream";

    grid-template-rows: 70px 175px 1fr;
  }
}

.popupMatchTeams {
  grid-area: teams;
  font-size: 12px;
  & > * {
  }
  @include breakpoint($tablet-less) {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 100%;
  }
}

.popupMatchStreams {
  grid-area: stream;
}
</style>
