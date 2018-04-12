<template>
  <!-- begin teamStatusBar -->
  <div class="teamStatusBar relative background-color_white matchBetGrid h-centered">
    <!-- begin matchStatus__results -->
    <div class="matchStatusResults parent row v-centered">
      <!-- begin matchStatusResultsContainer -->
      <div class="matchStatusResultsContainer width_fill parent row font-size_12 v-end">
        
        <lazy-image 
          :src="teamLogo" 
          class-name="parent v-centered matchStatusResults__image margin-right_small"
          relative
        />

        <div class="parent column">
          <span 
            :class="{
              'status text_upper': true,
              'margin-bottom_base': !teamName
          }">{{ teamStatus }}
          </span>	
          <h3 class="font-weight_semibold font-size_16">
            {{ teamName }}
          </h3>
        </div>
      </div>
      <!-- end matchStatusResultsContainer -->
    </div>
    <!-- end matchStatus__results -->
    <!-- begin offerBet -->
    <div class="grow offerBet parent row h-around">
      

      <!-- begin matchStatus__bet -->
      <div class="matchStatusBet matchStatusBet_1 parent column relative centered">
        <check-button 
          :action="acceptNewBet('offerWin', 'offerBet', 'offerRatio')"
          class-name="absolute matchStatusBet__button" 
          label="Принять ставку"/>
        <input 
          id="offerBet"
          v-model="offerBet"
          aria-describedby="offerBetLabel"
          class="sample sample_input"
          type="number" 
          name="offerBet"
        >
        <span class="sample sample_disabled">100</span>
        <span class="sample sample_disabled">200</span>
        <span class="sample sample_disabled">100</span>
      </div>
      <!-- end matchStatus__bet -->
          
      <!-- begin matchStatus__ratio -->
      <div class="matchStatusRatio  matchStatusRatio_1 parent column centered">
        <input 
          id="offerRatio"
          v-model="offerRatio"
          aria-describedby="offerRatioLabel"
          class="sample sample_input"
          type="number" 
          name="offerRatio"
        >
        <span class="sample sample_disabled">3.5</span>
        <span class="sample sample_disabled">3.4</span>
        <span class="sample sample_disabled">3</span>
      </div>
      <!-- end matchStatus__ratio -->
      
      <!-- begin matchStatus__win -->
      <div class="matchStatusWin matchStatusWin_1 parent column centered">
        <input 
          id="offerWin"
          v-model="offerWin"
          aria-describedby="offerRatioLabel"
          class="sample sample_disabled"
          type="number" 
          name="offerRatio"
          readonly
        >
        <span class="sample sample_disabled">350</span>
        <span class="sample sample_disabled">680</span>
        <span class="sample sample_disabled">300</span>
      </div>
    <!-- end matchStatus__win -->
    </div>
    <!-- end offerBet -->

    <!-- begin acceptBet -->
    <div class="grow v-end acceptBet parent row h-around">
          	
      <!-- begin matchStatus__bet -->
      <div class="matchStatusBet matchStatusBet_2 parent column centered">
        <input 
          v-model="acceptBet1"
          aria-describedby="offerRatioLabel"
          class="sample sample_input"
          type="number" 
          name="acceptBet1"
          placeholder="350"
          
        >
        <input 
          v-model="acceptBet2"
          aria-describedby="offerRatioLabel"
          class="sample sample_input"
          type="number" 
          name="acceptBet2"
          placeholder="680" 
        
        >
        <input 
          v-model="acceptBet3"
          aria-describedby="offerRatioLabel"
          class="sample sample_input"
          type="number" 
          name="acceptBet3"
          placeholder="300" 
        >
      </div>
      <!-- end matchStatus__bet -->

      <!-- begin matchStatus__ratio -->
      <div class="matchStatusRatio matchStatusRatio_2 parent column centered">
        <span class="sample sample_disabled">{{ acceptRatio1 }}</span>
        <span class="sample sample_disabled">{{ acceptRatio2 }}</span>
        <span class="sample sample_disabled">{{ acceptRatio3 }}</span>
      </div>
      <!-- end matchStatus__ratio -->
  
      <!-- begin matchStatus__win -->
      <div class="matchStatusWin matchStatusWin_2 parent column centered">
        <span class="sample sample_disabled">{{ acceptWin1 }}</span>
        <span class="sample sample_disabled">{{ acceptWin2 }}</span>
        <span class="sample sample_disabled">{{ acceptWin3 }}</span>
      </div>
      <!-- end matchStatus__win -->
    <!-- end matchStatus__buttons -->
    </div>
    <!-- begin matchStatus__buttons -->
    <div class="matchStatusButtons parent column h-end">
      <check-button 
        :action="acceptNewBet('acceptWin1', 'acceptBet1', 'acceptRatio1')"
        label="Принять ставку"
      />
      <check-button 
        :action="acceptNewBet('acceptWin2', 'acceptBet2', 'acceptRatio2')" 
        label="Принять ставку"
        
      />
      <check-button 
        :action="acceptNewBet('acceptWin3', 'acceptBet3', 'acceptRatio3')" 
        label="Принять ставку"
        
      />
    </div>
    <!-- end acceptBet -->
  </div>
  <!-- end teamStatusBar -->
