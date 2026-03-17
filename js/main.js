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