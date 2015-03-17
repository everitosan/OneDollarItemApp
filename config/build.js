requirejs.config({
  wrap: true,
  insertRequire: ['od-iapp'],
  deps: ['od-iapp'],
  shim: {
  },
  paths: {
    'od-iapp': 'main',
    'jquery': '../../../../../bower_components/jquery/dist/jquery',

    'jquery-ujs': '../../../../../bower_components/jquery-ujs/src/rails'

  }
})

