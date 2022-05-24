function getOneProduct(id) {
    return fetch("http://localhost:3000/api/products/" +id)
        .then(function (res) {
            return res.json();
        })
        .then(product => {
            return product;
        })
}

function getProductIdFromUrl () {
    return new URL(location.href).searchParams.get("id");
}
const productId = getProductIdFromUrl();


function renderProduct(product) {
    const productImg = document.querySelector("article div.item__img")
    const productTitle = document.querySelector("#title")
    const productPrice = document.querySelector("#price")
    const productDescription = document.querySelector("#description")
    const productOption = document.querySelector("#colors");

    productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    productTitle.textContent = `${product.name}`;
    productPrice.textContent = `${product.price}`;
    productDescription.textContent = `${product.description}`;
   
    productOption.insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`))
    
}
async function displayProduct () {
    
    const product = await getOneProduct(productId);
    renderProduct (product);

}


function addToCart (){

    // -------------Gestion du panier--------------------
    const colorOption = document.querySelector("#colors");
    console.log(colorOption);

    const quantityOption = document.querySelector("#quantity");
    console.log(quantityOption);

    // séléction du bouton ajouter au panier
    const addToCart = document.querySelector("#addToCart");

    //Ecouter le bouton et envoyer le panier
    addToCart.addEventListener("click", (event) => {
        event.preventDefault();
        if (
            quantityOption.value < 1 || quantityOption.value > 100 || quantityOption.value === undefined || colorOption.value === "" || colorOption.value === undefined
          ) {
            alert("Veuillez renseigner une couleur et une quantité");
            console.log(alert);
          } else {
           
          }
        
        // variable pour mettre le choix de l'utilisateur 
        let productOptions = {
            color : colorOption.value,
            quantity : parseInt(quantityOption.value),
            id : productId,  
        }
        console.log(productOptions);
        if(productOptions.color && productOptions.quantity){
            manageLocalStorage(productOptions);
        }

    });

}

function manageLocalStorage (selectedProduct){

    //-----------------LOCAL STORAGE-------------------- 
    // déclaration de la variable contenant les produits enregistrés dans le local storage
    // parse c'est pour convertir les données du local storage au format json en objet javascript
    let productInLocalStorage = JSON.parse(localStorage.getItem("product") )|| []; 

    const index = productInLocalStorage.findIndex( p =>  p.color === selectedProduct.color && p.id === selectedProduct.id );
    if(index === -1){
        productInLocalStorage.push(selectedProduct);
    } else {
        productInLocalStorage[index].quantity += selectedProduct.quantity;
    }
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
}

displayProduct();
addToCart();







