import { Component, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  returnMainMenu() {
    this.menuService.toggleShowBand();
  }

  ngOnInit(): void {
  }

}
