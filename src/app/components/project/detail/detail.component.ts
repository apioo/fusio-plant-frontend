import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../generated/Project";
import {ProjectService} from "../../../services/project.service";
import {ApiService} from "../../../api.service";
import {Message} from "../../../generated/Message";

@Component({
  selector: 'app-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Project> {

  result?: Message;

  constructor(private service: ProjectService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async doCertbot(id: any) {
    this.result = await this.api.getClient().project().certbot('' + id, {});
  }

  async doPull(id: any) {
    this.result = await this.api.getClient().project().pull('' + id, {});
  }

  async doUp(id: any) {
    this.result = await this.api.getClient().project().up('' + id, {});
  }

  async doDown(id: any) {
    this.result = await this.api.getClient().project().down('' + id, {});
  }

  async doLogs(id: any) {
    this.result = await this.api.getClient().project().logs('' + id);
  }

}
