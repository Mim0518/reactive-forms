import { Component } from '@angular/core';
import {reactiveRoutes} from '../../../reactive/reactive.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenu:MenuItem[] = reactiveItems
    .filter(item => item.path != '**')
    .map(item => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }));

  authMenu: MenuItem[] = [
    {
      route: './auth',
      title: 'Sign Up'
    }
  ];
  countryMenu: MenuItem[] = [
    {
      route: './country',
      title: 'Países'
    }
  ]
}
