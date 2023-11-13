let imgZoomMainImg = document.querySelector('.img-zoom-main img')
let imgZoomPopImg = document.querySelector('.img-zoom-pop img')
let ulImgList = document.querySelectorAll('.ul-container li img')
let zy = document.querySelector('.zy')
let itemName = document.querySelector('.item-name')
let desc = document.querySelector('.desc')
let mainPrice = document.querySelector('.main-price')
let tzm = document.querySelector('.tzm')
let proinfoColorEx = document.querySelector('.proinfo-color-ex')
let proinfoMemory = document.querySelector('.proinfo-memory')
let proinfoSize = document.querySelector('.proinfo-size')
let primaryColor, primaryMemory, primarySize, primaryModel, primarySpecification,primarySign

let urlParams = new URL(window.location.href);

// 获取参数值
let productId = urlParams.searchParams.get('productid');

// 构建请求 URL
const apiUrl1 = `http://localhost:3000/api/product?productid=${productId}`;
const apiUrl2 = `http://localhost:3000/api/relevanceProduct?productid=${productId}`;

// 发起 GET 请求
fetch(apiUrl1)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // 解析 JSON 响应
    })
    .then(responseData => {
        console.log(responseData);
        const mainPriceTemplate = `<i>¥</i>5538.<span>00</span>`
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

        return fetch(apiUrl2).then(response => response.json());
    })
    .then(relevanceProductData => {
        console.log(relevanceProductData);
        let existColor = []
        let existMemory = []
        let existSize = []
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
            if (relevance.size){
                proinfoSize.style.display = 'flex'
                let buyType = proinfoSize.querySelector('.buy-type')
                if (existSize.indexOf(relevance.size) === -1){
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
        colorA.forEach(item=>{
            item.addEventListener('click',()=>{
                let color = item.getAttribute('data-color')
                let memorySelected = document.querySelector('.proinfo-memory .selected')
                let memory = memorySelected.getAttribute('data-memory')
                const apiUrl3 = `http://localhost:3000/api/findProduct?color=${color}&memory=${memory}&sign=${primarySign}`;
                fetch(apiUrl3)
                    .then(response => response.json())
                    .then(responseData => {
                        let productid = responseData.productid
                        let newUrl = new URL(window.location.href);
                        newUrl.searchParams.set('productid', productid);
                        // 将修改后的 URL 更新到地址栏
                        history.replaceState({}, '', newUrl.href);
                        location.reload()
                    })
                    .catch(error => {
                        console.error('获取数据错误:', error);
                    });
            })
        })
        let memoryA = document.querySelectorAll('.proinfo-memory a')
        memoryA.forEach(item=>{
            item.addEventListener('click',()=>{
                let memory = item.getAttribute('data-memory')
                let colorSelected = document.querySelector('.proinfo-color-ex .selected')
                let color = colorSelected.getAttribute('data-color')
                const apiUrl3 = `http://localhost:3000/api/findProduct?color=${color}&memory=${memory}&sign=${primarySign}`;
                fetch(apiUrl3)
                    .then(response => response.json())
                    .then(responseData => {
                        let productid = responseData.productid
                        let newUrl = new URL(window.location.href);
                        newUrl.searchParams.set('productid', productid);
                        // 将修改后的 URL 更新到地址栏
                        history.replaceState({}, '', newUrl.href);
                        location.reload()
                    })
                    .catch(error => {
                        console.error('获取数据错误:', error);
                    });
            })
        })
    })
    .catch(error => {
        // 处理请求错误
        console.error('Fetch error:', error);
    });

