import {Component, signal} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Project} from "../../../generated/Project";
import {ProjectService} from "../../../services/project.service";
import {ApiService} from "../../../api.service";
import {Message} from "../../../generated/Message";
import {DockerStatistics} from "../../../generated/DockerStatistics";
import {DockerProcesses} from "../../../generated/DockerProcesses";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {AppsComponent} from "../apps/apps.component";

@Component({
  selector: 'app-project-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    RouterLink,
    EditorComponent,
    FormsModule,
    JsonPipe,
    AppsComponent
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Project> {

  result = signal<Message|undefined>(undefined);
  statistics = signal<DockerStatistics|undefined>(undefined);
  processes = signal<DockerProcesses|undefined>(undefined);
  loading = signal<boolean>(false);
  active = signal<number|undefined>(undefined);

  constructor(private service: ProjectService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async doDown(id: any) {
    this.loading.set(true);
    try {
      this.result.set(await this.api.getClient().project().execute().down('' + id, {}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

  async doPull(id: any) {
    this.loading.set(true);
    try {
      this.result.set(await this.api.getClient().project().execute().pull('' + id, {}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

  async doUp(id: any) {
    this.loading.set(true);
    try {
      this.result.set(await this.api.getClient().project().execute().up('' + id, {}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
