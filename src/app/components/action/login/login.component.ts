import {Component, inject, signal} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-login',
  templateUrl: './login.component.html',
  imports: [
    NgbAlert,
    MessageComponent,
    EditorComponent,
    FormsModule
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  domain = signal<string>('');
  username = signal<string>('');
  password = signal<string>('');

  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);

  async doLogin() {
    const domain = this.domain();
    const username = this.username();
    const password = this.password();
    if (!domain || !username || !password) {
      return;
    }
    this.loading.set(true);
    try {
      this.result.set(await this.api.getClient().execute().login({
        domain: domain,
        username: username,
        password: password,
      }));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
