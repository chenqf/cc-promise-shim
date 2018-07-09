const Promise = require('../build/index');


Promise.reject(100).catch((error)=>{
    console.log(error);
});
// 100