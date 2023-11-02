// 导入模块
const http = require('http');
const { exec } = require('child_process');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 处理POST请求
  if (req.method === 'POST') {
    // 监听请求的data事件，将请求体的数据流拼接到body变量中
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // 解析 POST 请求内容，根据需要进行处理
      // 例如，可以将 body 解析为 JSON 对象，提取参数等
      const data = JSON.parse(body); // 解析POST请求的JSON数据
      // 服务器再判断一次密码格式的正确性
      if (!isValidPhoneNumber(data.phoneNumbers)) {
        res.statusCode = 400; // 返回400 Bad Request状态码
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Bad Request', statusCode: 400 }));
        return;
      }
      const phoneNumbers = data.phoneNumbers; // 从POST请求数据中获取电话号码
      let formattedNumber = data.formattedNumber;
      // 调用 TypeScript 代码
      exec('node ./src/client.js ' + phoneNumbers + ' ' + formattedNumber, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing TypeScript: ${error}`);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Internal Server Error', statusCode: 500 }));
        } else {
          console.log(`TypeScript output: ${stdout}`);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'OK', statusCode: 200 }));
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^[1-9][0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
}

// 监听端口
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
