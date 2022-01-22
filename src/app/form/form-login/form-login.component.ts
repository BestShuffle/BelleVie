import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {SnackbarService} from '../../service/snackbar.service';
import {DialogService} from '../../service/dialog.service';
import {Config} from '../../class/config';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['../form/form.component.sass', './form-login.component.sass']
})
export class FormLoginComponent implements OnInit, AfterViewInit {

  loginFormData = [
    {
      name: 'id',
      label: 'Adresse mail',
      icon: 'person',
      type: 'text',
      required: true
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      required: true
    },
    {
      name: 'buttonForget',
      value: 'Mot de passe oublié',
      routerLink: '/' + Config.ROUTE_FORGET_PASSWORD,
      type: 'button',
      transparent: true,
      small: true
    },
    {
      name: 'buttonRegister',
      value: 'S\'inscrire',
      routerLink: '/' + Config.ROUTE_REGISTER,
      type: 'button',
      transparent: true,
      small: true
    },
    {
      name: 'buttonLogin',
      value: 'Se connecter',
      type: 'submit',
      fullWidth: true,
      transparent: true,
      required: true
    }
  ];

  @ViewChild('form') form;

  messageError: string;
  return = '';

  constructor(private serviceAccount: AccountService,
              private serviceDialog: DialogService,
              private serviceSnackbar: SnackbarService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.return) {
        this.return = params.return;
      } else if (!this.return && this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path === Config.ROUTE_LOGIN) {
        this.return = Config.ROUTE_HOME;
      }
    });
  }

  ngAfterViewInit(): void {
    this.form.getSubmitDatas().subscribe(submitDatas => {
      if (submitDatas !== undefined && submitDatas.valid) {
        const values = submitDatas.value;
        const id = values.id;
        const password = values.password;

        this.serviceAccount.login(id, password, res => {
          // Connexion réussie
          this.serviceSnackbar.openSnackBar(res.message);
          this.serviceDialog.closeDialog();
          this.messageError = undefined;
          this.serviceAccount.loadAccountInfos();
          if (this.return.length > 0) {
            console.log('return : ' + this.return);
            this.router.navigate([this.return]);
          }
        }, res => {
          if (res.status === 403) {
            this.serviceSnackbar.openSnackBar(res.error.message);
          }
        });
      }
    });
  }
}
