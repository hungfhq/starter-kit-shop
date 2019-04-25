import { Routes, Route } from '@angular/router';
import { ShopComponent } from './shop.component';

export class Shop {
  static childRoutes(routes: Routes): Route {
    return {
      path: 'shop',
      component: ShopComponent,
      children: routes,
      // Reuse Shop Component instance when navigating between child views
      data: { reuse: true }
    };
  }
}
