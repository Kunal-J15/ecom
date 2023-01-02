const cart = [];
const sideBar =[];
let msg;
let total=0;
const totalDiv =document.querySelector("h4");
console.log(totalDiv);
const pushDiv = document.getElementsByClassName("fixed-bottom")[0];
const sideDiv = document.getElementById("sideBar");
const sideClosebtn = document.querySelector(".sideBar button");
const cartBtn= document.getElementsByClassName("btn btn-outline-success position-absolute top-0 end-0")[0];

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

    }else if(e.target.className==="card-img-top"){
        let price = parseFloat(e.target.nextElementSibling.nextElementSibling.innerText.split("$")[1]);
        total+=price;
        console.log(total);
        totalDiv.innerText = 'total '+total;
        sideDiv.style.display="inline-block";
        const ele = e.target.parentElement.cloneNode(true);
        ele.className = "d-flex flex-row m-2";
        sideDiv.appendChild(ele);
        sideClosebtn.addEventListener("click",close);
    }
}

function close(e) {
    sideDiv.innerContent= sideDiv.firstElementChild;
    sideDiv.style.display="none";
}
