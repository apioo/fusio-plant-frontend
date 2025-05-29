import {Component, OnInit} from '@angular/core';
import {DockerStatistics} from "../../../generated/DockerStatistics";
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-stats',
  templateUrl: './../../insight/stats/stats.component.html',
  styleUrl: './../../insight/stats/stats.component.css'
})
export class StatsComponent implements OnInit {

  statistics?: DockerStatistics;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const projectId = params['id'];
      if (!projectId) {
        return;
      }

      this.loading = true;
      try {
        this.statistics = await this.api.getClient().project().execute().stats(projectId, {});
      } catch (error) {
        this.result = this.error.convert(error);
      }
      this.loading = false;
    });
  }

}
