
export const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

export const getToken = () => {
    const user = getUser();
    if (user) {
        return user.token;
    }
    return null;
}

export const getUserId = () => {
    const user = getUser();
    if (user) {
        return user.userId;
    }
    return null;
}

export const getSellerId = () => {
    const user = getUser();
    if (user && user.seller) {
        return user.seller.id;
    }
    return null;
}

export const getImageStore = () => {
    const user = getUser();
    if (user && user.seller) {
        return user.seller.image;
    }
    return null;
}

export const getNameStore = () => {
    const user = getUser();
    if (user && user.seller) {
        return user.seller.name;
    }
    return null;
}

export const getCartId = () => {
    const user = getUser();
    if (user) {
        return user.cartId;
    }
    return null;
}

export const getUsername = () => {
    const user = getUser();
    if (user) {
        return user.username;
    }
    return null;
}

export const getFullName = () => {
    const user = getUser();
    if (user) {
        return user.fullName;
    }
    return null;
}


export const getAvatar = () => {
    const user = getUser();
    if (user) {
        return user.avatar;
    }
    return null;
}

export const getEmail = () => {
    const user = getUser();
    if (user) {
        return user.email;
    }
    return null;
}

