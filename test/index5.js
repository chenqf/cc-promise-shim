const Promise = require('../build/index');

let p1 = 1;
let p2 = {a:1};
let p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('st1')
    },500);
});
let p4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('st2')
    },1000);
});

Promise.all([p1,p2,p3,p4]).then((data)=>{
    console.log(data);
});

// [ 1, {a:1}, 'str1','str2' ]