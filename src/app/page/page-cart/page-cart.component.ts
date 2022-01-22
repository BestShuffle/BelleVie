import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CartLine} from '../../class/cart-line';
import {Product} from '../../class/product';
import {Router} from '@angular/router';
import {Config} from '../../class/config';
import {AccountService} from '../../service/account.service';
import {MatHorizontalStepper, MatStepper} from '@angular/material/stepper';
import {Account} from '../../class/account';
import {FormLoginComponent} from '../../form/form-login/form-login.component';
import {DialogService} from '../../service/dialog.service';
import {MatRadioChange} from '@angular/material/radio';
import {MatCheckbox} from '@angular/material/checkbox';
import {SnackbarService} from '../../service/snackbar.service';
import {MatInput} from '@angular/material/input';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.sass']
})
export class PageCartComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'photo', 'article', 'quantity', 'total'];

  @ViewChild('pdfContainer', {static: false}) pdf: ElementRef;

  cart: Map<number, CartLine>;
  cartLines: CartLine[];
  subtotal: number;
  total: number;
  account: Account;
  innerWidth: number;
  labelPanier: string;
  labelLivraison: string;
  labelPaiement: string;
  labelConfirmation: string;

  @ViewChild('checkboxCGV') checkboxCGV: MatCheckbox;

  @ViewChild('cardOwner') cardOwner: MatInput;
  @ViewChild('cardNumber') cardNumber: MatInput;
  @ViewChild('cardExpireDate') cardExpireDate: MatInput;
  @ViewChild('cardCrypto') cardCrypto: MatInput;

  paymentChoice: string;
  today: string;

  constructor(private serviceCart: CartService,
              private serviceAccount: AccountService,
              private serviceDialog: DialogService,
              private serviceSnackbar: SnackbarService,
              private router: Router) {
  }
  checkSize(width): void {
    if (width <= 600) {
      this.labelPanier = '';
      this.labelLivraison = '';
      this.labelPaiement = '';
      this.labelConfirmation = '';
    } else {
      this.labelPanier = 'Panier';
      this.labelLivraison = 'Livraison';
      this.labelPaiement = 'Paiement';
      this.labelConfirmation = 'Confirmation';
    }
  }

  onResize(event): void {
    this.checkSize(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.today = this.formatDate(Date.now());
    this.innerWidth = window.innerWidth;
    this.checkSize(this.innerWidth);
    this.calcTotal();
    this.serviceCart.getCart().subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.cartLines = Array.from(this.cart.values());
        this.calcTotal();
      }
    });
    this.serviceAccount.getAccount().subscribe((account: Account) => {
      if (account) {
        this.account = account;
      }
    });
  }

  formatDate(date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }

  onDelete(product: Product, qte: number): void {
    this.serviceCart.removeFromCart(product, qte);
  }

  onClickOpenProduct(product: Product): void {
    this.router.navigate([Config.ROUTE_PRODUCT.replace(':id', String(product.id))]);
  }

  onQuantityChange(newQuantity: number, product: Product, qte: number): void {
    if (newQuantity === 0) {
      this.serviceCart.removeFromCart(product, qte);
    } else if (newQuantity > qte) {
      this.serviceCart.addToCart(product, 1);
    } else {
      this.serviceCart.removeFromCart(product, 1);
    }
  }

  onClickConfirmCart(stepper: MatStepper): void {
    if (this.serviceAccount.isLoggedIn()) {
      if (this.cartLines.length > 0) {
        stepper.next();
      } else {
      }
    } else {
      this.serviceDialog.openDialog(FormLoginComponent, {
        width: '350px'
      });
    }
  }

  onClickEditAddress(): void {
    this.router.navigate([Config.ROUTE_DASHBOARD]);
  }

  onClickConfirmAddress(stepper: MatStepper): void {
    if (this.isAddressOk()) {
      stepper.next();
    }
  }

  onClickConfirmPayment(stepper: MatHorizontalStepper): void {
    if (this.isPaymentFormOk()) {
      stepper.next();
    }
  }

  onClickBack(stepper: MatStepper): void {
    stepper.previous();
  }

  onPaymentSelect(change: MatRadioChange): void {
    this.paymentChoice = change.value;
  }

  getPhone(): string {
    if (this.account.phone) {
      return this.account.phone;
    } else if (this.account.mobile) {
      return this.account.mobile;
    } else {
      return '';
    }
  }

  isAddressOk(): boolean {
    if (this.account) {
      return !!(this.account.address && this.account.city && this.account.postal);
    } else {
      return false;
    }
  }

  private calcTotal(): void {
    if (this.cartLines) {
      let tot = 0;
      let i = 0;
      this.cartLines.forEach(cartLine => {
        i++;
        tot += (cartLine.product.price * cartLine.qte);
        if (i === this.cartLines.length) {
          this.subtotal = tot;
          this.total = tot;
        }
      });
    } else {
      this.subtotal = 0;
      this.total = 0;
    }
  }

  private isPaymentFormOk(): boolean {
    if (this.paymentChoice) {
      if (this.paymentChoice === 'cb') {
        if (this.cardOwner.value && this.cardNumber.value && this.cardExpireDate.value && this.cardCrypto.value) {
        } else {
          this.serviceSnackbar.openSnackBar(`<span class="red">Veuillez remplir entièremenet le formulaire de saisie de carte bancaire</span>`);
          return false;
        }
      } else {
      }
    } else {
      this.serviceSnackbar.openSnackBar(`<span class="red">Vous devez sélectionner un moyen de paiement</span>`);
      return false;
    }
    if (!this.checkboxCGV.checked) {
      this.serviceSnackbar.openSnackBar(`<span class="red">Vous devez accepter les conditions générales de ventes afin de valider votre commande</span>`);
      return false;
    }
    return true;
  }

  public downloadAsPDF(): void {
    const dataContainer = document.getElementById('pdfContainer');
    // dataContainer.classList.remove('transparent');
    html2canvas(dataContainer).then(canvas => {
      // Few necessary setting options
      const imgWidth = 300;
      // const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      // const heightLeft = imgHeight;


      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const x = 10;
      const y = 10;
      pdf.addImage(contentDataURL, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('facture.pdf'); // Generated PDF
      // dataContainer.classList.add('transparent');
    });
  }
}
