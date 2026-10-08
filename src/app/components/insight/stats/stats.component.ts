import {Component, inject, OnInit, signal} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {DockerStatistics} from "../../../generated/DockerStatistics";

@Component({
  selector: 'app-system-stats',
  templateUrl: './stats.component.html',
  imports: [
    MessageComponent
  ],
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  statistics = signal<DockerStatistics|undefined>(undefined);
  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);

  async ngOnInit() {
    this.loading.set(true);
    try {
      this.statistics.set(await this.api.getClient().execute().stats({}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
