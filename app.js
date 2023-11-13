const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const {exec} = require('child_process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify} = require("util");
const secretKey = 'SecretKeyOfBinbinHooray';
// 创建一个二级路由器
const authRouter = express.Router();

// 引用express中间件
const app = express();
//使用cors中间件来解决浏览器跨域问题
app.use(cors());
// 使用Express中间件来解析请求体中的JSON数据
app.use(express.json());

const mysqlConnection = {
    password: 'yyb12345',
    database: 'suning',
    port: '3306',
    host: 'localhost',
    user: 'root',
}

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
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('密码哈希生成失败: ' + err);
                res.status(500).json({message: '注册失败', error: 'Password hashing error'});
            } else {
                const connection = mysql.createConnection(mysqlConnection);
                connection.connect();
                let insertSql = 'INSERT INTO User (password, phone) VALUES (?, ?)';
                const values = [hash, phoneNumber];
                // 插入数据
                connection.query(insertSql, values, function (err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        res.status(500).json({message: '注册失败', error: err.message});
                        return;
                    }
                    let selectSql = 'SELECT * FROM User WHERE phone = ?';
                    connection.query(selectSql, phoneNumber, (err, result) => {
                        if (err) {
                            console.error('查询数据库失败: ' + err);
                            res.status(500).json({message: '注册失败', error: err.message});
                        } else {
                            // 用户成功注册并且查询成功，创建JWT令牌
                            const user = result[0];
                            const token = jwt.sign(user, secretKey, {expiresIn: '24h'});
                            res.json({message: '注册成功', token});
                        }
                    });
                    connection.end();
                });
            }
        });
    } else {
        res.status(400).json({message: '验证码不正确', statusCode: 400});
    }
});

// 在二级路由器上定义/login路由
authRouter.post('/accountLogin', (req, res) => {
    const {loginAccount, loginPassword} = req.body;
    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();
    let selectSql = `SELECT * FROM User WHERE username = ? OR phone = ?`; // 用你的表结构和字段名替换
    const values = [loginAccount, loginAccount]
    // 查询数据
    connection.query(selectSql, values, function (err, result) {
        if (err) {
            console.error('查询出错: ' + err.stack);
        } else if (result.length >= 1) {
            const user = result[0]
            bcrypt.compare(loginPassword, user.password, (err, isMatch) => {
                if (err) {
                    console.error('密码比较时出错')
                }
                if (isMatch) {
                    // 密码匹配，登录成功
                    const token = jwt.sign(user, secretKey, {expiresIn: '24h'});
                    res.status(200).json({message: '密码正确，登录成功', token});
                } else {
                    // 密码不匹配，登录失败
                    res.status(401).json({message: '密码错误，登录失败'});
                }
            })
        } else {
            res.status(404).json({message: '未找到用户信息', statusCode: 404});
        }
    });
    connection.end();

});

authRouter.post('/smsLogin', (req, res) => {
    const {phoneNumber, smsCode} = req.body
    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();
    let selectSql = `SELECT * FROM User WHERE phone = ?`; // 用你的表结构和字段名替换
    // 查询数据
    connection.query(selectSql, phoneNumber, function (err, result) {
        if (err) {
            console.error('查询出错: ' + err.stack);
        } else if (result.length >= 1) {
            if (smsCode === formattedNumber[phoneNumber]) {
                res.status(200).json({message: '登录成功', statusCode: 200});
            } else {
                res.status(400).json({message: '验证码不正确', statusCode: 400});
            }
        } else {
            res.status(404).json({message: '未找到用户信息,请先注册', statusCode: 404});
        }
    });
    connection.end();
})

authRouter.get('/token', (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        res.json(decoded);
    });
})

authRouter.post('/updateUser', (req, res) => {
    const {username, nickname, gender, userid} = req.body;
    if (username == null || nickname == null || gender == null || userid == null) {
        res.status(400).json({message: 'bad request', statusCode: 400})
    }
    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();
    let updateSql = `UPDATE User SET username = ?, name = ?, gender = ? WHERE userid = ?`;
    const values = [username, nickname, gender, userid];
    // 更新数据
    connection.query(updateSql, values, function (err, result) {
        if (err) {
            console.error('更新出错: ' + err.stack);
            res.status(500).json({message: '更新出错', statusCode: 401})
        } else {

            let selectSql = 'SELECT * FROM User WHERE userid = ?';
            connection.query(selectSql, userid, (err, result) => {
                if (err) {
                    console.error('查询数据库失败: ' + err);
                    res.status(500).json({message: '更新失败', error: err.message});
                } else {
                    // 用户成功注册并且查询成功，创建JWT令牌
                    const user = result[0];
                    const token = jwt.sign(user, secretKey, {expiresIn: '24h'});
                    res.status(200).json({message: '更新成功', statusCode: 200, token});
                }
            });
            connection.end();
        }
    });
});

