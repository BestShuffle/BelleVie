import { BrowserModule } from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { PageRegisterComponent } from './page/page-register/page-register.component';
import { PageProductComponent } from './page/page-product/page-product.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { PageCategoryComponent } from './page/page-category/page-category.component';
import { PageComponent } from './page/page/page.component';
import {MatCardModule} from '@angular/material/card';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormLoginComponent } from './form/form-login/form-login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form/form.component';
import { FormForgetPasswordComponent } from './form/form-forget-password/form-forget-password.component';
import { FormForgetPasswordSetComponent } from './form/form-forget-password-set/form-forget-password-set.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FieldCheckboxComponent } from './component/field-checkbox/field-checkbox.component';
import { FieldPasswordComponent } from './component/field-password/field-password.component';
import { FieldSelectComponent } from './component/field-select/field-select.component';
import { FieldTextComponent } from './component/field-text/field-text.component';
import { FieldTextAreaComponent } from './component/field-text-area/field-text-area.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { InfoBarComponent } from './component/info-bar/info-bar.component';
import { ButtonComponent } from './component/button/button.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { PageCartComponent } from './page/page-cart/page-cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MainComponent } from './style/main/main.component';
import {MatTableModule} from '@angular/material/table';
import {CookieService} from 'ngx-cookie-service';
import {MatBadgeModule} from '@angular/material/badge';
import {Config} from './class/config';
import {JwtModule} from '@auth0/angular-jwt';
import {TokenInterceptorService} from './service/token-interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PageDashboardComponent } from './page/page-dashboard/page-dashboard.component';
import { PageDashboardEditInfosComponent } from './page/page-dashboard-edit-infos/page-dashboard-edit-infos.component';
import { PageDashboardEditPasswordComponent } from './page/page-dashboard-edit-password/page-dashboard-edit-password.component';
import { PageLoginComponent } from './page/page-login/page-login.component';
import { PageForgetPasswordComponent } from './page/page-forget-password/page-forget-password.component';
import { PageForgetPasswordSetComponent } from './page/page-forget-password-set/page-forget-password-set.component';
import { FormRegisterComponent } from './form/form-register/form-register.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import { FieldTelComponent } from './component/field-tel/field-tel.component';
import { PageConfirmComponent } from './page/page-confirm/page-confirm.component';
import { FieldQuantityComponent } from './component/field-quantity/field-quantity.component';
import { PageDashboardEditAddressComponent } from './page/page-dashboard-edit-address/page-dashboard-edit-address.component';
import {MatRadioModule} from '@angular/material/radio';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { PageCGVComponent } from './page/page-cgv/page-cgv.component';
import { PageContactUsComponent } from './page/page-contact-us/page-contact-us.component';

registerLocaleData(localeFr);

const configJwt = {
  config: {
    tokenGetter: jwtTokenGetter,
    whitelistedDomains: [],
    blacklistedRoutes: []
  },
};

export function jwtTokenGetter(): string {
  return localStorage.getItem(Config.NAME_TOKEN_JWT);
}
@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageRegisterComponent,
    PageProductComponent,
    PageCategoryComponent,
    PageComponent,
    FormLoginComponent,
    DynamicFormComponent,
    FormComponent,
    FormForgetPasswordComponent,
    FormForgetPasswordSetComponent,
    FieldCheckboxComponent,
    FieldPasswordComponent,
    FieldSelectComponent,
    FieldTextComponent,
    FieldTextAreaComponent,
    InfoBarComponent,
    ButtonComponent,
    DialogComponent,
    PageCartComponent,
    MainComponent,
    PageDashboardComponent,
    PageDashboardEditInfosComponent,
    PageDashboardEditPasswordComponent,
    PageLoginComponent,
    PageForgetPasswordComponent,
    PageForgetPasswordSetComponent,
    FormRegisterComponent,
    FieldTelComponent,
    PageConfirmComponent,
    FieldQuantityComponent,
    PageDashboardEditAddressComponent,
    PageCGVComponent,
    PageContactUsComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTableModule,
    MatBadgeModule,
    JwtModule.forRoot(configJwt),
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcKRZIaAAAAAGNMsrp31aGsFMrmu6Fa8GxS87DD',
      } as RecaptchaSettings,
    },
    CookieService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
