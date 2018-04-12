<template>
  <no-ssr>
    <form 
      id="sorter" 
      method="get"
      class="betsSorter font-size_12"
      action="#">
      <!-- begin .sorterSection -->
      <fieldset class="margin_vertical-base-tablet sorterSection sorterSection_styled margin_centered-phone">
        <legend class="visible-hidden">Сортировка по состоянию матчей</legend>
        <!-- begin  stateMatchesSorter -->
        <div class="stateMatchesSorter parent h-between height_fill wrap">
        
          <input 
            id="live-bets-input"
            v-model="betsSorter"
            type="radio" 
            name="betsSorter"
            value="liveBets"
          >
          <label 
            id="live-bets-label" 
            for="live-bets-input"
            class="betsSorter__label round_25 relative text_centered"
          >
            Live ставки
          </label>
          <input 
            id="all-input"
            v-model="betsSorter"
            type="radio" 
            name="betsSorter"
            value="all"
        
          >
          <label 
            id="all-label" 
            for="all-input"
            class="betsSorter__label round_25 relative text_centered "
          >
            Все матчи
          </label>
          <input 
            id="results-input"
            v-model="betsSorter"
            type="radio" 
            name="betsSorter"
            value="results"
          >
          <label 
            id="results-label" 
            for="results-input"
            class="betsSorter__label round_25 relative text_centered"
          >
            Результаты
          </label>
        </div>
      <!-- end  stateMatchesSorter -->
      </fieldset>
      <!-- end .stateMatchesSorter -->
            
      <!-- begin sorterSection -->
      <fieldset 
        :title="getDateRangeTitle()"
        class="sorterSection sorterSection_styled margin_vertical-base-tablet margin_centered-phone" >
        <legend class="visible-hidden">Дата:</legend>
        <!-- begin timeRangeSorter -->

        <div class="timeRangeSorter parent row h-around wrap v-centered height_fill padding-left_base relative">
              
          <span id="dataLabel">Дата:</span>
          <datepicker 
            v-model="sinceDate"
            :wrapper-class="{
              'dateInputContainer': true
            }"
            :input-class="{
              'dateInputContainer__input croped_line': true
            }"
            :title="getHumanReadableDate(sinceDate)"
            calendar-class="position_centered-phone"
            aria-labeledby="dateLabel"
            name="sinceDate"
            language="ru"
            placeholder="с"
            clear-button/>
          
          <chevron-icon 
            v-if="!sinceDate"
            position="down"
            class="absolute font-size_10 datePickerChevron datePickerChevron_since"/>
          
          <datepicker 

            v-model="untilDate"
            :wrapper-class="{
              'dateInputContainer': true
            }"
            :input-class="{
              'dateInputContainer__input croped_line': true
            }"
            :title="getHumanReadableDate(untilDate)"
            calendar-class="position_right"
            aria-labeledby="dateLabel"
            name="untilDate"
            language="ru"
            placeholder="до" 
            clear-button/>
          
          <chevron-icon 
            v-if="!untilDate"
            position="down"
            class="absolute 
            font-size_10 datePickerChevron datePickerChevron_until"/>
          
        </div>
      <!-- end timeRageSorter -->
      </fieldset>
      <!-- end sorterSection -->

      <!-- begin .sorterSection -->
      <fieldset 
        class="relative sorterSection sorterSection_styled index_big margin_vertical-base-tablet margin_centered-phone">
        <!-- begin typeSorter -->
        <div class="typeSorter padding-bottom_5 parent row centered  width_fill height_fill">
              
          <legend 
            :title="$store.state.bets.currentSorterType"
            class="typeSorter__label croped_line pading-right_1">
            <span class="visible-hidden">Сортировка по пункту: </span> 
            {{ $store.state.bets.currentSorterType }}
          </legend>

          <base-button 
            :action="switchSorterTypesState"
            :label="!$store.state.bets.isSorterTypesShown ? `Открыть выбор типа сортировки` : `Закрыть выбор типа сортировки`"
            class-name="circle typeSorter__button parent centered margin-left_auto"
            aria-haspopup="true"
            unstyled
          >
            <chevron-icon 
              :position="$store.state.bets.isSorterTypesShown ? 'up' : 'down'"
            />
          </base-button>
          <transition 
            appear 
            name="fadeTranslateToBottom">    
            <ul 
              v-if="$store.state.bets.isSorterTypesShown"
              :aria-expanded="$store.state.bets.isSorterTypesShown"
              class="absolute popupList"
              aria-label="Сортировка ставок по определённому типу"
            >
              <li 
                v-for="(type, index) in $store.state.bets.sorterTypes"
                :key="index"
              >
                <!-- Можно сделать обычными ссылками -->
                <base-button
                  :action="switchSorterTypeAndSort(type.name)"
                  unstyled
                >
                  {{ type.name }}
                </base-button>
              </li>
            </ul>
          </transition>
        </div>
      <!-- end typeSorter -->
      </fieldset>
      <!-- end .relative -->

      <!-- begin .searchSorter -->
      <fieldset class="margin_vertical-base-tablet sorterSection sorterSection_search margin_centered-phone">
        <legend 
          id="searchLabel" 
          class="visible-hidden">
          Поиск
        </legend>
        <!-- begin searchSorter -->
        <div class="searchSorter relative height_fill padding-bottom_5 padding-top_5">
              
          <label 
            for="searchSorter" 
            class="searchSorter__label color_gray font-size_16 absolute position_base"
            aria-label="Поиск">
            <search-icon />
          </label>
          <input 
            id="searchSorter"
            v-model="betsSearchSorter"
            role="search"
            placeholder="Поиск"
            type="search" 
            class="searchSorter__input width_fill height_fill"
            name="searchSorter" 
            aria-describedby="searchLabel"
          >
        </div>
      <!-- end searchSorter -->
      </fieldset>
    <!-- end .searchSorter -->
          
    </form>
  </no-ssr>
