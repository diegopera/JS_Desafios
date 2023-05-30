function mainHTML() {
    let mainDivHTML = document.createElement("div");
    mainDivHTML.innerHTML = `
    <div class="container-fluid sticky-top main-navbar">
    <div class="row">
      <div class="col-9">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="./index.html">Inicio</a>
                </li>
                <li id="prodEnable" class="nav-item dropdown"><a class="nav-link dropdown-toggle" href=""
                    id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">Productos</a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a id="velas" class="dropdown-item prodLink" href="">Velas</a></li>
                    <li><a id="difusores" class="dropdown-item prodLink" href="">Difusores</a></li>
                    <li><a id="perfuminas" class="dropdown-item prodLink" href="">Perfuminas</a></li>
                    <li><a id="accesorios" class="dropdown-item prodLink" href="">Accesorios</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./html/cursos.html">Cursos</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./html/nosotros.html">Nosotros</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="col-3">
        <div class="link-container">
          <ul class="main-links btn-main">
            <li><img src="media/cart.png" alt="cart" width="30" height="30" class="cart-img"><a href="./html/cart.html"
                class="btn">Cart</a></li>
            <li><img src="media/username.png" alt="username" width="30" height="30" class="usr-img"><a
                href="./html/login.html" class="btn">Login / Register</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
      `;
    document.body.append(mainDivHTML);
};

function listarProductos() {
    let divBtn = document.createElement("div");
    divBtn.innerHTML = `
      <button id="emptyCart">Vaciar Carrito</button>
      <button id="checkOut">CheckOut</button>
      `;
    // let remProd = document.getElementById("prodDiv");
    // remProd.remove();
    document.body.append(divBtn);
    // document.querySelectorAll('a.prodLink').forEach(link => {
    //     link.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         idLinkProd = e.target.id;
    //         let displayPrd = productos.filter((item) => item.category === idLinkProd);
            // displayPrd.forEach((item) => {
                productos.forEach((item) => {
                let div = document.createElement("div");
                div.innerHTML =`
                <div class="container-fluid">
                    <div class="row g-3 main-prod-container">
                    <div data-aos="zoom-in" class="col-lg-3 col-md-6 col-s-12 prod-container">
                        <img src="../media/product1.webp" alt="product1">
                        <div>
                        <p>Producto tal, precio tal</p>
                        <p>Light</p>
                        <b>$1500</b>
                        <input type="text">
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Add to
                            Cart</button>
                        </div>
                    </div>
                    </div>
                </div>
                `;
                // div.innerHTML = `
                //   <div id="prodDiv">
                //   <h2>ID: ${item.id}</h2>
                //   <p id="${item.id}-p">Nombre: <b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b></p>
                //   <b>$${item.prodPrice}</b>
                //   <input id="${item.id}-qty" type="number" min="1">
                //   <input id="${item.id}" type="submit" value="Agregar al Carrito">
                //   <hr />
                //   </div>
                //   `;
                document.body.append(div);

                let btnAddTC = document.getElementById(item.id);

                btnAddTC.addEventListener("click", (e) => {
                    // e.preventDefault();
                    let qtySel = parseInt(document.getElementById(`${item.id}-qty`).value);
                    if (qtySel <= item.prodStock) {
                        item.prodStock -= qtySel;
                        document.getElementById(`${item.id}-p`).innerHTML = `Nombre: <b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b>`;
                        // listarProductos(); // ver como hacer para que se actualice el stock en pantalla
                    }
                    else {
                        alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                        location.reload();
                    }
                    class AddCart {
                        constructor(idProd, cartProdName, cartProdPrice, cartProdQty, cartTotal) {
                            this.idProd = idProd;
                            this.cartProdName = cartProdName;
                            this.cartProdPrice = cartProdPrice;
                            this.cartProdQty = cartProdQty;
                            this.cartTotal = cartTotal;
                        }
                    }
                    let cartTotal = item.prodPrice * qtySel
                    const addToCart = new AddCart(item.id, item.prodName, item.prodPrice, qtySel, cartTotal);
                    carrito.push(addToCart);
                    localStorage.setItem("cart", JSON.stringify(carrito));
                })
            });

            let btnEmptyCart = document.getElementById("emptyCart");
            btnEmptyCart.addEventListener("click", () => {
                localStorage.clear();
                alert("Carrito Eliminado");
                location.reload();
                mainHTML();
            });

            let btnCheckOut = document.getElementById("checkOut");
            btnCheckOut.addEventListener("click", () => {
                cartCheckoutStorage = localStorage.getItem("cart");
                if (cartCheckoutStorage) {
                    cartCheckout = JSON.parse(cartCheckoutStorage);
                } else {
                    alert("El carrito esta vacio");
                    listarProductos();
                }
                const totalAmount = cartCheckout.reduce((acum, item) => acum + item.cartTotal, 0);
                alert("A ponerse con: $" + totalAmount);
                localStorage.clear();
                location.reload();
                mainHTML();
                // cartCheckout.forEach((item) => {
                //    let totalAmount = item.cartProdPrice * item.cartProdQty;
                // let message = `
                // ID: ${item.idProd}
                // Nombre: ${item.cartProdName}
                // Comprados: ${item.cartProdQty}
                // Total: $${totalAmount}
                // `;
                // console.log(message);
                // });
            });
    //     });
    // });
}