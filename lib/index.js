/**
 * Wembed node.js consumer
 */

var request = require('request')
  , fs = require('fs')
  // Wembed Node.js api consumer
  , wn = {}
  // configs
  , configs = {};

configs.apiPath = '/api/v1/json?url=';
configs.defaultWembedServer = 'http://wembed.wejs.org';

/**
 * Download page image with image url
 * @param  {string}   wembedImageUrl  page id stored in wembed system
 * @param  {string}   toPath  path where page will be salved
 * @param  {string}   wembedUrl wembed system url domain ex wembed.wejs.org
 * @param  {Function} callback  callback how run with callback(err, pageData);
 */
wn.downloadPageImage = function downloadPageImage( wembedImageUrl, toPath,wembedUrl, callback) {
  // wembed url is optional
  if (typeof wembedUrl === 'function') {
    callback = wembedUrl;
    wembedUrl = configs.defaultWembedServer;
  }

  request.head(wembedImageUrl, function(err, res){
    if(err){ return callback(err); }

    var image = {};
    image.mime = res.headers['content-type'];
    image.size = res.headers['content-length'];
    image.originalFilename = wembedImageUrl;

    request(wembedImageUrl).pipe(fs.createWriteStream(toPath)).on('close', function(){
      callback(null , image);
    });
  });

  callback();
}

/**
 * Get site data from wembed with site url
 * @param  {string}   siteUrl  page url to request data
 * @param  {string}   Opcional - wembedUrl wembed system url domain ex wembed.wejs.org
 * @param  {Function} callback  callback how run with callback(err, pageData);
 */
wn.getDataWithUrl = function getDataWithId( siteUrl, wembedUrl, callback) {
  // wembed url is optional
  if (typeof wembedUrl === 'function') {
    callback = wembedUrl;
    wembedUrl = configs.defaultWembedServer;
  }

  var wembedPageUrl = wembedUrl + configs.apiPath + siteUrl;

  request({
    url: wembedPageUrl,
    json: true
  }, function(error, response, pageData) {
    if (error) {
      return callback(error);
    }

    callback(error, pageData.page, response);
  });
}


module.exports = wn;
