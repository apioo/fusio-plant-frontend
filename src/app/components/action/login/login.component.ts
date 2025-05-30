import {Component} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, FusioSdkModule} from "ngx-fusio-sdk";
import {DockerLogin} from "../../../generated/DockerLogin";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  domain = '';
  username = '';
  password = '';

  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doLogin() {
    if (!this.domain || !this.username || !this.password) {
      return;
    }
    this.loading = true;
    try {
      this.result = await this.api.getClient().execute().login({
        domain: this.domain,
        username: this.username,
        password: this.password,
      });
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
