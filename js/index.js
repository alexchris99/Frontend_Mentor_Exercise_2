//buttons
const addToCart = document.querySelectorAll(".add")

// add event listener for add to car
addToCart.forEach(add_Btn => {
    add_Btn.addEventListener("click", () =>{
        genNewButton(add_Btn)
        add_Btn.previousElementSibling.classList.add("addcart")
    })
});

// generate the new content of the html
const genNewButton = (div) => {
    div.classList.add("addcart");
    div.innerHTML = " "
    div.innerHTML = `
    <img class="decrement compensate" src="./assets/images/icon-decrement-quantity.svg">
    <p id = "value">1</p>
    <img class="increment" src="./assets/images/icon-increment-quantity.svg">
    `
    // get all the buttons
    const btnDec = div.querySelector(".decrement")
    const btnInc = div.querySelector(".increment")
    let value = div.querySelector("#value")
    // call the function
    btnsIncDec(btnInc,btnDec,value)
}

// create functions for the buttons
const btnsIncDec = (btnInc, btnsDec, value) => {
    // increment
    // here i can see the changue in the html 
    value.textContent = ""
    // here only in the console
    btnInc.addEventListener("click",() => {
        console.log("Increment")
        console.log("Current value:", value.textContent);
        value.textContent = "0"
        console.log("Updated value:", value.textContent);
    })
    
}

// increment the value
const incItem = (p) =>{
    p.textContent = ""
}

// decrement the value
const decItem = (p) =>{
    
}

