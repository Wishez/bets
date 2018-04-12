<template>
  <div 
    class="font-weight_semibold tableContentRow parent row wrap v-centered h-around margin_centered-phone" 
  >
    <!-- begin league -->
    <div class="league wrap blockOffsets grow v-centered height_fill parent row nowrap_tablet"> 
        
      <lazy-image 
        :src="leagueLogo" 
        :is-image-fill-container="false"
        class-name="tableContentCeil tableContentCeil_leagueLogo parent h-end v-centered"
        image-classes="margin-left_auto max-width_85"
        relative
      />
      <h3
        class="tableContentCeil tableContentCeil_leagueName text_centered-phone font-weight_semibold font-size_16">
        {{ leagueName }}
      </h3>
      
      <time 
        :datetime="accessibleDate"
        class="tableContentCeil tableContentCeil_date margin-top_base-phone font-size_11">
        {{ date }}
      </time>
      
      <time 
        :datetime="accessibleDate"
        class="tableContentCeil tableContentCeil_time color_blue font-size_11 margin-top_base-phone">
        {{ time }}
      </time>
      <!-- </div> -->
    </div>
    <!-- end league -->

    <!-- begin teams -->
    <match-teams 
      :left-team-ratio="leftTeamRatio"
      :left-team-name="leftTeamName"
      :left-team-logo="leftTeamLogo"
      :left-team-country="leftTeamCountry"
      :right-team-ratio="rightTeamRatio"
      :right-team-name="rightTeamName"
      :right-team-logo="rightTeamLogo"
      :right-team-country="rightTeamCountry"
      :match-id="matchId"
      with-open-match-button
    />
    <!-- end teams -->
  </div>
</template>

<script>
import MatchTeams from "@/components/MatchTeams";
import { transformDate } from "@/constants/pureFunctions";

export default {
  name: "BetInfo",
  components: {
    MatchTeams
  },
  props: {
    leagueName: {
      type: String,
      required: true
    },
    leagueLogo: {
      type: String,
      required: true
    },
    leftTeamName: {
      type: String,
      required: true
    },
    leftTeamLogo: {
      type: String,
      required: true
    },
    leftTeamCountry: {
      type: String,
      required: true
    },
    leftTeamRatio: {
      type: Number,
      required: true
    },
    rightTeamName: {
      type: String,
      required: true
    },
    rightTeamLogo: {
      type: String,
      required: true
    },
    rightTeamRatio: {
      type: Number,
      required: true
    },
    rightTeamCountry: {
      type: String,
      required: true
    },
    matchDate: {
      type: Date,
      required: true
    },
    matchId: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
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
  methods: {
    getFormatedTime(format) {
      return transformDate(this.matchDate, format);
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'
@import '../assets/sass/conf/_easing.sass'

.tableContentRow    
  &:hover
    background-color: #f4f3f3

.nowrap_tablet
  @include breakpoint($tablet)
      flex-wrap: nowrap
.tableContentCeil
  flex: 1 0 auto
  
  &_leagueLogo
    
    @include breakpoint($phone)
      max-width: em(160, 12)
    // @include breakpoint($betsTabletLess)
      // max-width: em(120, 12)
    min-width: em(120, 12)
    padding-right: 1.3em
    @include breakpoint($phone-less)
      max-width: 45%
      justify-content: center

  
  &_leagueName
    max-width: em(236, 12)
    @include breakpoint($desktop)
      min-width: em(236, 12) //206
    @include breakpoint($desktop-less)
      min-width: em(128, 12)
    @include breakpoint($phone-less)
      min-width: 55%
      
  
  &_date
    max-width: em(64, 11)

  &_time
    max-width: em(43, 11)

.blockOffsets
  @include breakpoint($betsTabletLess)

.league
  @include breakpoint($betsTabletLess)
    margin-top: 1em
    margin-bottom: 1em


  

.font-size_11
  font-size: em(11, 12)
</style>
