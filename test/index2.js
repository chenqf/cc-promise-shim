const Promise = require('../build/index');


var p1 = new Promise((resolve,reject)=>{
    resolve('p1');
});

var p2 = new Promise((resolve,reject)=>{
    resolve(p1);
});

var p3 = new Promise((resolve,reject)=>{
    resolve('p2');
});

p2.then(function (data) {
    console.log(data);
});
p3.then(function (data) {
    console.log(data);
});


// p2 p1
