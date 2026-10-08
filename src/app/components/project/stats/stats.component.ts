import {Component, inject, OnInit, signal} from '@angular/core';
import {DockerStatistics} from "../../../generated/DockerStatistics";
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-stats',
  templateUrl: './../../insight/stats/stats.component.html',
  imports: [
    MessageComponent
  ],
  styleUrl: './../../insight/stats/stats.component.css'
})
export class StatsComponent implements OnInit {

  statistics = signal<DockerStatistics|undefined>(undefined);
  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const projectId = params['id'];
      if (!projectId) {
        return;
      }

      this.loading.set(true);
      try {
        this.statistics.set(await this.api.getClient().project().execute().stats(projectId, {}));
      } catch (error) {
        this.result.set(this.error.convert(error));
      }
      this.loading.set(false);
    });
  }

}
