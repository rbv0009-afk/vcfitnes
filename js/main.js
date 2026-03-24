// ── MAPA ──
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


// ── PRECIOS ──
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


// ── NAV / MENÚ MÓVIL ──
let isOpen = false

function toggleMenu() {
  isOpen = !isOpen
  const menu  = document.getElementById('mobile-menu')
  const line1 = document.getElementById('line1')
  const line2 = document.getElementById('line2')
  const line3 = document.getElementById('line3')

  if (isOpen) {
    menu.classList.remove('hidden')
    line1.classList.add('rotate-45', 'translate-y-2')
    line2.classList.add('opacity-0')
    line3.classList.add('-rotate-45', '-translate-y-2')
  } else {
    menu.classList.add('hidden')
    line1.classList.remove('rotate-45', 'translate-y-2')
    line2.classList.remove('opacity-0')
    line3.classList.remove('-rotate-45', '-translate-y-2')
  }
}


// ── NAV ACTIVO (IntersectionObserver) ──
const sectionIds = ['home', 'programs', 'prices', 'reviews', 'contact']

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
    activeMobile.classList.remove('text-white')
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActive(entry.target.id)
    }
  })
}, {
  rootMargin: '-40% 0px -55% 0px'
})

sectionIds.forEach(id => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})

// Activa home por defecto al cargar
setActive('home')


// ── SCROLL SPY (data-section) ──
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-link[data-section]')

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120
  sections.forEach(section => {
    const top    = section.offsetTop
    const height = section.offsetHeight
    const id     = section.getAttribute('id')
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        const isActive = link.dataset.section === id
        link.style.color = isActive ? '#d4fa00' : ''
      })
    }
  })
})


// ── PANELS (hover comida / gym) ──
const panels = {
  comida: { el: document.getElementById('comida'), brightIn: 'brightness(1)',   brightOut: 'brightness(0.82)' },
  gym:    { el: document.getElementById('gym'),    brightIn: 'brightness(0.9)', brightOut: 'brightness(0.72)' },
}

Object.values(panels).forEach(({ el, brightIn, brightOut }) => {
  const img = el.querySelector('img')
  el.addEventListener('mouseenter', () => {
    img.style.filter    = brightIn
    img.style.transform = 'scale(1.05)'
  })
  el.addEventListener('mouseleave', () => {
    img.style.filter    = brightOut
    img.style.transform = 'scale(1)'
  })
})


// ── STAR PICKER ──
let selectedStars = 0

function setStars(n) {
  selectedStars = n
  document.querySelectorAll('.star').forEach(s => {
    s.classList.toggle('text-[#d4fa00]',   parseInt(s.dataset.star) <= n)
    s.classList.toggle('text-[#ffffff20]', parseInt(s.dataset.star) > n)
  })
}

// Hover preview
document.querySelectorAll('.star').forEach(s => {
  s.addEventListener('mouseenter', () => {
    const n = parseInt(s.dataset.star)
    document.querySelectorAll('.star').forEach(st => {
      st.classList.toggle('text-[#d4fa00]',   parseInt(st.dataset.star) <= n)
      st.classList.toggle('text-[#ffffff20]', parseInt(st.dataset.star) > n)
    })
  })
  s.addEventListener('mouseleave', () => setStars(selectedStars))
})


// ── SUBMIT REVIEW ──
function submitReview() {
  const name = document.getElementById('review-name').value.trim()
  const plan = document.getElementById('review-plan').value
  const text = document.getElementById('review-text').value.trim()

  if (!name || !plan || !text || selectedStars === 0) {
    alert('Please fill in all fields and select a rating.')
    return
  }

  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  let starsHTML = ''
  for (let i = 1; i <= 5; i++) {
    const color = i <= selectedStars ? 'text-[#d4fa00]' : 'text-[#ffffff30]'
    starsHTML += `<svg class="w-4 h-4 ${color}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
  }

  const card = document.createElement('div')
  card.className = 'bg-[#1e2535] rounded-2xl p-8 flex flex-col gap-5'
  card.innerHTML = `
    <div class="flex gap-1">${starsHTML}</div>
    <p class="text-gray-300 text-sm leading-relaxed flex-1">"${text}"</p>
    <div class="flex items-center gap-4 pt-4 border-t border-[#ffffff1a]">
      <div class="w-10 h-10 rounded-full bg-[#d4fa00] flex items-center justify-center text-black font-extrabold text-sm shrink-0">${initials}</div>
      <div>
        <p class="font-bold text-sm">${name}</p>
        <p class="text-gray-400 text-xs">${plan}</p>
      </div>
    </div>`

  document.getElementById('reviews-grid').appendChild(card)

  // Reset form
  document.getElementById('review-name').value = ''
  document.getElementById('review-plan').value = ''
  document.getElementById('review-text').value = ''
  selectedStars = 0
  document.querySelectorAll('.star').forEach(s => {
    s.classList.remove('text-[#d4fa00]')
    s.classList.add('text-[#ffffff20]')
  })

  card.scrollIntoView({ behavior: 'smooth', block: 'center' })
}