/* Definicion de variables por tipo de producto (Categoria) */

/* Cursos */

/* Difusores */
let diffProd01Price = 450;
let diffProd01Stock = 100;

/* Accesorios */

/* Perfuminas */
let perfProd01Price = 570;
let perfProd01Stock = 200;

/* Velas */
let candProd01Price = 700;
let candProd01Stock = 500;

/* Carrito */
let totalAmountProd = 0;
let totalPrice = 0;
let montoDifu = 0;
let montoPerfu = 0;
let montoVelas = 0;
let candlePurchase = 0;
let perfPurchase = 0;
let diffPurchase = 0;

/* Login / Register */
let userName;
let userEmail;
let userPassword;
let userAddress;

/* Definición Funciones */

function userRegistry(NombreCompleto) {
  alert(`Bienvenido al Sitio ${NombreCompleto}`);
}

/* Ejemplo Registro */

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
userRegistry(userName);

/* Ejemplo Carrito */

function menu(){
  let carritoOperacion = prompt("Ingrese los productos que desea agregar: \n 1 - Velas \n 2 - Difusores \n 3 - Perfuminas \n 4 - CheckOut \n 5 - Salir");
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
        checkOut();
        break;
      case "5":
        alert("Gracias por utilizar la plataforma");
        break;
      default:
        alert("Ingrese una opcion de la lista");
        menu();
    }
  }

function candle(){
  candlePurchase = parseInt(prompt(`Ingrese cantidad a comprar, precio unidad: $ ${candProd01Price}`));
  if(candlePurchase === 0 ){
    alert("No se ha seleccionado ninguna cantidad");
    menu();
  }
  else{
    if (candlePurchase <= candProd01Stock){
      candProd01Stock -= candlePurchase; // reduzco cantidad a comprar del stock
      totalAmountProd += candlePurchase; // agrego la cantidad de productos totales
      montoVelas = candlePurchase * candProd01Price;
      alert(`Gracias por comprar ${candlePurchase} Velas`);
      menu();
    }
    else{
      alert(`No hay suficiente stock para la compra ingrese un valor menor o igual a ${candProd01Stock}`);
      menu();    
    }
  }
}

function difusor(){
  diffPurchase = parseInt(prompt(`Ingrese cantidad a comprar, precio unidad: $ ${diffProd01Price}`));
  if(diffPurchase === 0 ){
    alert("No se ha seleccionado ninguna cantidad");
    menu();
  }
  else{
    if (diffPurchase <= diffProd01Stock){
      diffProd01Stock -= diffPurchase; // reduzco cantidad a comprar del stock
      totalAmountProd += diffPurchase; // agrego la cantidad de productos totales
      montoDifu = diffPurchase * diffProd01Price;
      alert(`Gracias por comprar ${diffPurchase} Difusores`);
      menu();
    }
    else{
      alert(`No hay suficiente stock para la compra ingrese un valor menor o igual a ${diffProd01Stock}`);
      menu();    
    }
  }
}

function perfumina(){
  perfPurchase = parseInt(prompt(`Ingrese cantidad a comprar, precio unidad: $ ${perfProd01Price}`));
  if(perfPurchase === 0 ){
    alert("No se ha seleccionado ninguna cantidad");
    menu();
  }
  else{
    if (perfPurchase <= perfProd01Stock){
      perfProd01Stock -= perfPurchase; // reduzco cantidad a comprar del stock
      totalAmountProd += perfPurchase; // agrego la cantidad de productos totales
      montoPerfu = perfPurchase * perfProd01Price;
      alert(`Gracias por comprar ${perfPurchase} Perfuminas`);
      menu();
    }
    else{
      alert(`No hay suficiente stock para la compra ingrese un valor menor o igual a ${perfProd01Stock}`);
      menu();    
    }
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

menu();