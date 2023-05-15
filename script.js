/* Definicion de variables

/* Carrito */
let totalAmountProd = 0;
let totalPrice = 0;
let montoDifu = 0;
let montoPerfu = 0;
let montoVelas = 0;

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
    { id: 1, prodName: "Perfumina 01", prodPrice: 2000, category: "perfuminas", prodStock: 100},
    { id: 2, prodName: "Accesorio 01", prodPrice: 700, category: "accesorios", prodStock: 100},
    { id: 3, prodName: "Difusor 01", prodPrice: 850, category: "difusores", prodStock: 100},
    { id: 4, prodName: "Vela 02", prodPrice: 1300, category: "velas", prodStock: 100 },
    ];

/* Definición Funciones */

function successRegistry(NombreCompleto) {
  alert(`Bienvenido al Sitio ${NombreCompleto}`);
  menu();
}

// Bienvenida al Sitio

function welcome(){
    alert("Bienvenido a Chiara Candles Shop");
    let option = prompt("Ingrese la opcion: \n 1 - Login \n 2 - Registro");
        switch(option){
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

function login(){
    let adminLogin = prompt("Ingrese su usuario")
    let adminPsw = prompt("Ingrese su contraseña")
    if(adminLogin === adminName && adminPsw === adminPass){
        adminMenu();
    } else {
        alert("Usuario o contraseña incorrectos");
        welcome();
    }
}


/* Registro */
function userRegistry(){
    userName = prompt("Ingrese su Nombre y Apellido");
    while (userName.length === 0){
    alert("Ingrese un dato valido")
    userName = prompt("Ingrese su Nombre y Apellido")
    }
    userEmail = prompt("Ingrese su correo electrónico");
    while (userEmail.length === 0){
    alert("Ingrese un dato valido")
    userEmail = prompt("Ingrese su correo electrónico")
    }
    userPassword = prompt("Ingrese su contraseña");
    while (userPassword.length === 0){
    alert("Ingrese un dato valido")
    userEmail = prompt("Ingrese una contraseña")
    }
    userAddress = prompt("Ingrese su dirección de envio");
    while (userAddress.length === 0){
    alert("Ingrese un dato valido")
    userEmail = prompt("Ingrese su correo electrónico")
    }
    successRegistry(userName);
}

function adminMenu(){
    let adminOption = prompt("Bievenido al Menu de Administración \n Seleccione la opcion: \n 1 - Administrador de productos \n 2 - Salir");
        switch(adminOption){
            case "1":
                alert(`Proximo ID en el array de productos es ${productos.length}`);
                class AddProd {
                    constructor(id, prodName, prodPrice, category, prodStock){
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
                if (fndNewProd){
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

function menu(){
  let carritoOperacion = prompt("Ingrese los productos que desea agregar: \n 1 - Velas \n 2 - Difusores \n 3 - Perfuminas \n 4 - Accesorios \n 5 - CheckOut \n 6 - Salir");
    switch(carritoOperacion){
      case "1":
        candle();
        break;
      case "2":
        difusor();
        break;
      case "3":
        perfumina();
        break;
      case "4":
        accesorios();
        break;
      case "5":
        checkOut();
        break;
      case "6":
        alert("Gracias por utilizar la plataforma");
        welcome();
        break;
      default:
        alert("Ingrese una opcion de la lista");
        menu();
    }
  }

  function candle(){
    //listar productos disponibles
    let displayPrd = productos.filter((item) => item.category === "velas");
    displayPrd.forEach((item) => {
        let message = `
            ID: ${item.id}
            Producto: ${item.prodName}
            Precio: ${item.prodPrice}$
            Stock: ${item.prodStock}`
        alert(message);
    }
    );
    let searchPrd = parseInt(prompt("Ingrese el ID de producto que desea comprar: "));
    let findPrd = productos.find((item) => item.id === searchPrd); // Buscar por el ID colocado en el array
    if (findPrd){ // Si encontrar da true
        let purchQty = parseInt(prompt("Ingrese la cantidad a comprar: "));
        if (purchQty === 0){ 
            alert("Ingrese una cantidad mayor a 0");
            menu();
        }
            else {
                let selectPrd = productos.filter((item) => item.id === searchPrd);
                selectPrd.forEach((item) => {
                if (purchQty <= item.prodStock){
                    item.prodStock -= purchQty;
                    totalAmountProd += purchQty;
                    montoVelas = purchQty * item.prodPrice;
                    alert(`Gracias por comprar ${purchQty} Velas`);
                    menu();
                }
                else {
                    alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                    candle();
                }
                }
                )
            }
        }
    else {
        alert("Producto no encontrado");
        menu();
    }
}

function difusor(){
    //listar productos disponibles
    let displayPrd = productos.filter((item) => item.category === "difusores");
    displayPrd.forEach((item) => {
        let message = `
            ID: ${item.id}
            Producto: ${item.prodName}
            Precio: ${item.prodPrice}$
            Stock: ${item.prodStock}`
        alert(message);
    }
    );
    let searchPrd = parseInt(prompt("Ingrese el ID de producto que desea comprar: "));
    let findPrd = productos.find((item) => item.id === searchPrd); // Buscar por el ID colocado en el array
    if (findPrd){ // Si encontrar da true
        let purchQty = parseInt(prompt("Ingrese la cantidad a comprar: "));
        if (purchQty === 0){ 
            alert("Ingrese una cantidad mayor a 0");
            menu();
        }
            else {
                let selectPrd = productos.filter((item) => item.id === searchPrd);
                selectPrd.forEach((item) => {
                if (purchQty <= item.prodStock){
                    item.prodStock -= purchQty;
                    totalAmountProd += purchQty;
                    montoDifu = purchQty * item.prodPrice;
                    alert(`Gracias por comprar ${purchQty} Difusores`);
                    menu();
                }
                else {
                    alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                    difusor();
                }
                }
                )
            }
        }
    else {
        alert("Producto no encontrado");
        menu();
    }
}

function perfumina(){
    //listar productos disponibles
    let displayPrd = productos.filter((item) => item.category === "perfuminas");
    displayPrd.forEach((item) => {
        let message = `
            ID: ${item.id}
            Producto: ${item.prodName}
            Precio: ${item.prodPrice}$
            Stock: ${item.prodStock}`
        alert(message);
    }
    );
    let searchPrd = parseInt(prompt("Ingrese el ID de producto que desea comprar: "));
    let findPrd = productos.find((item) => item.id === searchPrd); // Buscar por el ID colocado en el array
    if (findPrd){ // Si encontrar da true
        let purchQty = parseInt(prompt("Ingrese la cantidad a comprar: "));
        if (purchQty === 0){ 
            alert("Ingrese una cantidad mayor a 0");
            menu();
        }
            else {
                let selectPrd = productos.filter((item) => item.id === searchPrd);
                selectPrd.forEach((item) => {
                if (purchQty <= item.prodStock){
                    item.prodStock -= purchQty;
                    totalAmountProd += purchQty;
                    montoPerfu = purchQty * item.prodPrice;
                    alert(`Gracias por comprar ${purchQty} Perfuminas`);
                    menu();
                }
                else {
                    alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                    perfumina();
                }
                }
                )
            }
        }
    else {
        alert("Producto no encontrado");
        menu();
    }
}

function accesorios(){
    //listar productos disponibles
    let displayPrd = productos.filter((item) => item.category === "accesorios");
    displayPrd.forEach((item) => {
        let message = `
            ID: ${item.id}
            Producto: ${item.prodName}
            Precio: ${item.prodPrice}$
            Stock: ${item.prodStock}`
        alert(message);
    }
    );
    let searchPrd = parseInt(prompt("Ingrese el ID de producto que desea comprar: "));
    let findPrd = productos.find((item) => item.id === searchPrd); // Buscar por el ID colocado en el array
    if (findPrd){ // Si encontrar da true
        let purchQty = parseInt(prompt("Ingrese la cantidad a comprar: "));
        if (purchQty === 0){ 
            alert("Ingrese una cantidad mayor a 0");
            menu();
        }
            else {
                let selectPrd = productos.filter((item) => item.id === searchPrd);
                selectPrd.forEach((item) => {
                if (purchQty <= item.prodStock){
                    item.prodStock -= purchQty;
                    totalAmountProd += purchQty;
                    montoPerfu = purchQty * item.prodPrice;
                    alert(`Gracias por comprar ${purchQty} Accesorios`);
                    menu();
                }
                else {
                    alert("La cantidad seleccionada es mayor al stock del producto, ingrese un valor menor o igual a " + item.prodStock);
                    accesorios();
                }
                }
                )
            }
        }
    else {
        alert("Producto no encontrado");
        menu();
    }
}

function checkOut(){
  if(totalAmountProd === 0){
    alert("Añada productos al carrito antes del checkout");
    menu();
  }else{
    totalPrice = montoDifu + montoPerfu + montoVelas;
    alert(`${userName} gracias por tu compra total de: $${totalPrice}!`);
  }
}


welcome();