function getOneProduct(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      return res.json();
    })
    .then(product => {
      return product;
    })
}
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));


//------ faire un get by id pour récupérer les objets du local storage 
//------ utiliser boucle for of pour afficher tant qu'il y a des objets dans le local storage

const productDisplay = document.querySelector("#cart__items");

async function displayCart() {
  if (productInLocalStorage === null) {
    document.querySelector("h1").innerHTML ="Votre panier est vide";
    console.log("Le panier est vide");

  } else {
    let structurePanier = "";
    
    // affichage des produits présents dans le local storage
    for (k = 0; k < productInLocalStorage.length; k++) {
      const product = await getOneProduct(productInLocalStorage[k].id);
     console.log(product);
      structurePanier = structurePanier + `<article class="cart__item" data-id=${productInLocalStorage[k].id} data-color=${productInLocalStorage[k].color}>
       <div class="cart__item__img">
         <img src=${product.imageUrl} alt=${product.altTxt}>
       </div>
       <div class="cart__item__content">
         <div class="cart__item__content__description">
           <h2>${product.name}</h2>
           <p>${productInLocalStorage[k].color}</p>
           <p>${product.price}€</p>
         </div>
         <div class="cart__item__content__settings">
           <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[k].quantity}>
           </div>
           <div class="cart__item__content__settings__delete">
             <p class="deleteItem">Supprimer</p>
           </div>
         </div>
       </div>
     </article>`;
    }  
    productDisplay.innerHTML = structurePanier;
  }   
}
displayCart();

function changeQuantity(product,quantity){
    let cart = getOneProduct();
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
    if (productInLocalStorage != undefined){
      productInLocalStorage.quantity += quantity;
    }
}

function deleteProduct(){
// gérer la suppression des produits dynamiquement 
}
function totalCart(){
// gérer le total des produits dynamioquement ( avec les modifs quantités)
  let panier = JSON.parse(localStorage.getItem("product"));
  let totalProducts = 0;
  let totalPrice = 0;
  // j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total
  for (let product of productInLocalStorage) {
    totalProducts += JSON.parse(localStorage.getItem("product.quantity"));
    totalPrice += JSON.parse(localStorage.getItem("product.quantity")) * (productInLocalStorage.price);
  
   
  } console.log(totalProducts);
  // affichage nombre d'article
  document.getElementById("totalQuantity").textContent = totalProducts;
  //affichage du prix total
  document.getElementById("totalPrice").textContent = totalPrice;
}
totalCart();


// gestion du formulaire ---> fonction ? 


