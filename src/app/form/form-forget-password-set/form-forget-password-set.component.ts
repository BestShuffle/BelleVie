import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../../service/snackbar.service';
import {Config} from '../../class/config';

@Component({
  selector: 'app-form-forget-password-set',
  templateUrl: './form-forget-password-set.component.html',
  styleUrls: ['../form/form.component.sass', './form-forget-password-set.component.sass']
})
export class FormForgetPasswordSetComponent implements OnInit, AfterViewInit {

  formData = [
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
      name: 'buttonUpdate',
      value: 'Mettre à jour le mot de passe',
      type: 'submit',
      fullWidth: true,
      transparent: true,
      required: true
    }
  ];

  @ViewChild('form') form;

  messageError: string;
  messageSuccess: string;
  return = '';

  constructor(private serviceAccount: AccountService,
              private router: Router,
              private serviceSnackbar: SnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.getSubmitDatas().subscribe(submitDatas => {
      if (submitDatas !== undefined && submitDatas.valid) {
        const values = submitDatas.value;
        const password = values.password;
        const token = this.route.snapshot.paramMap.get('token');

        this.serviceAccount.resetPassword(token, password, (res) => {
          // Connexion réussie
          this.serviceSnackbar.openSnackBar(res.message);
          this.router.navigate([Config.ROUTE_LOGIN]);
        }, (error) => {
          if (error && error.error && error.error.message) {
            this.serviceSnackbar.openSnackBar(error.error.message);
          }
        });
      }
    });
  }
}
