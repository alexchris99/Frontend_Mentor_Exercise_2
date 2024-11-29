// food items dictionary
let foodItems = [
    // item 1
    Waffle = {
                "name": "Waffle with Berries",
                "price": 6.50,
                "cuantity": 0,
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

// add event listener for add to car button of each item 
addToCart.forEach(add_Btn => {
    add_Btn.addEventListener("click", () =>{
        genNewButton(add_Btn, foodItems);
        add_Btn.previousElementSibling.classList.add("addcart");
        // chech the dict and increment the cuantity if the element includes the text content
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
        // if the user reduce the cuantity to less than one we re render the previous button
        if(qty.textContent == 0){
            div.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt=""><p>Add to Cart</p>
            `
            div.parentNode.querySelector("img").classList.remove("addcart")
            div.classList.remove("addcart")
        }
        // uppdate the dict
        foodItems.forEach(element => {
            if(element.name.includes(div.parentNode.nextElementSibling.querySelector("p").textContent)){
                element.cuantity = Number(qty.textContent)
                // call the function
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
        // add one
        qty.textContent = Number(qty.textContent)+1
        // uppdate the dict
        foodItems.forEach(element => {
            if(element.name.includes(div.parentNode.nextElementSibling.querySelector("p").textContent)){
                element.cuantity = Number(qty.textContent)
                // call the function 
                createOrder(foodItems)  
            }
        });
    })
    // append elements
    div.appendChild(decBtn)
    div.appendChild(qty)
    div.appendChild(incBtn)
}

// generate cart order
const createOrder = (foodItems) =>{
    cart.innerHTML = ""
    let total = 0
    let cartItems = 0
    // check the dict to generate the cart if the quantity is greater tha 0
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
    // button confirm order
    confirm.addEventListener("click", () =>{
        let orderConfirmed = cart.parentNode.cloneNode(true)
        let ordered = document.createElement("img")
        
        ordered.src = "./assets/images/icon-order-confirmed.svg"
        orderConfirmed.prepend(ordered)
        //
        let newText = orderConfirmed.querySelector(".cart_items")
        newText.textContent = "Order Confirmed";
        newText.style.color = "black"
        newText.style.fontSize = "2.5em"
        //
        let message = document.createElement("p")
        message.textContent = "We hope you enjoy your food!"
        message.classList.add("message")
        newText.append(message)
        orderConfirmed.querySelector(".carbon").remove()
        let addImg = orderConfirmed.querySelectorAll(".productDescription")
        addImg.forEach(element => {
            //console.log(element.textContent)
            //console.log(element.parentNode)
            itemsarr.forEach(item => {
                if(element.textContent == item.querySelector(".item_description").textContent){
                    let imgOrder = item.querySelector(".img_Product").cloneNode()
                    imgOrder.classList.add("img_confirm")
                    element.parentNode.prepend(imgOrder)
                }
            })
        });
        document.querySelector(".modal").append(orderConfirmed)
        document.querySelector(".modal").style.display = "block"
        orderConfirmed.classList.add("modal-content")
        //remove buttons
        let rem = orderConfirmed.querySelectorAll(".productPrice")
        rem.forEach(element => {
            element.querySelector(".cancelOrder").remove()
        });
        // get al the items to organice the content 
        let confirmarr = orderConfirmed.querySelectorAll(".orderItem")
        confirmarr.forEach(itemOrder => {
            // create div to store the information
            let itemContainer = document.createElement("div")
            itemContainer.classList.add("item-ordered")
            // create a div to store the item info 
            let itemInfoPlainText = document.createElement("div")
            itemInfoPlainText.classList.add("item-plain-text")
            // create a clone of the image
            let imgClone = itemOrder.querySelector(".img_confirm")
            // create a clone of the description
            let descClone = itemOrder.querySelector(".productDescription")
            // create a clone of the order info
            let orderClone = itemOrder.querySelector(".orderItemInfo")
            // add the plain text to the info div
            itemInfoPlainText.append(descClone,orderClone)
            // reorganice the container
            itemContainer.append(imgClone,itemInfoPlainText)
            itemOrder.append(itemContainer)
        });
        orderConfirmed.querySelector(".confirm").textContent = "Start New Order"
        orderConfirmed.querySelector(".confirm").addEventListener("click",()=>{
            location.reload()
        })
    })
}

// cancel button 
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
    if(itemCount.textContent.includes(0)){
        cart.innerHTML = `
        <div>
            <img src="./assets/images/illustration-empty-cart.svg" alt="">
        </div>
        <p class="empty">Your added items will appear here</p>
        `
    }
}


