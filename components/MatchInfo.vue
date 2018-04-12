<template>
  <article 
    :class="{
      'matchContainer': true,
      [className]: className,
  }">

    <!-- begin matchInfo -->
    <div class="matchInfo  margin-top_33 relative parent row wrap shadow_spread">
      
      <h3 class="matchInfo__title font-weight_semibold font-size_12 parent centered width_fill">{{ leagueName }}</h3>
      <h4 class="matchInfo__subtitle font-weight_light font-size_10 parent centered width_fill">{{ leagueStage }}</h4>

      <!-- begin team -->
      <div class="team centered parent column">
        <h4 class="font-size_14 font-weight_semibold">{{ leftTeamName }}</h4>
        <lazy-image 
          :src="leftTeamLogo"
          class-name="team__logo order_first parent centered"
          relative/>						
        <span class="font-weight_bold color_blue font-size_12">{{ leftTeamRatio }}</span>
      </div>
      <!-- end team -->

      <!-- begin matchMeta -->
      <div class="grow matchMeta parent column centered">
        <lazy-image 
          :src="gameImages.gameLogo"
          class-name="matchMeta__gameLogo parent centered relative"
          relative 
          fit
        />		
        <time 
          :datetime="accesibleDate()" 
          class="parent column centered matchMetaTime">
          <span class="dayAndMonth font-size_10 font-weight_semibold">{{ getDate() }}</span>
          <span class="time">{{ getTime() }}</span>
        </time>	
      </div>
      <!-- end matchMeta -->

      <!-- begin team -->
      <div class="team grow centered parent column">
        <h4 class="font-size_14 font-weight_semibold">{{ rightTeamName }}</h4>
        <lazy-image 
          :src="rightTeamLogo"
          class-name="team__logo order_first parent centered"
          relative />			
        <span class="font-weight_bold color_blue font-size_12">{{ rightTeamRatio }}</span>
      </div>
      <!-- end team -->
      <lazy-image 
        :src="gameImages.gameBackground"
        class-name="position_base"
        is-image-fill-container
        absolute/>
    </div>
    <!-- image-classes="width_fill" -->
    <!-- end matchInfo -->

    
  </article>
</template>

<script>
import { transformDate } from "@/constants/pureFunctions";
import { csgo, dota, hs, lol, ow } from "@/assets/images/icons";
import {
  csgo_bg,
  dota_bg,
  hs_bg,
  lol_bg,
  ow_bg
} from "@/assets/images/backgrounds";
import { games } from "@/constants/conf";

export default {
  name: "MatchInfo",
  components: {},
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
    leagueName: {
      type: String,
      required: true
    },
    leagueStage: {
      type: String,
      required: false,
      default: "Group Stage"
    },
    leftTeamName: {
      type: String,
      required: true
    },
    leftTeamLogo: {
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
    matchDate: {
      type: Date,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    gameImages() {
      // console.log(this.gameId);
      let gameLogo = "";
      let gameBackground = "";

      switch (this.gameId) {
        case games.dota:
          gameLogo = dota;
          gameBackground = dota_bg;
          break;
        case games.csgo:
          gameLogo = csgo;
          gameBackground = csgo_bg;
          break;
        case games.hs:
          gameLogo = hs;
          gameBackground = hs_bg;
          break;
        case games.lol:
          gameLogo = lol;
          gameBackground = lol_bg;
          break;
        case games.ow:
          gameLogo = ow;
          gameBackground = ow_bg;
          break;
        default:
        // throw new TypeError(`There is no the game with id ${this.gameId}.`);
      }

      return {
        gameLogo,
        gameBackground
      };
    }
  },
  methods: {
    getDate() {
      return transformDate(this.matchDate, "D MMMM");
    },
    getTime() {
      return transformDate(this.matchDate, "HH:mm");
    },
    accesibleDate() {
      return transformDate(this.matchDate, "L");
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'

.matchContainer
  max-width: em(262.5)
  display: inline-block
  &:first-of-type
    // padding-left: em(29 / 2)
  // padding: 0 em(29 / 2)
//   min-width: em(233)
.matchInfo
  // max-width: em(200)
  padding: em(10) em(14) em(16) em(25)
  margin-bottom: em(21)
.matchInfo__subtitle
  margin-bottom: em(7)

.team
	&__logo
    max-width: 48px
    margin-bottom: em(11)
.matchMeta
  margin: 0 em(18)
  max-width: em(70)
  &__gameLogo
    margin-bottom: em(29)
    top: em(9)
    max-width: em(17)
</style>
