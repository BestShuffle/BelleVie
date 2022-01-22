import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../class/account';
import {AccountService} from '../../service/account.service';
import {Config} from '../../class/config';
import {Router} from '@angular/router';
import {SnackbarService} from '../../service/snackbar.service';

@Component({
  selector: 'app-page-dashboard-edit-infos',
  templateUrl: './page-dashboard-edit-infos.component.html',
  styleUrls: ['../../form/form/form.component.sass', '../page/page.component.sass', './page-dashboard-edit-infos.component.sass']
})
export class PageDashboardEditInfosComponent implements OnInit, DoCheck {
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
              name: 'lastName',
              icon: 'person',
              type: 'text',
              label: 'Nom',
              value: account.lastName,
              required: true,
            },
            {
              name: 'firstName',
              icon: 'person',
              type: 'text',
              label: 'Prénom',
              value: account.firstName,
              required: true,
            },
            {
              name: 'society',
              icon: 'business',
              type: 'text',
              label: 'Société',
              value: account.society,
            },
            {
              name: 'siret',
              icon: 'business',
              type: 'text',
              label: 'SIRET',
              value: account.siret,
            },
            {
              name: 'email',
              type: 'email',
              label: 'Adresse mail',
              value: account.email,
              required: true,
            },
            {
              name: 'confirmEmail',
              type: 'email',
              label: 'Confirmation d\'adresse mail',
              value: account.email,
              required: true,
            },
            {
              name: 'phone',
              icon: 'phone',
              type: 'text',
              label: 'Téléphone',
              value: account.phone,
            },
            {
              name: 'mobile',
              icon: 'smartphone',
              type: 'text',
              label: 'Mobile',
              value: account.mobile,
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
          account.lastName = values.lastName;
          account.firstName = values.firstName;
          account.email = values.email;
          account.phone = values.phone;
          account.mobile = values.mobile;
          account.society = values.society;
          account.password = values.password;
          account.country =  this.account.country;
          account.postal = this.account.postal;
          account.city = this.account.city;
          account.address = this.account.address;
          account.addressComp = this.account.addressComp;

          this.serviceAccount.updateAccount(account, res => {
            this.messageHint = undefined;
            this.messageError = undefined;
            this.serviceAccount.loadAccountInfos();
            // this.messageSuccess = res.messageSuccess;
            this.serviceSnackbar.openSnackBar(res.message);
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

  onClickEditPassword($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD_EDIT_PASSWORD]);
  }
}
