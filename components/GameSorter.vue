<template>
  <form 
    :class="{
      'gameSorter parent row v-centered margin-left_auto': true,
      'h-between gameSorter_shown': isShownAll,
      'gameSorter_hidden': !isShownAll
    }"
    action="#"
  >
    <!-- begin gameSorter -->
    <base-button 
      :action="switchDiplayGames"
      :label="isShownAll ? 'Показать все игры' : 'Скрыть все игры'"
      :class-name="`gameSorter__button baseChild circle  parent centered ${!isShownAll ? 'button_blue' : 'button_gray'}`"
      unstyled>
      <icon name="list-ul" />
    </base-button>
    
    <ul class="baseChild h-between v-centered games parent row">
      <li 
        v-for="(game, index) in games" 
        :key="index"
        :class="{
          'game margin-top_05': true,
          'game_active': game.id === $store.state[storeModuleId].activeGameId,
          'order_first': !isShownAll && game.id === $store.state[storeModuleId].activeGameId,
          'opacity_half': game.id !== $store.state[storeModuleId].activeGameId,
          'opacity_zero index_negative': !isShownAll && game.id !== $store.state[storeModuleId].activeGameId

      }">
        <base-button
          :data-id="game.id"
          :action="changeGame(game.id)"
          :label="game.label" 
          unstyled
        >

          <lazy-image 
            :src="game.image" 
            :alt="game.label" 
            :title="game.label"
            relative
          />
	          
        </base-button>

      </li>
    </ul>
    
    <!-- end gameSorter -->

  </form>
</template>

<script>
import { csgo, dota, hs, lol, ow } from "@/assets/images/icons";

import { games, activeGamesIds } from "@/constants/conf";

// https://github.com/js-cookie/js-cookie
import Cookies from "js-cookie";
// If you need async actions, then, you can use it
// https://github.com/localForage/localForage#callbacks-vs-promises

export default {
  name: "GameSorter",
  props: {
    storeModuleId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isShownAll: false,
    activeGameId: Cookies.get(activeGamesIds[this.storeModuleId]) || "dota",
    games: [
      {
        id: games.dota,
        image: dota,
        label: "Dota 2"
      },
      {
        id: games.csgo,
        image: csgo,
        label: "Csgo"
      },
      {
        id: games.lol,
        image: lol,
        label: "League of Legends"
      },
      {
        id: games.hs,
        image: hs,
        label: "Hearth Stone"
      },
      {
        id: games.ow,
        image: ow,
        label: "Owerwatch"
      }
    ]
  }),
  computed: {},
  beforeCreate() {
    // /this.$store.getItem('activeGameId');
  },
  created() {},
  mounted() {
    this.$store.commit(
      `${this.storeModuleId}/switchGameId`,
      Cookies.get(activeGamesIds[this.storeModuleId]) || "dota"
    );
  },

  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  methods: {
    switchDiplayGames() {
      this.$set(this, "isShownAll", !this.isShownAll);
    },
    changeGame(choosenGameId) {
      // Каррирую функцию, чтобы не было проблем
      // с выбором узла.
      return () => {
        this.$store.commit(`${this.storeModuleId}/switchGameId`, choosenGameId);

        Cookies.set(activeGamesIds[this.storeModuleId], choosenGameId);
      };
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'

.games
  min-width: em(190)
.gameSorter
  will-change: transform
  transition: transform .3s $sharp
  &_shown
    transform: translateX(0)
  &_hidden
    transform: translateX(10em)

  min-width: em(235)
  &__button
    max-width: em(30)
    min-height: em(30)
    height: 1px
    margin-right: .9em
.game
  padding: 0
  filter: grayscale(1)
  // opacity: .5
  will-change: filter, opacity, transform
  transition: filter .2s $sharp, opacity .2s $sharp, transform .2s $sharp
  max-width: 27px
  &:hover
    transform: scale(1.04)
  &:hover, &_active
    opacity: 1
  &_active
    filter: grayscale(0)
</style>
