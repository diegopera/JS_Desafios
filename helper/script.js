
/* Login / Register */
let userName;
let userEmail;
let userPassword;
let userAddress;
let adminName = "admin";
let adminPass = "admin";

/* Arrays de Productos */

const productos = [
    { id: 0, prodName: "Vela 01", prodPrice: 1500, category: "velas", prodStock: 100 },
    { id: 1, prodName: "Perfumina 01", prodPrice: 2000, category: "perfuminas", prodStock: 100 },
    { id: 2, prodName: "Accesorio 01", prodPrice: 700, category: "accesorios", prodStock: 100 },
    { id: 3, prodName: "Difusor 01", prodPrice: 850, category: "difusores", prodStock: 100 },
    { id: 4, prodName: "Vela 02", prodPrice: 1300, category: "velas", prodStock: 100 },
];

/* Definición Funciones */

function successRegistry(NombreCompleto) {
    alert(`Bienvenido al Sitio ${NombreCompleto}`);
    listarProductos();
}

// Bienvenida al Sitio

function welcome() {
    alert("Bienvenido a Chiara Candles Shop");
    let option = prompt("Ingrese la opcion: \n 1 - Login \n 2 - Registro");
    switch (option) {
        case "1":
            login();
            break;
        case "2":
            userRegistry();
            break;
        default:
            alert("Ingrese una opcion valida");
            welcome();
            break;
    }
}

function login() {
    let adminLogin = prompt("Ingrese su usuario")
    let adminPsw = prompt("Ingrese su contraseña")
    if (adminLogin === adminName && adminPsw === adminPass) {
        adminMenu();
    } else {
        alert("Usuario o contraseña incorrectos");
        welcome();
    }
}


/* Registro */
function userRegistry() {
    userName = prompt("Ingrese su Nombre y Apellido");
    while (userName.length === 0) {
        alert("Ingrese un dato valido")
        userName = prompt("Ingrese su Nombre y Apellido")
    }
    userEmail = prompt("Ingrese su correo electrónico");
    while (userEmail.length === 0) {
        alert("Ingrese un dato valido")
        userEmail = prompt("Ingrese su correo electrónico")
    }
    userPassword = prompt("Ingrese su contraseña");
    while (userPassword.length === 0) {
        alert("Ingrese un dato valido")
        userEmail = prompt("Ingrese una contraseña")
    }
    userAddress = prompt("Ingrese su dirección de envio");
    while (userAddress.length === 0) {
        alert("Ingrese un dato valido")
        userEmail = prompt("Ingrese su correo electrónico")
    }
    successRegistry(userName);
}

function adminMenu() {
    let adminOption = prompt("Bievenido al Menu de Administración \n Seleccione la opcion: \n 1 - Administrador de productos \n 2 - Salir");
    switch (adminOption) {
        case "1":
            alert(`Proximo ID en el array de productos es ${productos.length}`);
            class AddProd {
                constructor(id, prodName, prodPrice, category, prodStock) {
                    this.id = id;
                    this.prodName = prodName;
                    this.prodPrice = prodPrice;
                    this.category = category;
                    this.prodStock = prodStock;
                }
            }
            let newName = prompt("Ingrese el nombre del nuevo producto:");
            let newPrice = parseInt(prompt("Ingrese el precio:"));
            let newCat = prompt("Ingrese la categoria donde se guarde: Velas - Perfuminas - Difusores - Accesorios").toLowerCase();
            let newStck = parseInt(prompt("Ingrese el stock inicial:"));
            const newProd = new AddProd(productos.length, newName, newPrice, newCat, newStck);
            productos.push(newProd);
            let newProdID = productos.length - 1;
            const fndNewProd = productos.find((item) => item.id === newProdID);
            if (fndNewProd) {
                let message = `
                    ID: ${fndNewProd.id}
                    Nombre: ${fndNewProd.prodName}
                    Precio: ${fndNewProd.prodPrice}
                    Categoria: ${fndNewProd.category}
                    Stock Inicial: ${fndNewProd.prodStock}
                    `;
                alert(message);
                adminMenu();
            }
            else {
                alert("Algo salio mal");
                adminMenu();
            }
            break;
        case "2":
            welcome();
        default:
            alert("Ingrese una opcion correcta");
            adminMenu();

    }
}

/* Ejemplo Carrito */

let carrito = [];

function listarProductos(){
    document.querySelectorAll('a.prodLink').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            idLinkProd = e.target.id;
    let displayPrd = productos.filter((item) => item.category === idLinkProd);
   displayPrd.forEach((item) => {
      let div = document.createElement("div");
      div.innerHTML = `
      <h2>ID: ${item.id}</h2>
      <p id="${item.id}-p">Nombre: <b>${item.prodName}</b> Stock Disponible: <b>${item.prodStock}</b></p>
      <b>$${item.prodPrice}</b>
      <input id="${item.id}-qty" type="number" min="1">
      <input id="${item.id}" type="submit" value="Agregar al Carrito">
      <hr />
      `;
      document.body.append(div);

   let btnAddTC = document.getElementById(item.id);
   
   btnAddTC.addEventListener("click", (e) => {
      // e.preventDefault();
      let qtySel = parseInt(document.getElementById(`${item.id}-qty`).value);
      console.log("Cantidad elegida " + qtySel);
      console.log("ID de Producto " + item.id);
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
         constructor(idProd, cartProdName, cartProdPrice, cartProdQty, cartTotal){
            this.idProd = idProd;
            this.cartProdName = cartProdName;
            this.cartProdPrice = cartProdPrice;
            this.cartProdQty = cartProdQty;
            this.cartTotal = cartTotal;
         }
      }
      let cartTotal = item.prodPrice * qtySel
      console.log("Total de cada producto " + cartTotal);
      const addToCart = new AddCart(item.id, item.prodName, item.prodPrice, qtySel, cartTotal);
      carrito.push(addToCart);
      console.log(carrito);
      localStorage.setItem("cart", JSON.stringify(carrito));
   })
   });
});
});
}

let btnEmptyCart = document.getElementById("emptyCart");
btnEmptyCart.addEventListener("click", () => {
   localStorage.clear();
   alert("Carrito Eliminado");
   location.reload();
});

let btnCheckOut = document.getElementById("checkOut");
btnCheckOut.addEventListener("click", () => {
   cartCheckoutStorage = localStorage.getItem("cart");
   if (cartCheckoutStorage){
      cartCheckout = JSON.parse(cartCheckoutStorage);
   } else {
         alert("El carrito esta vacio");
   }
   console.log(cartCheckout);
   const totalAmount = cartCheckout.reduce((acum, item) => acum + item.cartTotal, 0);
   console.log(totalAmount);
   alert("A ponerse con: $" + totalAmount);
   localStorage.clear();
   location.reload();
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

listarProductos();

