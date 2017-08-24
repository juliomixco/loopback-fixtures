var fixtureLoader, merge;

fixtureLoader = require('./fixtures-loader');

merge = require('merge');

module.exports = function(app, options) {
  var loadFixtures;
  options = merge({
    fixturePath: '/fixtures/data/',
    append: false,
    autoLoad: false
  }, options);
  loadFixtures = function(opt) {
    if (!options.append) {
      return fixtureLoader.purgeDatabase(app.models, opt).then(function() {
        console.log('Data purged');
        return fixtureLoader.loadFixtures(app.models, options.fixturePath, opt);
      });
    } else {
      return fixtureLoader.loadFixtures(app.models, options.fixturePath, opt);
    }
  };
  if (options.autoLoad) {
    loadFixtures();
  }
  return app.loadFixtures = function(opt) {
    return loadFixtures(opt);
  };
};
