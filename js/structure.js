const mainProd = document.getElementById("mainProd");
const mainFluidProd = document.getElementById("main-fluid-container");
const btnEmptyCart = document.getElementById("emptyCart");
const btnLoginRegister = document.getElementById("loginRegister");
const mainLogin = document.getElementById("mainLogin");
const mainCart = document.getElementById("mainCart");
const formLogin = document.getElementById("loginHTML");
const mainProdCartContainer = document.getElementById("mainProdCartContainer");
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const bodyHTML = document.getElementById("body-html");
const btnShowCart = document.getElementById("showCart")

class AddCart {
    constructor(idProd, cartProdName, cartProdPrice, cartProdQty, cartTotal) {
        this.idProd = idProd;
        this.cartProdName = cartProdName;
        this.cartProdPrice = cartProdPrice;
        this.cartProdQty = cartProdQty;
        this.cartTotal = cartTotal;
    }
};

const getProductsArray = async () => {
    const response = await fetch('./js/productos.json');
    const data = await response.json();
    productos = data;
    listarProductos();
};
const getUsersArray = async () => {
    const response = await fetch('./js/usuarios.json');
    const data = await response.json();
    userArray = data;
    return;
};

function listarProductos() {
    productos.forEach((item) => {
        const itemPriceARS = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(item.prodPrice);
        let div = document.createElement("div");
        div.classList.add("col-lg-3", "col-md-6", "col-s-12", "prod-container");
        div.innerHTML += `
          <img src="./media/product-${item.id}.webp" alt="${item.prodName}" width="120" height="340">
          <p id="${item.id}-p"><b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b></p>
          <b>${itemPriceARS}</b>
          <input id="${item.id}-qty" type="number" min="1">
          <button id="${item.id}" type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Add to Cart</button>
          `;
        mainProd.appendChild(div);

        let btnAddTC = document.getElementById(item.id);

        btnAddTC.addEventListener("click", (e) => {
            let qtySel = parseInt(document.getElementById(`${item.id}-qty`).value);
            if (!isNaN(qtySel)) {
                if (qtySel <= item.prodStock) {
                    item.prodStock -= qtySel;
                    document.getElementById(`${item.id}-p`).innerHTML = `<b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b>`;
                    Toastify({
                        text: `Se agrego ${qtySel} ${item.prodName} al carrito`,
                        style: {
                            background: "linear-gradient(to right, #817575, #B2AAAA)",
                        }
                    }).showToast();
                    addToCart(item.id, qtySel, item.prodPrice, item.prodName);
                    btnShowCart.innerText = carrito.length + " Items";
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Opaaa',
                        text: `No tenemos tanto stock, proba con menos de ${item.prodStock}`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                };
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Elejí una cantidad correcta',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                });
            };
        })
    });
};

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

