const Promise = require('../build/index');


new Promise((resolve,reject)=>{
   console.log(1);
   resolve({a:1});
    console.log(2);
}).then((data)=>{
    console.log(data);
});

// 1 2 {a:1}
