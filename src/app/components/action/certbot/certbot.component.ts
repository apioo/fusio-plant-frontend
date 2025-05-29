import {Component} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService, FusioSdkModule} from "ngx-fusio-sdk";
import {Message} from "../../../generated/Message";
import {CertbotRequest} from "../../../generated/CertbotRequest";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-certbot',
  standalone: true,
  imports: [
    NgbAlert,
    FormsModule
  ],
  templateUrl: './certbot.component.html',
  styleUrl: './certbot.component.css'
})
export class CertbotComponent {

  domain = '';
  email = '';

  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doRequest() {
    if (!this.domain || !this.email) {
      return;
    }
    this.loading = true;
    try {
      this.result = await this.api.getClient().execute().certbot({
        domain: this.domain,
        email: this.email,
      });
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
