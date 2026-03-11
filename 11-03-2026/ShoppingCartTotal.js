function calculateTotal(cart) {
    return cart.reduce((total, price) => total + price, 0);
}

function main() {
    const cart = [500, 1200, 800, 1500];
    const totalPrice = calculateTotal(cart);
    console.log(totalPrice);
}

main();