import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Config} from '../class/config';
import {Collection} from '../class/collection';
import {Product} from '../class/product';
import {NavbarService} from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private listCategoriesSource = new BehaviorSubject<any>(undefined);
  public listCategories: any = this.listCategoriesSource.asObservable();

  private pictures: [][];

  constructor(private http: HttpClient,
              private serviceNavbar: NavbarService) {
  }

  loadListCategories(): void {
    this.http.get(Config.URL_CATEGORIES).subscribe((list: Collection[]) => {
      if (list) {
        this.setListCategories(list);
      }
    });
  }

  getCategories(id, next: (collection: Collection) => void): void {
    this.http.get(Config.URL_CATEGORY.replace(':id', String(id))).subscribe((collection: Collection) => {
      next(collection);
    });
  }

  getProduct(id: string, next: (product: Product) => void): void {
    this.http.get(Config.URL_PRODUCT.replace(':id', String(id))).subscribe((product: Product) => {
      next(product);
    });
  }

  getListCategories(): any {
    return this.listCategoriesSource.asObservable();
  }

  setListCategories(listCategories: any): void {
    this.listCategoriesSource.next(listCategories);
  }

  getCategorySliderLink(collection: Collection, next): void {
    this.http.get(Config.URL_PICTURES_CATEGORY.replace(':id', String(collection.id))).subscribe((img: any) => {
      next(img.data);
    });
  }

  getProductPictureLink(product: Product, next): void {
    this.http.get(Config.URL_PICTURES_PRODUCT.replace(':ref', String(product.ref))).subscribe((img: any) => {
      next(img.data);
    });
  }

  getCollectionPicture(collection: Collection): void {
    this.getCategorySliderLink(collection, (data) => {
      collection.picture = data;
    });
  }

  getProductPicture(product: Product): void {
    this.getProductPictureLink(product, (data) => {
      product.picture = data;
    });
  }
}
