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

authRouter.post('/token', (req, res) => {
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

authRouter.get('/product', (req, res) => {
    const {productid} = req.query;
    if (!productid) {
        return res.status(400).json({error: '需要提供产品ID。'});
    }
    const query = `
    SELECT 
      p.productid,
      p.name,
      p.description,
      p.price,
      p.storename,
      p.type,
      p.sign,
      p.color,
      p.memory,
      p.model,
      p.specification,
      p.size,
      pi.imageurl
    FROM Product p
    LEFT JOIN ProductImage pi ON p.productid = pi.productid
    WHERE p.productid = ?
  `;

    const connection = mysql.createConnection(mysqlConnection);
    connection.query(query, [productid], (error, results, fields) => {
        if (error) {
            return res.status(500).json({error: '内部服务器错误'});
        }
        if (results.length === 0) {
            return res.status(404).json({error: '找不到产品'});
        }
        const productData = {
            productid: results[0].productid,
            name: results[0].name,
            description: results[0].description,
            price: results[0].price,
            storename: results[0].storename,
            type: results[0].type,
            sign: results[0].sign,
            color: results[0].color,
            memory: results[0].memory,
            model: results[0].model,
            specification: results[0].specification,
            size: results[0].size,
            images: results
                .filter((result) => result.imageurl !== null)
                .map((result) => result.imageurl),
        };
        // 如果有 sign 值，再查询包含相同 sign 值的图片地址
        if (productData.sign) {
            const signQuery = `
        SELECT imageurl
        FROM ProductImage
        WHERE sign = ?
      `;
            connection.query(signQuery, [productData.sign], (signError, signResults, signFields) => {
                if (signError) {
                    return res.status(500).json({error: '内部服务器错误'});
                }
                productData.images = productData.images.concat(
                    signResults.map((signResult) => signResult.imageurl)
                );

                res.status(200).json(productData);
            });
            connection.end()
        } else {
            res.status(200).json(productData);
            connection.end()
        }
    });

});

// 在二级路由器上定义/relevanceProduct路由
authRouter.get('/relevanceProduct', (req, res) => {
    const {productid} = req.query;

    if (!productid) {
        return res.status(400).json({error: '需要提供产品ID。'});
    }

    const getSignQuery = `
        SELECT sign
        FROM Product
        WHERE productid = ?
    `;

    const connection = mysql.createConnection(mysqlConnection);
    connection.query(getSignQuery, [productid], (signError, signResults, signFields) => {
        if (signError) {
            return res.status(500).json({error: '内部服务器错误'});
        }

        if (signResults.length === 0 || !signResults[0].sign) {
            return res.status(404).json({error: '找不到产品或产品没有sign字段'});
        }

        const sign = signResults[0].sign;

        const relevanceQuery = `
            SELECT 
                p.productid,
                p.name,
                p.description,
                p.price,
                p.storename,
                p.type,
                p.sign,
                p.color,
                p.memory,
                p.model,
                p.specification,
                p.size,
                MIN(pi.imageurl) as imageurl
            FROM Product p
            LEFT JOIN ProductImage pi ON p.productid = pi.productid
            WHERE p.sign = ? 
            GROUP BY p.productid
        `;

        connection.query(relevanceQuery, [sign, productid], (error, results, fields) => {
            if (error) {
                return res.status(500).json({error: '内部服务器错误'});
            }

            const relevantProducts = results.map((result) => {
                return {
                    productid: result.productid,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    storename: result.storename,
                    type: result.type,
                    sign: result.sign,
                    color: result.color,
                    memory: result.memory,
                    model: result.model,
                    specification: result.specification,
                    size: result.size,
                    images: [result.imageurl].filter((imageUrl) => imageUrl !== null),
                };
            });

            res.status(200).json(relevantProducts);
        });

        connection.end();
    });

});

authRouter.get('/findProduct', (req, res) => {
    const {color, memory, size, sign} = req.query
    if (color !== undefined && memory !== undefined && size === undefined) {
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        const values = [color, memory, sign]
        const query = `SELECT productid FROM Product WHERE color = ? AND memory = ? AND sign = ?`
        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('查询出错' + err.stack);
                res.status(500).json({message: '查询出错', statusCode: 401})
            } else {
                const data = result[0]
                res.status(200).json(data)
            }
        })
        connection.end()
    }
    if (size !== undefined && color !== undefined) {
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        const values = [color, size, sign]
        console.log(values)
        const query = `SELECT productid FROM Product WHERE color = ? AND size = ? AND sign = ?`
        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('查询出错' + err.stack);
                res.status(500).json({message: '查询出错', statusCode: 401})
            } else {
                const data = result[0]
                res.status(200).json(data)
            }
        })
        connection.end()
    }
})

authRouter.post('/insertCart', (req, res) => {
    const token = req.headers.authorization;
    const {productid,quantity} = req.body;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        const userid = decoded.userid;
        const connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        // 如果该用户已经添加过这个商品，则更新商品的数量，而不是插入重复数据
        const insertOrUpdateQuery = `
            INSERT INTO ShoppingCart (userid, productid, quantity, selected)
            VALUES (?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;
        `;
        connection.query(insertOrUpdateQuery, [userid,productid,quantity,quantity], (err, result) => {
            if (err) {
                return res.status(500).json({message: '插入失败'})
            }
            return res.status(200).json({message: '插入成功'})
        })
        connection.end()
    })

})

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
