const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const {exec} = require('child_process');
// 创建一个二级路由器
const authRouter = express.Router();

// 引用express中间件
const app = express();
//使用cors中间件来解决浏览器跨域问题
app.use(cors());
// 使用Express中间件来解析请求体中的JSON数据
app.use(express.json());

// 验证码
let formattedNumber = {} //存储已发送手机号码对应的验证码
const sentPhoneNumbers = {}; // 存储已发送手机号码和时间戳的对象
const minRequestInterval = 60 * 1000; // 60秒

app.get('/api', (req, res) => {
    res.send('HelloWorld')
})

// 在二级路由器上定义/sms路由
authRouter.post('/sms', (req, res) => {
    // 获取当前时间戳
    const currentTime = Date.now();
    // 获取传参中的电话号码
    const phoneNumber = req.body.phoneNumber;

    // 验证号码格式，并发送短信
    const phoneRegex = /^[1-9][0-9]{10}$/;
    if (phoneRegex.test(phoneNumber)) {
        // 检查手机号码是否在已发送的记录中，并检查时间间隔
        if (currentTime - sentPhoneNumbers[phoneNumber] < minRequestInterval) {
            res.status(429).json({message: '请求过于频繁，请稍后再试', statusCode: 429});
        } else {
            formattedNumber[phoneNumber] = ("00000" + Math.floor(Math.random() * 1000000)).slice(-6);
            exec('node ./src/sms-server/client.js ' + phoneNumber + ' ' + formattedNumber[phoneNumber], (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing TypeScript: ${error}`);
                    res.status(500).json({message: '内部服务器错误', statusCode: 500});
                } else {
                    // 记录当前时间戳
                    sentPhoneNumbers[phoneNumber] = currentTime;
                    console.log(`TypeScript output: ${stdout}`);
                    res.status(200).json({message: 'OK', statusCode: 200});
                }
            });
        }
    } else {
        res.status(400).json({message: '手机号码格式不正确', statusCode: 400});
    }
})

// 在二级路由器上定义/register路由
authRouter.post('/register', (req, res) => {
    const {phoneNumber, smsCode, password} = req.body;

    if (smsCode === formattedNumber[phoneNumber]) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'yyb12345',
            port: '3306',
            database: 'suning'
        });
        connection.connect();
        let insertSql = 'INSERT INTO users (password,phone) VALUES (?,?)'; // 用你的表结构和字段名替换
        const values = [phoneNumber, password]; // 替换为要插入的数据值
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
        res.json({message: '注册成功'});
    } else {
        res.status(400).json({message: '验证码不正确', statusCode: 400});
    }

});

// 在二级路由器上定义/login路由
authRouter.post('/login', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yyb12345',
        port: '3306',
        database: 'suning'
    });
    connection.connect();
    let selectSql = 'SELECT * FROM users'; // 用你的表结构和字段名替换
    // 插入数据
    connection.query(selectSql,function (err, result) {
        if (err) {
            console.error('查询出错: ' + err.stack);
            return;
        }

        // 处理查询结果
        console.log('查询结果: ', result);
    });
    connection.end();

    const {loginAccount, loginPassword} = req.body;
    res.json({message: '登录成功'})
});

// 将二级路由器挂载到主应用程序的/api路径下
app.use('/api', authRouter);

// 启动Express服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Express服务器正在监听端口 ${port}`);
});
