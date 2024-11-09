import { Component } from '@angular/core';
import { faBell, faSquareArrowUpRight, faPenRuler, faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './itinerary.css'],
})
export class HomeComponent {
  faBell = faBell;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faPenRuler = faPenRuler;
  faBuilding = faBuilding;
  faLocationDot = faLocationDot;
}
