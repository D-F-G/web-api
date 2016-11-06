# web-api
.Net like, convention based web API for node express

## Example

```javascript
var express = require('express');
var webApi = require('web-api');

function testController(){ // Route "/test"
  this.getHelloWorld = function(req, res){ //Route "/test/HelloWorld" for GET requests
    res.end('Hello world!');
  }  
}

function hello(){ //Route "/hello"
  this.getWorld = function(req, res, q){ //Route "/hello/World" for GET requests
    res.json({ 
    greeting: 'Hello, '+q.name+' from hello',
    name: q.name
    });
  }
  
  this.postEcho = function(req, res, q, data){ //Route "/hello/Echo" for POST requests
    res.json(data);    
  }
}

app = express();

webApi.register(app, [testController, hello]) //third parameter for prefix is possible, e.g. "/api"

app.listen(8000, function(){
  console.log('Server started at port 8000.');
});
```

### Conventions

Routes are convention based. (Manual configuration of routes is planned for future releases.)

The conventions are as follows. 
Controller functions/classes are either postfixed with "Controller" or are used as-is. In the example above, testController is resolved as route "test", while "hello" is resolved as route "hello".
Service methods are prefixed by the method used. Currently supported methods are "GET", "POST", "PUT", "DELETE".
Service methods are called with 4 parameters, the request, the response, the URL parameters and the (parsed JSON) body.

### Installation

Either download the project here or install via npm 
`npm install --save node-web-api`
