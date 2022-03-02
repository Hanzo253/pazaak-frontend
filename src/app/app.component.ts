import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pazaak-frontend';

  constructor(private userService: UserService) { }

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

  ngOnInit(): void {
      // this.listUsers();
      // this.getUser();
      this.getLoggedInUser("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaXRobG9yZEB5YWhvby5jb20iLCJleHAiOjE2NDYyMjEzOTcsImlhdCI6MTY0NjE4NTM5N30._Hmc4bm6AiU7SoF_9iDtGSxzbDyQZOlTA0B-FFaBUfc");
  }
}
