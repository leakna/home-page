
let productDiv=document.querySelector('.group-product')
fetch('http://localhost:3000/product')
.then(response=>{
  if(response){
    return response.json();
  }
  else
    throw new Error('Data isnt here')
})
.then((data)=>{
  let forDisplay=""
  //for cart number
  data.forEach((element,index)=>{
    //for create each product
    const discount=element.price*(element.discount/100)
    forDisplay+=`<div class="each-product">
          <div class="product-img">
            <img src=${element.img} alt="" >
            ${element.discount?`<div class="product-sale-text">Sale <span class="product-discount-num">${element.discount}</span>% Off</div>
            `:""}
          </div>
         <div class="product-info-div">
            <div class="product-info-text">
              <p class="healthcare-text">health care</p>
              <p class="product-name">
                ${element.name}
              </p>
              <div class='product-price-container'>
                <span class="product-price">$${element.discount?element.price-discount.toFixed(2):element.price} </span>
                ${element.discount?`<span class="full-price-product">$${element.price}</span>`:""}
               
                
              </div>
              <div class='product-star'>
                ${createStar(element.rating)}
              </div>
            </div>
            <div>
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            </div>
         </div>`
 

  })
  productDiv.innerHTML=forDisplay
  let addButton=document.querySelectorAll('.fa-bag-shopping')
  attachEventListener(addButton)

})
.catch(err=>{
  console.log('Error:',err) 
})
function attachEventListener(addButton){
    let productName=document.querySelectorAll('.product-name')
    let productPrice=document.querySelectorAll('.product-price')
    let productImg=document.querySelectorAll('.product-img img')
    let productDis=document.querySelectorAll('.product-discount-num')
    let cartNumber = document.querySelector('.cart-item-number');//cart
    addButton.forEach(((button,index)=>{   
      console.log(button)                 
      button.addEventListener('click',()=>{

        //for change color and increase or decrease cart 
        forClick(button,cartNumber)
        
        //for get the data from element and pass it to post(not needed)
        let name=productName[index].textContent.trim()
        let price=Number(productPrice[index].innerText.trim().slice(1))
        let img=productImg[index].src
        let discount=productDis[index]? Number(productDis[index].textContent) : 0;
        const obj={
          name,
          price,
          img,
          discount
        }
        //for post to cart(not needed)
       //postToJson('http://localhost:3000/cart',obj)
      })
    }))
    
}

  function forClick(button,cart){
    let colorButton=Array.from(button.classList).find(element=>element=='delete')
    if(colorButton){
      button.classList.remove('delete')
      cart.textContent=Number(cart.textContent)-1 
    }
    else{
      button.classList.add('delete')
      cart.textContent=Number(cart.textContent)+1
    }
  }
 
  function createStar(rate,index){
    let star=""
    for(let i=0;i<5;i++){
      if(i<rate)
        star+=`<i class="fa-solid fa-star"></i>`
      
      else
       star+=`<i class="fa-regular fa-star"></i>`
    }
    return star
  }
  
    


