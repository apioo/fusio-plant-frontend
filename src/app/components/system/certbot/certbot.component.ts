import {Component} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {Message} from "../../../generated/Message";
import {CertbotRequest} from "../../../generated/CertbotRequest";

@Component({
  selector: 'app-system-certbot',
  standalone: true,
  imports: [],
  templateUrl: './certbot.component.html',
  styleUrl: './certbot.component.css'
})
export class CertbotComponent {

  request?: CertbotRequest;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doRequest() {
    if (!this.request) {
      return;
    }
    this.loading = true;
    try {
      this.result = await this.api.getClient().execute().certbot(this.request);
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
