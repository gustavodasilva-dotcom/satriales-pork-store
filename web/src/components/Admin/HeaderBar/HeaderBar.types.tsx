export interface IMenu {
  name: string;
  link?: string;
}

export interface IMenuPage {
  menu: IMenu;
  submenus: IMenu[];
};