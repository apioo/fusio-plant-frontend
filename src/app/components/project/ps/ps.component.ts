import {Component, OnInit} from '@angular/core';
import {DockerProcesses} from "../../../generated/DockerProcesses";
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-ps',
  templateUrl: './../../insight/ps/ps.component.html',
  styleUrl: './../../insight/ps/ps.component.css'
})
export class PsComponent implements OnInit {

  processes?: DockerProcesses;
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
        this.processes = await this.api.getClient().project().execute().ps(projectId, {});
      } catch (error) {
        this.result = this.error.convert(error);
      }
      this.loading = false;
    });
  }

}
