import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {Badge} from 'primeng/badge';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  imports: [ MenubarModule, Badge, RouterLink, NgClass, Avatar ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: 'home',
      },
      {
        label: 'Register',
        icon: 'pi pi-search',
        badge: '3',
        route: 'register-company',
      },
    ];
  }
}
