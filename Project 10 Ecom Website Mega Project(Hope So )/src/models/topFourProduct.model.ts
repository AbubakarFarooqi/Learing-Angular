import { Product } from './product.model';

export interface TopFourProducts {
  categoryId: string;
  categoryName: string;
  value: Product[];
}
