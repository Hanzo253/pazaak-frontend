import { Component, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../services/match.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  userAuthToken: any = this.userService.userAuthToken;

  matches: Array<any> = [];

  constructor(private userService: UserService, private matchService: MatchService) { }

  getAllMatches(authToken: any) {
    this.matchService.getAllMatches(authToken).subscribe(
      (response) => {
        console.log(response);
        this.matches = response;
      }
    );
  }

  ngOnInit(): void {
    this.getAllMatches(this.userAuthToken);
  }

}
