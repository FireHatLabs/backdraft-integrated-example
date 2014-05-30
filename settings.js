var path				= require('path')
		, rootPath	= path.normalize(__dirname + '/../..')
		, config		= {};

config.server = {
		mode: 'development',
		port: '3000',
		host: '127.0.0.1',
		hostClient: 'http://127.0.0.1:3000',
		protocol: 'http',
		sessionSecret: 'backdraft 1234',
		hashSalt: 'backdraft 4567',
		dbSalt: 'backdraft 7890'
	};

config.api = {
    path: '/api',
    uri: config.server.protocol + '://' + config.server.host + ':' + config.server.port
  };

config.app = {
		lang: 'en',
		name: 'backdraft',
		path: '/',
		logo: '',
    templates: path.join(__dirname, '/views'),
    public: path.join(__dirname, '/public'),
		uri: config.server.protocol + '://' + config.server.host + ':' + config.server.port
	};

config.database_auth = {
		name: config.app.name,
		host: 'localhost',
		port: '27017',
		user: '',
		pass: ''
	};

config.database = {
		name: config.app.name,
		host: 'localhost',
		port: '27017',
		user: '',
		pass: ''
	};

config.logs = {
		prefix: config.app.name,
		consoleLevel: 'debug',
		levels: [
			{
				name: 'debug',
				enabled: true,
				filePath: './'
			},
			{
				name: 'info',
				enabled: true,
				filePath: './'
			},
			{
				name: 'error',
				enabled: true,
				filePath: './'
			},
			{
				name: 'security',
				enabled: true,
				filePath: './'
			},
			{
				name: 'exception',
				enabled: true,
				filePath: './'
			},
			{
				name: 'audit',
				enabled: true,
				filePath: './'
			}
		]
	};

module.exports = config;
