import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    currentPopup: null, // { component: String, props: Object }
  }),
  getters: {
    getCurrentPopup: (state) => state.currentPopup,
  },
  actions: {
    showPopup({ component, props = {} }) {
      console.log('Showing popup:', component, props);
      this.currentPopup = { component, props }
    },
    hidePopup() {
      console.log('Hiding popup');
      this.currentPopup = null
    },
  },
})
