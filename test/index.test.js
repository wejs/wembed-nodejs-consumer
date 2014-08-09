var wn = require('../lib/index.js');
var should = require('should');
//var mkdirp = require('mkdirp');

describe('wembed-nodejs-integration', function () {
  this.timeout(1000);

  it('should get page data with one valid page url', function(done) {
    var domain = 'github.com';
    wn.getDataWithUrl('https://github.com/wejs/we', function(err, pageData, response) {

      should(err).not.be.ok;
      should(response).have.property('statusCode', 200);
      should(pageData).have.properties([
        'id', 'url', 'title'
      ]);
      should(pageData).have.property('domain', domain);

      done();
    });
  });

  it('should return response 404 and null page data with one valid page url', function(done) {
    wn.getDataWithUrl('oneinvalidandcrazyurl', function(err, pageData, response) {

      should(response).have.property('statusCode', 404);

      should(err).not.be.ok;
      should(pageData).not.be.ok;

      done();
    });
  });

  it('should get page data with provider youtube with one valid youtube video page url', function(done) {

    var youtubePageId = 'aBZXf0IL_F8';

    var validYoutubeUrl = 'https://www.youtube.com/watch?v=aBZXf0IL_F8&list=PLFDImg61IGvSyhhl8meRiHZzF_VfW5RSV';

    wn.getDataWithUrl(validYoutubeUrl, function(err, pageData, response) {

      should(err).not.be.ok;
      should(response).have.property('statusCode', 200);
      should(pageData).have.property('provider', 'youtube');
      should(pageData).have.property('pageId', youtubePageId);
      should(pageData).have.properties([
        'id', 'url', 'title', 'pageId'
      ]);

      done(err);
    });
  });

  it('should download one valid page image');

})
