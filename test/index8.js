const Promise = require('../build/index');

let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(1)},1000);
});
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(2)},500);
});
let p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{reject(Error('error'))},200);
});



Promise.race([p1,p2,p3]).then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error.message);
});

// error