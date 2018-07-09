const Promise = require('../build/index');

let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(1)},1000);
});
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(2)},500);
});



Promise.race([p1,p2]).then((data)=>{
    console.log(data);
});

// 2