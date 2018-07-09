const Promise = require('../build/index');


new Promise((resolve,reject)=>{
    throw Error('error1')
}).then((data)=>{
    console.log(data);
}).catch((error)=>{
   console.log(error.message); 
   return {a:1}
}).then(null,(error)=>{
    console.log(error.message);
}).then((data)=>{
    console.log(data);
    throw Error('error2')
}).then((data)=>{
    console.log(data);
},(error)=>{
    console.log(error.message);
});

// error1 , {a:1}，error2
