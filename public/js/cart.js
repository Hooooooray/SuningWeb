let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')

window.onload = function () {
    let token = localStorage.getItem('token')
    const url = 'http://localhost:3000/api/token'
    fetch(url, {
        method: 'GET',
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
            if (response.name) {
                usernameSpan.innerHTML = response.name
            } else {
                usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            }
            userid = response.userid
        })
        .catch(err => {
            console.log(err)
        })
}