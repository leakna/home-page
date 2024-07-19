let productDiv=document.querySelector('.group-product')
fetch('http://localhost:5000/product')
.then(response=>{
  if(response){
    return response.json();
  }
  else
    throw new Error('Data isnt here')
})
.then((data)=>{
  let forDisplay=""
  data.forEach(element=>{
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
              <div>
                <i class="fa-solid fa-star color"></i>
                <i class="fa-solid fa-star color"></i>
                <i class="fa-solid fa-star color"></i>
                <i class="fa-solid fa-star color"></i>
                <i class="fa-solid fa-star grey"></i>
              </div>
            </div>
            <div>
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            </div>
         </div>`

         //any logic for discount
        //  if(element.discount)
  })
  productDiv.innerHTML=forDisplay
  attachEventListener()
})
.catch(err=>{
  console.log('Error:',err) 
})
function attachEventListener(){

    let addButton=document.querySelectorAll('.fa-bag-shopping')
    let productName=document.querySelectorAll('.product-name')
    let productPrice=document.querySelectorAll('.product-price')
    let productImg=document.querySelectorAll('.product-img img')
    let productDis=document.querySelectorAll('.product-discount-num')
    addButton.forEach(((button,index)=>{                    
      console.log(button)
      button.addEventListener('click',(event)=>{
        event.preventDefault();
        console.log("hello")
        let name=productName[index].textContent.trim()
        let price=Number(productPrice[index].innerText.trim().slice(1))
        let img=productImg[index].src
        let discount=Number(productDis[index].textContent)||0
        console.log(price,discount)
        const obj={
          name,
          price,
          img,
          discount
        }
        
        postToJson('http://localhost:5000/cart',obj)
      })
    }))
    
}
function postToJson(url,data){
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  .then(response=>{
    if(response){
      return response.json()
    }
    else throw new Error('Something is not ok')
  })
  .then(result=>{
    console.log(result)
    return result
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  
  
    


