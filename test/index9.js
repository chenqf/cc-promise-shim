const Promise = require('../build/index');


var p = new Promise((resolve,reject)=>{
    reject(1);
});
var pp = Promise.resolve(p);
console.log(p === pp);