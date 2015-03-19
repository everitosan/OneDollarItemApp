module.exports = {
  {
  app: {
      files: {
        'exports/scripts/code.js' : ['develop/scripts/code.js']
      },
      options : {
        transform : ['debowerify']
      }
    }
  }
};