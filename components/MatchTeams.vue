<template>
  <!-- begin teams -->
  <div :class="`teams wrap blockOffsets grow parent row height_fill v-centered margin_vertical-small-phone ${className}`">
      
    <!-- begin team team_left -->
    <div 
      :class="[
        'width_fill-phone  team team_left parent row v-centered height_fill grow margin_vertical-small-phone row_reverse-phone row_reverse-phone', 
        namesBeneathLogo ? 'h-around' : null,
        leftTeamClass
    ]">
      <!-- begin teamName -->
      <div 
        v-if="!namesBeneathLogo"
        :class="`child team__name text_right font-size_11 ${teamNameClass}`"> 
        {{ leftTeamName }}
      </div>
      <!-- end teamName -->

      <!-- begin teamLogo -->
      <div class="child team__logo parent column centered">
        <lazy-image 
          :src="leftTeamLogo" 
          :class-name="`team__logo_image margin_centered ${teamLogoClass}`"
          relative/>
        <span 
          v-if="namesBeneathLogo"
          :class="`team__name text_centered font-weight_semibold ${teamNameClass} ${leftTeamNameClass}`">
          {{ rightTeamName }}
        </span>
      </div>
      <!-- end teamLogo -->

      <!-- begin teamCountry -->
      <div 
        :class="{
          'child team__country': true ,
          'order_first': namesBeneathLogo
      }">
        <lazy-image 
          :src="leftTeamCountry" 
          :class-name="`parent centered ${teamCountryClass}`"
          circle
          relative/>

      </div>
      <!-- end teamLogo -->

      <!-- begin teamRatio -->
      <div :class="`child team__ratio ${ratioContainerClass}`">
        <p 
          :class="{
            'color_blue parent centered team__ratio_info margin-top_zero margin_centered font-weight_bold bordered bordered_blue' : true, 
            'team__ratio_info-size-9' : isSmallRatio,
            [teamRatioClass]: teamRatioClass
        }"> 
          {{ fixFloat(leftTeamRatio) }}
        </p>
      </div>
      <!-- end teamRatio -->

    </div>
    <!-- end teamLeft -->

    <!-- begin versus -->
    <div 
      :class="{'child versus text_centered font-weight_bold color_gray grow margin_centered-phone margin_vertical-small-phone' : true,
               'versus_size-18': isBigVersus,
               [versusClass]: versusClass

    }">
      VS
    </div>
    <!-- end versus -->

    <!-- begin team team_right -->
    <div 
      :class="[
        'width_fill-phone team team_right parent row v-centered height_fill grow margin_vertical-small-phone', 
        namesBeneathLogo ? 'h-around' : null,
        rightTeamClass
    ]">

      <!-- begin teamRatio -->  
      <div :class="`child team__ratio ${ratioContainerClass}`">
        <p 
          :class="{'margin-top_zero color_blue parent centered margin_centered team__ratio_info  font-weight_bold bordered bordered_blue' : true,
                   'team__ratio_info-size-9' : isSmallRatio,
                   [teamRatioClass]: teamRatioClass
        }"> 
          {{ fixFloat(rightTeamRatio) }}
        </p>
      </div>
      <!-- end teamRatio -->

      <!-- begin teamCountry -->
      <div 
        :class="{
          'child team__country': true ,
          'order_last': namesBeneathLogo
      }">
        <lazy-image 
          :src="rightTeamCountry" 
          :class-name="`parent centered ${teamCountryClass}`"
          circle
          relative/>

      </div>
      <!-- end teamCountry -->

      <!-- begin teamLogo -->
      <div
        class="child team__logo parent column centered">
        <lazy-image 
          :src="rightTeamLogo" 
          :class-name="`team__logo_image margin_centered ${teamLogoClass}`"
          relative/>
        <span 
          v-if="namesBeneathLogo"
          :class="`team__name text_centered font-weight_semibold ${teamNameClass}`">
          {{ rightTeamName }}
        </span>
      </div>
      <!-- end teamLogo -->

      <!-- begin teamName -->
      <div 
        v-if="!namesBeneathLogo"
        :class="`child team__name text_left font-size_11 ${teamNameClass}`">
        {{ rightTeamName }}
      </div>
      <!-- end teamName -->
    </div>
    <!-- end team team_right -->

    <!-- begin watchMatch -->
    <div 
      v-if="withOpenMatchButton"
      class="child  watchMatch parent centered margin_vertical-small-phone margin_centered-phone">
      <base-button 
        :action="openMatch"
        :label="`Открыть просмотр матча ${leftTeamName} против ${rightTeamName}.`"
        class-name="parent centered bordered_darkBlue bordered grow_phone margin_base-phone watchMatch__button color_darkBlue"
        unstyled>
        <icon name="youtube-play" />
      </base-button>
    </div>
    <!-- end watchMatch -->

  </div>
  <!-- end teams -->
