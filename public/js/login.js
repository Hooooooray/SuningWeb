let tabItemButton = document.querySelectorAll('.tab-item')
let scanLoginDiv = document.querySelector('.scan-login')
let pcLoginDiv = document.querySelector('.pc-login')
let loginSwitchButton = document.querySelectorAll('.login-switch')
let usernameLoginDiv = document.querySelector('.username-login')
let phoneLoginDiv = document.querySelector('.phone-login')
const phoneRegex = /^[1-9][0-9]{10}$/;

let loginPhoneInput = document.getElementById('loginPhone')
loginPhoneInput.addEventListener('blur',()=>{
    let phoneNumber = document.getElementById('loginPhone').value
    if (phoneRegex.test(phoneNumber)){
        let phoneError = document.getElementById('phoneError')
        phoneError.style.visibility = 'hidden'
    }else {
        let phoneError = document.getElementById('phoneError')
        phoneError.style.visibility = 'visible'
        let phoneErrorSpan = phoneError.querySelector('span')
        phoneErrorSpan.innerHTML = '格式不正确，请输入正确的手机号'
    }
})

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
    let url = '/api/accountLogin'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            let urlParams = new URL(window.location.href);
            let url = urlParams.searchParams.get('returnUrl');
            let productid = urlParams.searchParams.get('productid')
            if(url !==null){
                window.location.href = `../views${url}${productid ? `?productid=${encodeURIComponent(productid)}` : ''}`
            }else {
                window.location.href = '../index.html'
            }
            return response.json();
        }  else {
            let accountError = document.getElementById('accountError')
            accountError.style.visibility = 'visible'
            let accountErrorSpan = accountError.querySelector('span')
            accountErrorSpan.innerHTML = '账户名与密码不匹配，请重新输入！'
            throw new Error('登录失败');
        }
    })
        .then(responseData => {
            // console.log(responseData);
            let token = responseData.token
            localStorage.setItem('token',token)
            // console.log(token)
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
    if (phoneRegex.test(phoneNumber)){
        const url = '/api/sms';
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
    }else {
        let phoneError = document.getElementById('phoneError')
        phoneError.style.visibility = 'visible'
        let phoneErrorSpan = phoneError.querySelector('span')
        phoneErrorSpan.innerText = '格式不正确，请输入正确的手机号'
    }
})


let smsSubmitButton = document.getElementById('smsSubmit')
smsSubmitButton.addEventListener('click', () => {
    let phoneNumber = document.getElementById('loginPhone').value
    let smsCode = document.getElementById('loginSmsCode').value
    let data = {
        phoneNumber,
        smsCode
    };
    const url = '/api/smsLogin'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                let urlParams = new URL(window.location.href);
                let url = urlParams.searchParams.get('returnUrl');
                let productid = urlParams.searchParams.get('productid')
                if(url !==null){
                    window.location.href = `../views${url}${productid ? `?productid=${encodeURIComponent(productid)}` : ''}`
                }else {
                    window.location.href = '../index.html'
                }
                return response.json();
            } else if (response.status === 400) {
                let phoneError = document.getElementById('phoneError')
                phoneError.style.visibility = 'visible'
                let phoneErrorSpan = phoneError.querySelector('span')
                phoneErrorSpan.innerHTML = '验证码不正确'
                return response.json();
            }else if (response.status === 404) {
                return response.json();
            } else {
                throw new Error('登录失败');
            }
        })
        .then(responseData => {
            let token = responseData.token
            localStorage.setItem('token',token)
        })
        .catch(error => {
            console.error('Ajax请求异常: ' + error.message);
        });
})