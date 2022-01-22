import {Product} from './product';

export class Collection {
  id: number;
  label: string;
  idParent: number;
  parent: Collection;
  picture: string;
  products: Product[];
}
