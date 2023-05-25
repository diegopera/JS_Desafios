let carrito = [];

const productos = [
    { id: 0, prodName: "Vela 01", prodPrice: 1500, category: "velas", prodStock: 100 },
    { id: 1, prodName: "Perfumina 01", prodPrice: 2000, category: "perfuminas", prodStock: 100 },
    { id: 2, prodName: "Accesorio 01", prodPrice: 700, category: "accesorios", prodStock: 100 },
    { id: 3, prodName: "Difusor 01", prodPrice: 850, category: "difusores", prodStock: 100 },
    { id: 4, prodName: "Vela 02", prodPrice: 1300, category: "velas", prodStock: 100 },
];

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
      const addToCart = new AddCart(item.id, item.prodName, item.prodPrice, qtySel, cartTotal);
      carrito.push(addToCart);
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
   const totalAmount = cartCheckout.reduce((acum, item) => acum + item.cartTotal, 0);
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