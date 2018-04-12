<template>
  <modal-container
    :on-close-modal="closePopup
    ">
    <article 
      class="popupMatch" 
    >
      <bets-match-popup-header 
        :bet="bet" />
      <!-- begin popupMatchTitles -->
      <div class="popupMatchTitles text_upper matchBetGrid text_right">
        <!-- begin matchStatusResults -->
        <div class="matchStatusResults"/>
        <!-- end matchStatusResults -->
        <p 
          class="offerBet font-weight_semibold text_upper font-size_12 margin-top_zero parent centered alignParagraph"
        >
          Предложить ставку
        </p>
        <p 
          class="acceptBet font-weight_semibold text_upper font-size_12 margin-top_zero parent centered alignParagraph"
        >
          Принять ставку
        </p>
        <div class="matchStatusButtons"/>
      </div>
      <!-- end popupMatchButtons -->
      <!-- begin matchStatus -->
      <div class="matchStatus">
        <!-- begin userBetsHeader -->
        <div class="tableHead growChilds matchBetGrid matchBetGrid_singleLine-tablet parent row font-size_10 h-around">

          <!-- begin matchStatus__results -->
          <div class="matchStatusResults text_centered">
            Результаты
          </div>
          <!-- end matchStatus__results -->
          <!-- begin offerBet -->
          <div class="growChilds  translateX_large-quarter-tablet offerBet parent row h-around">

            <!-- begin matchStatus__bet -->
            <div 
              id="offerBetLabel" 
              class="matchStatus__bet">
              Ставка
            </div>
            <!-- end matchStatus__bet -->
          
            <!-- begin matchStatus__ratio -->
            <div 
              id="offerRatioLabel" 
              class="matchStatus__ratio">
              Коэф-т.
            </div>
            <!-- end matchStatus__ratio -->

            <!-- begin matchStatus__win -->
            <div class="matchStatus__win">
              Выигрыш
            </div>

          <!-- end matchStatus__win -->
          </div>
          <!-- end offetBet -->

        
          <!-- begin acceptBet -->
          <div class="growChilds display_none-tablet acceptBet parent row h-around">
            <!-- begin matchStatus__bet -->
            <div 
              id="acceptBetLabel" 
              class="matchStatus__bet">
              Ставка
            </div>
            <!-- end matchStatus__bet -->

            <!-- begin matchStatus__ratio -->
            <div 
              id="acceptRatioLabel" 
              class="matchStatus__ratio">
              Коэф-т.
            </div>
            <!-- end matchStatus__ratio -->
  
            <!-- begin matchStatus__win -->
            <div class="matchStatus__win">
              Выигрыш
            </div>
          </div>
          <!-- end acceptBet -->

          <!-- begin matchStatusButtons -->
          <!-- Плейсхолдер для ровной сетки -->
          <div class="matchStatusButtons"/>
          <!-- end matchStatusButtons -->
        </div>
        <!-- end userBets -->
      
        <team-status-bar 
          :team-name="bet.match.status.teamName"
          :team-status="bet.match.status.state"
          :team-logo="bet.match.status.logo"
          :accept-ratio1="bet.match.status.ratio1"
          :accept-ratio2="bet.match.status.ratio2"
          :accept-ratio3="bet.match.status.ratio3"
        />
        <team-status-bar 
          :team-logo="bet.match.status.logo"
          :accept-ratio1="1"
          :accept-ratio2="2"
          :accept-ratio3="3"
          team-name="Team Name"
          team-status="Поражение"
        />
        <team-status-bar 
          :team-logo="drawImage"
          :accept-ratio1="1.618"
          :accept-ratio2="1.4"
          :accept-ratio3="1.2"
          team-name=""
          team-status="Ничья"
        />
      </div>
      <!-- end matchStatus -->
    </article>
    <!-- end meta -->
    
  </modal-container>              
</template>

<script>
import { cup } from "@/assets/images/icons";

import ModalContainer from "@/components/ModalContainer";
import BetsMatchPopupHeader from "@/components/BetsMatchPopupHeader";
import TeamStatusBar from "@/components/TeamStatusBar";

export default {
  name: "BetsMatchPopup",
  components: {
    ModalContainer,
    TeamStatusBar,
    BetsMatchPopupHeader
  },
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
    }
  },
  data: () => ({
    drawImage: cup
  }),
  computed: {
    bet() {
      return this.$store.state.bets.bet;
    }
  },
  methods: {
    closePopup() {
      this.$store.dispatch("bets/closePopupAndCleanState");
    },
    increaseBet() {},
    acceptBet() {}
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/conf/_colors.sass"
@import "../assets/sass/conf/_sizes.sass"
@import "../assets/sass/conf/_breakpoints.sass"
@import "../assets/sass/conf/_easing.sass"

.growChilds
  justify-content: flex-between
  & > *
    flex-grow: 1
    margin-left: em(5, 10)
    margin-right: em(5, 10) 
    min-width: em(61, 10)
    @include breakpoint($tablet-less)
      margin-left: em(2.5, 10)
      min-width: em(55, 10)
.offerBet     
  @include breakpoint($tablet-less)
      min-width: em(220, 10)
.popupMatchTitles
  margin-bottom: em(11)
  @include breakpoint($tablet-less)
    display: flex
    justify-content: space-around

  
.alignParagraph
  @include breakpoint($tablet)
      margin-left: em(-8, 12)
  @include breakpoint($tablet-less)
    justify-content: center
  @include breakpoint($phone-less)
      min-width: 0
  letter-spacing: .05em;
</style>
