let products = [

{
   name:"Apple",
   price:120,
   category:'fruit',
   image:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600"
},

{
   name:"Banana",
   price:60,
   category:'fruit',
   image:"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg"
},

{
   name:"Tomato",
   price:40,
   category:'vegetable',
   image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600"
},
{
   name:"Orange",
   price:90,
   category:"fruit",
   image:"https://images.unsplash.com/photo-1547514701-42782101795e?w=600"
},

{
   name:"Mango",
   price:150,
   category:"fruit",
   image:"https://images.unsplash.com/photo-1553279768-865429fa0078?w=600"
},

{
   name:"Grapes",
   price:110,
   category:"fruit",
   image:"https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600"
},

{
   name:"Potato",
   price:30,
   category:"vegetable",
   image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600"
},

{
   name:"Onion",
   price:40,
   category:"vegetable",
   image:"https://images.unsplash.com/photo-1508747703725-719777637510?w=600"
},

{
   name:"Carrot",
   price:50,
   category:"vegetable",
   image:"https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600"
},

{
   name:"Milk",
   price:60,
   category:"dairy",
   image:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600"
},

{
   name:"Cheese",
   price:180,
   category:"dairy",
   image:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600"
},

{
   name:"Butter",
   price:120,
   category:"dairy",
   image:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600"
},

{
   name:"Bread",
   price:35,
   category:"bakery",
   image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
},

{
   name:"Cake",
   price:250,
   category:"bakery",
   image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
},

{
   name:"Orange Juice",
   price:80,
   category:"drinks",
   image:"https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600"
},

{
   name:"Pepsi",
   price:40,
   category:"drinks",
   image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600"
},

{
   name:"Sprite",
   price:40,
   category:"drinks",
   image:"https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=600"
}

];

let container = document.getElementById('product-container');

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById('cart-items');

let cartDisplay =
document.getElementById("cart-count");

let totalPrice =document.getElementById('total-price');

let total =0;
cart.forEach(item =>{
   total+=item.price*item.quantity;
});
totalPrice.textContent=total;

/* ---------- DISPLAY CART ---------- */

function displayCart(){

    cartItems.innerHTML = "";

    cart.forEach((item,index) => {

        cartItems.innerHTML += `
        <li>
            <div class="cart-info">
               <h3>${item.name}</h3>
               <p>₹${item.price * item.quantity}</p>
               <img src='${item.image}' class='cart-image'>
            </div>

           <div class="cart-controls">

               <button class="minus-btn"
               data-index="${index}">
                  ➖
               </button>

               <span>${item.quantity}</span>

               <button class="plus-btn"
               data-index="${index}">
                  ➕
               </button>

               <button class="remove-btn"
               data-index="${index}">
                  ❌
               </button>

            </div>

        </li>
        `;

    });

    addRemoveEvents();
    addPlusEvents();
    addMinusEvents();

}

function addRemoveEvents(){
   let removeButtons = document.querySelectorAll('.remove-btn');

   removeButtons.forEach(button => {

      button.addEventListener('click', ()=>{

         let index = button.dataset.index;

         let removedItem=cart[index];

         cart.splice(index,1);

         total -= removedItem.price * removedItem.quantity;

         totalPrice.textContent=total;

         localStorage.setItem('cart',JSON.stringify(cart));

         cartDisplay.textContent=cart.length;

         displayCart()
      });
   });
}

function addPlusEvents(){

   let plusButtons =
   document.querySelectorAll(".plus-btn");

   plusButtons.forEach(button => {

      button.addEventListener("click", () => {

         let index =
         button.dataset.index;

         cart[index].quantity++;

         total += cart[index].price;

         totalPrice.textContent =
         total;

         localStorage.setItem(
            "cart",
            JSON.stringify(cart)
         );

         displayCart();

      });

   });

}

function addMinusEvents(){

   let minusButtons =
   document.querySelectorAll(".minus-btn");

   minusButtons.forEach(button => {

      button.addEventListener("click", () => {

         let index =
         button.dataset.index;

         if(cart[index].quantity > 1){

            cart[index].quantity--;

            total -= cart[index].price;

         }
         else{

            total -= cart[index].price;

            cart.splice(index,1);

         }

         totalPrice.textContent =
         total;

         localStorage.setItem(
            "cart",
            JSON.stringify(cart)
         );

         cartDisplay.textContent =
         cart.length;

         displayCart();

      });

   });

}

/* ---------- SHOW SAVED CART ---------- */

displayCart();

cartDisplay.textContent=cart.length;


/* ---------- GENERATE PRODUCTS ---------- */

products.forEach(product => {

container.innerHTML += `

<div class="product-card" data-category='${product.category}'>

   <img src="${product.image}"
        alt="${product.name}">

   <h3>${product.name}</h3>

   <p>₹${product.price}</p>

   <button
      class="add-cart"
      data-product="${product.name}"
      data-price="${product.price}">
      Add to Cart
   </button>

</div>

`;



});


/* ---------- BUTTONS ---------- */



let buttons =
document.querySelectorAll(".add-cart");
buttons.forEach(button => {

   button.addEventListener("click", () => {

    const productName =
    button.dataset.product;
    
   let productPrice=Number(button.dataset.price);
   let productCard = button.closest(`.product-card`);
   let productImage=productCard.querySelector('img').src;

   let existingItem =
   cart.find(item =>
   item.name === productName
   );

   if(existingItem){

      existingItem.quantity++;

   }
   else{

      cart.push({
         name: productName,
         price: productPrice,
         image:productImage,
         quantity: 1
      });

   }
    localStorage.setItem('cart',JSON.stringify(cart));
    total+=productPrice;

    cartDisplay.textContent =
    cart.length;
    totalPrice.textContent=total;
    

    displayCart()

});

});





/* ---------- SEARCH BAR ---------- */

let search =
document.getElementById('search');



search.addEventListener('input', () => {

   let value =
   search.value.toLowerCase();

   let cards =
   document.querySelectorAll('.product-card');

   cards.forEach(card => {

      let name =
      card.querySelector('h3')
      .textContent
      .toLowerCase();

      if(name.includes(value)){

         card.style.display = 'block';

      }
      else{

         card.style.display = 'none';

      }

   });

});

/* ---------- Filter-button ---------- */

let filterButtons=document.querySelectorAll('.filter-btn');
filterButtons.forEach(button=>{
   button.addEventListener('click',()=>{
      
      let category =button.dataset.category;
      
      let cards =document.querySelectorAll('.product-card');

      cards.forEach(card=>{
        
         if(category==='all'|| card.dataset.category===category){
            card.style.display='block';
         }
         else{
            card.style.display='none';
         }
      });
   });
});

/* ---------- checkout-section ---------- */

let orderBtn =
document.getElementById("order-btn");

let nameInput=document.getElementById('name');

let phoneInput=document.getElementById('phone');

let addressInput = document.getElementById('address');

orderBtn.addEventListener("click",()=>{
   if (
      nameInput.value.trim() === "" ||
   phoneInput.value.trim() === "" ||
   addressInput.value.trim() === ""
   ){
      alert('Please fill all fields');
      return;
   }
    let orderNumber =
    Math.floor(Math.random()*9000)+1000;

     document.getElementById("success-msg").textContent =
     `Order #${orderNumber} Placed Successfully ✅`;

   nameInput.value = "";
   phoneInput.value = "";
   addressInput.value = "";
   cart=[];
   localStorage.removeItem('cart');
   displayCart();
   cartDisplay.textContent=0;
   total=0;
   totalPrice.textContent=0;

  

});