</template>

<script>
import CheckButton from "@/components/CheckButton";

export default {
  name: "TeamStatusBar",

  components: {
    CheckButton
  },
  mixins: [],
  props: {
    teamName: {
      type: String,
      required: true
    },
    teamLogo: {
      type: String,
      required: true
    },
    teamStatus: {
      type: String,
      required: true,
      validate: function(value) {
        return ["win", "loose"].indexOf(value) !== -1;
      }
    },
    acceptRatio1: {
      type: Number,
      required: true
    },
    acceptRatio2: {
      type: Number,
      required: true
    },
    acceptRatio3: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    clickCounter: 0,
    offerBet: "",
    offerRatio: "",
    offerWin: "",
    acceptBet1: 350,
    acceptBet2: 680,
    acceptBet3: 300,
    acceptWin1: "",
    acceptWin2: "",
    acceptWin3: ""
  }),
  beforeMount() {
    this.updateWinValue("acceptWin1", this.acceptBet1, this.acceptRatio1);
    this.updateWinValue("acceptWin2", this.acceptBet2, this.acceptRatio2);
    this.updateWinValue("acceptWin3", this.acceptBet3, this.acceptRatio3);
  },
  methods: {
    fixNumber(number) {
      return number.toFixed(0);
    },
    updateWinValue(winFieldName, newBet, ratio) {
      // Gate для проверки наличния значений.
      if (newBet && ratio) {
        const winValue = this.fixNumber(newBet * ratio);

        this.$set(this, winFieldName, winValue);
      }
    },
    // Функция для расчёта коэффициента.
    acceptNewBet(winFieldName, betFieldName, ratioFieldName) {
      return () => {
        this.updateWinValue(
          winFieldName,
          this[betFieldName],
          this[ratioFieldName]
        );
      };
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_breakpoints.sass'

.tableHead ~ .teamStatusBar

.teamStatusBar
  transition: transform .2s $sharp, box-shadow .2s $sharp, z-index .2s $sharp, padding .2s $sharp
  will-change: transform, padding, box-shadow
  z-index: 1
  &:last-of-type
    padding-bottom:  1.5em
  @include breakpoint($phone)
    padding-top: 1em
  &:hover
    @include breakpoint($phone)
      padding-bottom: 1em
    @include breakpoint($phone-less)
      padding-bottom: 1.5em
    transform: scale(1.035)
    z-index: 2
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.25)


.matchStatus

  &Results

    &__image
      max-width: em(30, 12)

  &Bet

    &_1
      grid-area: bet1
    &_2
      grid-area: bet2

    &__button
      left: em(-28)
      top: 0
      @include breakpoint($phone-less)
        left: 223px

  &Ratio

    &_1
      grid-area: ratio1
    &_2
      grid-area: ratio2

  &Win

    &_1
      grid-area: win1
    &_2
      grid-area: win2

  &Buttons
    min-width: em(42)
    @include breakpoint($phone)
      // transform: translateX(2.4em)
      min-width: em(86)
      padding-left: em(30)
    @include breakpoint($tablet)
      transform: translateX(-4px)
      padding-left: 0
      min-width: 0
.matchStatusResultsContainer 
  margin-top: em(15, 12)
  margin-left: em(-6, 12)
  @include breakpoint($tablet-less)
    justify-content: center
    // transform: translateY(4em)
.status
  color: #a4a7ae
  font-size: em(10, 12)

.sample
  min-width: em(61, 11.4)
  margin: .2em auto
  display: block
  max-width: em(61, 11.4)
  font-size: em(11.4)
  padding: .25em .25em
  text-align: center
  min-height: em(22, 11.4)
  &_input
    border: 1px solid #ccc
    text-indent: 16px 

  &_disabled
    background-color: #f8f8f8
    font-weight: 600
</style>
