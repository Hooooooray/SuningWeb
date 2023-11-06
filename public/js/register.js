let submitBtn = document.getElementById('submitRegister')
let sendMsgBtn = document.getElementById('sendSmsCode')

function doCount() {
    let countdown = 60
    sendMsgBtn.classList.add('disabled')
    const countdownInterval = setInterval(() => {
        countdown--;
        sendMsgBtn.innerHTML = `${countdown}秒后重新获取`
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            sendMsgBtn.classList.remove('disabled')
            sendMsgBtn.innerHTML = "重新获取短信验证码"
        } else {

        }
    }, 1000);


}

sendMsgBtn.addEventListener('click', () => {
    let phoneNumber = document.getElementById('setPhone').value
    let url = 'http://localhost:3000/api/sms'
    let data = {
        phoneNumber
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            doCount();
            return response.json();
        } else if (response.status === 400) {
            return response.json();
        } else if (response.status === 429) {
            return response.json();
        } else {
            throw new Error('发送失败');
        }
    })
        .then(responseData => {
            console.log(responseData);
        })
        .catch(error => {
            console.error('请求异常: ' + error.message);
        });

})
submitBtn.addEventListener('click', () => {
    let phoneNumber = document.getElementById('setPhone').value
    let smsCode = document.getElementById('smsCode').value
    let password = document.getElementById('setPassword').value
    let data = {
        phoneNumber,
        smsCode,
        password
    };
    let url = 'http://localhost:3000/api/register'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '../index.html'
                return response.json();
            } else if (response.status === 400) {
                return response.json();
            } else {
                throw new Error('注册失败');
            }
        })
        .then(responseData => {
            console.log(responseData);
        })
        .catch(error => {
            console.error('Ajax请求异常: ' + error.message);
        });
})


