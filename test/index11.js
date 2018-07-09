const Promise = require('../build/index');


let thenable = {
    then:function (resolve,reject) {
        setTimeout(()=>{
            resolve(100);
        },200);
    }
};

new Promise((resolve,reject)=>{
    resolve(thenable)
}).then((data)=>{
    console.log(data);
});

// 100

Promise.resolve(thenable).then((data)=>{
   console.log(data);
});

// 100