const Promise = require('../build/index');

new Promise(function (resolve,reject) {
    setTimeout(function(){
        resolve(1);
    },500)
}).then(function(data){
    console.log(data)
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(2)
        },500)
    })
})
.then(function(data){
    console.log(data);
    return 3;
}).then(function (data) {
    console.log(3);
});

// 1 2 3