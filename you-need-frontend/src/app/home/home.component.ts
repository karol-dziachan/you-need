import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
    imports: [
        Button,
        RouterLink,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
