import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BaseUrlInterceptor} from './config/base-url-interceptor';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: "BASE_API_URL", useValue: environment.apiUrl,
    }
  ]
})
export class AppComponent {
  title = 'you-need-frontend';

  constructor() {
  }
}
