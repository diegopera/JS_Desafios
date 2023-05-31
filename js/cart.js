mainProdCartShow = document.getElementById("main-prod-cart");
mainInfoCartShow = document.getElementById("main-cart-info");
mainInfoQtyShow = document.getElementById("cartQtyText");
btnPaymentShow = document.getElementById("btnPayment");

const loginStatus = sessionStorage.getItem("loginSucc");
if (loginStatus) {
  username = sessionStorage.getItem("username")
  const loginName = document.getElementById("loginRegister").innerText = `${username}`;
};

function payment() {
  cartCheckoutStorage = localStorage.getItem("cart");
  cartCheckout = JSON.parse(cartCheckoutStorage);
  mainInfoQtyShow.innerText = cartCheckout.length;
  const totalAmount = cartCheckout.reduce((acum, item) => acum + item.cartTotal, 0);
  btnPaymentShow.innerText = `Continuar con el Pago - Total $${totalAmount}`;
  cartCheckout.forEach((item) => {
    let divMainCart = document.createElement("div");
    divMainCart.classList.add("row", "carrito-item");
    divMainCart.innerHTML += `
          <div class="col">
              <p>${item.cartProdName} x <b>${item.cartProdQty}</b> Total: </p>
          </div>
          <div class="col">
              <div class="input-group mb-2">
                  <span class="input-group-text">$</span>
                  <input type="text" class="form-control" aria-label="Amount" value="${item.cartTotal}">
              </div>
          </div> 
          `;
    mainProdCartShow.appendChild(divMainCart);
  });
};

payment();