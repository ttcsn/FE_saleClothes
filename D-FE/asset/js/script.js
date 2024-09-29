
const sliderItem = document.querySelectorAll('.slider-item')

for (let index = 0; index < sliderItem.length; index++) {
    
    sliderItem[index].style.left = index * 100 + "%"
    
}

const sliderItems = document.querySelector('.slider-items')
const arrowRight = document.querySelector('.ri-arrow-right-fill')
const arrowLeft = document.querySelector('.ri-arrow-left-fill')
let i = 0
arrowRight.addEventListener('click', ()=>{
   
    if(i < sliderItem.length - 1){
        i++
        sliderMove(i)
        console.log(i)
    }
    else{
        return false
    }
})

arrowLeft.addEventListener('click', ()=>{
   if(i<=0){
    return false
   }
   {
        i--
        sliderMove(i)
   }   
    
})
function autoSlider(){
 
    if(i < sliderItem.length - 1){
        i++
        sliderMove(i)
    }
    else{
        i = 0
        sliderMove(i)
    }
    
}
function sliderMove(i){
    sliderItems.style.left = -i * 100 + "%"

}
setInterval(autoSlider,3000)

// menubar responsive
const Menubar = document.querySelector('.header-bar-icon')
const headerNav = document.querySelector('.header-nav')
Menubar.addEventListener('click',() =>{
   headerNav.classList.toggle('active');
})

