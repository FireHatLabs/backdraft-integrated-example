var config	= require('./settings')
		, api	= require('backdraft')(config);

var item = require('./responders/item')(api);


api.routes.get('/', function(req, res, next) {
  res.render('index', {
    app  : config.app
  });
});


api.log('Open for business');
