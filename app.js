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

// 短信验证码发送
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

// 注册
authRouter.post('/register', (req, res) => {
    const {phoneNumber, smsCode, password} = req.body;

    if (smsCode === formattedNumber[phoneNumber]) {
        // 生成密码的哈希值
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

// 账号密码登录
authRouter.post('/accountLogin', (req, res) => {
    const {loginAccount, loginPassword} = req.body;
    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();
    // 通过sql语句查询用户输入的是用户名还是手机号
    let selectSql = `SELECT * FROM User WHERE username = ? OR phone = ?`; // 用你的表结构和字段名替换
    const values = [loginAccount, loginAccount]
    // 查询数据
    connection.query(selectSql, values, function (err, result) {
        if (err) {
            console.error('查询出错: ' + err.stack);
        } else if (result.length >= 1) {
            const user = result[0]
            // bcrypt.compare解析数据库中存放的密码的哈希值，并与用户输入的密码比较是否匹配
            bcrypt.compare(loginPassword, user.password, (err, isMatch) => {
                if (err) {
                    console.error('密码比较时出错')
                }
                if (isMatch) {
                    // 密码匹配，登录成功，生成token
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

// 短信登录
authRouter.post('/smsLogin', (req, res) => {
    const {phoneNumber, smsCode} = req.body
    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();
    // 先通过一遍查询验证这个密码是否已经注册,如果查询到顺便保存查询结果用于生成token
    let selectSql = `SELECT * FROM User WHERE phone = ?`;
    // 查询数据
    connection.query(selectSql, phoneNumber, function (err, result) {
        if (err) {
            console.error('查询出错: ' + err.stack);
        } else if (result.length >= 1) {
            // 如果验证码匹配则登录成功
            if (smsCode === formattedNumber[phoneNumber]) {
                const user = result[0];
                const token = jwt.sign(user, secretKey, {expiresIn: '24h'});
                res.status(200).json({message: '登录成功', statusCode: 200,token});
            } else {
                res.status(400).json({message: '验证码不正确', statusCode: 400});
            }
        } else {
            res.status(404).json({message: '未找到用户信息,请先注册', statusCode: 404});
        }
    });
    connection.end();
})

// 验证token
authRouter.post('/token', (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token is not valid'});
        }
        res.json(decoded);
    });
})

// 更新用户信息
authRouter.post('/updateUser', (req, res) => {
    const {username, nickname, gender, userid} = req.body;
    // 如果用户未更改任何信息，则返回错误信息
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
                    // 更新用户的token
                    const user = result[0];
                    const token = jwt.sign(user, secretKey, {expiresIn: '24h'});
                    res.status(200).json({message: '更新成功', statusCode: 200, token});
                }
            });
            connection.end();
        }
    });
});

// 购物车加载
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

// 更新购物车信息
authRouter.post('/updateCart', (req, res) => {
    const token = req.headers.authorization;
    // const {productid, selected, quantity} = req.body
    const {updates} = req.body;
    // 使用 async/await 处理异步操作，同时使用了 promisify 来将回调式的 MySQL 查询转换为 Promises 风格
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
                    // 改变单个或多个购物车项选中状态
                    if (selected !== undefined && quantity === undefined) {
                        const updateSelectedQuery = 'UPDATE ShoppingCart SET selected = ? WHERE userid = ? AND productid = ?';
                        const values = [selected, userid, productid];
                        // 使用promisify来将connection.query方法转换成 Promise 风格，以便于在 async/await 语法中使用。
                        // 通过 .bind(connection)，确保 connection.query 在调用时有正确的上下文，
                        await promisify(connection.query).bind(connection)(updateSelectedQuery, values);
                    }
                    // 改变数量
                    if (quantity !== undefined && quantity >= 1 && selected === undefined) {
                        const updateQuantityQuery = 'UPDATE ShoppingCart SET quantity = ? WHERE userid = ? AND productid = ?';
                        const values = [quantity, userid, productid];
                        await promisify(connection.query).bind(connection)(updateQuantityQuery, values);
                    } else {
                        // throw new Error();
                    }
                }
                // 全选或全不选
                else if (selected !== undefined && quantity === undefined) {
                    const updateQuantityQuery = 'UPDATE ShoppingCart SET selected = ? WHERE userid = ?';
                    const values = [selected, userid];
                    await promisify(connection.query).bind(connection)(updateQuantityQuery, values);
                }
            }
            res.status(200).json({message: 'Update successful'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'mysql更新失败', error: error.message});
        }
        // 在 finally 块中关闭数据库连接，确保释放资源
        finally {
            connection.end();
        }
    })

})

