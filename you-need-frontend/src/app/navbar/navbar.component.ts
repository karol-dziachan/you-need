import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {Badge} from 'primeng/badge';
import {RouterLink, Router} from '@angular/router';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {AuthService} from '../services/auth.service';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-navbar',
  imports: [ MenubarModule, Badge, RouterLink, NgClass, NgIf, Button, AsyncPipe, Ripple ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  currentUser$;

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser$ = authService.currentUser$;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Strona Główna',
        icon: 'pi pi-home',
        route: 'home',
      },
      {
        label: 'Rejestracja',
        icon: 'pi pi-search',
        badge: '3',
        route: 'register-company',
      },
    ];
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

  isDarkMode(): boolean {
    const element = document.querySelector('html');
    return element?.classList.contains('my-app-dark') ?? false;
  }

  navigateToLogin(): void {
    this.router.navigate([ '/login' ]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([ '/' ]);
  }
}
