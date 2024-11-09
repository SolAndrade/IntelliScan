import { Component } from '@angular/core';
import { faBell, faSquareArrowUpRight, faPenRuler } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faBell = faBell;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faPenRuler = faPenRuler;
}
