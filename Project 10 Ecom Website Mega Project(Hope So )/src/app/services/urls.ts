// const hostIp = "localhost"
// const portN = "7147"
const hostIp = '172.20.1.225';
const portN = '5005';

export const ApiUrls = {
  products: {
    getProductsCount: `http://${hostIp}:${portN}/api/Product/GetCount`,
    getTotalProductsForSpecificCategory: `http://${hostIp}:${portN}/api/Product/GetByCategoryCount`,
    getPaginatedProducts: `http://${hostIp}:${portN}/api/Product/GetPaginated`,
    getFourProductOfEachCategory: `http://${hostIp}:${portN}/api/Product/GetFourOfAllCategories`,
    getPaginatedProductNames: `http://${hostIp}:${portN}/api/Product/GetNames`,
    getPaginatedProductsByCategory: `http://${hostIp}:${portN}/api/Product/GetByCategoryId`,
    getProductById: `http://${hostIp}:${portN}/api/Product/GetbyId`,
    getPaginatedProductsThatMatchName: `http://${hostIp}:${portN}/api/Product/GetThatMatchName`,
  },
  reviews: {
    getCount: `http://${hostIp}:${portN}/api/Review/GetCount`,
    getPaginatedReviews: `http://${hostIp}:${portN}/api/Review/GetPaginated`,
  },
  auth: {
    getNewAccessToken: `http://${hostIp}:${portN}/api/User/get-new-access-token`,
    login: `http://${hostIp}:${portN}/api/User/login`,
  },
};