// 删除购物车中的商品
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

// 根据productid获取商品信息
authRouter.get('/product', (req, res) => {
    const {productid} = req.query;
    if (!productid) {
        return res.status(400).json({error: '需要提供产品ID。'});
    }
    // LEFT JOIN 对于 Product 表的每一行，都会尝试与 ProductImage 表中的相应行进行匹配。如果匹配成功，则将两个表中的相关列合并到结果集中。
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
        // console.log(results)
        // filter 方法用于过滤数组中的元素，map 方法用于对数组中的每个元素执行给定的函数，并返回一个新数组
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

// 根据productid获取和该productid对应商品的相关商品的信息
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

// 根据所提供特定的信息查找商品
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

// 将商品插入到购物车
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

authRouter.get('/search', (req, res) => {
    const { keyword, page } = req.query;
    const itemsPerPage = 20;
    const currentPage = parseInt(page) || 1; // 默认当前页为第一页

    if (!keyword) {
        return res.status(400).json({ message: '关键词不能为空', statusCode: 400 });
    }

    const connection = mysql.createConnection(mysqlConnection);
    connection.connect();

    // 大小写不敏感的匹配，通过name,description,type,sign,color,storename字段匹配进行搜索
    const countQuery = `
        SELECT COUNT(DISTINCT p.productid) as total
        FROM Product p
        LEFT JOIN ProductImage pi ON p.productid = pi.productid
        WHERE LOWER(p.name) LIKE CONCAT('%', LOWER(?), '%') 
           OR LOWER(p.description) LIKE CONCAT('%', LOWER(?), '%') 
           OR LOWER(p.type) LIKE CONCAT('%', LOWER(?), '%')
           OR LOWER(p.sign) LIKE CONCAT('%', LOWER(?), '%')
           OR LOWER(p.color) LIKE CONCAT('%', LOWER(?), '%')
           OR LOWER(p.storename) LIKE CONCAT('%', LOWER(?), '%')
    `;

    const countValues = [keyword, keyword, keyword, keyword, keyword, keyword];
    connection.query(countQuery, countValues, (countError, countResults) => {
        if (countError) {
            console.error(countError);
            return res.status(500).json({ message: '内部服务器错误' });
        }
        // 分页处理
        const totalResults = countResults[0].total;
        const totalPages = Math.ceil(totalResults / itemsPerPage);
        const offset = (currentPage - 1) * itemsPerPage;

        // 大小写不敏感的匹配，查询具体页数对应的20条数据，LIMIT ?,? 第一个值是偏移量，第二个是返回行数
        const searchQuery = `
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
            WHERE LOWER(p.name) LIKE CONCAT('%', LOWER(?), '%') 
               OR LOWER(p.description) LIKE CONCAT('%', LOWER(?), '%') 
               OR LOWER(p.type) LIKE CONCAT('%', LOWER(?), '%')
               OR LOWER(p.sign) LIKE CONCAT('%', LOWER(?), '%')
               OR LOWER(p.color) LIKE CONCAT('%', LOWER(?), '%')
               OR LOWER(p.storename) LIKE CONCAT('%', LOWER(?), '%')
            GROUP BY p.productid
            ORDER BY RAND()
            LIMIT ?, ?
        `;

        const searchValues = [keyword, keyword, keyword, keyword, keyword, keyword, offset, itemsPerPage];

        connection.query(searchQuery, searchValues, (searchError, results) => {
            if (searchError) {
                console.error(searchError);
                return res.status(500).json({ message: '内部服务器错误' });
            }

            const searchResults = results.map((result) => {
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
                    imageurl: result.imageurl,
                };
            });

            res.status(200).json({
                currentPage,
                totalPages,
                results: searchResults,
            });
        });
        connection.end();
    });


});



function mergeData(cartData, productData, imageData) {
    const mergedData = {};

    // 合并购物车信息
    // 用多个Object.assign将多个源对象的属性复制到目标对象（浅拷贝）
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
