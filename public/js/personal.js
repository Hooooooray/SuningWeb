let userNameErr = document.querySelector('.userNameErr')
let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let saveProfileBtn = document.getElementById('save-profile-btn')
const usernameInput = document.getElementById('username')
const nickNameInput = document.getElementById('nickname')
let basicInfoErr = document.getElementById('basicInfoErr')
let usernameSpan = usernameNodeSlide.querySelector('span')
let userid

let logOutBtn = document.getElementById('logOut')

logOutBtn.addEventListener('click',()=>{
    localStorage.removeItem("token");
    window.location.href = './login.html'
})

window.onload = function () {
    const phoneNumber = document.getElementById('phoneNumber')
    const sexRadioButtons = document.getElementsByName('sex');
    const usernameInput = document.getElementById('username')
    const nickNameInput = document.getElementById('nickname')
    let token = localStorage.getItem('token')
    const url = '/api/token'
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
    })
        .then(response => {
            if (response.ok) {
                regBarNode.style.display = 'none'
                usernameNodeSlide.style.display = 'block'
                return response.json()
            } else {
                location.href = './login.html'
            }
        })
        .then(response => {
            console.log(response)
            const phone = response.phone
            if (response.name){
                usernameSpan.innerHTML = response.name
            }else {
                usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            }
            userid = response.userid
            phoneNumber.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            const gender = response.gender
            // 根据性别值设置相应的单选按钮选中
            if (gender === 0) {
                sexRadioButtons[0].checked = true; // 女性
            } else if (gender === 1) {
                sexRadioButtons[1].checked = true; // 男性
            } else if (gender === 2) {
                sexRadioButtons[2].checked = true; // 保密
            }
            usernameInput.value = response.username
            nickNameInput.value = response.name
        })
        .catch(err => {
            console.log(err)
        })
}

saveProfileBtn.addEventListener('click',()=>{
    const sexRadioButtons = document.getElementsByName('sex');
    let gender
    sexRadioButtons.forEach((item,index)=>{
        if (item.checked){
            gender = index
        }
    })
    const username = document.getElementById('username').value
    const nickname = document.getElementById('nickname').value
    const data = {
        username,
        nickname,
        gender,
        userid
    }
    let url = '/api/updateUser'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            basicInfoErr.querySelector('.error').style.backgroundPosition = `-182px 0`
            basicInfoErr.querySelector('span').innerText = '资料修改成功'
            setTimeout(function (){
                basicInfoErr.querySelector('.error').style.backgroundPosition = `-500px 0`
                basicInfoErr.querySelector('span').innerText = ''
            },2000)
            return response.json();
        } else {
            throw new Error('修改失败');
        }
    })
        .then(responseData => {
            console.log(responseData);
            let token = responseData.token
            localStorage.setItem('token',token)
            // console.log(token)
        })
        .catch(error => {
            console.error('Ajax请求异常: ' + error.message);
        });
})

usernameInput.addEventListener('focus', () => {
    userNameErr.querySelector('.error').style.backgroundPosition = `-183px -70px`
    userNameErr.querySelector('span').innerText = '用户名可用来登录，只能由中文，英文，数字、-和_组成'
})

usernameInput.addEventListener('blur', () => {
    let pattern = /^(?![0-9]+$)[a-zA-Z0-9\u4e00-\u9fa5\-_]*$/
    if (!usernameInput.value) {
        userNameErr.querySelector('.error').style.backgroundPosition = `-183px -211px`
        userNameErr.querySelector('span').innerText = '请输入用户名'
    } else if (pattern.test(usernameInput.value)) {
        userNameErr.querySelector('.error').style.backgroundPosition = `-182px 0`
        userNameErr.querySelector('span').innerText = '用户名可用'
    } else {
        userNameErr.querySelector('.error').style.backgroundPosition = `-183px -211px`
        userNameErr.querySelector('span').innerText = '用户名格式不正确'
    }
})