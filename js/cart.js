const mainProdCartShow = document.getElementById("main-prod-cart");
const mainInfoCartShow = document.getElementById("main-cart-info");
const mainInfoQtyShow = document.getElementById("cartQtyText");
const btnPaymentShow = document.getElementById("btnPayment");

function payment() {
  cartCheckoutStorage = localStorage.getItem("cart");
  cartCheckout = JSON.parse(cartCheckoutStorage);
  mainInfoQtyShow.innerText = cartCheckout.length + " Items";
  const totalAmount = cartCheckout.reduce((acum, item) => acum + item.cartTotal, 0);
  const totaPriceARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalAmount);
  btnPaymentShow.innerText = `Continuar con el Pago - Total: ${totaPriceARS}`;
  cartCheckout.forEach((item) => {
    const totaItemARS = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(item.cartTotal);
    let divMainCart = document.createElement("div");
    divMainCart.classList.add("row", "carrito-item");
    divMainCart.innerHTML += `
          <div class="col">
              <p>${item.cartProdName} x <b>${item.cartProdQty}</b></p>
          </div>
          <div class="col">
              <div class="input-group mb-2">
                  <span class="input-group-text">Total:</span>
                  <input type="text" class="form-control" aria-label="Amount" value="${totaItemARS}">
              </div>
          </div> 
          `;
    mainProdCartShow.appendChild(divMainCart);
  });
};

payment();

btnPaymentShow.addEventListener("click", (e) => {
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
      nombre = sessionStorage.getItem("Nombre");
      Swal.fire({
        icon: 'success',
        text: `Gracias por tu compra ${nombre}!! :)`,
        confirmButtonColor: '#817575',
        background: '#f5f0eb',
      });
      localStorage.clear();
      setTimeout(() => {
      window.open("../index.html", "_self");
      }, 1500)
    }
  })();
})