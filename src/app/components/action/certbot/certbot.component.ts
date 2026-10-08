import {Component, inject, signal} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {Message} from "../../../generated/Message";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-certbot',
  templateUrl: './certbot.component.html',
  imports: [
    NgbAlert,
    MessageComponent,
    EditorComponent,
    FormsModule
  ],
  styleUrl: './certbot.component.css'
})
export class CertbotComponent {

  domain = signal<string>('');
  email = signal<string>('');

  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);

  async doRequest() {
    const domain = this.domain();
    const email = this.email();
    if (!domain || !email) {
      return;
    }
    this.loading.set(true);
    try {
      this.result.set(await this.api.getClient().execute().certbot({
        domain: domain,
        email: email,
      }));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
