function filterOrders(orders) {
    return orders.filter(order => order > 1000);
}

function main() {
    const orders = [450, 1200, 700, 3000, 1500];
    const result = filterOrders(orders);
    console.log(result);
}

main();