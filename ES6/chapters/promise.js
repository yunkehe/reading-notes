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