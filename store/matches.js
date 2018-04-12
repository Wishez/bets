import { eg, vp } from "@/assets/images/logos";

function generateMatches() {
  let matches = [];

  for (let i = 0; i < 10; i++) {
    matches = [
      ...matches,
      {
        leftTeam: {
          ratio: 1.42,
          name: "EG",
          logo: eg
        },
        rightTeam: {
          ratio: 2.27,
          name: "VP",
          logo: vp
        },
        league: {
          name: "MarsDota2League",
          stage: "Group Stage"
        },
        match: {
          date: new Date("08.08.2017 18:00")
        },
        game: {
          id: "dota"
        }
      }
    ];
  }

  return matches;
}

export const state = () => ({
  activeGameId: "dota",
  matches: generateMatches()
});

export const mutations = {
  switchGameId(state, activeGameId) {
    state.activeGameId = activeGameId;
  }
};
