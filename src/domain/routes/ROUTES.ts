const URLs = {
    'allPromotionsURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
    'newCustomersURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
    'allCustomersURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
}

export const ROUTES = {
    getAllPromotionsRoute() {
        return `${URLs.allPromotionsURL}`;
    },
    getNewCustomersRoute() {
        return `${URLs.newCustomersURL}`;
    },
    getAllCustomersRoute() {
        return`${URLs.allCustomersURL}`;
    },
}