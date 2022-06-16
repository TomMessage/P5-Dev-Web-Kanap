function getOneProduct(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
      return res.json();
    })
    .then(product => {
      return product;
    })
    .catch(error => {
      const items = document.querySelector(".cart");
      items.innerHTML = "serveur indisponible";
  })
}
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

//------ faire un get by id pour récupérer les objets du local storage 
//------ utiliser boucle for of pour afficher tant qu'il y a des objets dans le local storage

const productDisplay = document.querySelector("#cart__items");

let totalPrice = 0;

function incrementPrice(price) {
  totalPrice += price;
}

async function renderCart() {

  if (productInLocalStorage === null) {
    document.querySelector("h1").innerHTML = "Votre panier est vide";
  } else {
    let structurePanier = "";

    // affichage des produits présents dans le local storage
    for (k = 0; k < productInLocalStorage.length; k++) {
      const product = await getOneProduct(productInLocalStorage[k].id);
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
      incrementPrice(product.price * productInLocalStorage[k].quantity);
    }
    productDisplay.innerHTML = structurePanier;
  }
}

function deleteProduct(btnDelete) {
  btnDelete.addEventListener('click', e => {
    e.preventDefault();
    window.location.reload();
    // récup id et couleur 
    const product = e.target.closest(".cart__item");
    console.log(product.dataset.color);
    // find index comme dans la page product
    const index = productInLocalStorage.findIndex(p => p.color === product.dataset.color && p.id === product.dataset.id);
    if (index === -1) {
      return;
    } else {
      productInLocalStorage.splice(index, 1);
    }
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  });
}

function initListenersDeleteProduct() {
  let btnsDelete = document.querySelectorAll(".deleteItem");
  for (let k = 0; k < btnsDelete.length; k++) {
    deleteProduct(btnsDelete[k]);
  }
}


// fonction pour sauvegarder les produits après modifs quantité
function saveProductLS(product) {
  return localStorage.setItem("product", JSON.stringify(product));
}

// faire deux fonctions comme ci dessus pour 1 gérer le addEventListener sur change puis 2 initialiser le listener
async function changeQuantity(btnQuantity) {
  btnQuantity.addEventListener('change', e => {
    e.preventDefault();
    console.log(e);
    const product = e.target.closest(".cart__item");
    console.log(product.dataset.color);
    console.log(btnQuantity.valueAsNumber);
    // à ce niveau là le changement de quantité est pris en compte mais pas encore enregistré
    // faire un find index pour modif la quantité dans le local storage
    const index = productInLocalStorage.findIndex(p => p.color === product.dataset.color && p.id === product.dataset.id);
    if (index === -1) {
      return;
    } else {
      productInLocalStorage[index].quantity = btnQuantity.valueAsNumber;
    }
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    location.reload();
  });
}

function initListenerChangeQuantity() {
  let btnsQuantity = document.querySelectorAll(".itemQuantity");
  for (let j = 0; j < btnsQuantity.length; j++) {
    changeQuantity(btnsQuantity[j]);
  }
}

function totalCart() {
  // gérer le total des produits dynamioquement ( avec les modifs quantités)
  let totalProducts = 0;
  // j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total
  for (let product of productInLocalStorage) {
    totalProducts += product.quantity;
  }
  // affichage nombre d'article
  document.getElementById("totalQuantity").textContent = totalProducts;
  //affichage du prix total
  document.getElementById("totalPrice").textContent = totalPrice;
}


async function displayCart() {
  await renderCart();
  totalCart();
  initListenersDeleteProduct();
  initListenerChangeQuantity();

}
displayCart();



// ---------------- partie formulaire ------------------------------

let form = document.querySelector(".cart__order__form");
let surname = document.querySelector("#firstName");
let name = document.querySelector("#lastName");
let city = document.querySelector("#city");
let adress = document.querySelector("#address");
let email = document.querySelector("#email");


