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

function listarProductos() {
    productos.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("col-lg-1", "col-md-2", "col-s-3", "prod-container");
        div.setAttribute("id", `list-prod-${item.id}`);
        div.innerHTML += `
          <img src="../media/product-${item.id}.webp" alt="${item.prodName}" width="40" height="110">
          <p id="${item.id}-p"><b>ID: ${item.id}</p> 
          <p>${item.prodName}</p>
          <p><b>$${item.prodPrice}</b></p>
          <p>Stock: <b>${item.prodStock}u</b></p>
          <!-- <button id="delete-${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Borrar</button> -->
          <!-- <button id="stock-${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Stock!!</button> -->
          `;
        mainProd.appendChild(div);

        // let btnChangeStock = document.getElementById(`stock-${item.id}`);
        // let btnRemoveItem = document.getElementById(`delete-${item.id}`);
        
        // btnRemoveItem.addEventListener("click", (e) => {

        // });

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
        mainProd.innerHTML = '';
        const newProd = new AddProd(productos.length, newName, newPrice, newCat, newStck);
        productos.push(newProd);
        listarProductos();
    });