function showCart() {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    modalOverlay.classList.remove("hidden");
    bodyHTML.classList.add("scroll-block");
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML += `
        <p class="modal-header-titulo">Carrito</p>
      `;
    modalContainer.append(modalHeader);
    let modalClose = document.createElement("p");
    modalClose.innerText = "x";
    modalClose.className = "modal-header-close";
    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.classList.add("hidden");
        bodyHTML.classList.remove("scroll-block");
    });
    modalHeader.append(modalClose);

    carrito.forEach((item) => {
        const cartItemPriceARS = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(item.cartTotal);
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-body";
        carritoContent.innerHTML = `
        <div class="card">
            <div class="card-header">
                ${item.cartProdName}
            </div>
             <div class="card-body">
                <h5 class="card-title">Cantidad: ${item.cartProdQty} Total: ${cartItemPriceARS}</h5>
                <a id="${item.idProd}-del" href="" class="btn btn-primary text-center btn-del-cart">Eliminar</a>
            </div>    
        </div>
          `;
        modalContainer.append(carritoContent);

        let btnRemoveCart = document.getElementById(`${item.idProd}-del`);

        btnRemoveCart.addEventListener("click", (e) => {
            e.preventDefault();
            modalContainer.style.display = "none";
            modalOverlay.classList.add("hidden");
            bodyHTML.classList.remove("scroll-block");
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
                    const delCartId = carrito.findIndex(prod => prod.idProd === item.idProd);
                    carrito.splice(delCartId, 1);
                    productos.map((productItem) => {
                        if (productItem.id === item.idProd) {
                            productItem.prodStock += item.cartProdQty;
                            document.getElementById(`${productItem.id}-p`).innerHTML = `<b>${productItem.prodName}</b> Stock Disponible: <b>${productItem.prodStock}</b>`;
                            return productItem;
                        } else {
                            return productItem;
                        };
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Borrado!',
                        text: 'El producto se ha borrado correctamente',
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    if (carrito.length === 0) {
                        btnShowCart.innerText = "Carrito";
                        localStorage.clear();
                        return;
                    } else {
                        btnShowCart.innerText = carrito.length + " Items";
                        localStorage.setItem("cart", JSON.stringify(carrito));
                        return;
                    }
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

    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML += `
    <a href="" id="btnCheckOut" class="btn btn-primary text-center btn-checkout">Completar Pedido</a>
      `;
    modalContainer.append(modalFooter);

    const btnCheckOut = document.getElementById("btnCheckOut");

    btnCheckOut.addEventListener("click", (e) => {
        e.preventDefault();
        cartCheckoutStorage = localStorage.getItem("cart");
        if (cartCheckoutStorage) {
            const loginStatus = sessionStorage.getItem("loginSucc");
            if (loginStatus) {
                cartCheckout = JSON.parse(cartCheckoutStorage);
                window.open("./html/cart.html", "_self");
            } else {
                modalContainer.style.display = "none";
                modalOverlay.classList.add("hidden");
                bodyHTML.classList.remove("scroll-block");
                Swal.fire({
                    icon: 'warning',
                    title: 'Ups!',
                    text: 'Debes loguearte para utilizar la plataforma, vamos a por ello.',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                }).then((result) => {
                    if (result.isConfirmed) {
                        login();
                        return;
                    }
                });
            };
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'No tenes nada en el carrito',
                confirmButtonColor: '#817575',
                background: '#f5f0eb',
            });
        };
    });
};


function login() {
    const loginStatus = sessionStorage.getItem("loginSucc");
    if (loginStatus) {
        nombre = sessionStorage.getItem("Nombre")
        Swal.fire({
            icon: 'warning',
            text: `Gracias por pasar ${nombre}`,
            confirmButtonColor: '#817575',
            background: '#f5f0eb',
        });
        sessionStorage.clear();
        document.getElementById("loginRegister").innerText = `Login`;
        listProdDiv.innerHTML = '';
        listarProductos();
    } else {
        listProdDiv = document.getElementById("mainProd")
        listProdDiv.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML += `
        <div class="container w-50">
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
        <div class="d-grid gap-2">
          <button id="registerBtn" class="btn btn-success" type="button">Registrame!</button>
        </div>
      </div>
          `;
        mainLogin.appendChild(div);
        getUsersArray();
        const btnLogin = document.getElementById("loginBtn");
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            let username = document.getElementById("loginMail").value;
            let password = document.getElementById("loginPass").value;
            if (username === "admin" && password === "admin") {
                window.open("./html/adminProd.html", "_self");
            } else if (username.includes("@")) {
                userArray.forEach((user) => {
                    if (user.username === username && user.password === password) {
                        sessionStorage.setItem("loginSucc", true);
                        sessionStorage.setItem("Nombre", user.nombre);
                        sessionStorage.setItem("Apellido", user.apellido);
                        sessionStorage.setItem("username", user.username);
                        return;
                    }
                });
                let loginSucc = sessionStorage.getItem("loginSucc");
                let nombre = sessionStorage.getItem("Nombre");
                if (loginSucc) {
                    Swal.fire({
                        icon: 'success',
                        text: `Bienvenido ${nombre} :)`,
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    mainLogin.innerHTML = '';
                    document.getElementById("loginRegister").innerText = `${username}`;
                    listarProductos();
                    return;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups!',
                        text: 'Usuario o clave incorrectos',
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                    });
                    return;
                };
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
        });

        const btnRegister = document.getElementById("registerBtn");
        btnRegister.addEventListener("click", (e) => {
            e.preventDefault();
            let nombre = document.getElementById("formNombre").value;
            let apellido = document.getElementById("formApellido").value;
            let mail = document.getElementById("E-Mail").value;
            if (mail.includes("@")) {
                sessionStorage.setItem("username", mail);
            } else {
                let regForm = document.getElementById("divMail");
                let inputDiv = document.createElement("span");
                inputDiv.classList.add("badge", "bg-danger");
                inputDiv.innerText += `
                Ingrese el usuario correctamente
                `;
                regForm.appendChild(inputDiv);
                return;
            }
            if (document.getElementById("regPassword").value !== document.getElementById("repPassword").value) {
                let passwordField = document.getElementById("formRepPassword");
                let inputDiv = document.createElement("span");
                inputDiv.classList.add("badge", "bg-danger");
                inputDiv.innerText += `
                Las Claves No Coinciden
                `;
                passwordField.appendChild(inputDiv);
                return;
            } else {
                (async () => {
                    const { value: accept } = await Swal.fire({
                        customClass: {
                            label: "swal2",
                        },
                        title: 'Terminos y Condiciones',
                        input: 'checkbox',
                        inputValue: 0,
                        inputPlaceholder:
                            'Acepto los terminos y condiciones de uso',
                        confirmButtonText:
                            'Aceptar<i class="fa fa-arrow-right"></i>',
                        confirmButtonColor: '#817575',
                        background: '#f5f0eb',
                        inputValidator: (result) => {
                            return !result && 'Debes aceptar los terminos antes de continuar'
                        }
                    })
                    if (accept) {
                        Swal.fire({
                            icon: 'success',
                            text: `Bienvenido ${nombre} :)`,
                            confirmButtonColor: '#817575',
                            background: '#f5f0eb',
                        });
                        sessionStorage.setItem("loginSucc", true);
                        sessionStorage.setItem("Nombre", nombre);
                        sessionStorage.setItem("Apellido", apellido);
                        mainLogin.innerHTML = '';
                        document.getElementById("loginRegister").innerText = `${mail}`;
                        listarProductos();
                    }
                })();
            }
        })
    };
};

btnLoginRegister.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

btnEmptyCart.addEventListener("click", (e) => {
    e.preventDefault();
    cartCheckoutStorage = localStorage.getItem("cart");
    if (cartCheckoutStorage) {
        Swal.fire({
            title: 'Estas seguro de vaciar el carrito?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            background: '#f5f0eb'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'warning',
                    text: 'El carrito fue eliminado :(',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                });
                carrito.forEach((cartItem) => {
                    cartRetID = cartItem.idProd;
                    cartRetStock = cartItem.cartProdQty;
                });
                productos.map((productItem) => {
                    if (productItem.id === cartRetID) {
                        productItem.prodStock += cartRetStock;
                        document.getElementById(`${productItem.id}-p`).innerHTML = `<b>${productItem.prodName}</b> Stock Disponible: <b>${productItem.prodStock}</b>`;
                        return productItem;
                    } else {
                        return productItem;
                    };
                });
                localStorage.clear();
                carrito = [];
                btnShowCart.innerText = "Carrito";
                return;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cancelado!',
                    text: 'El carrito no se ha vaciado',
                    confirmButtonColor: '#817575',
                    background: '#f5f0eb',
                });
                return;
            };
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No tenes nada en el carrito',
            confirmButtonColor: '#817575',
            background: '#f5f0eb',
        });
    };
});

btnShowCart.addEventListener("mouseover", () => {
    const cartExist = localStorage.getItem("cart");
    if (cartExist) {
        showCart();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'No tenes nada en el carrito',
            confirmButtonColor: '#817575',
            background: '#f5f0eb',
        });
    }
});


