import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../../service/snackbar.service';
import {Config} from '../../class/config';

@Component({
  selector: 'app-page-confirm',
  templateUrl: './page-confirm.component.html',
  styleUrls: ['./page-confirm.component.sass']
})
export class PageConfirmComponent implements OnInit {
  isActivated: boolean;

  constructor(private serviceAccount: AccountService,
              private router: Router,
              private serviceSnackbar: SnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    this.serviceAccount.confirmAccount(token, (res) => {
      // Connexion réussie
      this.isActivated = true;
      this.serviceSnackbar.openSnackBar(res.message);
      this.router.navigate([Config.ROUTE_LOGIN]);
    }, (error) => {
      if (error && error.error && error.error.message) {
        this.isActivated = false;
        this.serviceSnackbar.openSnackBar(error.error.message);
      }
    });
  }
}
