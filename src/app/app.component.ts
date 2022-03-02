import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import { UserService } from './services/user.service';
import { MatchService } from './services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pazaak-frontend';
  // private user: any = {
  //   'userName' : 'ObiWan253',
  //   'emailAddress' : 'jedimaster@yahoo.com',
  //   'password' : 'kenobi'
  // }

  private match: any = {
    'result' : 'Victory',
    'matchDate' : '12-05-2022'
  }

  authToken: any = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZWRpbWFzdGVyQHlhaG9vLmNvbSIsImV4cCI6MTY0NjI2OTc2MCwiaWF0IjoxNjQ2MjMzNzYwfQ.lt3yi-josk3Dw8mTO3TnPVwwE1i5KvFPkkuctYIYQrM"

  constructor(private userService: UserService, private matchService: MatchService) { }

  registerUser(user: any) {
    this.userService.register(user).subscribe(
      (response) => console.log(response)
    );
  }

  listUsers(): void {
    this.userService.listUsers().subscribe(
      (response) => console.log(response) 
    );
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (response) => console.log(response)
    );
  }

  getLoggedInUser(authToken: any) {
    this.userService.getLoggedInUser(authToken).subscribe(
      (response) => console.log(response)
    );
  }

  createMatch(match: any, authToken: any) {
    this.matchService.createMatch(match, authToken).subscribe(
      (response) => console.log(response)
    );
  }

  getAllMatches(authToken: any) {
    this.matchService.getAllMatches(authToken).subscribe(
      (response) => console.log(response)
    );
  }

  ngOnInit(): void {
      // this.listUsers();
      // this.getUser();
      // this.getLoggedInUser("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaXRobG9yZEB5YWhvby5jb20iLCJleHAiOjE2NDYyMjEzOTcsImlhdCI6MTY0NjE4NTM5N30._Hmc4bm6AiU7SoF_9iDtGSxzbDyQZOlTA0B-FFaBUfc");
      // this.registerUser(this.user);

      // this.createMatch(this.match, this.authToken);
      // this.getAllMatches(this.authToken);
  }
}
