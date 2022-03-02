import { Component, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  userAuthToken: any = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZWRpbWFzdGVyQHlhaG9vLmNvbSIsImV4cCI6MTY0NjI2OTc2MCwiaWF0IjoxNjQ2MjMzNzYwfQ.lt3yi-josk3Dw8mTO3TnPVwwE1i5KvFPkkuctYIYQrM"

  matches: Array<any> = [];

  constructor(private matchService: MatchService) { }

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
