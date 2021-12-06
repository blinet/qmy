var urlParse = require("url").parse;
function parseUrl(url) {
  url = urlParse(url, true);

  var options = {
    host: url.hostname,
    port: url.port,
    database: url.pathname.substr(1),
  };

  if (url.auth) {
    var auth = url.auth.split(":");
    options.user = auth.shift();
    options.password = auth.join(":");
  }

  if (url.query) {
    for (var key in url.query) {
      var value = url.query[key];

      try {
        // Try to parse this as a JSON expression first
        options[key] = JSON.parse(value);
      } catch (err) {
        // Otherwise assume it is a plain string
        options[key] = value;
      }
    }
  }

  return options;
}
module.exports = parseUrl;
