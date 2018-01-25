// 所谓Promise, 就是一个对象，用来传递异步操作的消息
// 异步加载图片
function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        var image = new Image();

        image.onload = function() {
            resolve(image);
        }

        image.onerror = function() {
            reject(new Error('Could not load image at ' + url));
        }

        image.src = url;
    })
}

// Promise.prototype.then();
function getJSON() {};

getJSON('/post/1.json').then(
    post => getJSON(post.commentURL)
    ).then(
    comments => console.log('Resolved: ', comments),
    err => console.log('Rejected: ', err)
    );

// Promise.prototype.catch();
// 一般来说，不要在then方法中定义Rejected状态的回调函数，而应总是使用catch方法

// unhandledRejection事件
// Promise.all();
// Promise.resolve();

// 实现 Promise.done()
Promise.prototype.done = function(onFullfilled, onRejected) {
    this.then(onFullfilled, onRejected)
        .catch(function(reason){
            setTimeout( () => { throw reason }, 0);
        });
}

// 实现 Promise.finally()
Promise.prototype.finally = function(callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => throw reason),
        );
};

const preloadImage = function(path) {
    return new Promise(function(resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};

// Generator 与 Promise的结合
