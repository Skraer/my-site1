const toggleBodyLock = (state) => {
  if (state !== undefined) {
    state
      ? document.querySelector('body').classList.add('lock')
      : document.querySelector('body').classList.remove('lock')
  } else {
    document.querySelector('body').classList.toggle('lock')
  }
}

const setImgToBg = () => {
  const images = document.querySelectorAll('img.hidden-img')
  images.forEach(el => {
    const parent = el.parentElement
    parent.classList.add('bg-img')
    parent.style.backgroundImage = `url(${el.src})`
    el.remove()
  })
}

const configureFeaturesSlider = () => {
  const featuresSlider = new Splide('.features__slider', {
    type: 'fade',
    rewind: true,
    arrows: false,
    drag: false,
    perPage: 1,
    pagination: false,
    autoplay: 5000
  });
    
  const buttons = document.querySelectorAll('.features__pagination-item')

  buttons[0].classList.add('active')

  buttons.forEach((el, idx) => {
    el.addEventListener('click', (e) => {
      featuresSlider.go(idx)
    })
  })
  
  const resetButtonsActive = () => {
    buttons.forEach(el => el.classList.remove('active'))
  }
  
  featuresSlider.on('move', (idx) => {
    resetButtonsActive()
    buttons[idx].classList.add('active')
  })

  featuresSlider.mount()
}

const configureProjectsSplider = () => {
  const projectsSlider = new Splide('.projects__slider', {
    type: 'loop',
    rewind: true,
    drag: false,
    perPage: 1,
    pagination: false,
    autoplay: 5000,
  });

  const progressEl = document.querySelector('.projects__progress')
  

  projectsSlider.on('move', (idx) => {
    const length = projectsSlider.length
    progressEl.textContent = `${idx + 1}/${length}`
  })

  projectsSlider.mount()
}

const configureCertificatesSlider = () => {
  const certSlider = new Splide('.certificates__slider', {
    type: 'loop',
    focus: 'center',
    drag: true,
    perPage: 3,
    pagination: false,
    autoplay: 5000
  });

  const modal = document.getElementById('modalImage')

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-image__overlay')) {
      toggleBodyLock()
      modal.classList.remove('shown')
    }
  })

  const imgHandler = (e) => {
    const el = e.target
    toggleBodyLock()

    const modalImg = modal.querySelector('img')
    const src = el.getAttribute('data-full-src')
    modalImg.src = src || el.src
    modal.classList.add('shown')
  }

  certSlider.on('mounted', () => {
    document.querySelectorAll('img.expandable').forEach(el => {
      el.addEventListener('click', imgHandler)
    })
  })

  certSlider.mount()
}

const configureQuestionsForm = () => {
  const input = document.querySelector(".questions__form input[name='tel']");

  const im = new Inputmask("+7 (999) 999 99 99");
  im.mask(input);
}

setImgToBg()
configureFeaturesSlider()
configureProjectsSplider()
configureCertificatesSlider()
configureQuestionsForm()