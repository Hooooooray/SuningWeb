let topX = document.getElementById('TOP_X')
topX.addEventListener('click',(event)=>{
    event.preventDefault();
    document.getElementById('TOP_ACTIVE').classList.add('display-none')
})