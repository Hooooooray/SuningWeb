let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')
const mCartBody = document.querySelector('.m-cart-body')
let logOutBtn = document.getElementById('logOut')
let cartData

logOutBtn.addEventListener('click',()=>{
    localStorage.removeItem("token");
    window.location.href = './login.html'
})

function load() {
    let token = localStorage.getItem('token')
    const url = 'http://localhost:3000/api/cart'
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
        .then(responseData => {
            // console.log(responseData)
            if (responseData.decoded.name) {
                usernameSpan.innerHTML = responseData.decoded.name
            } else {
                const phone = responseData.decoded.phone
                usernameSpan.innerHTML = phone.replace(/^(.{3}).{4,}(.{2})$/, '$1******$2')
            }
            cartData = responseData.data
            // console.log(cartData)
            loadCart()
        })
        .catch(err => {
            console.log(err)
        })
}

load()

function loadCart() {
    document.querySelector('.m-cart-body').innerHTML = ''
    let store = []
    let selectedNum = 0
    let selectedCount = 0
    for (let key in cartData) {
        // console.log(key,cartData[key])
        const selected = cartData[key].selected ? 'checked' : null
        const name = cartData[key].name
        const color = cartData[key].color
        const memory = cartData[key].memory
        const price = Number(cartData[key].price).toFixed(2)
        const quantity = cartData[key].quantity
        const sum = (price * quantity)
        const url = cartData[key].imageurl
        const storeName = cartData[key].storename
        const size = cartData[key].size
        const productid = cartData[key].productid

        if (selected) {
            selectedNum += 1
            selectedCount += sum
        }

        // console.log(selected,name,color,memory,price,quantity,url,storeName)

        const cartListTemplate = `
            <div class="cart-item">
                <div class="item-main">
                    <div class="td td-chk">
                        <div class="cart-checkbox">
                            <input ${selected} type="checkbox" class="product-check-box" data-productid="${productid}">
                        </div>
                    </div>
                    <div class="td td-item">
                        <div class="item-pic">
                            <a href="">
                                <img src="${url}" alt="">
                            </a>
                        </div>
                        <div class="item-info">
                            <a href="">${name}</a>
                        </div>
                    </div>
                    <div class="td td-specs">
                        <div class="specs-line">
                            ${color ? `<p>颜色：${color}</p>` : ''} 
                        </div>
                        <div class="specs-line">
                            ${memory ? `<p>内存：${memory}</p>` : ''}
                        </div>
                        <div class="specs-line">
                            ${size ? `<p>尺码：${size}</p>` : ''}
                        </div>
                    </div>
                    <div class="td td-price">
                        <div class="price-line">
                            <span>
                                <i>¥</i>
                                <em>${price}</em>
                            </span>
                        </div>
                    </div>
                    <div class="td td-amount">
                        <div class="item-amount">
                            <a href="" class="minus" data-productid="${productid}"></a>
                            <input value="${quantity}" type="text" class="text-amount">
                            <a href="" class="plus" data-productid="${productid}"></a>
                        </div>
                    </div>
                    <div class="td td-sum">
                        <b class="sn-price">
                            <i>¥</i>
                            <em>${sum.toFixed(2)}</em>
                        </b>
                    </div>
                    <div class="td td-op">
                        <a href="">移入关注</a>
                        <a href="">删除</a>
                    </div>
                </div>
            </div>`

        if (store.indexOf(storeName) === -1) {
            store.push(storeName)
            let mStore = document.createElement('div')
            mStore.classList.add('m-store')
            mStore.setAttribute('data-store', storeName)
            mStore.innerHTML = `<div class="store-title">
                <div class="cart-checkbox">
                    <input type="checkbox" class="store-all-check">
                </div>
                <b>${storeName}</b>
            </div>`
            mCartBody.appendChild(mStore)
            let cartList = document.createElement('div')
            cartList.classList.add('cart-list')
            cartList.setAttribute('data-productid', productid)
            cartList.innerHTML = cartListTemplate;
            mStore.appendChild(cartList)
        } else if (store.indexOf(storeName) >= 0) {
            let cartList = document.createElement('div')
            cartList.classList.add('cart-list')
            cartList.setAttribute('data-productid', productid)
            cartList.innerHTML = cartListTemplate;
            const mStore = mCartBody.querySelector(`[data-store=${storeName}]`)
            mStore.appendChild(cartList)
        }

    }

    let nowSelectedGoodsText = document.querySelector('.now-select-goods b')
    let snPriceText = document.querySelector('#sn-price-count em')
    nowSelectedGoodsText.innerText = selectedNum
    snPriceText.innerText = selectedCount.toFixed(2)


    let mStore = document.querySelectorAll('.m-store')
    mStore.forEach(store => {
        let productCheckBox = store.querySelectorAll('.product-check-box')
        let storeAllCheckBox = store.querySelector('.store-all-check')
        storeAllCheckBox.checked = Array.from(productCheckBox).every(checkbox => checkbox.checked)
    })

    let allCheckBox = document.querySelectorAll('.all-check-box')
    allCheckBox.forEach(item => {
        let storeAllCheckBox = document.querySelectorAll('.store-all-check')
        item.checked = Array.from(storeAllCheckBox).every(checkbox => checkbox.checked)
    })


    let productCheckBox = document.querySelectorAll('.product-check-box')
    productCheckBox.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCount += 1
        }
        checkbox.addEventListener('click', () => {
            let productid = checkbox.getAttribute('data-productid')
            let selected = checkbox.checked
            const data = {
                productid,
                selected
            }
            let updates = [data]
            console.log(updates)
            let token = localStorage.getItem('token')
            const url = 'http://localhost:3000/api/updateCart'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({updates})
            })
                .then(response => {
                    if (response.ok) {
                        // return response.json()
                        load()
                    } else {
                        throw new Error('更新购物车失败')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    let storeAllCheckBox = document.querySelectorAll('.store-all-check')
    storeAllCheckBox.forEach(store => {
        store.addEventListener('click', () => {
            console.log(store)
            let updates = []
            let selected = store.checked
            let mStore = store.parentNode.parentNode.parentNode
            let cartList = mStore.querySelectorAll('.cart-list')
            for (let cartItem of cartList) {
                let productid = cartItem.getAttribute('data-productid')
                let data = {
                    productid,
                    selected
                }
                updates.push(data)
            }
            let token = localStorage.getItem('token')
            const url = 'http://localhost:3000/api/updateCart'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({updates})
            }).then(response => {
                if (response.ok) {
                    // return response.json()
                    load()
                } else {
                    throw new Error('更新购物车失败')
                }
            })
                .catch(err => {
                    console.log(err)
                })
        })
    })

}

