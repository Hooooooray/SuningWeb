var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yyb12345',
    port: '3306',
    database: 'suning'
});
//
// connection.connect();
//
// var  sql = 'SELECT * FROM users';
// //查
// connection.query(sql,function (err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//
//     console.log('--------------------------SELECT----------------------------');
//     console.log(result);
//     console.log('------------------------------------------------------------\n\n');
// });
//
// connection.end();

connection.connect();

let insertSql = 'INSERT INTO users (password,phone) VALUES (?,?)'; // 用你的表结构和字段名替换

const values = ['yyb12345','18677439605']; // 替换为要插入的数据值

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