</template>

<script>
import SearchIcon from "@/components/SearchIcon";
import Datepicker from "vuejs-datepicker";

import { transformDate } from "@/constants/pureFunctions";

export default {
  name: "BetsSorter",
  components: {
    SearchIcon,
    Datepicker
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
    betsSorter: "",
    betsSearchSorter: "",
    sinceDate: "",
    untilDate: ""
  }),
  created() {
    // const choice = document.getElementById("live-bets-input");
    // if (choice) choice.click();
  },
  methods: {
    // Открытие и закрытие выбора пункта, по которому
    // будут сортироваться ставки.
    switchSorterTypesState() {
      this.$store.commit("bets/switchSorterTypesState");
    },
    // Смена типа сортировки, сортировка, с закрытием меню выбора.
    switchSorterTypeAndSort(choosenType) {
      return function() {
        this.$store.dispatch("bets/choiceSorterTypeAndCloseList", choosenType);
      };
    },
    sortBySorterType() {
      // sorterType
    },
    getHumanReadableDate(date) {
      // Без возврата неправильного формата даты.
      return date && transformDate(date, "MM.D.YYYY");
    },
    // Информирование при наведение о диапозоне сортировки по дате.
    getDateRangeTitle() {
      let title = "";

      if (this.untilDate) {
        title += `До ${this.getHumanReadableDate(this.untilDate)}; `;
      }
      if (this.sinceDate) {
        title += `С ${this.getHumanReadableDate(this.sinceDate)};`;
      }

      return title;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/conf/_colors.sass'
@import '../assets/sass/conf/_easing.sass'
@import '../assets/sass/conf/_sizes.sass'
@import '../assets/sass/conf/_breakpoints.sass'

.sorterSection
  @include breakpoint($tablet-less)
    max-width: 50%
    min-width: 45%

  // Порядок важен
  &_search
    @include breakpoint($tablet-less)
        min-width: 52%
    
  @include breakpoint($phone-less)
    min-width: 100%
  
    min-height: em(37, 12)
  
  &_styled
    border-radius: 25px
    background-color: #f4f3f3

.timeRageSorter
  margin-left: em(12, 12)
.dateInputContainer
  display: inline-block

  @include breakpoint($tablet)
    max-width: 40%
  @include breakpoint($desktop)
    max-width: em(50, 12)
  @include breakpoint($tablet-less)
    max-width: 40%
  
.typeSorter
  max-width: em(120, 12)

  &__label
    max-width: 74%
    padding: 0 1em 0 2em
  &__button
    margin-top: em(3, 12)
    min-width: em(30, 12)
    background-color: $white $i
    margin-right: em(5, 12)
    min-height: em(30, 12)
.searchSorter
  padding-left: em(21, 12)
  @include breakpoint($phone-less)
    padding-left: 0
  &__label
    top: em(8)
    left: em(21)
    font-size: em(16, 12)
    @include breakpoint($phone-less)
      left: em(5, 12)
      top: em(5, 12)
  &__input
    text-indent: 25px
    border-bottom: 1px solid $gray
    @include breakpoint($phone-less)
      text-indent: 35px
.betsSorter
    display: grid
    @include breakpoint($phone)
      grid-template-columns: repeat(2, minmax(320px, 50%))
    @include breakpoint($desktop)
      grid-template-columns: 331px 172px 125px 276px
    // grid-template-rows: repeat(6, 1fr)
    @include breakpoint($tablet)
        grid-auto-rows: 39px
    @include breakpoint($tablet-less)
        grid-auto-rows: auto
        display: flex
        flex-flow: row wrap
        justify-content: space-between
        padding-left:  1.5em
        padding-right:  1.5em
    grid-gap: em(32, 12)
    padding: em(48, 12) em(70, 12) em(20, 12)
    & > *
      object-fit: cover
    [type="radio"]
        white-space: nowrap
        overflow: hidden
        clip: rect(1px, 1px, 1px, 1px)
        width: 1px
        height: 1px
        position: absolute
    &__label
        margin-top: 3px
        height: 85%
        display: inline-block
        line-height: 2.5
        min-width: 33%
        transition: .3s $sharp


        

[type="radio"]:checked + label
    background: $buttonGradient
    color: $white
.datePickerChevron
  &_until
    right: em(20, 10)
  &_since
    
</style>
