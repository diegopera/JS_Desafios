let carrito = [];

const productos = [
  { id: 0, prodName: "Vela Concha", prodPrice: 1500, category: "velas", prodStock: 100 },
  { id: 1, prodName: "Vela Cubo", prodPrice: 2000, category: "velas", prodStock: 100 },
  { id: 2, prodName: "Corta Pabilo", prodPrice: 700, category: "accesorios", prodStock: 100 },
  { id: 3, prodName: "Apaga Velas", prodPrice: 850, category: "accesorios", prodStock: 100 },
  { id: 4, prodName: "Maxi Vela", prodPrice: 1300, category: "velas", prodStock: 100 },
];

const loginStatus = sessionStorage.getItem("loginSucc");
if (loginStatus) {
  username = sessionStorage.getItem("username")
  document.getElementById("loginRegister").innerText = `${username}`;
}

const cartExist = localStorage.getItem("cart");
if (cartExist) {
  carrito = JSON.parse(cartExist);
  btnShowCart.innerText = carrito.length + " Items";
}

listarProductos();
