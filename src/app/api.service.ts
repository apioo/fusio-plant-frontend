import {Injectable} from '@angular/core';
import {CredentialsInterface} from "sdkgen-client";
import {ApiService as SDK} from "ngx-fusio-sdk";
import {Client} from "./generated/Client";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends SDK<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
