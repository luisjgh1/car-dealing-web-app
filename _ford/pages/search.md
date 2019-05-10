---
# head
title: 'Search'
description: 'Car Inventory web site'

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
    { text: 'Find your next car', url: '#!', selected: true, subItems: [
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

# search form
searchForm: {
  tabOneText: 'Find new and pre-owned cars',
  tabOneIcon: './imag/icon-car.svg',
  tabTwoText: 'Service your car',
  tabTwoIcon: './imag/icon-no-card.svg',
  mainButtonText: 'FIND YOUR NEXT CAR',
  secondaryButtonText: 'Advanced Search',
  priceSliderMinText: '3K',
  priceSliderMin: 3000,
  priceSliderMaxText: '50K',
  priceSliderMax: 50000,
}

# ads
ads: {
  defaultTheme: {
    adOne: {
      textOne: 'NEW 2018 ECOSPORT',
      textTwo: 'In stock now',
      buttonText: 'CHOOSE YOURS',
    },
    adTwo: {
      textOne: 'BLACK FRIDAY',
      textTwo: 'All month long',
      textThree: '20',
      textFour: '%',
      textFive: 'OF MSRP',
      textSix: 'CASH BACK*',
      textSeven: '* On selected vehicles during November 2018',
      buttonText: 'FIND OUT MORE',
    },
    adThree: {
      textOne: 'REFER',
      textTwo: 'A',
      textThree: 'FRIEND',
      textFour: 'and receive',
      textFive: '$200 CASH',
      buttonText: 'FIND OUT HOW'
    }
  }
}

# big-boxes
bigBoxes: {
  defaultTheme: {
    imageOne: './imag/ico_keys.svg',
    textOne: 'How much is your car worth on a trade in?',
    imageTwo: './imag/icon-blue.svg',
    textTwoPointOne: 'Find out what your car payments will be.',
    textTwoPointTwo: 'Get pre-approved.',
  }
}

# our-services
ourServices: {
  title: 'Our Services',
  subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcoorpe eleifend tortor, et efficitur lectus condimentum ac.',
  services: [
    {
      image: './imag/imag-people.jpg',
      title: 'Financing for Everyone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcoorpe eleifend tortor, et efficitur lectus condimentum ac.',
      buttonText: 'Get approved',
    },
    {
      image: './imag/imag-drive.jpg',
      title: 'Car Repair',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ullamcoorpe eleifend tortor, et efficitur lectus condimentum ac.',
      buttonText: 'Get started',
    },
    {
      image: './imag/imag-mane.jpg',
      title: 'Sell Your Car',
      description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
      buttonText: 'Sell your car',
    },
  ]
}

# why-us
whyUs: {
  title: 'Why Choose Us:',
  reasons: [
    { title: '20+', description: 'years experience' },
    { title: '2,500+', description: 'cars for sale' },
    { title: '7,500+', description: 'customers' },
    { title: '24/7', description: 'customer service' },
  ]
}
# testimonies
testimonies: {
  title: 'What our customers say',
  testimonies: [
    {
      title: 'Awesome customer service! 1',
      description: 'My family and have purchased 4 different vehicles with Sound Ford. Every experience has been stress free and easy. I recently purchased a F150 and couldnt be happier with the experience. I highly recommend Sound Ford and their team!',
      author: 'GREGORY from RENTON, WA',
      stars: 1,
    },
    {
      title: 'Great buying experience 2',
      description: 'Buying a car at Sound Ford was a great experience it was a breeze to get through the process, the staff was friendly and very helpful! Bought an Explorer! Love Love the Car! Thank you so much!',
      author: 'CHRISTINA from AUBURN, WA',
      stars: 2,
    },
    {
      title: 'Awesome customer service! 2',
      description: 'My family and have purchased 4 different vehicles with Sound Ford. Every experience has been stress free and easy. I recently purchased a F150 and couldnt be happier with the experience. I highly recommend Sound Ford and their team!',
      author: 'GREGORY from RENTON, WA',
      stars: 3,
    },
    {
      title: 'Great buying experience 3',
      description: 'Buying a car at Sound Ford was a great experience it was a breeze to get through the process, the staff was friendly and very helpful! Bought an Explorer! Love Love the Car! Thank you so much!',
      author: 'CHRISTINA from AUBURN, WA',
      stars: 4,
    },
    {
      title: 'Awesome customer service! 3',
      description: 'My family and have purchased 4 different vehicles with Sound Ford. Every experience has been stress free and easy. I recently purchased a F150 and couldnt be happier with the experience. I highly recommend Sound Ford and their team!',
      author: 'GREGORY from RENTON, WA',
      stars: 5,
    },
  ]
}
# popular-cars
popularCars: {
  title: 'Popular Cars',
  cars: [
    {
      image: './imag/car-1.jpg',
      price: '$22,400',
      type: 'PRE OWNED',
      name: '2018 Chevrolet Tahoe LT',
      miles: '58,369 miles',
      monthlyEstimate: 'Finance: $439 est/month',
      buttonText: 'SHOW MORE'
    },
    {
      image: './imag/car-2.jpg',
      price: '$24,100',
      type: 'PRE OWNED',
      name: '2018 Chevrolet Tahoe LT',
      miles: '58,369 miles',
      monthlyEstimate: 'Finance: $439 est/month',
      buttonText: 'SHOW MORE'
    },
    {
      image: './imag/car-3.jpg',
      price: '$24,100',
      type: 'PRE OWNED',
      name: '2018 Chevrolet Tahoe LT',
      miles: '58,369 miles',
      monthlyEstimate: 'Finance: $439 est/month',
      buttonText: 'SHOW MORE'
    },
    {
      image: './imag/car-4.jpg',
      price: '$34,100',
      type: 'PRE OWNED',
      name: '2018 Chevrolet Tahoe LT',
      miles: '58,369 miles',
      monthlyEstimate: 'Finance: $439 est/month',
      buttonText: 'SHOW MORE'
    }
  ]
}
# get-in-touch
getInTouch: {
  title: 'Get in touch',
  address: '101 SW Grady Way, Renton, Fairfield, CT 068224',
  phone: '839-123-111',
  email: 'service@dealership.com',
  servicesPhone: '839-123-111',
  servicesEmail: 'service@dealership.com',
  openingWeekDays: '10:00 - 22:00',
  openingSaturdays: '09:00 - 23:00',
  openingSundays: '10:00 - 22:00'
}

layout: search
---