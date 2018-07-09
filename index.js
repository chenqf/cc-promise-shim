// Created by 陈其丰 on 2018/7/9.
"use strict";

// 控制 promise 状态变更为 resolved
function resolve(value) {
    if(value instanceof this.constructor){
        value.then(
            (data)=>{
                resolve.call(this,data);
            },
            (reason)=>{
                reject.call(this,reason);
            }
        )
    }else if(isThenable(value)){
        new this.constructor(value.then).then(
            (data)=>{
                resolve.call(this,data);
            },
            (reason)=>{
                reject.call(this,reason);
            }
        )
    }else{
        this.value = value;
        this.over = true;
        this.state = 'resolved';
        for(let i = 0,len = this.thenList.length;i<len; i++){
            exec.call(this,this.thenList[i]);
        }
        this.thenList = [];
    }


}
// 控制 promise 状态变更为 rejected
function reject(reason) {
    this.over = true;
    this.state = 'rejected';
    this.value = reason;

    for(let i = 0,len = this.thenList.length;i<len; i++){
        exec.call(this,this.thenList[i]);
    }
    this.thenList = [];
}
// 执行 promise 下注册的 then 函数
function exec(item) {
    let state = this.state,
        value = this.value,
        ret,
        callback;
    if(state === 'resolved'){
        callback = item.onResolve;
    }else if(state === 'rejected'){
        callback = item.onRejected;
    }
    if(!callback){
        state === 'resolved' ? item.resolve(value) : item.reject(value);
        return ;
    }
    setTimeout(()=>{
        try{
            ret = callback(value);
            item.resolve(ret);
        }catch(e){
            item.reject(e);
        }
    },0);
}
// 是否是thenable对象
function isThenable(val) {
    return (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function';
}

class Promise {
    constructor(fn) {
        this.over = false;
        this.state = 'pendding'; // 状态
        this.value = null; // 终值或拒因
        this.thenList = [];
        try{
            fn(
                (value)=>{
                    if(!this.over){
                        resolve.call(this,value); // 变更状态为 resolved
                    }
                },
                (reason)=>{
                    if(!this.over){
                        reject.call(this,reason);// 变更状态为 rejected
                    }
                }
            )
        }catch (e){
            reject.call(this,e);// 变更状态为 rejected
        }
    }
    then(onResolve,onRejected) {
        return new this.constructor((resolve, reject) => {
            let item = {
                onResolve,
                onRejected,
                resolve,
                reject
            };
            if(this.state === 'pendding'){
                this.thenList.push(item);
            }else{
                exec.call(this,item);
            }
        })
    }
    catch(fn) {
        return this.then(null,fn);
    }
    /**
     * 对 then 方法的封装
     * 用在链式调用的最后一步
     * 用于捕获异常，在全局中提示出来
     * @param onResolve
     * @param onRejected
     * @returns {*|Promise.<T>}
     */
    done(onResolve,onRejected){
        return this.then(onResolve,onRejected).catch((error)=>{
            setTimeout(()=>{
                throw error;
            },0);
        })
    }

    /**
     * ES2018 引入
     * 回调函数的操作，与状态无关
     * @param callback 回调参数不接收任何参数
     * @returns {*} 返回promise对象，状态及终值与之前一致
     */
    finally(callback){
        return this.then(
            (value)=>{
                return this.constructor.resolve(callback()).then(()=>{
                    return value;
                })
            },
            (reason)=>{
                return this.constructor.resolve(callback()).then(()=>{
                    throw reason
                })
            }
        )
    }
    static all(list = []){
        let len = list.length,
            array = [];
        if(!len){
            return Promise.resolve([]);
        }
        return new Promise((resolve,reject)=>{
            for(let i = 0; i<len; i++){
                let item = Promise.resolve(list[i]);
                item.then((data)=>{
                    array.push({
                        data,
                        i
                    });
                    if(array.length === len){
                        resolve(array.reduce((a,b)=>{
                            a[b.i] = b.data;
                            return a;
                        },[]))
                    }
                },(error)=>{
                    reject(error);
                })
            }
        })
    }
    static race(list = []){
        let len = list.length;
        if(!len){
            return new Promise((resolve,reject)=>{})
        }
        return new Promise((resolve,reject)=>{
            for(let i = 0; i<len; i++){
                let item = Promise.resolve(list[i]);
                item.then((data)=>{
                    resolve(data);
                },(error)=>{
                    reject(error);
                })
            }
        })
    }
    static resolve(val){
        if(val instanceof Promise){
            return val;
        }else if(isThenable(val)){
            return new Promise(val.then);
        }
        return new Promise((resolve,reject)=>{
            resolve(val);
        })
    }
    static reject(val){
        return new Promise((resolve,reject)=>{
            reject(val);
        })
    }
}

module.exports = Promise;



