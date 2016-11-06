require('string.prototype.endswith');
require('string.prototype.startswith');
var _ = require('lodash');
var bodyParser = require('body-parser')

module.exports.register = function(app, controllerList, prefix){
  prefix = prefix || '';
  
  app.use(bodyParser.json());

  for(var i = 0; i < controllerList.length; i++){
    registerController(controllerList[i]);
  }

  function registerController(controller){
    var controllerName = functionName(controller);
    
    if(controllerName.endsWith('Controller')){
      controllerName = controllerName.substring(0, controllerName.length - 10);
    }
    
    var cont = new controller;
    
    _.each(_.keys(cont), function(name){
      var route = prefix + '/' + controllerName + '/';
      
      if(name.startsWith('post')) {
        registerRoute('post', route + name.substring(4), cont[name]);
      } else if(name.startsWith('put')) {
        registerRoute('put', route + name.substring(3), cont[name]);
      } else if(name.startsWith('delete')) {
        registerRoute('delete', route + name.substring(6), cont[name]);
      } else if(name.startsWith('get')) {
        registerRoute('get', route + name.substring(3), cont[name]);
      }
    });
  }
  
  function registerRoute(method, route, func){
    console.log(route);
    
    app[method](route, function(req, res){
      func(req, res, req.query, req.body);
    });
  }
  
  function functionName( func )
  {
    // Match:
    // - ^          the beginning of the string
    // - function   the word 'function'
    // - \s+        at least some white space
    // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
    // - \s*        optionally followed by white space (in theory there won't be any here,
    //              so if performance is an issue this can be omitted[1]
    // - \(         followed by an opening brace
    //
    var result = /^function\s+([\w\$]+)\s*\(/.exec( func.toString() )

    return  result  ?  result[ 1 ]  :  '' // for an anonymous function there won't be a match
  }
}