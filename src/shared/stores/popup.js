import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    currentPopupName: null,
    secondaryPopupName: null,
    currentPopupProps: {},
    secondaryPopupProps: {},
  }),
  getters: {
    isPopupVisible: (state) => !!state.currentPopupName || !!state.secondaryPopupName,
  },
  actions: {
    showPopup(name, props = {}) {
      console.log('Showing popup:', name, props)
      this.currentPopupName = name
      this.currentPopupProps = props
    },
    showSecondaryPopup(name, props = {}) {
      this.secondaryPopupName = name
      this.secondaryPopupProps = props
    },
    hidePopup() {
      console.log('Hiding popup')
      this.currentPopupName = null
      this.currentPopupProps = {}
      this.secondaryPopupName = null
      this.secondaryPopupProps = {}
    },
    hideSecondaryPopup() {
      this.secondaryPopupName = null
      this.secondaryPopupProps = {}
    },
  },
})
