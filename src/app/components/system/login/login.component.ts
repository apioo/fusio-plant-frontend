import {Component} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {DockerLogin} from "../../../generated/DockerLogin";

@Component({
  selector: 'app-system-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login?: DockerLogin;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doLogin() {
    if (!this.login) {
      return;
    }
    this.loading = true;
    try {
      this.result = await this.api.getClient().execute().login(this.login);
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
