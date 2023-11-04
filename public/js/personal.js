let usernameInput = document.getElementById('username')
let userNameErr = document.querySelector('.userNameErr')

usernameInput.addEventListener('focus',()=>{
    userNameErr.querySelector('.error').style.backgroundPosition = `-183px -70px`
    userNameErr.querySelector('span').innerText='用户名可用来登录，只能由中文，英文，数字、-和_组成'
})

usernameInput.addEventListener('blur',()=>{
    let pattern = /^(?![0-9]+$)[a-zA-Z0-9\u4e00-\u9fa5\-_]*$/
    if(!usernameInput.value){
        userNameErr.querySelector('.error').style.backgroundPosition = `-183px -211px`
        userNameErr.querySelector('span').innerText='请输入用户名'
    }else if(pattern.test(usernameInput.value)){
        userNameErr.querySelector('.error').style.backgroundPosition = `-182px 0`
        userNameErr.querySelector('span').innerText='一旦完善成功，不能修改'
    }else {
        userNameErr.querySelector('.error').style.backgroundPosition = `-183px -211px`
        userNameErr.querySelector('span').innerText='用户名格式不正确'
    }
})