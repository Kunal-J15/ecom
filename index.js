const cart = [];
const sideBar =[];
const baseUrl = "http://localhost:3000/api/shop/"
let msg;
let total=0;
const totalDiv =document.querySelector("h4");

const pushDiv = document.getElementsByClassName("fixed-bottom")[0];
const sideDiv = document.getElementById("sideBar");
const sideClosebtn = document.querySelector(".sideBar button");
sideClosebtn.addEventListener("click",close);
const cartBtn= document.getElementsByClassName("btn btn-outline-success position-absolute top-0 end-0")[0];
cartBtn.addEventListener("click",showCart)
const mainProductDiv = document.querySelector(".row, .align-items-start");

loadProducts();


async function loadProducts() {
    const products = await axios.get(baseUrl+"products");
    for (const product of products.data) {
        const topCard = document.querySelector("#proto").cloneNode(true);
        const card = topCard.firstElementChild;
        const imgProduct = card.firstElementChild;
        const titleProduct = imgProduct.nextElementSibling.firstElementChild;
        const desProduct = titleProduct.nextElementSibling;
        const priceProduct = imgProduct.nextElementSibling.nextElementSibling.firstElementChild;
        
        titleProduct.innerText = product.title;
        imgProduct.setAttribute("src",product.imageUrl);
        priceProduct.innerText = `$${product.price}`;
        desProduct.innerText = product.description;
        card.setAttribute("id",product.id);
        mainProductDiv.appendChild(topCard);
    }
    loadCart();
}

async function loadCart() {
    const products = await axios.get(baseUrl+"/cart")
    const pushDiv =document.querySelector("#cart-products")
    pushDiv.innerHTML="";
    total=0;
    for (const product of products.data) {
        total+=product.price * product.cartItem.quantity;
        const card = document.getElementById(product.id).cloneNode(true);
        card.style = ""
        const imgCart = card.firstElementChild;
        const titleCart = imgCart.nextElementSibling.firstElementChild;
        const desCart = titleCart.nextElementSibling;
        desCart.innerText = "Quantity "+ product.cartItem.quantity;
        const priceCart = imgCart.nextElementSibling.nextElementSibling.firstElementChild;
        const btn = imgCart.nextElementSibling.nextElementSibling.nextElementSibling.remove();
        console.log(product);
        imgCart.className += " side-img"
        card.className += " d-flex flex-row"
        pushDiv.appendChild(card)

    }
    cartBtn.innerHTML = `Cart <sup>${products.data.length}</sup>`;
    totalDiv.innerText = 'total '+total;
}

function addToCart(e) {
    if(e.target.id==="cart"){
        if(!cart.includes(e.target.parentElement.parentElement) || true){//increases quantity
            msg="Product added to the cart";
            const id = (e.target.parentElement.parentElement.id);
            
            axios.post(baseUrl+"cart",{id}).then(()=>loadCart());
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
        

    }
}

function showCart(e) {
    sideDiv.style.display="inline-block";
    loadCart();
}

function close(e) {
    sideDiv.innerContent= sideDiv.firstElementChild;
    sideDiv.style.display="none";
}
