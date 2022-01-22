import {Component, OnInit} from '@angular/core';
import {Product} from '../../class/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['../page/page.component.sass', './page-product.component.sass']
})
export class PageProductComponent implements OnInit {
  quantity: number;

  product: Product;

  constructor(private serviceProduct: ProductService,
              private serviceCart: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.quantity = 1;
    this.serviceProduct.getProduct(this.route.snapshot.paramMap.get('id'), (product: Product) => {
      if (product) {
        this.product = product;
        this.serviceProduct.getProductPicture(product);
      }
    });
  }

  onClickAddToCart($event: MouseEvent): void {
    this.serviceCart.addToCart(this.product, this.quantity);
  }

  onValueChange(newValue: number): void {
    this.quantity = newValue;
  }
}
