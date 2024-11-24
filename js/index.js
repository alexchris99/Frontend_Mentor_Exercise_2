//buttons
const addToCart = document.querySelectorAll(".add")

// add event listener for add to car
addToCart.forEach(add_Btn => {
    add_Btn.addEventListener("click", () =>{
        genNewButton(add_Btn)
    })
});

// generate the new content of the html
const genNewButton = (div) => {
    div.classList.add("addcart");
    div.innerHTML = `
    <img class="decrement compensate" src="./assets/images/icon-decrement-quantity.svg">
    <p>1</p>
    <img class="increment" src="./assets/images/icon-increment-quantity.svg">
    `
    let valueItem = div.querySelector("p")
    console.log(valueItem)
    // get all the buttons
    const btnsDec = document.querySelectorAll(".decrement")
    const btnsInc = document.querySelectorAll(".increment")
    // call the function
    btnsIncDec(btnsInc,btnsDec)
}

// create functions for the buttons
const btnsIncDec = (btnsInc, btnsDec) => {
    // increment
    btnsInc.forEach(btnInc => {
        btnInc.addEventListener("click", () => {
            return true
        })
    })
    // decrement
    btnsDec.forEach(btnDec => {
        btnDec.addEventListener("click", () => {
            return false
        })
    })
}

// increment the value
const incItem = (p) =>{
    console.log(parseInt(p.textContent)+1)
    p.textContent = parseInt(p.textContent)+1
}

// decrement the value
const decItem = (p) =>{
    p.innerHTML = " "
    console.log(parseInt(p.textContent)-1)
    let value = parseInt(p.textContent)-1
    p.textContent = `${value}`
}

