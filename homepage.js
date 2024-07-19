//for cart number
fetch('http://localhost:5000/cart')
.then(res=>{
  if(res){
    return res.json()
  }
  else
   throw new Error('Cannot fetch')
})
.then(data=>{
  let cartNumber = document.querySelector('.cart-item-number');
  cartNumber.textContent=data.length
})

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
  //for cart number
  data.forEach(element=>{
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
              <div class='product-start'>
                
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
  let addButton=document.querySelectorAll('.fa-bag-shopping')
  attachEventListener(addButton)
  forHover(addButton)
})
.catch(err=>{
  console.log('Error:',err) 
})
function attachEventListener(addButton){
    let productName=document.querySelectorAll('.product-name')
    let productPrice=document.querySelectorAll('.product-price')
    let productImg=document.querySelectorAll('.product-img img')
    let productDis=document.querySelectorAll('.product-discount-num')
    addButton.forEach(((button,index)=>{   
      console.log(button)                 
      button.addEventListener('click',(event)=>{
        console.log('clicked')
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
    body:JSON.stringify(data),
  })
  .then(response=>{
    if(response){
      return response.json()
    }
    else throw new Error('Something is not ok')
  })
  .then(result=>{
    console.log(result)
  })
  .catch((err)=>{
    console.error('Error in postToJson:', err);
  })
  }
  
  function forHover(hoverElement){
    hoverElement.forEach((element,index)=>{
      element.addEventListener('mouseover',(event)=>{
        element.classList.add('select')
      })
      element.addEventListener('mouseout',()=>{
        element.classList.remove('select')
      })
    })
  }
    


