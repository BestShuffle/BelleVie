import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Config} from './class/config';
import {ProductService} from './service/product.service';
import {Collection} from './class/collection';
import {NavbarService} from './service/navbar.service';
import {DialogService} from './service/dialog.service';
import {FormLoginComponent} from './form/form-login/form-login.component';
import {CartService} from './service/cart.service';
import {AccountService} from './service/account.service';
import {SnackbarService} from './service/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Belle-Vie';
  collections: Collection[];
  isNavbarTransparent: boolean;
  cart: [];
  cartSize: number;

  constructor(
    public serviceAccount: AccountService,
    private serviceProduct: ProductService,
    private serviceNavbar: NavbarService,
    private serviceDialog: DialogService,
    private serviceCart: CartService,
    private serviceSnackbar: SnackbarService,
    // private serviceAuthGuard: AuthGuardService,
    // private route: ActivatedRoute,
    private router: Router) {
  }

  ngAfterViewInit(): void {
    const elem = document.getElementById('chatbot');
    console.log(elem);

  }

  ngOnInit(): void {
    this.serviceAccount.loadAccountInfos();
    this.serviceCart.updateCartFromStorage();
    this.serviceCart.getCart().subscribe((cart: []) => {
      if (cart) {
        this.cart = cart;
      }
    });
    this.serviceCart.getCartSize().subscribe((cartSize: number) => {
      if (cartSize) {
        this.cartSize = cartSize;
      }
    });
    this.serviceNavbar.isNavbarTransparent().subscribe(isNavbarTransparent => {
      if (isNavbarTransparent !== undefined) {
        this.isNavbarTransparent = isNavbarTransparent;
      }
    });
    this.serviceProduct.loadListCategories();
    this.serviceProduct.getListCategories().subscribe((list: Collection[]) => {
      if (list) {
        this.collections = list;
      }
    });
  }

  onClickHome($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_HOME]);
  }

  onClickCollection(collection: Collection): void {
    this.router.navigate([Config.ROUTE_CATEGORY.replace(':id', String(collection.id))]);
  }

  onClickLogin($event: MouseEvent): void {
    this.serviceDialog.openDialog(FormLoginComponent, {
      width: '350px'
    });
  }

  onClickCart($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_CART]);
  }

  onClickDashboard($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD]);
  }

  onClickLogout(): void {
    this.serviceAccount.logout();
    this.serviceSnackbar.openSnackBar(`<span class="green">Vous êtes déconnecté</span>`);
    this.router.navigate(['']);
    // this.serviceAuthGuard.canActivate(
    //   this.route.snapshot,
    //   this.router.routerState.snapshot
    // );
  }

  onClickAbout($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_ABOUT]);
  }

  onClickCGV($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_CGV]);
  }

  onClickContactUs($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_CONTACT_US]);
  }
}
