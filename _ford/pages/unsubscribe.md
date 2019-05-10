---
# head
title: 'Email unsubscribe'
description: 'Email subscripcion removal'

# site
social: {
  facebookUrl: 'https://www.facebook.com/someurl',
  twitterUrl: 'https://www.twitter.com/someUrl',
  youtubeUrl: 'https://www.youtube.com/someUrl',
  instagramUrl: 'https://www.instagram.com/someUrl',
  linkedInUrl: 'https://www.linkedIn.com/someUrl',
}

# disclaimer
disclaimer: {
  logo: '../imag/logo-footer.svg',
  madeBy: 'Automotive dealer website by 3-2-1 Ignition',
  copyright: '2018-2019  3-2-1 Ignition, LCC'
}

# footer
footer: {
  address: '92 35 Granville St,Fairfield, CT 06824',
  phone: '839-123-111',
  email: 'info@dealership.com',
  menuItems: [
    { text: 'Home', url: '#' },
    { text: 'Find a car', url: '#' },
    { text: 'Get pre-approval', url: '#' },
    { text: 'Sell your car', url: '#' },
    { text: 'Services', url: '#' },
    { text: 'Terms &amp; conditions', url: '#' },
  ],
}

# header
header: {
  #assets
  logoUrl: '../imag/logo-sound.png',
  brandUrl: '../imag/logo_ford.svg',
  # mobile buttons
  mobileButtons: [
    { text: 'SALES', url: '#' },
    { text: 'SERVICES', url: '#' },
    { text: 'DIRECTION', url: '#' },
  ],
  #slides
  slides: ['/imag/carro.jpg', '/imag/carro.jpg', '/imag/carro.jpg'],
  # top-bar
  address: '101 SW Grady Way, Renton, WA 98057',
  phone: '839-123-111',
  schedule: 'Open today! 8:00 AM - 6:00 PM',
  # menu items
  menuItems: [
    { text: 'Find your next car', url: '#!', subItems: [
        { text: 'All inventory', url: '/search'},
        { text: 'All new', url: '#', subItems: [
            { text: 'All inventory', url: '#'},
            { text: 'By body type', url: '/bodytype-search'},
        ]},
        { text: 'All Pre-owned', url: '#', subItems: [
          { text: 'All inventory', url: '#'},
          { text: 'By body type', url: '/bodytype-search'},
          { text: 'Under $15,000', url: '#'},
        ]},
        { text: 'Commercial', url: '#'},
    ]},
    { text: 'Finance your car', url: '#', subItems: [
      { text: 'Get pre-approved', url: '/pre-approved'},
      { text: 'Car loan calculator', url: '/calculator'},
    ]},
    { text: 'Sell your car', url: '#', subItems: [
      { text: 'We''ll buy your car', url: '/prepare'},
      { text: 'Get trade-in value', url: '/tradesell'},
    ]},
    { text: 'Service your car', url: '/service-your-car'},
  ],
  # search input
  searchPlaceholder: 'Find your next car',
}

# get-in-touch
getInTouch: {
  title: 'Get in touch',
  address: '92 35 Grandville St, Fairfield, CT 06824',
  phone: '839-123-111',
  email: 'service@dealership.com',
  servicesPhone: '839-123-111',
  servicesEmail: 'service@dealership.com',
  openingWeekDays: '10:00 - 22:00',
  openingSaturdays: '09:00 - 23:00',
  openingSundays: '10:00 - 22:00'
}

# footer contact
footerContact: {
  rowOne: {
    title: 'Links',
    elements: [
      {
        name: 'Home',
        link: '#'
      },
      {
        name: 'Sell your car',
        link: '#'
      },
      {
        name: 'Find a car',
        link: '#'
      },
      {
        name: 'Services',
        link: '#'
      },
      {
        name: 'Get pre-approval',
        link: '#'
      },
      {
        name: 'Terms & Conditions',
        link: '#'
      }
    ]
  },
  rowTwo: {
    title: 'Contacts',
    phone: '839-923-111',
    email: 'info@dealership.com',
    location: '92 35 Grandville St, Fairfield, CT 06824',
  },
  rowThree: {
    title: 'Stay Updated',
    inputPlaceholder: 'Your email address',
  }
}

firstSection: {
  title: 'Farewell, friend'
}

pageContent: {
  image: '../imag/hand-wave.png',
  firstText: 'We won''t send you anymore emails, unless you book an appointment at our dealership',
  secondText: {
    bold: 'Did you unsubscribe by mistake?',
    normal: 'You are welcome back anytime.'
  },
  button: {
    text: 'Add me back on the list',
    url: '#!'
  }
}

layout: unsubscribe

---