authRouter.post('/cart', (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        const userid = decoded.userid;
        const query = 'SELECT * FROM ShoppingCart WHERE userid = ?';
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        connection.query(query, userid, (error, cartResults) => {
            if (error) {
                console.error(error);
                return res.status(500).json({message: '内部服务器错误'});
            }

            const productIds = cartResults.map(cartItem => cartItem.productid);
            // 检查 productIds 是否为空
            if (productIds.length === 0) {
                // 处理购物车中没有产品的情况
                const responseData = {
                    decoded: decoded,
                    data: []
                };
                return res.json(responseData);
            }

            const productQuery = 'SELECT * FROM Product WHERE productid IN (?)';
            connection.query(productQuery, [productIds], (productError, productResults) => {
                if (productError) {
                    console.error(productError);
                    return res.status(500).json({message: '内部服务器错误'});
                }
                // 提取产品信息中的所有 productid
                const productImageIds = productResults.map(productItem => productItem.productid);
                // 查询 ProductImage 表，获取与产品匹配的图片信息
                const productImageQuery = 'SELECT MIN(imageid) as imageid, productid, MIN(imageurl) as imageurl FROM ProductImage WHERE productid IN (?) GROUP BY productid';
                connection.query(productImageQuery, [productImageIds], (imageError, imageResults) => {
                    if (imageError) {
                        console.error(imageError);
                        return res.status(500).json({message: '内部服务器错误'});
                    }
                    const data = mergeData(cartResults, productResults, imageResults)
                    // 合并 decoded、购物车信息、产品信息和图片信息到一个对象
                    const responseData = {
                        decoded: decoded,
                        data
                    };
                    // 将购物车信息、产品信息、图片信息和 decoded 发送回客户端
                    res.json(responseData);
                });
                connection.end();
            });
        });
    });
})

authRouter.post('/updateCart', (req, res) => {
    const token = req.headers.authorization;
    // const {productid, selected, quantity} = req.body
    const {updates} = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        const userid = decoded.userid;
        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({message: 'Invalid data format'});
        }
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        try {
            for (const update of updates) {
                const {productid, selected, quantity} = update;
                // console.log(productid,selected,quantity)
                if (productid !== undefined) {
                    if (selected !== undefined && quantity === undefined) {
                        const updateSelectedQuery = 'UPDATE ShoppingCart SET selected = ? WHERE userid = ? AND productid = ?';
                        const values = [selected, userid, productid];
                        await promisify(connection.query).bind(connection)(updateSelectedQuery, values);
                    }
                    if (quantity !== undefined && quantity >= 1 && selected === undefined) {
                        const updateQuantityQuery = 'UPDATE ShoppingCart SET quantity = ? WHERE userid = ? AND productid = ?';
                        const values = [quantity, userid, productid];
                        await promisify(connection.query).bind(connection)(updateQuantityQuery, values);
                    } else {
                        throw new Error();
                    }
                } else if (selected !== undefined && quantity === undefined) {
                    const updateQuantityQuery = 'UPDATE ShoppingCart SET selected = ? WHERE userid = ?';
                    const values = [selected, userid];
                    await promisify(connection.query).bind(connection)(updateQuantityQuery, values);
                }
            }
            res.status(200).json({message: 'Update successful'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'mysql更新失败', error: error.message});
        } finally {
            connection.end();
        }
    })

})

authRouter.post('/deleteFromCart', (req, res) => {
    const token = req.headers.authorization;
    const {deletes} = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        const userid = decoded.userid;
        if (!Array.isArray(deletes) || deletes.length === 0) {
            return res.status(400).json({message: 'Invalid data format'});
        }
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        try {
            for (const update of deletes) {
                const {productid} = update;
                if (productid !== undefined) {
                    const deleteFromCartQuery = 'DELETE FROM ShoppingCart WHERE userid = ? AND productid = ?';
                    const values = [userid, productid];
                    await promisify(connection.query).bind(connection)(deleteFromCartQuery, values);
                }
            }
            res.status(200).json({message: 'Update successful'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'mysql更新失败', error: error.message});
        } finally {
            connection.end();
        }
    })
});


function mergeData(cartData, productData, imageData) {
    const mergedData = {};

    // 合并购物车信息
    for (const cartItem of cartData) {
        const productId = cartItem.productid;
        if (!mergedData[productId]) {
            mergedData[productId] = {};
        }

        Object.assign(mergedData[productId], cartItem);
    }

    // 合并产品信息
    for (const productItem of productData) {
        const productId = productItem.productid;
        if (!mergedData[productId]) {
            mergedData[productId] = {};
        }

        Object.assign(mergedData[productId], productItem);
    }

    // 合并图片信息
    for (const imageItem of imageData) {
        const productId = imageItem.productid;
        if (!mergedData[productId]) {
            mergedData[productId] = {};
        }

        Object.assign(mergedData[productId], imageItem);
    }

    return mergedData;
}

// 将二级路由器挂载到主应用程序的/api路径下
app.use('/api', authRouter);

// 启动Express服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Express服务器正在监听端口 ${port}`);
});
