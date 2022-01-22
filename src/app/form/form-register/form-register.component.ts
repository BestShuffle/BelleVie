import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {SnackbarService} from '../../service/snackbar.service';
import {Router} from '@angular/router';
import {Config} from '../../class/config';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['../form/form.component.sass', './form-register.component.sass']
})
export class FormRegisterComponent implements OnInit, AfterViewInit {

  formData = [
    {
      name: 'lastName',
      label: 'Nom',
      icon: 'person',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      label: 'Prénom',
      icon: 'person',
      type: 'text',
      required: true,
    },
    {
      name: 'society',
      label: 'Société',
      icon: 'business',
      type: 'text',
      // required: true,
    }, {
      name: 'siret',
      label: 'SIRET',
      icon: 'business',
      type: 'text',
      // required: true,
    },
    // {
    //   name: 'postal',
    //   label: 'Code postal',
    //   icon: 'home',
    //   type: 'text',
    //   maxLength: 5,
    //   required: true,
    // }, {
    //   name: 'city',
    //   label: 'Ville',
    //   icon: 'home',
    //   type: 'text',
    //   required: true,
    // }, {
    //   name: 'address',
    //   label: 'Adresse',
    //   icon: 'home',
    //   type: 'text',
    //   required: true,
    // }, {
    //   name: 'addressComp',
    //   label: 'Complément d\`adresse',
    //   icon: 'home',
    //   type: 'text',
    // },
    {
      name: 'mail',
      label: 'Adresse mail',
      icon: 'email',
      type: 'email',
      required: true,
    }, {
      name: 'confirmMail',
      label: 'Confirmation d\'adresse mail',
      icon: 'email',
      type: 'email',
      required: true,
    }, {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      required: true,
    }, {
      name: 'confirmPassword',
      label: 'Confirmation du mot de passe',
      type: 'password',
      required: true,
    }, {
      name: 'phone',
      label: 'Téléphone',
      icon: 'phone',
      type: 'tel',
      // required: true,
    }, {
      name: 'mobile',
      label: 'Mobile',
      icon: 'stay_primary_portrait',
      type: 'tel',
      // required: true,
    }, {
      name: 'recaptcha',
      type: 'recaptcha',
    },
    {
      name: 'register',
      value: 'S\'inscrire',
      type: 'submit',
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

        if ((values.lastName && values.firstName) || (values.society && values.siret)) {
          this.serviceAccount.createAccount(values, (res) => {
            this.serviceSnackbar.openSnackBar(res.message);
            this.router.navigate([Config.ROUTE_LOGIN]);
          }, (error) => {
            if (error && error.error && error.error.message) {
              this.serviceSnackbar.openSnackBar(error.error.message);
            }
          });
        } else {
          this.serviceSnackbar.openSnackBar(`<span class="red">Veuillez entrer un nom et prénom ou un nom de société et un numéro de SIRET</span>`);
        }
      }
    });
  }

  onClickBack(): void {
    this.router.navigate([Config.ROUTE_LOGIN]);
  }
}
