const hostIp = 'https://localhost';
const portN = '7147';
// const hostIp = '172.20.1.225';
// const portN = '5005';

export const ApiUrls = {
  products: {
    getProductsCount: `${hostIp}:${portN}/api/Product/GetCount`,
    getTotalProductsForSpecificCategory: `${hostIp}:${portN}/api/Product/GetByCategoryCount`,
    getPaginatedProducts: `${hostIp}:${portN}/api/Product/GetPaginated`,
    getFourProductOfEachCategory: `${hostIp}:${portN}/api/Product/GetFourOfAllCategories`,
    getPaginatedProductNames: `${hostIp}:${portN}/api/Product/GetNames`,
    getPaginatedProductsByCategory: `${hostIp}:${portN}/api/Product/GetByCategoryId`,
    getProductById: `${hostIp}:${portN}/api/Product/GetbyId`,
    getPaginatedProductsThatMatchName: `${hostIp}:${portN}/api/Product/GetThatMatchName`,
  },
  reviews: {
    getCount: `${hostIp}:${portN}/api/Review/GetCount`,
    getPaginatedReviews: `${hostIp}:${portN}/api/Review/GetPaginated`,
    getTopByProductId: `${hostIp}:${portN}/api/Review/GetTopByProductId`,
  },
  auth: {
    getNewAccessToken: `${hostIp}:${portN}/api/User/get-new-access-token`,
    login: `${hostIp}:${portN}/api/User/login`,
  },
};
