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