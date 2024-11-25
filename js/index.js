// food items
let foodItems = [
    // item 1
    Waffle = {
                "name": "Waffle with Berries",
                "price": 6.50,
                "cuantity": 0
            },
    // item 2
    Crème = {
        "name": "Vanilla Bean Crème Brûlée",
        "price": 7.00,
        "cuantity": 0
    },
    // item 3
    Macaron = {
        "name": "Macaron Mix of Five",
        "price": 8.00,
        "cuantity": 0
    },
    // item 4
    Tiramisu = {
        "name": "Classic Tiramisu",
        "price": 5.50,
        "cuantity": 0
    },
    // item 5
    Baklava = {
        "name": "Pistachio Baklava",
        "price": 4.00,
        "cuantity": 0
    },
    // item 6
    Pie = {
        "name": "Lemon Meringue Pie",
        "price": 5.00,
        "cuantity": 0
    },
    // item 7
    Cake = {
        "name": "Red Velvet Cake",
        "price": 4.50,
        "cuantity": 0
    },
    // item 8
    Brownie = {
        "name": "Salted Caramel Brownie",
        "price": 4.50,
        "cuantity": 0
    },
    // item 9
    Panna = {
        "name": "Vanilla Panna Cotta",
        "price": 6.50,
        "cuantity": 0
    },
    
]

//buttons
const addToCart = document.querySelectorAll(".add");
// cart
const cart = document.querySelector(".cart_content");
// cant items
const itemCount = document.querySelector(".cart_items")
// get all items
const itemsarr = document.querySelectorAll(".item")

// add event listener for add to car
addToCart.forEach(add_Btn => {
    add_Btn.addEventListener("click", () =>{
        genNewButton(add_Btn, foodItems);
        add_Btn.previousElementSibling.classList.add("addcart");
        foodItems.forEach(element => {
            if(element.name.includes(add_Btn.parentNode.nextElementSibling.querySelector("p").textContent)){
                element.cuantity = Number(element.cuantity)+1  
            }
        });
        createOrder(foodItems)
    });
});

// generate the new content of the html
let genNewButton = (div, foodItems) => {

    // delete the content of the button 
    div.innerHTML = ''
    div.classList.add("addcart");

    // decrement button //
    const decBtn = document.createElement('button')
    decBtn.innerHTML = `<img class="decrement compensate" src="./assets/images/icon-decrement-quantity.svg">`
    // add event listener
    decBtn.addEventListener('click', (e) => {
        // stop the propagation of the calling functions
        e.stopPropagation()
        qty.textContent = Number(qty.textContent)-1
        foodItems.forEach(element => {
            if(element.name.includes(div.parentNode.nextElementSibling.querySelector("p").textContent)){
                element.cuantity = Number(qty.textContent)
                createOrder(foodItems)   
            }
        });
    })

    // value //
    const qty = document.createElement("span")
    qty.textContent = "1"

    // increment button //
    const incBtn = document.createElement('button')
    incBtn.innerHTML = `<img class="increment" src="./assets/images/icon-increment-quantity.svg">`
    // event listener
    incBtn.addEventListener('click', (e) => {
        // stop the propagation of the calling functions
        e.stopPropagation()
        qty.textContent = Number(qty.textContent)+1
        foodItems.forEach(element => {
            if(element.name.includes(div.parentNode.nextElementSibling.querySelector("p").textContent)){
                element.cuantity = Number(qty.textContent)
                createOrder(foodItems)  
            }
        });
    })

    div.appendChild(decBtn)
    div.appendChild(qty)
    div.appendChild(incBtn)
}


const createOrder = (foodItems) =>{
    cart.innerHTML = ""
    let total = 0
    let cartItems = 0
    foodItems.forEach(element => {
        let div = document.createElement("div")
        div.classList.add("orderItem")
        if(element.cuantity != 0){
            div.innerHTML = `
                <p class="productDescription">${element.name}</p>
                <div class ="orderItemInfo">
                    <div class = "productPrice">
                        <span class = "cuantity_element">${element.cuantity}x</span><span class="individual_price">@$${element.price}</span><span class="total_price_item">$${element.price*element.cuantity}</span><button class = "cancelOrder"><img src="assets/images/icon-remove-item.svg"></button>
                    </div>
                </div>`
            cart.append(div)
        }
        cartItems += element.cuantity
        total += element.price*element.cuantity
    });
    // Total order
    let totalOrder = document.createElement("p")
    totalOrder.classList.add("total_container")
    totalOrder.innerHTML = `
    <span class="text_order">Order Total</span>
    <span class ="total_order">$${total}</span>`
    cart.append(totalOrder)
    // Carbon free
    let carbon = document.createElement("div")
    carbon.classList.add("carbon")
    carbon.innerHTML = `
    <img src = "./assets/images/icon-carbon-neutral.svg">
    <p>This is a <span>carbon-neutral</span> delibery</p>
    `
    cart.append(carbon)
    // confirm order
    let confirm = document.createElement("button")
    confirm.classList.add("confirm")
    confirm.textContent = "Confirm Order"
    cart.append(confirm)
    itemCount.textContent = `Your Cart(${cartItems})`
    cancel()
}

const cancel = () =>{
    const cancelBtns = document.querySelectorAll(".cancelOrder")
    cancelBtns.forEach(cancelBtn => {
        cancelBtn.addEventListener("click", () =>{
            foodItems.forEach(e => {
                if(e.name == cancelBtn.parentNode.parentNode.parentNode.querySelector("p").textContent){
                    e.cuantity = 0
                    itemsarr.forEach(item => {
                        if(e.name == item.querySelector(".item_info").querySelector(".item_description").textContent){
                            item.querySelector(".image_button_container").querySelector("img").classList.remove("addcart")
                            item.querySelector(".image_button_container").querySelector("button").classList.remove("addcart")
                            item.querySelector(".image_button_container").querySelector("button").innerHTML = `
                                <img src="./assets/images/icon-add-to-cart.svg" alt=""><p>Add to Cart</p>
                            `
                        } 
                    });
                }
            });
            createOrder(foodItems)
        })
    });
}