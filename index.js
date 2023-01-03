const cart = [];
const sideBar =[];
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
    const products = await axios.get("http://localhost:3000/api/shop/products");
    console.log(products);
    for (const product of products.data) {
        const ProductDiv =  mainProductDiv.cloneNode(true);
        const card = ProductDiv.firstElementChild.firstElementChild;
        const imgProduct = card.firstElementChild;
        const titleProduct = imgProduct.nextElementSibling.firstElementChild;
        const desProduct = titleProduct.nextElementSibling;
        const priceProduct = imgProduct.nextElementSibling.nextElementSibling.firstElementChild;
        
        titleProduct.innerText = product.title;
        imgProduct.setAttribute("src",product.imageUrl);
        priceProduct.innerText = `$${product.price}`;
        desProduct.innerText = product.description;
        card.setAttribute("id",product.id);
        mainProductDiv.appendChild(card.parentElement);
    }
}

function addToCart(e) {
    if(e.target.id==="cart"){
        if(!cart.includes(e.target.parentElement.parentElement)){
            let price = parseFloat(e.target.parentElement.previousElementSibling.innerText.split("$")[1]);
            console.log(price);
            total+=price;
            cart.push(e.target.parentElement.parentElement);
            msg="Product added to the cart";
            totalDiv.innerText = 'total '+total;
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

    }else if(e.target.className==="card-img-top"){
        
        
        const ele = e.target.parentElement.cloneNode(true);
        ele.className = "d-flex flex-row m-2";
        sideDiv.appendChild(ele);
        
    }
}

function showCart(e) {
    sideDiv.style.display="inline-block";
}
function close(e) {
    sideDiv.innerContent= sideDiv.firstElementChild;
    sideDiv.style.display="none";
}
