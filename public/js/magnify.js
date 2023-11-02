let leftBox = document.querySelector('.img-zoom-main')
let maskBox = document.querySelector('.img-zoom-shot')
let rightBox = document.querySelector('.img-zoom-pop')
let rightImg = document.querySelector('.img-zoom-pop img')
let leftImg = document.querySelector('.img-zoom-main img')
let imgList = document.querySelectorAll('.imgNav li img')
imgList.forEach((item, index) => {
    item.addEventListener('mouseover', function () {
        imgList.forEach(removeActive => {
            removeActive.classList.remove('active')
        })
        item.classList.add('active')
        let imgSrc = item.src
        leftImg.src = imgSrc
        rightImg.src = imgSrc
    })
})
function toLeft() {
    let ulContainer = document.querySelector('.ul-container ul')
    console.log(ulContainer)
    ulContainer.classList.add('toLeft')
}
function toRight() {
    let ulContainer = document.querySelector('.ul-container ul')
    ulContainer.classList.remove('toLeft')
}
leftBox.addEventListener('mouseover', function () {
    maskBox.style = 'display:block'
    rightBox.style = 'display:block'
})
leftBox.addEventListener('mouseout', function () {
    maskBox.style = 'display:none'
    rightBox.style = 'display:none'
})

leftBox.addEventListener('mousemove', function (e) {
    e = e || window.event

    // leftBoxX，leftBoxY 代表鼠标相对于leftBox的位置
    let leftBoxX = e.clientX - leftBox.getBoundingClientRect().left
    let leftBoxY = e.clientY - leftBox.getBoundingClientRect().top
    let percentageX, percentageY
    if (leftBoxX < Math.ceil(maskBox.offsetWidth / 2)) {
        percentageX = 0
        maskBox.style.left = '0'
    } else if (leftBoxX < leftBox.offsetWidth - Math.ceil(maskBox.offsetWidth / 2)) {
        percentageX = (leftBoxX - (maskBox.offsetWidth / 2)) / (leftBox.offsetWidth - maskBox.offsetWidth)
        maskBox.style.left = leftBoxX - Math.ceil(maskBox.offsetWidth / 2) + 'px'
    } else {
        maskBox.style.left = leftBox.offsetWidth - maskBox.offsetWidth -2 + 'px'
        percentageX = 1
    }
    if (leftBoxY < Math.ceil(maskBox.offsetHeight / 2)) {
        percentageY = 0
        maskBox.style.top = '0'
    } else if (leftBoxY < leftBox.offsetHeight - Math.ceil(maskBox.offsetHeight / 2)) {
        percentageY = (leftBoxY - (maskBox.offsetHeight / 2)) / (leftBox.offsetHeight - maskBox.offsetHeight)
        maskBox.style.top = leftBoxY - Math.ceil(maskBox.offsetHeight / 2) + 'px'
    } else {
        percentageY = 1
        maskBox.style.top = leftBox.offsetHeight - maskBox.offsetHeight -2 + 'px'
    }
    rightImg.style.left = -percentageX * rightBox.offsetWidth +1 + 'px'
    rightImg.style.top = -percentageY * rightBox.offsetHeight +1 + 'px'
})