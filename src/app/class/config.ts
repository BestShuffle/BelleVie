export class Config {
  static APP_NAME = 'Belle-Vie';
  static ROUTE_HOME = 'home';
  static ROUTE_CART = 'cart';
  static ROUTE_ABOUT = 'about';
  static ROUTE_CONTACT_US = 'contact-us';
  static ROUTE_CGV = 'cgv';
  static ROUTE_CONFIRM = 'confirm/:token';
  static ROUTE_DASHBOARD = 'dashboard';
  static ROUTE_DASHBOARD_EDIT =  Config.ROUTE_DASHBOARD + '/edit';
  static ROUTE_DASHBOARD_EDIT_INFOS =  Config.ROUTE_DASHBOARD_EDIT + '/infos';
  static ROUTE_DASHBOARD_EDIT_ADDRESS =  Config.ROUTE_DASHBOARD_EDIT + '/address';
  static ROUTE_DASHBOARD_EDIT_PASSWORD =  Config.ROUTE_DASHBOARD_EDIT + '/password';
  static ROUTE_LOGIN = 'login';
  static ROUTE_FORGET_PASSWORD = 'forget';
  static ROUTE_FORGET_PASSWORD_PARAM_TOKEN = Config.ROUTE_FORGET_PASSWORD + '/:token';
  static ROUTE_REGISTER = 'register';
  static ROUTE_CATEGORY = 'category/:id';
  static ROUTE_PRODUCT = 'product/:id';
  static NAME_TOKEN_JWT = 'id_token';

  static URL_API = 'http://172.20.10.2:3000/api';
  static URL_AUTH = Config.URL_API + '/login';
  static URL_ACCOUNT = Config.URL_API + '/account';
  static URL_CONFIRM = Config.URL_API + '/confirm';
  static URL_FORGET_PASSWORD = Config.URL_API + '/forget/password';
  static URL_FORGET_PASSWORD_RESET = Config.URL_FORGET_PASSWORD + '/reset';
  static URL_ACCOUNT_INFOS = Config.URL_ACCOUNT + '/infos';
  static URL_ACCOUNT_UPDATE = Config.URL_ACCOUNT + '/update';
  static URL_ACCOUNT_UPDATE_FIELD = Config.URL_ACCOUNT_UPDATE + '/field/:field';
  static URL_CATEGORIES = Config.URL_API + '/categories';
  static URL_CATEGORY = Config.URL_CATEGORIES + '/:id';
  static URL_PRODUCTS = Config.URL_API + '/products';
  static URL_PRODUCT = Config.URL_PRODUCTS + '/:id';
  static URL_PICTURES = Config.URL_API + '/pictures';
  static URL_REGISTER = Config.URL_API + '/register';
  static URL_PICTURES_PRODUCT = Config.URL_PICTURES + '/product/:ref';
  static URL_PICTURES_CATEGORY = Config.URL_PICTURES + '/category/:id';
}