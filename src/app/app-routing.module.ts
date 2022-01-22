import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageHomeComponent} from './page/page-home/page-home.component';
import {PageCategoryComponent} from './page/page-category/page-category.component';
import {Config} from './class/config';
import {PageProductComponent} from './page/page-product/page-product.component';
import {PageCartComponent} from './page/page-cart/page-cart.component';
import {PageDashboardComponent} from './page/page-dashboard/page-dashboard.component';
import {PageDashboardEditInfosComponent} from './page/page-dashboard-edit-infos/page-dashboard-edit-infos.component';
import {PageDashboardEditPasswordComponent} from './page/page-dashboard-edit-password/page-dashboard-edit-password.component';
import {AuthGuardService} from './service/auth-guard.service';
import {PageLoginComponent} from './page/page-login/page-login.component';
import {DataGuardService} from './service/data-guard.service';
import {PageRegisterComponent} from './page/page-register/page-register.component';
import {PageForgetPasswordComponent} from './page/page-forget-password/page-forget-password.component';
import {PageForgetPasswordSetComponent} from './page/page-forget-password-set/page-forget-password-set.component';
import {PageConfirmComponent} from './page/page-confirm/page-confirm.component';
import {PageDashboardEditAddressComponent} from './page/page-dashboard-edit-address/page-dashboard-edit-address.component';
import {PageCGVComponent} from './page/page-cgv/page-cgv.component';
import {PageContactUsComponent} from './page/page-contact-us/page-contact-us.component';

const routes: Routes = [
  {path: Config.ROUTE_CATEGORY, component: PageCategoryComponent, canActivate: [DataGuardService], data: {navbarTransparent: true}},
  {path: Config.ROUTE_PRODUCT, component: PageProductComponent, canActivate: [DataGuardService], data: {navbarTransparent: false}},
  {path: Config.ROUTE_CART, component: PageCartComponent, canActivate: [DataGuardService], data: {navbarTransparent: false}},
  {path: Config.ROUTE_CONFIRM, component: PageConfirmComponent, canActivate: [DataGuardService], data: {navbarTransparent: false}},
  {path: Config.ROUTE_REGISTER, component: PageRegisterComponent, canActivate: [DataGuardService], data: {navbarTransparent: false}},
  {
    path: Config.ROUTE_FORGET_PASSWORD,
    component: PageForgetPasswordComponent,
    canActivate: [DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_FORGET_PASSWORD_PARAM_TOKEN,
    component: PageForgetPasswordSetComponent,
    canActivate: [DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_DASHBOARD,
    component: PageDashboardComponent,
    canActivate: [AuthGuardService, DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_DASHBOARD_EDIT_INFOS,
    component: PageDashboardEditInfosComponent,
    canActivate: [AuthGuardService, DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_DASHBOARD_EDIT_ADDRESS,
    component: PageDashboardEditAddressComponent,
    canActivate: [AuthGuardService, DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_DASHBOARD_EDIT_PASSWORD,
    component: PageDashboardEditPasswordComponent,
    canActivate: [AuthGuardService, DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_CONTACT_US,
    component: PageContactUsComponent,
    canActivate: [DataGuardService],
    data: {navbarTransparent: false}
  },
  {
    path: Config.ROUTE_CGV,
    component: PageCGVComponent,
    canActivate: [DataGuardService],
    data: {navbarTransparent: false}
  },
  {path: Config.ROUTE_LOGIN, component: PageLoginComponent, canActivate: [DataGuardService], data: {navbarTransparent: false}},
  {path: Config.ROUTE_HOME, component: PageHomeComponent, canActivate: [DataGuardService], data: {navbarTransparent: true}},
  {path: '', redirectTo: Config.ROUTE_HOME, pathMatch: 'full', canActivate: [DataGuardService], data: {navbarTransparent: true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule {
}
