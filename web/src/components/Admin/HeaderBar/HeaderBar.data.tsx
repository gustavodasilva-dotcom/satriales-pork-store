import { IMenuPage } from './HeaderBar.types';

export const menuPages: IMenuPage[] = [{
  menu: {
    name: 'Checkout',
    link: 'checkout'
  },
  submenus: []
}, {
  menu: {
    name: 'Clients',
    link: 'clients'
  },
  submenus: []
}, {
  menu: {
    name: 'Products',
    link: 'products'
  },
  submenus: [{
    name: 'Products',
    link: 'products'
  }, {
    name: 'Categories',
    link: 'products/categories'
  }]
}];