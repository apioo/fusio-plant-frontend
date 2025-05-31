import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../generated/Project";
import {ProjectService} from "../../../services/project.service";
import {ApiService} from "../../../api.service";
import {Message} from "../../../generated/Message";
import {DockerStatistics} from "../../../generated/DockerStatistics";
import {DockerProcesses} from "../../../generated/DockerProcesses";

@Component({
  selector: 'app-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Project> {

  result?: Message;
  statistics?: DockerStatistics;
  processes?: DockerProcesses;
  loading = false;
  active?: number;

  constructor(private service: ProjectService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async doDown(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().execute().down('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doPull(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().execute().pull('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

  async doUp(id: any) {
    this.loading = true;
    try {
      this.result = await this.api.getClient().project().execute().up('' + id, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
