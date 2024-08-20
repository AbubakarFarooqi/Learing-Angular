export interface Product {
  productID: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity?: number;
  categoryID?: number;
  imageId?: string;
  imageUrl: string;
  createdAt?: string;
  //"category": null
}
