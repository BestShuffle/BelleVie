import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../class/account';
import {AccountService} from '../../service/account.service';
import {SnackbarService} from '../../service/snackbar.service';
import {Router} from '@angular/router';
import {Config} from '../../class/config';

@Component({
  selector: 'app-page-dashboard-edit-address',
  templateUrl: './page-dashboard-edit-address.component.html',
  styleUrls: ['../../form/form/form.component.sass', '../page/page.component.sass', './page-dashboard-edit-address.component.sass']
})
export class PageDashboardEditAddressComponent implements OnInit, DoCheck {
  account: Account;

  @ViewChild('form') form;

  formData;

  messageSuccess: string;
  messageError: string;
  messageHint: string;

  constructor(private serviceAccount: AccountService,
              private serviceSnackbar: SnackbarService,
              private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (!this.account) {
      this.serviceAccount.getAccount().subscribe(account => {
        if (account) {
          this.account = account;
          this.formData = [
            {
              name: 'country',
              icon: 'home',
              type: 'text',
              label: 'Pays',
              value: account.country,
              required: true,
            },
            {
              name: 'postal',
              icon: 'home',
              type: 'text',
              label: 'Code postal',
              value: account.postal,
              required: true,
            },
            {
              name: 'city',
              icon: 'home',
              type: 'text',
              label: 'Ville',
              value: account.city,
              required: true,
            },
            {
              name: 'address',
              icon: 'home',
              type: 'text',
              label: 'Adresse',
              value: account.address,
              required: true,
            },
            {
              name: 'addressComp',
              icon: 'home',
              type: 'text',
              label: 'Complément d\'adresse',
              value: account.addressComp,
              // required: true,
            },
            {
              required: true,
              name: 'password',
              type: 'password',
              label: 'Mot de passe',
            },
            {
              name: 'buttonSubmit',
              value: 'Mettre à jour',
              type: 'submit',
              fullWidth: true
            }
          ];
        }
      });
    }
    if (this.form && !this.form.initiated) {
      this.form.initiated = true;
      this.form.getSubmitDatas().subscribe(submitData => {
        if (submitData !== undefined && submitData.valid) {
          const values = submitData.value;

          const account = new Account();
          account.id = this.account.id;
          account.lastName = this.account.lastName;
          account.firstName = this.account.firstName;
          account.email = this.account.email;
          account.phone = this.account.phone;
          account.mobile = this.account.mobile;
          account.society = this.account.society;
          account.password = values.password;
          account.country = values.country;
          account.postal = values.postal;
          account.city = values.city;
          account.address = values.address;
          account.addressComp = values.addressComp;

          this.serviceAccount.updateAccount(account, res => {
            this.messageHint = undefined;
            this.messageError = undefined;
            // this.messageSuccess = res.messageSuccess;
            this.serviceSnackbar.openSnackBar(res.message);
            this.serviceAccount.loadAccountInfos();
            this.router.navigate([Config.ROUTE_DASHBOARD]);
          }, err => {
            if (err && err.error) {
              this.messageSuccess = undefined;
              this.messageHint = undefined;
              // this.messageError = err.error.messageError;
              this.serviceSnackbar.openSnackBar(err.error.message);
            }
          });
        }
      }, err => {
        console.log(err);
      }, () => {
      });
    }
  }

  onClickBack($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD]);
  }
}
