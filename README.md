依赖安装：
```shell
npm i
```
后端运行：
```shell
node app.js
```
或：
```shell
nodemon app.js
```
然后浏览器打开\
http://localhost:3000/

如果需要使用阿里云短信服务 \
请在client.ts替换以下属性的值
```js
accessKeyId: "" //访问者身份标识
accessKeySecret: "" //访问者密钥
signName:"" //短信签名
templateCode:"" //短信模板的代码
```
然后执行tsc命令将client.ts编译成javascript代码
```shell
tsc ./src/sms-server/client.ts
```
GitHub地址（一个HTTPS，一个SSH）：
```text
https://github.com/Hooooooray/SuningWeb.git
```
```text
git@github.com:Hooooooray/SuningWeb.git
```
\
数据库导入：
```text
使用数据库管理软件（如Navicat）打开根目录下的suning.sql
连接到你的数据库服务器
选择目标数据库
全选然后运行
```
如果没有阿里云的短信服务请使用用于测试登录的账号密码(用户名和手机号都可以用作登录)：
```text
用户名:admin 手机号:18677439605 密码:yyb12345
```
数据库中的图片地址来源于个人搭建的图床\
个人图床地址
```text
https://images.hooray.top
```
域名后面为图片位于图床的具体地址，比如\
https://images.hooray.top/iPhone15/iPhone15_GREEN_001.jpg

数据库设计：
* Product表：
    * 包含产品的基本信息，如名称、描述、价格等。
    * productid 是主键，确保唯一标识每个产品。
    * 存储了一些关于产品的额外信息，如 storename、type 等，默认值提供了一些默认设置。
* ProductImage表：
    * 用于存储产品的图片信息。
    * imageid 是主键，确保唯一标识每个图片。
    * 通过外键 productid 与 Product 表相关联，确保每个图片都与某个产品关联。
* ShoppingCart表：
    * 用于跟踪用户的购物车信息。
    * cartid 是主键，确保唯一标识每个购物车项。
    * 使用 unique_user_product 确保每个用户在购物车中只有一个产品的唯一实例。
    * 通过外键 userid 与 User 表关联，确保每个购物车项都与一个用户相关联。
    * 通过外键 productid 与 Product 表关联，确保每个购物车项都与一个产品相关联。
* User表：
    * 存储用户信息，如用户名、密码、电话号码等。
    * userid 是主键，确保唯一标识每个用户。
    * 使用 unique 约束确保电话号码和用户名的唯一性

后端接口设计：
* 路由设计和功能划分：
    * /api: 一个简单的测试接口，返回 "HelloWorld"。
    * /api/sms: 发送短信验证码的接口。
    * /api/register: 用户注册接口。
    * /api/accountLogin: 账号密码登录接口。
    * /api/smsLogin: 短信验证码登录接口。
    * /api/token: 验证 Token 的接口。
    * /api/updateUser: 更新用户信息的接口。
    * /api/cart: 购物车加载接口。
    * /api/updateCart: 更新购物车信息的接口。
    * /api/deleteFromCart: 删除购物车中商品的接口。
    * /api/product: 根据 productid 获取商品信息的接口。
    * /api/relevanceProduct: 获取与指定商品相关的商品信息的接口。
    * /api/findProduct: 根据提供的特定信息查找商品的接口。
    * /api/insertCart: 将商品插入购物车的接口。
    * /api/search: 根据关键词搜索商品的接口。

* 数据库交互：
    * 使用 mysql2 库进行 MySQL 数据库的交互。
    * 使用 bcrypt 对密码进行哈希处理，增强安全性。
    * 使用 JWT（JSON Web Tokens）进行用户认证，生成和验证用户令牌。
    * 使用 async/await 处理异步操作，同时使用了 promisify 来将回调式的 MySQL 查询转换为 Promises 风格

* 中间件使用：
    * 使用 cors 中间件解决跨域问题。
    * 使用 express.json() 中间件解析请求体中的 JSON 数据。
    * 使用 bcrypt 对密码进行哈希处理。
    * 使用 jsonwebtoken 进行用户身份验证和创建令牌。

* 错误处理：
    * 对各种情况下的错误进行了处理，并返回相应的 HTTP 状态码和错误信息。

* 安全性考虑：
    * 使用 bcrypt 对用户密码进行哈希处理，提高密码安全性。
    * 通过 JWT 进行用户认证，确保接口的安全性。

* 性能优化：
    * 采用异步操作，如使用 promisify，以提高代码的性能和可读性。