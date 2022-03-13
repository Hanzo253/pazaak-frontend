import { Component, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  userAuthToken: any = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaWdoZ3JvdW5kQHlhaG9vLmNvbSIsImV4cCI6MTY0NzAxODQ1NCwiaWF0IjoxNjQ2OTgyNDU0fQ.m9xn_uqgCBMtCvZN86AGjRGgqh7po3MuWcRmprm-f9A"

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
