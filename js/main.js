//scripts de contacto
const maps = {
    horta:       'https://maps.google.com/maps?q=Carrer+de+Campoamor+18+Barcelona&output=embed',
    santgervasi: 'https://maps.google.com/maps?q=Carrer+de+Santalo+52+Barcelona&output=embed',
    passeig:     'https://maps.google.com/maps?q=Passeig+de+Gracia+43+Barcelona&output=embed'
  }

  function showMap(location) {
    document.getElementById('map-frame').src = maps[location]

    document.querySelectorAll('.location-item').forEach(el => {
      el.classList.remove('border-[#d4fa00]')
      el.classList.add('border-transparent')
    })

    document.getElementById('loc-' + location).classList.remove('border-transparent')
    document.getElementById('loc-' + location).classList.add('border-[#d4fa00]')
  }


  //Scripts de precios
  const prices = {
    monthly: { basic: '$39', medium: '$79', advanced: '$129' },
    yearly:  { basic: '$32', medium: '$65', advanced: '$105' }
  }

  function togglePricing(mode) {
    document.getElementById('price-basic').textContent    = prices[mode].basic
    document.getElementById('price-medium').textContent   = prices[mode].medium
    document.getElementById('price-advanced').textContent = prices[mode].advanced

    const btnMonthly = document.getElementById('btn-monthly')
    const btnYearly  = document.getElementById('btn-yearly')

    if (mode === 'monthly') {
      btnMonthly.classList.add('bg-[#d4fa00]', 'text-black')
      btnMonthly.classList.remove('text-white')
      btnYearly.classList.remove('bg-[#d4fa00]', 'text-black')
      btnYearly.classList.add('text-white')
    } else {
      btnYearly.classList.add('bg-[#d4fa00]', 'text-black')
      btnYearly.classList.remove('text-white')
      btnMonthly.classList.remove('bg-[#d4fa00]', 'text-black')
      btnMonthly.classList.add('text-white')
    }
  }

//Scripts del nav

let isOpen = false

  function toggleMenu() {
    isOpen = !isOpen
    const menu = document.getElementById('mobile-menu')
    const line1 = document.getElementById('line1')
    const line2 = document.getElementById('line2')
    const line3 = document.getElementById('line3')

    if (isOpen) {
      menu.classList.remove('hidden')
      // Animación a X
      line1.classList.add('rotate-45', 'translate-y-2')
      line2.classList.add('opacity-0')
      line3.classList.add('-rotate-45', '-translate-y-2')
    } else {
      menu.classList.add('hidden')
      // Vuelve a hamburguesa
      line1.classList.remove('rotate-45', 'translate-y-2')
      line2.classList.remove('opacity-0')
      line3.classList.remove('-rotate-45', '-translate-y-2')
    }
  }

  //scripts para header de botones dinamicos
  const sections = ['home', 'programs', 'prices', 'reviews', 'contact']

  function setActive(id) {
    // Desktop
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('text-[#d4fa00]', 'border-b-2', 'border-[#d4fa00]')
    })
    const activeDesktop = document.querySelector(`.nav-link[href="#${id}"]`)
    if (activeDesktop) {
      activeDesktop.classList.add('text-[#d4fa00]', 'border-b-2', 'border-[#d4fa00]')
    }

    // Móvil
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
      link.classList.remove('text-[#d4fa00]', 'border-b-2', 'border-[#d4fa00]', 'w-fit')
    })
    const activeMobile = document.querySelector(`.nav-link-mobile[href="#${id}"]`)
    if (activeMobile) {
      activeMobile.classList.add('text-[#d4fa00]', 'border-b-2', 'border-[#d4fa00]', 'w-fit')
      activeMobile.classList.remove('text-white');
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id)
      }
    })
  }, {
    rootMargin: '-40% 0px -55% 0px'  // Se activa cuando la section está en el centro de la pantalla
  })

  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  // Activa home por defecto al cargar
  setActive('home')