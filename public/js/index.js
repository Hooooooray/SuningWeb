let topX = document.getElementById('TOP_X')
topX.addEventListener('click',(event)=>{
    event.preventDefault();
    document.getElementById('TOP_ACTIVE').classList.add('display-none')
})

let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')
let hi = document.querySelector('.hi em')
let logOutBtn = document.getElementById('logOut')

logOutBtn.addEventListener('click',()=>{
    localStorage.removeItem("token");
    window.location.href = './views/login.html'
})

 window.onload = function() {
    let token = localStorage.getItem('token')
    console.log(token)
    const url = 'http://localhost:3000/api/token'
    fetch(url,{
        method:'GET',
        headers: {
            'Authorization':token
        },
    })
        .then(response=>{
            if (response.ok){
                regBarNode.style.display = 'none'
                usernameNodeSlide.style.display = 'block'
                return response.json()
            }
        })
        .then(response=>{
            console.log(response)
            if (response.name){
                usernameSpan.innerHTML = response.name
                hi.innerHTML = response.name
            }else {
                const phone = response.phone
                usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
                hi.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            }

        })
        .catch(err=>{
            console.log(err)
        })
}
