# cc-promise-shim


## Installation
    $ npm install --save cc-promise-shim 
    
## Usage
```javascript
const Promise = require('cc-promise-shim');

new Promise(function (resolve, reject) {
  get('http://www.google.com', function (err, res) {
    if (err) reject(err);
    else resolve(res);
  });
}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.error(err);
});
```
## API

Before all examples, you will need:

```js
const Promise = require('cc-promise-shim');
```
### new Promise(fn)
This creates and returns a new promise.  `fn` must be a function.  The `fn` function is passed two arguments:

 1. `resolve` should be called with a single argument.  If it is called with a non-promise value then the promise is fulfilled with that value.  If it is called with a promise (A) then the returned promise takes on the state of that new promise (A).
 2. `reject` should be called with a single argument.  The returned promise will be rejected with that argument.
 
### Static Functions
  These methods are invoked by calling `Promise.methodName`.
  
####Promise.resolve(value)

####Promise.reject(value)

####Promise.all(array)

####Promise.race(array)
