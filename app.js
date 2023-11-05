const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yyb12345',
    port: '3306',
    database: 'suning'
});

// 使用Express中间件来解析请求体中的JSON数据
app.use(express.json());

// 创建一个二级路由器
const authRouter = express.Router();

// 在二级路由器上定义/register路由
authRouter.post('/register', (req, res) => {
    // 在这里处理注册逻辑
    // 你可以从req.body中获取客户端发送的数据
    const { phone, password } = req.body;
    // 在这里执行用户注册的逻辑
    // 通常会将用户信息保存到数据库中
    // 返回注册成功或失败的响应

    connection.connect();

    let insertSql = 'INSERT INTO users (password,phone) VALUES (?,?)'; // 用你的表结构和字段名替换

    const values = [phone,password]; // 替换为要插入的数据值

// 插入数据
    connection.query(insertSql, values, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        console.log('插入成功，受影响的行数：' + result.affectedRows);
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();

    res.send('注册成功');
});

// 在二级路由器上定义/login路由
authRouter.post('/login', (req, res) => {
    // 在这里处理登录逻辑
    // 你可以从req.body中获取客户端发送的数据
    const { username, password } = req.body;
    // 在这里执行用户登录的逻辑
    // 检查用户名和密码是否匹配
    // 返回登录成功或失败的响应
    res.send('登录成功');
    console.log(username,password)
});

// 将二级路由器挂载到主应用程序的/api路径下
app.use('/api', authRouter);

// 启动Express服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Express服务器正在监听端口 ${port}`);
});
