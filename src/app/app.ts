import {Component} from '@angular/core';
import {BootstrapComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-root',
  imports: [BootstrapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
