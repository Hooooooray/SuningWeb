// 搜索确认
let searchSubmit = document.querySelector('.searchSubmit')
searchSubmit.addEventListener('click',()=>{
    let searchKeyword = document.querySelector('.search-keyword')
    let keyword = searchKeyword.value
    window.location.href = `./search.html?keyword=${keyword}`
})

// 数量减1
let minusButton = document.querySelector('.minus')
minusButton.addEventListener('click', () => {
    let productNumInput = document.querySelector('.num-con input')
    let num = productNumInput.value
    if (num > 1) {
        productNumInput.value--
    }
    if (productNumInput.value <= 1){
        minusButton.style.backgroundPositionX = '-970px'
    }else {
        minusButton.style.backgroundPositionX = '-1014px'
    }
})
let plusButton = document.querySelector('.plus')

// 数量加1
plusButton.addEventListener('click', () => {
    let productNumInput = document.querySelector('.num-con input')
    productNumInput.value++
    if (productNumInput.value <= 1){
        minusButton.style.backgroundPositionX = '-970px'
    }else {
        minusButton.style.backgroundPositionX = '-1014px'
    }
})

// 监听输入框的值，控制加减按钮的可点击状态
let numConInput = document.querySelector('.num-con input')
numConInput.addEventListener('blur',()=>{
    let productNumInput = document.querySelector('.num-con input')
    let num = productNumInput.value
    if (num <= 1){
        minusButton.style.backgroundPositionX = '-970px'
    }else {
        minusButton.style.backgroundPositionX = '-1014px'
    }
})

// 加入购物车成功的确认框
let mDialog = document.querySelector('.m-dialog')
let closeOverlay = document.querySelector('.close-overlay')
let btnCloseButton = document.querySelector('.btn-close')
btnCloseButton.addEventListener('click', () => {
    mDialog.style.display = 'none'
    closeOverlay.style.display = 'none'
})

// 退出登录按钮
let logOutBtn = document.getElementById('logOut')
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("token");
    window.location.href = './login.html'
})

// 加入购物车
let addCartButton = document.getElementById('addCart')
addCartButton.addEventListener('click', () => {
    let token = localStorage.getItem('token')
    let quantity = document.querySelector('.num-con input').value
    const insertUrl = 'http://localhost:3000/api/insertCart'
    let data = {
        productid: primaryId,
        quantity
    }
    fetch(insertUrl, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            mDialog.style.display = 'block'
            closeOverlay.style.display = 'block'
            return response.json()
        } else if (response.status === 401) {
            location.href = `./login.html?returnUrl=/product.html&productid=${primaryId}`
        }
    }).then(responseData => {
        console.log(responseData)
    }).catch(err => {
        console.log(err)
    })
})

// 获取参数值
let urlParams = new URL(window.location.href);
let productId = urlParams.searchParams.get('productid');

// 通过token验证用户身份
let token = localStorage.getItem('token')
const tokenUrl = 'http://localhost:3000/api/token'
// 用户信息显示
let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')

// 验证token
fetch(tokenUrl, {
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
        } else {
            const phone = response.phone
            usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
        }

    })
    .catch(err => {
        console.log(err)
    })


