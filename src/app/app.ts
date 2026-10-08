import {Component, OnInit} from '@angular/core';
import {BackendUser} from "fusio-sdk";
import {BootstrapComponent, UserService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-root',
  imports: [BootstrapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  user?: BackendUser;

  constructor(private userMeta: UserService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
  }

}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
