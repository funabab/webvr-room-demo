const onLoaded = (function () {
  let elLoadingScreen: HTMLDivElement
  let elActionBtn: HTMLButtonElement
  let elpreloader: HTMLImageElement

  window.addEventListener('DOMContentLoaded', () => {
    elLoadingScreen = document.getElementById(
      'loading-screen'
    ) as HTMLDivElement

    elActionBtn = document.getElementById('btn-action') as HTMLButtonElement

    elpreloader = document.getElementById('img-preloader') as HTMLImageElement

    elActionBtn.addEventListener(
      'click',
      () => {
        elLoadingScreen.style.display = 'none'
      },
      { once: true }
    )

    elActionBtn.style.display = 'none'
    elpreloader.style.display = 'inline-block'
  })

  return () => {
    elActionBtn.style.display = 'inline-block'
    elpreloader.style.display = 'none'
  }
})()
AFRAME.registerComponent('preloader', {
  init: function () {
    this.el.sceneEl?.addEventListener('loaded', onLoaded)
  },
  remove: function () {
    this.el.sceneEl?.removeEventListener('loaded', onLoaded)
  },
})
