import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Collection} from '../../class/collection';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../class/product';
import {Config} from '../../class/config';
import {NavbarService} from '../../service/navbar.service';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.sass']
})
export class PageCategoryComponent implements OnInit {

  collection: Collection;
  id: number;
  innerWidth: number;
  cols: number;
  isSidebarHidden: boolean;
  rowHeight: string;

  constructor(private serviceProduct: ProductService,
              private serviceNavbar: NavbarService,
              private serviceCart: CartService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  checkSize(width): void {
    if (width <= 600) {
      this.cols = 1;
      this.rowHeight = '550px';
      this.isSidebarHidden = true;
    } else if (width <= 800) {
      this.cols = 1;
      this.rowHeight = '650px';
      this.isSidebarHidden = true;
    } else if (width <= 1050) {
      this.cols = 1;
      this.rowHeight = '900px';
      this.isSidebarHidden = true;
    } else {
      this.cols = 3;
      this.rowHeight = '380px';
      this.isSidebarHidden = false;
    }
  }

  onResize(event): void {
    this.checkSize(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.checkSize(this.innerWidth);
    this.serviceNavbar.setNavbarTransparent(true);
    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.serviceProduct.getCategories(this.id, (collection: Collection) => {
          if (collection) {
            this.collection = collection;
            this.serviceProduct.getCollectionPicture(this.collection);
            this.collection.products.forEach(product => {
              this.serviceProduct.getProductPicture(product);
            });
          }
        });
      }
    });
  }

  onClickProduct(product: Product): void {
    this.router.navigate([Config.ROUTE_PRODUCT.replace(':id', String(product.id))]);
  }

  onClickAddToCart($event: MouseEvent, product: Product): void {
    if (!product.quantity) {
      product.quantity = 1;
    }
    if (product.quantity <= 0) {
      return;
    }
    this.serviceCart.addToCart(product, product.quantity);
  }

  onValueChange(newValue: number, product: Product): void {
    product.quantity = newValue;
  }
}
