const btnLoginRegister = document.getElementById("loginRegister");

function listarProductos() {
    productos.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("col-lg-1", "col-md-2", "col-s-3", "prod-container");
        div.innerHTML += `
          <img src="../media/product-${item.id}.webp" alt="${item.prodName}" width="40" height="110">
          <p id="${item.id}-p"><b>ID: ${item.id} ${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b></p>
          <b>$${item.prodPrice}</b>
          `;
        mainProd.appendChild(div);
    });
}

btnLoginRegister.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("../index.html", "_self");
});

listarProductos();
