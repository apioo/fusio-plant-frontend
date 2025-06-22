import {Component, OnInit} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";
import {DockerLogs} from "../../../generated/DockerLogs";

@Component({
  selector: 'app-project-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {

  projectId?: string;
  logs?: DockerLogs;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.projectId = params['id'];

      await this.fetchLogs();
    });
  }

  async fetchLogs() {
    if (!this.projectId) {
      return;
    }

    this.loading = true;
    try {
      this.logs = await this.api.getClient().project().execute().logs(this.projectId, {});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
