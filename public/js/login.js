let tabItemButton = document.querySelectorAll('.tab-item')
let scanLoginDiv = document.querySelector('.scan-login')
let pcLoginDiv = document.querySelector('.pc-login')
let loginSwitchButton = document.querySelectorAll('.login-switch')
let usernameLoginDiv = document.querySelector('.username-login')
let phoneLoginDiv = document.querySelector('.phone-login')

tabItemButton.forEach((element, index) => {
    element.addEventListener('click', () => {
        tabItemButton.forEach((e, i) => {
            e.classList.toggle('on', i === index);
        })
        if (index === 0) {
            scanLoginDiv.style.display = 'block'
            pcLoginDiv.style.display = 'none'
        } else if (index === 1) {
            console.log(index)
            scanLoginDiv.style.display = 'none'
            pcLoginDiv.style.display = 'block'
        }
    })
})

loginSwitchButton.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (index === 0) {
            usernameLoginDiv.style.display = 'none'
            phoneLoginDiv.style.display = 'block'
        } else if (index === 1) {
            phoneLoginDiv.style.display = 'none'
            usernameLoginDiv.style.display = 'block'
        } else {
            console.error('error')
        }
    })
})

let accountSubmitButton = document.getElementById('accountSubmit')
accountSubmitButton.addEventListener('click', () => {
    let loginAccount = document.getElementById('loginAccount').value
    let loginPassword = document.getElementById('loginPassword').value
    let data = {
        loginAccount,
        loginPassword
    };
    let url = 'http://localhost:3000/api/accountLogin'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            // window.location.href = '../index.html'
            history.go(-1);
            return response.json();
        } else {
            throw new Error('登录失败');
        }
    })
        .then(responseData => {
            // console.log(responseData);
            let token = responseData.token
            localStorage.setItem('token',token)
            console.log(token)
        })
        .catch(error => {
            console.error('Ajax请求异常: ' + error.message);
        });
})


function doCount() {
    let countdown = 60
    sendMsgBtn.classList.add('disabled')
    const countdownInterval = setInterval(() => {
        countdown--;
        sendMsgBtn.innerHTML = `${countdown}秒`
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            sendMsgBtn.classList.remove('disabled')
            sendMsgBtn.innerHTML = "获取验证码"
        } else {

        }
    }, 1000);
}

let sendMsgBtn = document.getElementById('sendSmsCode')

sendMsgBtn.addEventListener('click', () => {
    let phoneNumber = document.getElementById('loginPhone').value
    const url = 'http://localhost:3000/api/sms';
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


let smsSubmitButton = document.getElementById('smsSubmit')
smsSubmitButton.addEventListener('click', () => {
    let phoneNumber = document.getElementById('loginPhone').value
    let smsCode = document.getElementById('loginSmsCode').value
    let data = {
        phoneNumber,
        smsCode
    };
    const url = 'http://localhost:3000/api/smsLogin'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // window.location.href = '../index.html'
                return response.json();
            } else if (response.status === 400) {
                return response.json();
            }else if (response.status === 404) {
                return response.json();
            } else {
                throw new Error('登录失败');
            }
        })
        .then(responseData => {
            console.log(responseData);
        })
        .catch(error => {
            console.error('Ajax请求异常: ' + error.message);
        });
})