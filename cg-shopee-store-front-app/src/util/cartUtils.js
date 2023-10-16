export const groupCartLinesByShopName = (cartLines) => {
    const groupedCartLines = {};
    cartLines.forEach((cartLine) => {
        if (groupedCartLines[cartLine.shopName]) {
            groupedCartLines[cartLine.shopName].push(cartLine);
        } else {
            groupedCartLines[cartLine.shopName] = [cartLine];
        }
    });
    return groupedCartLines;
}

export const groupCartLinesByShopNameAndSubtotal = (cartLineSelected) => {
    const groupedCartLines = {};
    if (cartLineSelected) {
        cartLineSelected.forEach((cartLine) => {
            const shopName = cartLine.shopName;
            if (!groupedCartLines[shopName]) {
                groupedCartLines[shopName] = {
                    cartLines: [cartLine],
                    subTotal: cartLine.salePrice * cartLine.quantity,
                };
            } else {
                groupedCartLines[shopName].cartLines.push(cartLine);
                groupedCartLines[shopName].subTotal += cartLine.salePrice * cartLine.quantity;
            }
        });
    }
    return groupedCartLines;
};