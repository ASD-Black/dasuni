//check event.
 var env = process.env.NODE_ENV || 'development';

//fetc the data from jonfig.json file
var config = require('./config.json');
var envConfig = config[env];

//add config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);