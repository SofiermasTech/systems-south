import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    currentPopupName: null, // например, 'search', 'cart' и т.п.
    currentPopupProps: {}, // пропсы для текущего попапа
  }),
  getters: {
    isPopupVisible: (state) => !!state.currentPopupName,
  },
  actions: {
    showPopup(name, props = {}) {
      console.log('Showing popup:', name, props)
      this.currentPopupName = name
      this.currentPopupProps = props
    },
    hidePopup() {
      console.log('Hiding popup')
      this.currentPopupName = null
      this.currentPopupProps = {}
    },
  },
})
