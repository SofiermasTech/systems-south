import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    currentPopup: null,
    isPopupVisible: false,
  }),
  getters: {
    getCurrentPopup: (state) => state.currentPopup,
    isVisible: (state) => state.isPopupVisible,
  },
  actions: {
    showPopup({ component, props = {} }) {
      console.log('Showing popup:', component, props)
      this.currentPopup = { component, props }
      this.isPopupVisible = true
      document.body.style.overflowY = 'hidden';
    },
    hidePopup() {
      console.log('Hiding popup')
      this.currentPopup = null
      this.isPopupVisible = false
      document.body.style.overflowY = '';
    },
  },
})
