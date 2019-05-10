const path = require('path');
 
module.exports = {
  mode: 'production',
  entry: {
    // '[output-path]' : path.resolve(__dirname, 'themes/v2/js/[input-file-path]'),
    'calculator/main': path.resolve(__dirname, 'themes/v2/js/calculator/MainComponent.js'),

    'car-details/main': path.resolve(__dirname, 'themes/v2/js/car-details/MainComponent.js'),

    'compare/main': path.resolve(__dirname, 'themes/v2/js/compare/MainComponent.js'),

    'details-calculator/main': path.resolve(__dirname, 'themes/v2/js/details-calculator/MainComponent.js'),

    'details-pre-approved/main': path.resolve(__dirname, 'themes/v2/js/details-pre-approved/MainComponent.js'),

    'index/main': path.resolve(__dirname, 'themes/v2/js/index/MainComponent.js'),

    'pre-approved/main': path.resolve(__dirname, 'themes/v2/js/pre-approved/MainComponent.js'),

    'search/main': path.resolve(__dirname, 'themes/v2/js/search/MainComponent.js'),

    'service-your-car/main': path.resolve(__dirname, 'themes/v2/js/service-your-car/MainComponent.js'),

    'rates/main': path.resolve(__dirname, 'themes/v2/js/rates/MainComponent.js'),
    
    'sell-car/main': path.resolve(__dirname, 'themes/v2/js/sell-car/MainComponent.js'),

    'prepare/main': path.resolve(__dirname, 'themes/v2/js/prepare/MainComponent.js'),
    
    'bodytype-search/main': path.resolve(__dirname, 'themes/v2/js/bodytype-search/MainComponent.js'),

    'fixed-widgets/main': path.resolve(__dirname, 'themes/v2/js/fixed-widgets/MainComponent.js'),
  },
  output: {
    path: path.resolve(__dirname, 'themes/v2/resources/js/dist/'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  watch: false
};