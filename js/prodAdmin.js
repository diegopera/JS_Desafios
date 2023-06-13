const btnLoginRegister = document.getElementById("loginRegister");
const inputNewName = document.getElementById("input-new-name");
const inputNewPrice = document.getElementById("input-new-price");
const inputNewCategory = document.getElementById("input-new-category");
const inputNewStock = document.getElementById("input-new-stock");
const btnInputConfirm = document.getElementById("input-btn-confirm");

class AddProd {
    constructor(id, prodName, prodPrice, category, prodStock) {
        this.id = id;
        this.prodName = prodName;
        this.prodPrice = prodPrice;
        this.category = category;
        this.prodStock = prodStock;
    }
};

const getProductsArray = async () => {
    const response = await fetch('../js/productos.json');
    const data = await response.json();
    productos = data;
    listarProductos();
};

function listarProductos() {
    productos.forEach((item) => {
        const itemPriceARS = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(item.prodPrice);
        let div = document.createElement("div");
        div.classList.add("col-lg-2", "col-md-2", "col-s-3", "prod-container");
        div.setAttribute("id", `list-prod-${item.id}`);
        div.innerHTML += `
          <img src="../media/product-${item.id}.webp" alt="${item.prodName}" width="40" height="220">
          <p id="${item.id}-p"><b>ID: ${item.id}</p> 
          <p>${item.prodName}</p>
          <p id="${item.id}-price"><b>${itemPriceARS}</b></p>
          <p id="${item.id}-stock">Stock: <b>${item.prodStock}u</b></p>
          <button id="delete-${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">¡Borrar!</button>
          <button id="stock-${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">ReStock</button>
          <button id="price-${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">¡Precio!</button>
          `;
        mainProd.appendChild(div);

        let btnChangePrice = document.getElementById(`price-${item.id}`);
        btnChangePrice.addEventListener("click", (e) => {
            (async () => {
                const { value: newPrice } = await Swal.fire({
                    title: 'Modificación del precio',
                    input: 'number',
                    inputLabel: `${item.prodName}`,
                    inputPlaceholder: 'Ingresa el valor del precio',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                })
                if (newPrice) {
                    Swal.fire({
                        icon: 'success',
                        text: `Nuevo precio para ${item.prodName} ${newPrice}`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    productos.map((productItem) => {
                        if (productItem.id === item.id){
                            productItem.prodPrice = newPrice;
                            return productItem;
                        } else {
                            return productItem;
                        };
                    });
                    const newPriceARS = new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                    }).format(item.prodPrice);
                    document.getElementById(`${item.id}-price`).innerHTML = `<b>${newPriceARS}</b>`;
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `Ingresa un valor valido`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                };
            })()
        });

        let btnChangeStock = document.getElementById(`stock-${item.id}`);
        btnChangeStock.addEventListener("click", (e) => {
            (async () => {
                const { value: newStock } = await Swal.fire({
                    title: 'Modificación de Stock',
                    input: 'number',
                    inputLabel: `${item.prodName}`,
                    inputPlaceholder: 'Ingresa el valor del stock',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                })
                if (newStock) {
                    Swal.fire({
                        icon: 'success',
                        text: `Nuevo Stock para ${item.prodName} ${newStock}`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    productos.map((productItem) => {
                        if (productItem.id === item.id){
                            productItem.prodStock = newStock;
                            return productItem;
                        } else {
                            return productItem;
                        };
                    });
                    document.getElementById(`${item.id}-stock`).innerHTML = `Stock: <b>${item.prodStock}u</b>`;
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `Ingresa un valor valido`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                };
            })()
        });


        let btnRemoveItem = document.getElementById(`delete-${item.id}`);
        btnRemoveItem.addEventListener("click", (e) => {
            Swal.fire({
                title: 'Esta seguro de eliminar?',
                text: "Esta acción no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                background: '#f5f0eb'
            }).then((result) => {
                if (result.isConfirmed) {
                    const delProdId = productos.findIndex(prod => prod.id === item.id);
                    productos.splice(delProdId, 1);
                    Swal.fire({
                        icon: 'success',
                        title: 'Borrado!',
                        text: 'El producto se ha borrado correctamente',
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    let divDeletedProduct = document.getElementById(`list-prod-${item.id}`);
                    divDeletedProduct.remove(`list-prod-${item.id}`);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cancelado!',
                        text: 'El producto no se ha borrado',
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                };
            });
        });
    });
}


btnLoginRegister.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("../index.html", "_self");
});

btnInputConfirm.addEventListener("click", (e) => {
    let newName = document.getElementById("input-new-name").value;
    let newPrice = document.getElementById("input-new-price").value;
    let newCat = document.getElementById("input-new-category").value.toLowerCase();
    let newStck = document.getElementById("input-new-stock").value;
    let newId = productos[productos.length - 1].id + 1
    mainProd.innerHTML = '';
    const newProd = new AddProd(newId, newName, newPrice, newCat, newStck);
    productos.push(newProd);
    listarProductos();
});

