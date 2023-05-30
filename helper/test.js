let carrito = [
    { idProd: 0, cartProdName: "Vela Concha", cartProdPrice: 1500, cartProdQty: 10, cartTotal: 0 },
    { idProd: 1, cartProdName: "Vela Cubo", cartProdPrice: 2000, cartProdQty: 0, cartTotal: 0 },
];

let prodID = 1;
let prodQtySel = 10;

const cartFind = carrito.some((cartItem) => cartItem.idProd === prodID);
console.log(cartFind);
if (cartFind) {
    let cartExist = carrito.map((productItem) => {
        if (productItem.idProd === prodID) {
            productItem.cartProdQty += prodQtySel;
            console.log(productItem.cartProdPrice);
            console.log(productItem.cartProdQty);
            productItem.cartTotal = productItem.cartProdPrice * productItem.cartProdQty;
            return productItem;
        } else {
            return productItem;
        }
    });
    carrito = cartExist;
    console.log(carrito);
};
// console.log(carrito);
    // const cartTotal = prodSelPrice * prodQtySel;
    // console.log(cartTotal);
    // const addToCart = new AddCart(prodID, prodSelName, prodSelPrice, prodQtySel, cartTotal);
    // carrito.push(addToCart);