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


// créer fonction render pour unb seul produit 

async function displayProduct () {
    const productId = getProductIdFromUrl();
    const product = await getOneProduct(productId);
    renderProduct (product);

}
displayProduct();

