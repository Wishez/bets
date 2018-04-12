// https://ru.nuxtjs.org/guide/vuex-store#%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D1%8F-%D1%85%D1%80%D0%B0%D0%BD%D0%B8%D0%BB%D0%B8%D1%89%D0%B0
export const state = () => ({
  activeGameId: ""
});

export const mutations = {
  changeGameId(state, id) {
    state.activeGameId = id;
  }
};
