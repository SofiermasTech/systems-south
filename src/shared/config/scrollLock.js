let openModalsCount = 0
// let scrollPosition = 0;

export const lockScroll = () => {
  if (openModalsCount === 0) {
    // Сохраняем текущую позицию скролла
    // scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    document.body.style.overflow = 'hidden'
    document.body.style.width = '100%'
  }
  openModalsCount++
}

export const unlockScroll = () => {
  openModalsCount--
  if (openModalsCount <= 0) {
    openModalsCount = 0

    document.body.style.overflow = ''
    document.body.style.width = ''
  }
}
