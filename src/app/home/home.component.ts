import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faSquareArrowUpRight,
  faPenRuler,
  faBuilding,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './itinerary.css'],
})
export class HomeComponent implements OnInit {
  faBell = faBell;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faPenRuler = faPenRuler;
  faBuilding = faBuilding;
  faLocationDot = faLocationDot;
  isMobile: boolean = true;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 500;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 500;
    });
  }
}