</template>

<script>
export default {
  name: "MatchTeams",
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
    namesBeneathLogo: {
      type: Boolean,
      required: false,
      default: false
    },
    isBigVersus: {
      type: Boolean,
      required: false,
      default: false
    },
    isSmallRatio: {
      type: Boolean,
      required: false,
      default: false
    },
    withOpenMatchButton: {
      type: Boolean,
      required: false,
      default: false
    },
    teamLogoClass: {
      type: String,
      required: false,
      default: ""
    },
    teamNameClass: {
      type: String,
      required: false,
      default: ""
    },
    rightTeamClass: {
      type: String,
      required: false,
      default: ""
    },
    leftTeamClass: {
      type: String,
      required: false,
      default: ""
    },
    teamRatioClass: {
      type: String,
      required: false,
      default: ""
    },
    leftTeamNameClass: {
      type: String,
      required: false,
      default: ""
    },
    ratioContainerClass: {
      type: String,
      required: false,
      default: ""
    },
    versusClass: {
      type: String,
      required: false,
      default: ""
    },
    teamCountryClass: {
      type: String,
      required: false,
      default: ""
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
    matchId: {
      type: String,
      required: true
    }
  },
  methods: {
    openMatch() {
      this.$store.dispatch("bets/openPopupAndLoadMatch", this.matchId);
    },
    fixFloat(number) {
      return number.toFixed(2);
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'
@import '../assets/sass/conf/_easing.sass'

.teams
  @include breakpoint($betsTabletLess)
    margin-top: .5em
    margin-bottom: 1.5em
.tableContentRow    
  &:hover
    .team__ratio_info 
      background-color: $blue $i
      color: $white
  
.child
	flex: 1 0 auto
.team
	@include breakpoint($phone-less)
		justify-content: space-around
 	// Контейнер
	&__logo
		min-width: em(40, 12)
		max-width: em(65, 12)

		// Изображение
		&_image
	    	max-width: em(30, 12)

	&__name
		min-width: em(90, 11)
		max-width: em(90, 11)
		@include breakpoint($phone-less)
			text-align:  left

	// Контейнер
	&__ratio
		max-width: em(50, 12)

		// Соотношение
		&_info
      max-width: em(32, 12)
      padding: .5em 0.15em .5em 0
      &-size-9
        font-size: em(9, 12)

	&__country
		max-width: em(27.5, 12)

		.imageContainer
			max-width: em(27.5, 12)
			min-height: em(27.5, 12)

.watchMatch
	@include breakpoint($tablet-less)
    	max-width: em(270, 12)
	&__button
	    &:active, &:focus, &:hover
	      	color: $blue
	    @include breakpoint($tablet)
	        padding: .25em
	        border-width: 1px $i
	    @include breakpoint($desktop)
	        border-width: 0 $i
	    @include breakpoint($tablet-less)
	        padding: .25em
	        border-width: 1px $i
	        max-width: em(100, 12)
.versus
  max-width: em(29, 12)
  color: #989ba4
  &_size-18
    font-size: em(18, 12)
</style>
