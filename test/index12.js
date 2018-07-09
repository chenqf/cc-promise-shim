const Promise = require('../build/index');


Promise.resolve(100).finally(()=>{
    console.log('--1');
    console.log('--2');
}).then((data)=>{
    console.log(data);
});

// --1 --2 100