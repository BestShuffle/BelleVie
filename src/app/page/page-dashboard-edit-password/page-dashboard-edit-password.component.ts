import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Account} from '../../class/account';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';
import {Config} from '../../class/config';
import {SnackbarService} from '../../service/snackbar.service';
import {NavbarService} from '../../service/navbar.service';

@Component({
  selector: 'app-page-dashboard-edit-password',
  templateUrl: './page-dashboard-edit-password.component.html',
  styleUrls: ['../../form/form/form.component.sass', '../page/page.component.sass', './page-dashboard-edit-password.component.sass']
})
export class PageDashboardEditPasswordComponent implements OnInit, DoCheck {
  @ViewChild('form') form;

  formData = [
    {
      required: true,
      name: 'oldPassword',
      type: 'password',
      label: 'Mot de passe actuel',
    },
    {
      required: true,
      name: 'password',
      type: 'password',
      label: 'Nouveau mot de passe',
    },
    {
      name: 'confirmPassword',
      label: 'Confirmation du nouveau mot de passe',
      required: true,
      type: 'password',
    },
    {
      name: 'buttonSubmit',
      value: 'Mettre à jour',
      type: 'submit',
      fullWidth: true
    }
  ];

  messageSuccess: string;
  messageError: string;
  messageHint: string;

  constructor(private serviceAccount: AccountService,
              private serviceSnackbar: SnackbarService,
              private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.form && !this.form.initiated) {
      this.form.initiated = true;
      this.form.getSubmitDatas().subscribe(submitData => {
        if (submitData !== undefined && submitData.valid) {
          const values = submitData.value;

          const oldValue = values.oldPassword;
          const newValue = values.password;

          this.serviceAccount.updateValue(Account.PASSWORD, oldValue, newValue, res => {
            this.messageHint = undefined;
            this.messageError = undefined;
            // this.messageSuccess = res.messageSuccess;
            this.serviceSnackbar.openSnackBar(res.message);
            this.router.navigate([Config.ROUTE_DASHBOARD]);
            // this.serviceAccount.loadAccountInfos();
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
