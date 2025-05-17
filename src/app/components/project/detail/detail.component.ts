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
  loading = false;

  constructor(private service: ProjectService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async doCertbot(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().certbot('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doPull(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().pull('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doUp(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().up('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doDown(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().down('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doLogs(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().logs('' + id);
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
