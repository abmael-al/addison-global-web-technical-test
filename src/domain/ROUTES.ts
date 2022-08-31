const URLs = {
    'allPromotionsURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
    'newCustomersURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
    'allCustomersURL': 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7',
}

export const ROUTES = {
    'getAllPromotionsRoute': () => `${URLs.allPromotionsURL}`,
    'getNewCustomersRoute': () => `${URLs.newCustomersURL}`,
    'getAllCustomersRoute': () => `${URLs.allCustomersURL}`,
}