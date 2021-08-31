import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  signedIn = false;
  toDestroy!: Subscription;

  constructor(private account: AccountService) {} 

  ngOnInit() {
    this.toDestroy = this.account.subject.subscribe((b:boolean) => {
      this.signedIn = b;
      console.log(999);
    })
    
    this.account.ReactivateAfterRefresh();
  }

  logout() {
    if(confirm("Are you sure you want to log out?")) {    
      this.account.Logout();
    }
  }

  ngOnDestroy() {
    this.toDestroy.unsubscribe();
  }
}
