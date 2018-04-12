export const state = () => ({
  isPersonalRoomOpened: false
});

export const mutations = {
  switchPersonalRoomDisplayState(state, opened = false) {
    state.isPersonalRoomOpened = opened;
  }
};
