const cart = [];
let msg;
const pushDiv = document.getElementsByClassName("fixed-bottom")[0];
const cartBtn= document.getElementsByClassName("btn btn-outline-success position-absolute top-0 end-0")[0]
function addToCart(e) {
    if(e.target.id==="cart"){
        if(!cart.includes(e.target.parentElement.parentElement)){
            cart.push(e.target.parentElement.parentElement);
            msg="Product added to the cart"
        }else{
            msg="Product is already in cart"
        }

        const div = document.createElement("div");
        div.className = "position-relative";
        const divInn= document.createElement("div");
        divInn.className = "position-absolute bottom-0 end-0 pushDiv";
        divInn.innerHTML = `<h4>${msg}</h4>`;
        div.appendChild(divInn);
        pushDiv.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
        cartBtn.innerHTML = `Cart <sup>${cart.length}</sup>`;
    }
}

