// 广告栏关闭
let topX = document.getElementById('TOP_X')
topX.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('TOP_ACTIVE').classList.add('display-none')
})

// 获取页面标签
let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')
let hi = document.querySelector('.hi em')
let logOutBtn = document.getElementById('logOut')
let searchSubmit = document.querySelector('.searchSubmit')
let swiperScreen = document.getElementById('swiperScreen')

let swiperScreenArr = [
    {background:"#ED7772",src:"images/swiper1.jpg"},
    {background:"#4251DF",src:"images/swiper2.jpg"},
    {background:"#833D2A",src:"images/swiper3.jpg"},
    {background:"#5FAEED",src:"images/swiper4.jpg"},
    {background:"#A894D2",src:"images/swiper5.jpg"},
    {background:"#4C79BE",src:"images/swiper6.jpg"},
    {background:"#713BE6",src:"images/swiper7.gif"},
    {background:"#DF4746",src:"images/swiper8.jpg"},
]
// 轮播图渲染
for (let swiperItem of swiperScreenArr){
    console.log(swiperItem)
    let swiperSlide = document.createElement('div')
    swiperSlide.classList.add('swiper-slide')
    swiperSlide.setAttribute('style',`background: ${swiperItem.background}`)
    swiperSlide.innerHTML = `<img src="${swiperItem.src}" alt="">`
    swiperScreen.appendChild(swiperSlide)
}


// 搜索提交
searchSubmit.addEventListener('click', () => {
    let searchKeyword = document.querySelector('.search-keyword')
    let keyword = searchKeyword.value
    window.location.href = `./views/search.html?keyword=${keyword}`
})

// 退出登录，删除token
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("token");
    window.location.href = './views/login.html'
})

window.onload = function () {
    // 获取localStorage中的token，判断用户是否登录，并控制相应的显示部分
    let token = localStorage.getItem('token')
    console.log(token)
    const url = 'http://localhost:3000/api/token'
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
            }
        })
        .then(response => {
            console.log(response)
            if (response.name) {
                usernameSpan.innerHTML = response.name
                hi.innerHTML = response.name
            } else {
                const phone = response.phone
                // 隐藏用户具体手机号码
                usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
                hi.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            }

        })
        .catch(err => {
            console.log(err)
        })
}
