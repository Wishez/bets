<template>
  <main>
    <section-container 
      :store-module-id="matchesModuleId"
      title="Матчи дня"
      with-base-soreter>
    
      <matches-slider />
    
    </section-container>

    <section-container 
      :store-module-id="betsModuleId"
      title="Биржа ставок" 
      with-base-soreter>
      <div class="width_fill bets margin-top_29 shadow_spread">
        <bets-sorter />
        <bets-table />
        <transition 
          appear 
          name="fading">
          <bets-match-popup 
            v-if="$store.state.bets.isPopupOpened"
          />
        </transition>
      </div>  
    </section-container>
  </main>
</template>

<script>
import SectionContainer from "@/components/SectionContainer";
import BetsTable from "@/components/BetsTable";
import BetsSorter from "@/components/BetsSorter";
import BetsMatchPopup from "@/components/BetsMatchPopup";

import MatchesSlider from "@/components/MatchesSlider";

import { storeModulesIds } from "@/constants/conf";

export default {
  name: "MainPage",
  components: {
    SectionContainer,
    BetsTable,
    BetsSorter,
    BetsMatchPopup,
    MatchesSlider
  },
  data: () => ({
    matchesModuleId: storeModulesIds.matches,
    betsModuleId: storeModulesIds.bets,
    isPopupOpened: false
  }),
  computed: {
    // Тестовые данные
    bet() {
      return this.$store.state.bets.bet;
    }
  },
  beforeUpdate() {
    // this.$set(this, "isPopupOpened", this.$store.state.bets.isPopupOpened);
  }
};
</script>
<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'

[type="radio"]:checked + label
    background: $buttonGradient
    color: $white
    
main
  padding-bottom: em(106)
</style>
