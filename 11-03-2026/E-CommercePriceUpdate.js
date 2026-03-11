function applyDiscount(prices) {
    return prices.map(price => price * 0.9);
}

function main() {
    const prices = [1200, 800, 1500, 2000];
    const discountedPrices = applyDiscount(prices);
    console.log(discountedPrices);
}

main();