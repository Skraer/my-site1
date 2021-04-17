class ScrollImage {
  constructor(selector, { rangeSelector }) {
    this.el = document.querySelector(selector)
    this.track = document.querySelector(rangeSelector)
    this.setup()
  }
  setup() {
    const imgElem = this.el.querySelector('img')
    this.el.style.backgroundImage = 'url(' + imgElem.getAttribute('src') + ')'
    this.el.style.backgroundPosition = '0%'
    imgElem.remove()

    this.track.addEventListener('input', e => {
      this.el.style.backgroundPosition = (this.track.value / 10) + '%'
    })
  }
}

const scrollImage = new ScrollImage('.scroll-image', {
  rangeSelector: '.range'
})