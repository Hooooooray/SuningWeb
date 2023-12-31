// 用户信息显示
let regBarNode = document.getElementById('reg-bar-node')
let usernameNodeSlide = document.getElementById('username-node-slide')
let usernameSpan = usernameNodeSlide.querySelector('span')

// 点击搜索按钮
let searchSubmitButton = document.querySelector('.searchSubmit')
searchSubmitButton.addEventListener('click', () => {
    let keyword = document.querySelector('.search-keyword').value
    window.location.href = `./search.html?keyword=${keyword}`
})

// 退出登录按钮
let logOutBtn = document.getElementById('logOut')
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("token");
    window.location.href = './login.html'
})

// 加入购物车成功提示框
let mDialog = document.querySelector('.m-dialog')
let closeOverlay = document.querySelector('.close-overlay')
let btnCloseButton = document.querySelector('.btn-close')
btnCloseButton.addEventListener('click', () => {
    mDialog.style.display = 'none'
    closeOverlay.style.display = 'none'
})

// 通过token验证用户身份
let token = localStorage.getItem('token')
const tokenUrl = '/api/token'
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

//获取URL对象以及参数
let urlParams = new URL(window.location.href);
let keyword = urlParams.searchParams.get('keyword');
let page = Number(urlParams.searchParams.get('page')) || 1
// 传参keyword为必要值，page为可选值
const searchUrl = `/api/search?keyword=${keyword}${page != null ? `&page=${page}` : ''}`
fetch(searchUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // 商品列表的容器
        let general = document.querySelector('.general')
        // 渲染搜索结果
        for (let product of data.results) {
            // console.log(product)
            let price = product.price.split('.')
            let itemWrap = document.createElement('li')
            itemWrap.classList.add('item-wrap')
            itemWrap.innerHTML = `<div class="item-bg">
                        <div class="product-box">
                            <div class="img-block">
                                <a href="./product.html?productid=${product.productid}" class="sellPoint">
                                    <img src="${product.imageurl}" alt="">
                                </a>
                            </div>
                            <div class="price-box">
                                <div class="def-price">
                                    <i>¥</i>${price[0]}<i>.${price[1]}</i>
                                </div>
                            </div>
                            <div class="title-selling-point">
                                <a href="./product.html?productid=${product.productid}">${product.name}</a>
                            </div>
                            <div class="store-stock">
                                <a href="javascript:void(0)" class="store-class">
                                    ${product.storename}
                                </a>
                            </div>
                            <div class="res-opt">
                                <a href="javascript:void(0)" data-productid="${product.productid}" class="btn-gwc"><i></i>加入购物车</a>
                            </div>
                        </div>
                    </div>`
            general.appendChild(itemWrap)
        }
        // 根据渲染的商品加入购物车
        let btnGwc = document.querySelectorAll('.btn-gwc')
        btnGwc.forEach(item => {
            item.addEventListener('click', () => {
                let token = localStorage.getItem('token')
                let productid = item.getAttribute('data-productid')
                let quantity = 1
                const insertUrl = '/api/insertCart'
                let data = {
                    productid: productid,
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
        })

        // 分页器
        let searchPage = document.querySelector('.search-page')
        let prev = document.createElement('a')
        // 上一页按钮，如果为第一页则不渲染
        if (data.currentPage > 1) {
            prev.setAttribute('href', 'javascript:void(0)')
            prev.classList.add('prev')
            prev.innerHTML = `<b></b>`
            // 点击上一页，currentPage的值减1并同步到地址栏
            let prevPage = data.currentPage - 1
            prev.addEventListener('click', () => {
                let newUrl = new URL(window.location.href);
                newUrl.searchParams.set('page', String(prevPage));
                // 将修改后的 URL 更新到地址栏
                history.replaceState({}, '', newUrl.href);
                location.reload()
            })
            searchPage.appendChild(prev)
        }
        // 动态渲染具体页码
        for (let renderPage = 1; renderPage <= data.totalPages; renderPage++) {
            let aPage = document.createElement('a')
            aPage.setAttribute('href', 'javascript:void(0)')
            if (renderPage === page) {
                aPage.classList.add('current')
            }
            aPage.innerHTML = `${renderPage}<em class="lion"></em>`
            // 点击页码，将点击的页码同步到地址栏并刷新页面
            aPage.addEventListener('click', () => {
                let newUrl = new URL(window.location.href);
                newUrl.searchParams.set('page', String(renderPage));
                // 将修改后的 URL 更新到地址栏
                history.replaceState({}, '', newUrl.href);
                location.reload()
            })
            searchPage.appendChild(aPage)
        }
        // 下一页按钮，如果为最后一页则不显示
        if (data.currentPage < data.totalPages) {
            let next = document.createElement('a')
            next.setAttribute('href', 'javascript:void(0)')
            next.classList.add('next')
            next.innerHTML = `<b></b>`
            // 点击下一页，currentPage的值加1并同步到地址栏
            let nextPage = data.currentPage + 1
            next.addEventListener('click', () => {
                let newUrl = new URL(window.location.href);
                newUrl.searchParams.set('page', String(nextPage));
                // 将修改后的 URL 更新到地址栏
                history.replaceState({}, '', newUrl.href);
                location.reload()
            })
            searchPage.appendChild(next)
        }
        // 跳转页码框
        let pageMore = document.createElement('span')
        pageMore.classList.add('page-more')
        pageMore.innerHTML = `共${data.totalPages}页,
                        <a href="javascript:void(0)">跳转到</a>
                        <input type="number" id="bottomPage">`
        searchPage.appendChild(pageMore)
        // 确认
        let ensure = document.createElement('a')
        ensure.classList.add('page-more', 'ensure')
        ensure.innerText = '确定'
        ensure.setAttribute('href', 'javascript:void(0)')
        ensure.addEventListener('click', () => {
            let toPage = document.getElementById('bottomPage').value
            if (toPage >= 1 && toPage <= data.totalPages) {
                let newUrl = new URL(window.location.href);
                newUrl.searchParams.set('page', String(toPage));
                // 将修改后的 URL 更新到地址栏
                history.replaceState({}, '', newUrl.href);
                location.reload()
            }
        })
        searchPage.appendChild(ensure)


    })
    .catch(error => {
        console.error('Fetch error:', error);
    });