# i80

A very basic microframework for high volume web services

## Example

```javascript
var i80 = require('i80');

var handlers = {
  foo: function (request, response, done) {
    // do stuff
    done({message: 'hello world'});
  }
}

i80.start({
  port: 80,
  handlers: handlers
});
```

GET http://hostname/foo

```json
{"message": "hello world"}
```