// 构建请求 URL
const apiUrl1 = `http://localhost:3000/api/product?productid=${productId}`;
const apiUrl2 = `http://localhost:3000/api/relevanceProduct?productid=${productId}`;
// 商品主图和放大
let imgZoomMainImg = document.querySelector('.img-zoom-main img')
let imgZoomPopImg = document.querySelector('.img-zoom-pop img')
// tab切换图片
let ulImgList = document.querySelectorAll('.ul-container li img')
// 自营标识
let zy = document.querySelector('.zy')
// 商品名字，描述，价格
let itemName = document.querySelector('.item-name')
let desc = document.querySelector('.desc')
let mainPrice = document.querySelector('.main-price')
let primaryColor, primaryMemory, primarySize, primaryModel, primarySpecification, primarySign, primaryId
// 通过 Promise 链的方式串联多个异步操作，实现了多个异步请求的顺序执行
fetch(apiUrl1)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // 解析 JSON 响应
    })
    .then(responseData => {
        console.log(responseData);
        let price = responseData.price.split('.')
        mainPrice.innerHTML = `<i>¥</i>${price[0]}.<span>${price[1]}</span>`
        imgZoomMainImg.src = responseData.images[0]
        imgZoomPopImg.src = responseData.images[0]
        itemName.innerText = responseData.name
        desc.innerText = responseData.description
        ulImgList.forEach((item, index) => {
            if (responseData.images[index]) {
                item.src = responseData.images[index]
            }

        })
        if (responseData.storename === "苏宁自营") {
            zy.style.display = 'block'
            zy.innerText = "自营"
        }

        primaryColor = responseData.color
        primaryMemory = responseData.memory
        primarySize = responseData.size
        primaryModel = responseData.model
        primarySpecification = responseData.specification
        primarySign = responseData.sign
        primaryId = responseData.productid
        // 返回第二个请求
        return fetch(apiUrl2).then(response => response.json());
    })
    .then(relevanceProductData => {
        console.log(relevanceProductData);
        let existColor = []
        let existMemory = []
        let existSize = []
        let proinfoColorEx = document.querySelector('.proinfo-color-ex')
        let proinfoMemory = document.querySelector('.proinfo-memory')
        let proinfoSize = document.querySelector('.proinfo-size')
        for (let relevance of relevanceProductData) {
            if (relevance.color) {
                proinfoColorEx.style.display = 'flex'
                let tipInfor = proinfoColorEx.querySelector('.tip-infor')
                if (existColor.indexOf(relevance.color) === -1) {
                    existColor.push(relevance.color)
                    let clrItem = document.createElement('li')
                    clrItem.classList.add('clr-item')
                    clrItem.innerHTML = `<a href="javascript:void(0)" data-color="${relevance.color}" class="${relevance.color === primaryColor ? 'selected' : ''}">
                                <img src="${relevance.images[0]}" alt="">
                                <span>${relevance.color}</span>
                            </a>`
                    tipInfor.appendChild(clrItem)
                }
            }
            if (relevance.memory) {
                proinfoMemory.style.display = 'flex'
                let buyType = proinfoMemory.querySelector('.buy-type')
                if (existMemory.indexOf(relevance.memory) === -1) {
                    existMemory.push(relevance.memory)
                    let li = document.createElement('li')
                    li.innerHTML = `<a href="javascript:void(0)" data-memory="${relevance.memory}" class="${relevance.memory === primaryMemory ? 'selected' : ''}" href="">
                                <span>${relevance.memory}</span>
                            </a>`
                    buyType.appendChild(li)
                }
            }
            if (relevance.size) {
                proinfoSize.style.display = 'flex'
                let buyType = proinfoSize.querySelector('.buy-type')
                if (existSize.indexOf(relevance.size) === -1) {
                    existSize.push(relevance.size)
                    let li = document.createElement('li')
                    li.innerHTML = `<a href="javascript:void(0)" data-size="${relevance.size}" class="${relevance.size === primarySize ? 'selected' : ''}" href="">
                                <span>${relevance.size}</span>
                            </a>`
                    buyType.appendChild(li)
                }
            }
        }
        let colorA = document.querySelectorAll('.proinfo-color-ex a')
        colorA.forEach(item => {
            item.addEventListener('click', () => {
                let color = item.getAttribute('data-color')
                if (primaryMemory) {
                    let memorySelected = document.querySelector('.proinfo-memory .selected')
                    let memory = memorySelected.getAttribute('data-memory')
                    const apiUrl3 = `http://localhost:3000/api/findProduct?color=${encodeURIComponent(color)}&memory=${encodeURIComponent(memory)}&sign=${encodeURIComponent(primarySign)}`;
                    fetch(apiUrl3)
                        .then(response => response.json())
                        .then(responseData => {
                            let productid = responseData.productid
                            if (productid !== primaryId) {
                                let newUrl = new URL(window.location.href);
                                newUrl.searchParams.set('productid', productid);
                                // 将修改后的 URL 更新到地址栏
                                history.replaceState({}, '', newUrl.href);
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error('获取数据错误:', error);
                        });
                }
                if (primarySize) {
                    let sizeSelected = document.querySelector('.proinfo-size .selected')
                    let size = sizeSelected.getAttribute('data-size')
                    console.log(color, size)
                    const apiUrl3 = `http://localhost:3000/api/findProduct?color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}&sign=${encodeURIComponent(primarySign)}`;
                    fetch(apiUrl3)
                        .then(response => response.json())
                        .then(responseData => {
                            let productid = responseData.productid
                            if (productid !== primaryId) {
                                let newUrl = new URL(window.location.href);
                                newUrl.searchParams.set('productid', productid);
                                // 将修改后的 URL 更新到地址栏
                                history.replaceState({}, '', newUrl.href);
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error('获取数据错误:', error);
                        });
                }


            })
        })
        let memoryA = document.querySelectorAll('.proinfo-memory a')
        memoryA.forEach(item => {
            item.addEventListener('click', () => {
                let memory = item.getAttribute('data-memory')
                if (primaryColor) {
                    let colorSelected = document.querySelector('.proinfo-color-ex .selected')
                    let color = colorSelected.getAttribute('data-color')
                    const apiUrl3 = `http://localhost:3000/api/findProduct?color=${encodeURIComponent(color)}&memory=${encodeURIComponent(memory)}&sign=${encodeURIComponent(primarySign)}`;
                    fetch(apiUrl3)
                        .then(response => response.json())
                        .then(responseData => {
                            let productid = responseData.productid
                            if (productid !== primaryId) {
                                let newUrl = new URL(window.location.href);
                                newUrl.searchParams.set('productid', productid);
                                // 将修改后的 URL 更新到地址栏
                                history.replaceState({}, '', newUrl.href);
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error('获取数据错误:', error);
                        });
                }
            })
        })
        let sizeA = document.querySelectorAll('.proinfo-size a')
        sizeA.forEach(item => {
            item.addEventListener('click', () => {
                let size = item.getAttribute('data-size')
                if (primaryColor) {
                    let colorSelected = document.querySelector('.proinfo-color-ex .selected')
                    let color = colorSelected.getAttribute('data-color')
                    const apiUrl3 = `http://localhost:3000/api/findProduct?color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}&sign=${encodeURIComponent(primarySign)}`;
                    fetch(apiUrl3)
                        .then(response => response.json())
                        .then(responseData => {
                            let productid = responseData.productid
                            if (productid !== primaryId) {
                                let newUrl = new URL(window.location.href);
                                newUrl.searchParams.set('productid', productid);
                                // 将修改后的 URL 更新到地址栏
                                history.replaceState({}, '', newUrl.href);
                                location.reload()
                            }
                        })
                        .catch(error => {
                            console.error('获取数据错误:', error);
                        });
                }
            })
        })
    })
    .catch(error => {
        // 处理请求错误
        console.error('Fetch error:', error);
    });

