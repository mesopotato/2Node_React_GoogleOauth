// figure out what keys to return 
if (process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    // dev keys return 
    module.exports = require('./dev');
}