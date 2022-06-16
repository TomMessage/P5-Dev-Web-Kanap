function getAllProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json();
        })
        .then(products => {
            return products;
        }) 
        .catch(error => {
            const items = document.querySelector("#items");
            items.innerHTML = "serveur indisponible";
        })
}

function renderProducts(products) {
    
    // 1 - Je check que mon tableau a une longueur
    
    // 2 - Je vais chercher dans mon html l'emplacement des produits id=items (document.querySelector("#items"))
    /*<!--           <a href="./product.html?id=42">
            <article>
              <img src="product.imageUrl" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->*/
    // 3 - Je parcours mon tavbleau et pour chaque élément j'écris le html au dessus. Il faut utiliser la boucle for --> for(const product of products)
    // 4 - Pour atteindre le champ de chaque élément, il faut : pour le name --> product.name, pour le price --> product.price etc...
    let numberOfProducts = products.length;
    if (numberOfProducts > 0) {
        const items = document.querySelector("#items");
        for(const product of products) {
            items.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`; 
        }
    }     
}


async function displayProducts() {
    const productsFromServer = await getAllProducts();
    console.log(productsFromServer);
    renderProducts(productsFromServer);
}

displayProducts();
