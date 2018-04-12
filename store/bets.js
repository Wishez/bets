import { international, mdl } from "@/assets/images/league";
import { eg, newbee, wings, teamliquid } from "@/assets/images/logos";

import { eu, cn } from "@/assets/images/flags";

import { timeout } from "@/constants/pureFunctions";

function generateBets() {
  let bets = [];

  for (let i = 0; i < 6; i++) {
    bets = [
      ...bets,
      {
        leftTeam: {
          ratio: 1.99,
          name: "Neewbee",
          country: cn,
          logo: newbee
        },
        rightTeam: {
          ratio: 1.78,
          name: "Evil Geniuses",
          country: cn,
          logo: eg
        },
        league: {
          name: "The International 2018",
          logo: international
        },
        match: {
          date: new Date("08.08.2017 19:00"),
          id: "4321"
        }
      },
      {
        leftTeam: {
          ratio: 2.2,
          name: "Team Liquid",
          country: eu,
          logo: teamliquid
        },
        rightTeam: {
          ratio: 1.86,
          name: "Wings Gaming",
          country: cn,
          logo: wings
        },
        league: {
          name: "MarsDota2League",
          logo: mdl
        },
        match: {
          date: new Date("08.08.2017 19:00"),
          id: "1234"
        }
      }
    ];
  }

  return bets;
}

export const state = () => ({
  activeGameId: "dota",
  currentSorterType: "Турнир",
  isSorterTypesShown: false,
  isPopupOpened: false,
  choosenMatchId: false,
  bets: generateBets(),
  bet: {
    leftTeam: {
      ratio: 1.78,
      name: "Team Liquid",
      country: eu,
      logo: teamliquid
    },
    rightTeam: {
      ratio: 1.78,
      name: "Evil Geniuses",
      country: cn,
      logo: eg
    },
    league: {
      name: "The International 2018",
      stage: "Grop Stage"
    },
    match: {
      date: new Date("08.08.2017 19:00"),
      id: "4321",
      status: {
        logo: eg,
        teamName: "Evil Geniuses",
        state: "Победа",
        ratio1: 1,
        ratio2: 1,
        ratio3: 1
      }
    },
    channels: [
      "OgamingSC2",
      "ESL_SC2",
      "Adobe",
      "scvalkyrie",
      "iNcontrolTV",
      "TSM_Hauntzer"
    ]
    //   first: {
    //     id: ""
    //   },
    //   second: {
    //     id: ""
    //   }
    // }
  },
  sorterTypes: [
    {
      name: "Турнир"
    },
    {
      name: "Левая команда"
    },
    {
      name: "Правая команда"
    }
  ]
});

export const mutations = {
  switchGameId(state, activeGameId) {
    state.activeGameId = activeGameId;
  },
  switchPopupState(state, openend = false) {
    state.isPopupOpened = openend;
  },
  setChoosenMatchId(state, id = "") {
    state.choosenMatchId = id;
  },
  switchSorterTypesState(state) {
    state.isSorterTypesShown = !state.isSorterTypesShown;
  },
  setChoosenSorterType(state, choosenSorterType) {
    state.currentSorterType = choosenSorterType;
  }
};

export const actions = {
  choiceSorterTypeAndCloseList({ commit }, choosenSorterType) {
    commit("setChoosenSorterType", choosenSorterType);
    commit("switchSorterTypesState");
  },
  closePopupAndCleanState({ commit }) {
    // Второй аргумент каждой функции по умолчанию
    // содержит состояние свойства "по умолчанию".
    commit("switchPopupState");
    commit("setChoosenMatchId");
  },
  openPopupAndLoadMatch({ commit }, matchId) {
    commit("setChoosenMatchId", matchId);
    timeout(function() {
      commit("switchPopupState", true);
    }, 500);
  }
};