// définition des regex pour validation email
function validEmail() {
  // écouter la modification de l'email 
  form.email.addEventListener('change', function () {
    validEmail(this);
  });
  let regValidEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
  let testEmail = regValidEmail.test(email.value);
  let messageEmail = document.querySelector("#emailErrorMsg");
  if (testEmail === false && email.value.length) {
    messageEmail.innerHTML = 'Email non Valide';
  }
  else {
    messageEmail.innerHTML = '';
    if (email.value.length)  return true;
    return false;
};
};
validEmail();

// définition des regex pour validation prénom
function validSurname() {
  // écouter la modification du prénom 
  form.firstName.addEventListener('change', function () {
    validSurname(this);
  });
  let regLetter = /^[A-Za-z\é\è\ê\-]+$/;
  let testSurname = regLetter.test(firstName.value);
  let messageFirstName = document.querySelector("#firstNameErrorMsg");
  if (testSurname === false && firstName.value.length) {
    messageFirstName.innerHTML = 'Prénom non Valide';
  }
  else {
    messageFirstName.innerHTML = '';
    if (firstName.value.length)  return true;
    return false;
};
};
validSurname();

// définition des regex pour validation nom
function validName() {
  // écouter la modification de l'email 
  form.lastName.addEventListener('change', function () {
    validName(this);
  });
  let regValidName = /^[A-Za-z\é\è\ê\-]+$/;
  let testName = regValidName.test(lastName.value);
  let messageName = document.querySelector("#lastNameErrorMsg");
  if (testName === false && lastName.value.length) {
    messageName.innerHTML = 'Nom non Valide'; 
    return false;
  }else{
    messageName.innerHTML = '';
    if (lastName.value.length)  return true;
    return false;
  };
};
validName();

// définition des regex pour validation adresse
function validAddress() {
  // écouter la modification de l'email 
  form.address.addEventListener('change', function () {
    validAddress(this);
  });
  let regValidAddress =  /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
  let testAddress = regValidAddress.test(address.value);
  let messageAddress = document.querySelector("#addressErrorMsg");
  if (testAddress === false && address.value.length) {
    messageAddress.innerHTML = 'Adresse non Valide'; 
    return false;
  }else{
    messageAddress.innerHTML = '';
    if (address.value.length)  return true;
    return false;
  };
};
validAddress();

// définition des regex pour validation ville
function validCity() {
  
  form.city.addEventListener('change', function () {
    validCity(this);
  });
  let regValidCity = /^[A-Za-z\é\è\ê\-]+$/;
  let testCity = regValidCity.test(city.value);
  let messageCity = document.querySelector("#cityErrorMsg");
  if (testCity === false && city.value.length) {
    messageCity.innerHTML = 'Ville non Valide'; 
    return false;
  }else{
    messageCity.innerHTML = '';
    if (city.value.length)  return true;
    return false;
  }
};
validCity();
// fonction de création de l'objet contact, puis implémentation de ces objets dans un tableau

function order(){
  const orderBtn = document.querySelector("#order");
  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validCity() === false || validAddress() === false){
      alert('formulaire de contact érroné');
      return;
    };
    if((JSON.parse(localStorage.getItem("product")) || []).length === 0){
      alert('pas de produits dans le panier');
      return;
    };
    const contact = {
      firstName : surname.value,
      lastName : lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
    };
    const productIds = JSON.parse(localStorage.getItem("product")).map (p => p.id);
    const orderObject ={
        contact : contact,
        products : productIds,
    };
    const postObject = {
      method : "POST",
      body : JSON.stringify(orderObject),
      headers : {"content-type":"application/json"},
    }
    fetch("http://localhost:3000/api/products/order", postObject)
    .then (function (res) {
      return res.json();
    })
    .then (function (data){ 
      localStorage.clear();
      window.location.href ="confirmation.html?orderId=" + data.orderId;
     
    })
  })
}
order();

// remettre bien le formulaire
//fichier test 