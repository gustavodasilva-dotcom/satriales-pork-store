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
    name: 'Products'
  },
  submenus: [{
    name: 'Products',
    link: 'products'
  }, {
    name: 'Categories',
    link: 'products/categories'
  }]
}, {
  menu: {
    name: 'Stock'
  },
  submenus: [{
    name: 'New movement',
    link: 'stock/movements/new'
  }, {
    name: 'Movements',
    link: 'stock/movements'
  }]
}];