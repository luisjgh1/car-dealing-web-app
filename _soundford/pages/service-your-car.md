---
# head
title: 'Service your car'
descripton: 'Car online service'

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
    { text: 'Home', url: '/' },
    { text: 'Find a car', url: '/search' },
    { text: 'Get pre-approval', url: 'pre-approval' },
    { text: 'Sell your car', url: 'sell-car' },
    { text: 'Services', url: '#' },
    { text: 'Terms &amp; conditions', url: '#' },
  ],
}

# header
header: {
  #assets
  logoUrl: '../imag/snl-logo.png',
  brandUrl: '',
  # mobile buttons
  mobileButtons: [
    { text: 'SALES', url: '/sell-car' },
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
            { text: 'All inventory', url: '/search'},
            { text: 'By body type', url: '/bodytype-search'},
        ]},
        { text: 'All Pre-owned', url: '#', subItems: [
          { text: 'All inventory', url: '/search'},
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
      { text: 'We''ll buy your car', url: '/sell-car'},
      { text: 'Get trade-in value', url: '/prepare'},
    ]},
    { text: 'Service your car', url: '#', selected: true},
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
  mobileElements: [
    { name: 'Car payment calculator', url: '/calculator' },
    { name: 'Find a car', url: '/search' },
    { name: 'Get pre-approved', url: '/pre-approved' },
    { name: 'Sell your car', url: '/sell-car' },
    { name: 'Terms & conditions', url: '#!' },
  ],
  rowOne: {
    title: 'Links',
    elements: [
      { name: 'Home', link: '/' },
      { name: 'Sell your car', link: '/sell-car' },
      { name: 'Find a car', link: '/search' },
      { name: 'Services', link: '#!' },
      { name: 'Get pre-approval', link: '/pre-approved' },
      { name: 'Terms & Conditions', link: '#!' }
    ]
  },
  rowTwo: {
    title: 'Contacts',
    phone: '839-923-111',
    email: 'info@dealership.com',
    location: '920 S.W. Grady Way, Renton, WA, 98057',
    mapsUrl: 'https://goo.gl/maps/9p6DrwbY29k'
  },
  rowThree: {
    title: 'Stay Updated',
    inputPlaceholder: 'Your email address',
  }
}


# first section
firstSection: {
  title: 'Auto Diagnostics & Repair Service',
}

# book service
bookService: {
  title: 'Book Your Car Repair Online',
  contentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.',
  image: '../imag/manos.png'
}

# features
features: {
  title: 'Why Are We The Best',
  items: [
    { image: '', text: 'Modern Technology' },
    { image: '', text: 'Price Competitive' },
    { image: '', text: 'Instant Booking' },
    { image: '', text: 'Trustworthy' }
  ]
}

# services
services: {
  title: 'Range of Services',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.',
  items: [
    'Change oil and filter',
    'Alternator replacement',
    'Valve cover gasket replacement',
    'Brake pads replacement',
    'Serpentine/drive belt replacement',
    'Oxygen sensor replacement',
    'Timing belt replacement',
    'Spark plug replacement',
    'Pre-purchase car inspection',
    'Water pump replacement',
    'Fuel pump replacement',
    'Car radiator replacement',
    'Thermostat replacement',
    'Wheel bearings replacements',
    'Acle/CV shaft assembly replacement',
    'Power window switch',
    'Starter replacement',
    'Battery replacement',
  ]
}

# offers
offers: {
  title: 'What We Offer',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.',
  mosaic: [
    {
      image: '../imag/car-1.jpg',
      content: {
        title: 'Preventative Maintenance',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.'
      }
    },
    {
      image: '../imag/car-2.jpg',
      content: {
        title: 'Brake Repair & Services',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.'
      }
    },
    {
      image: '../imag/car-3.jpg',
      content: {
        title: 'Common Repairs',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis lectus erat, ut malesuada ex laoreet nec.'
      }
    }
  ]
}

# ads
ads: {
  adOne: {
    textOne: 'TRADE-IN DEALS',
    textTwo: 'How much can you get for your car?',
    buttonText: 'Find out',
  },
  adTwo: {
    textOne: '2018 DEMO SALE',
    textTwo: 'Is it time for an',
    textThree: 'UPGRADE?',
    textSeven: '* On selected vehicles during January 2019',
    buttonText: 'View cars on sale',
  },
  adThree: {
    textOne: 'CAR FINANCE',
    textTwo: 'Get pre-approved now, save time later',
    buttonText: 'Find out how'
  }
}

# big-boxes
bigBoxes: {
  defaultTheme: {
    imageOne: '../imag/ico_keys.svg',
    textOne: 'How much is your car worth on a trade in?',
    imageTwo: '../imag/icon-blue.svg',
    textTwoPointOne: 'Find out what your car payments will be.',
    textTwoPointTwo: 'Get pre-approved.',
  }
}

layout: service-your-car

---