const express = require('express');
let app = express();

app.set('port', process.env.PORT || 3000);

// 定制404页面
app.use()

// 定制500页面

// 首页和关于页面路由
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

// 给关于页面添加子页面