import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {Config} from '../../class/config';
import {Account} from '../../class/account';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['../page/page.component.sass', './page-dashboard.component.sass']
})
export class PageDashboardComponent implements OnInit, DoCheck {
  account: Account;

  @ViewChild('formInfos') formInfos;
  @ViewChild('formAddress') formAddress;
  formDataInfos;
  formDataAddress;

  messageSuccess: string;
  messageError: string;
  messageHint: string;

  constructor(private serviceAccount: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (!this.account) {
      this.serviceAccount.getAccount().subscribe(account => {
        if (account) {
          this.account = account;
          this.formDataInfos = [
            {
              name: 'lastName',
              icon: 'person',
              type: 'text',
              label: 'Nom',
              value: account.lastName,
              readonly: true
            },
            {
              name: 'firstName',
              icon: 'person',
              type: 'text',
              label: 'Prénom',
              value: account.firstName,
              readonly: true
            },
            {
              name: 'society',
              icon: 'business',
              type: 'text',
              label: 'Société',
              value: account.society,
              readonly: true
            },
            {
              name: 'siret',
              icon: 'business',
              type: 'text',
              label: 'SIRET',
              value: account.siret,
              readonly: true
            },
            {
              name: 'email',
              type: 'email',
              label: 'Adresse mail',
              value: account.email,
              readonly: true
            },
            {
              name: 'phone',
              icon: 'phone',
              type: 'text',
              label: 'Téléphone',
              value: account.phone,
              readonly: true
            },
            {
              name: 'mobile',
              icon: 'smartphone',
              type: 'text',
              label: 'Mobile',
              value: account.mobile,
              readonly: true
            }
          ];
          this.formDataAddress = [
            {
              name: 'country',
              icon: 'home',
              type: 'text',
              label: 'Pays',
              value: account.country,
              readonly: true
            },
            {
              name: 'postal',
              icon: 'home',
              type: 'text',
              label: 'Code postal',
              value: account.postal,
              readonly: true
            },
            {
              name: 'city',
              icon: 'home',
              type: 'text',
              label: 'Ville',
              value: account.city,
              readonly: true
            },
            {
              name: 'address',
              icon: 'home',
              type: 'text',
              label: 'Adresse',
              value: account.address,
              readonly: true
            },
            {
              name: 'addressComp',
              icon: 'home',
              type: 'text',
              label: 'Complément d\'adresse',
              value: account.addressComp,
              readonly: true
            },
            ];
        }
      });
    }
  }

  onClickEditInfos($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD_EDIT_INFOS]);
  }

  onClickEditAddress($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD_EDIT_ADDRESS]);
  }

  onClickEditPassword($event: MouseEvent): void {
    this.router.navigate([Config.ROUTE_DASHBOARD_EDIT_PASSWORD]);
  }

  getAccountDisplayName(account: Account): string {
    if (account.firstName && account.lastName) {
      return account.lastName + ' ' + account.firstName;
    }
  }
}
