import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../class/config';
import {SnackbarService} from '../../service/snackbar.service';

@Component({
  selector: 'app-form-forget-password',
  templateUrl: './form-forget-password.component.html',
  styleUrls: ['../form/form.component.sass', './form-forget-password.component.sass']
})
export class FormForgetPasswordComponent implements OnInit, AfterViewInit {

  formData = [
    {
      name: 'email',
      label: 'Adresse mail',
      icon: 'email',
      type: 'email',
      required: true
    },
    {
      name: 'buttonForget',
      value: 'Récupérer le mot de passe',
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
              private serviceSnackbar: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.getSubmitDatas().subscribe(submitDatas => {
      if (submitDatas !== undefined && submitDatas.valid) {
        const values = submitDatas.value;

        this.serviceAccount.forgetPassword(values.email, (res) => {
          // Connexion réussie
          this.serviceSnackbar.openSnackBar(res.message);
        }, (error) => {
          if (error && error.error && error.error.message) {
            this.serviceSnackbar.openSnackBar(error.error.message);
          }
        });
      }
    });
  }

  onClickBack(): void {
    // this.router.navigateByUrl(Config.ROUTE_LOGIN);
  }
}
