// OLD TP5
// export const environment = {
//     production: false,
//     backendClient: '/assets/mock/products.json'
// };

// NEW TP6
// export const environment = {
//     production: false,
//     backendClient: '/assets/mock/products.json',
//     backendLoginClient: 'https://nodejssansbdd.onrender.com/api/utilisateur/login',
//     backendCatalogue: 'https://nodejssansbdd.onrender.com/api/catalogue',
// };

export const environment = {
    production: false,
    // backendClient: '/assets/mock/products.json',
    backendLoginClient: 'http://localhost:443/api/utilisateur/login',
    // backendRegisterClient: 'http://localhost:443/api/utilisateur/register',
    // backendUpdateClient: 'http://localhost:443/api/utilisateur/update',
    backendCatalogue: 'http://localhost:443/api/catalogue'
  };
