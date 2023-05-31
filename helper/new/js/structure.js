const mainProd = document.getElementById("mainProd");
const mainFluidProd = document.getElementById("main-fluid-container");
const btnEmptyCart = document.getElementById("emptyCart");
const btnCheckOut = document.getElementById("checkOut");
const btnLoginRegister = document.getElementById("loginRegister");
const mainLogin = document.getElementById("mainLogin");
const mainCart = document.getElementById("mainCart");
const formLogin = document.getElementById("loginHTML");
const mainProdCartContainer = document.getElementById("mainProdCartContainer");

class AddCart {
    constructor(idProd, cartProdName, cartProdPrice, cartProdQty, cartTotal) {
        this.idProd = idProd;
        this.cartProdName = cartProdName;
        this.cartProdPrice = cartProdPrice;
        this.cartProdQty = cartProdQty;
        this.cartTotal = cartTotal;
    }
}

function listarProductos() {
    productos.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("col-lg-3", "col-md-6", "col-s-12", "prod-container");
        div.innerHTML += `
          <img src="./media/product-${item.id}.webp" alt="${item.prodName}" width="120" height="340">
          <p id="${item.id}-p"><b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b></p>
          <b>$${item.prodPrice}</b>
          <input id="${item.id}-qty" type="number" min="1">
          <button id="${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Add to Cart</button>
          `;
        mainProd.appendChild(div);

        let btnAddTC = document.getElementById(item.id);

        btnAddTC.addEventListener("click", (e) => {
            // e.preventDefault();
            let qtySel = parseInt(document.getElementById(`${item.id}-qty`).value);
            if (qtySel <= item.prodStock) {
                item.prodStock -= qtySel;
                document.getElementById(`${item.id}-p`).innerHTML = `<b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b>`;
            }
            else {
                alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                location.reload();
            }
            addToCart(item.id, qtySel, item.prodPrice, item.prodName);
        })
    });
}

function addToCart(prodID, prodQtySel, prodSelPrice, prodSelName) {
    const cartFind = carrito.some((cartItem) => cartItem.idProd === prodID);
    if (cartFind) {
        let cartExist = carrito.map((productItem) => {
            if (productItem.idProd === prodID) {
                productItem.cartProdQty += prodQtySel;
                productItem.cartTotal = productItem.cartProdPrice * productItem.cartProdQty;
                return productItem;
            } else {
                return productItem;
            }
        });
        carrito = cartExist;
    } else {
        const cartTotal = prodSelPrice * prodQtySel;
        const addToCart = new AddCart(prodID, prodSelName, prodSelPrice, prodQtySel, cartTotal);
        carrito.push(addToCart);
    };
    localStorage.setItem("cart", JSON.stringify(carrito));
};

function login() {
    const loginStatus = sessionStorage.getItem("loginSucc");
    if (loginStatus) {
        username = sessionStorage.getItem("username")
        alert("Se desloguea del sistema");
        sessionStorage.clear();
        location.reload();
        listarProductos();
    } else {
        mainFluidProd.remove("main-fluid-container");
        let div = document.createElement("div");
        div.innerHTML += `
        <div class="container w-50 mt-5">
        <div id="loginHTML" class="input-group mb-3 flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Email</span>
          <input id="loginMail" type="text" class="form-control" placeholder="email@ejemplo.com" aria-label="Email" aria-describedby="addon-wrapping">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
          <input id="loginPass" type="password" class="form-control" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="formCheckDefault">
          <label class="form-check-label" for="formCheckDefault">Mostrar Contraseña</label>
        </div>
        <div class="d-grid gap-2">
          <button id="loginBtn" class="btn btn-success" type="button">Login!</button>
        </div>
      </div>
    
      <div id="registerHTML" class="container w-50 mt-5">
        <div class="input-group mb-3">
          <span class="input-group-text">Nombres / Apellido</span>
          <input id="formNombre" type="text" aria-label="Nombres" class="form-control">
          <input id="formApellido" type="text" aria-label="Apellido" class="form-control">
        </div>
        <div id="divMail" class="input-group mb-3 flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Email</span>
          <input id="E-Mail" type="text" class="form-control" placeholder="email@ejemplo.com" aria-label="Email" aria-describedby="addon-wrapping">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
          <input id="regPassword" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div id="formRepPassword" class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Repetir Password</span>
          <input id="repPassword" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
          </div>
          <input type="text" class="form-control" placeholder="He leido los terminos y condiciones" aria-label="Text input with checkbox">
        </div>
        <div class="d-grid gap-2">
          <button id="registerBtn" class="btn btn-success" type="button">Registrame!</button>
        </div>
      </div>
          `;
        mainLogin.appendChild(div);
        const btnLogin = document.getElementById("loginBtn");
        btnLogin.addEventListener("click", () => {
            let username = document.getElementById("loginMail").value;
            if (username.includes("@")) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("loginSucc", true);
                mainLogin.remove(div);
                location.reload();
                listarProductos();
            } else {
                let loginForm = document.getElementById("loginHTML");
                let inputDiv = document.createElement("span");
                inputDiv.classList.add("badge", "bg-danger");
                inputDiv.innerText += `
                Ingrese el usuario correctamente
                `;
                loginForm.appendChild(inputDiv);
            }
        });
        const checkPswShow = document.getElementById("formCheckDefault");
        checkPswShow.addEventListener("click", () => {
            let pswShow = document.getElementById("loginPass");
            pswShow.type === "password" ? pswShow.type = "text" : pswShow.type = "password";
        })

        const btnRegister = document.getElementById("registerBtn");
        btnRegister.addEventListener("click", () => {
            let nombre = document.getElementById("formNombre").value;
            sessionStorage.setItem("Nombre", nombre);
            let apellido = document.getElementById("formApellido").value;
            sessionStorage.setItem("Apellido", apellido);
            let mail = document.getElementById("E-Mail").value;
            if (mail.includes("@")) {
                sessionStorage.setItem("username", mail);
                sessionStorage.setItem("loginSucc", true);
                mainLogin.remove(div);
                location.reload();
                listarProductos();
            } else {
                let regForm = document.getElementById("divMail");
                let inputDiv = document.createElement("span");
                inputDiv.classList.add("badge", "bg-danger");
                inputDiv.innerText += `
                Ingrese el usuario correctamente
                `;
                regForm.appendChild(inputDiv);
            }
            if (document.getElementById("regPassword").value !== document.getElementById("repPassword").value) {
                let passwordField = document.getElementById("formRepPassword");
                let inputDiv = document.createElement("span");
                inputDiv.classList.add("badge", "bg-danger");
                inputDiv.innerText += `
                Las Claves No Coinciden
                `;
                passwordField.appendChild(inputDiv);
            } else {
                sessionStorage.setItem("loginSucc", true);
                mainLogin.remove(div);
                location.reload();
                listarProductos();
            }
        })
    };
};

btnLoginRegister.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

btnEmptyCart.addEventListener("click", () => {
    localStorage.clear();
    alert("Carrito Eliminado");
    location.reload();
});

btnCheckOut.addEventListener("click", (e) => {
    e.preventDefault();
    cartCheckoutStorage = localStorage.getItem("cart");
    if (cartCheckoutStorage) {
        cartCheckout = JSON.parse(cartCheckoutStorage);
        window.open("./html/cart.html", "_self");
    } else {
        alert("El carrito esta vacio");
        location.reload();
    }
});