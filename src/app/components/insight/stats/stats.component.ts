import {Component, OnInit} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {DockerStatistics} from "../../../generated/DockerStatistics";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-system-stats',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {

  statistics?: DockerStatistics;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.statistics = await this.api.getClient().execute().stats({});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
