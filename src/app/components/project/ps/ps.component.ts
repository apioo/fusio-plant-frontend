import {Component, inject, OnInit, signal} from '@angular/core';
import {DockerProcesses} from "../../../generated/DockerProcesses";
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-ps',
  templateUrl: './../../insight/ps/ps.component.html',
  imports: [
    MessageComponent
  ],
  styleUrl: './../../insight/ps/ps.component.css'
})
export class PsComponent implements OnInit {

  processes = signal<DockerProcesses|undefined>(undefined);
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
        this.processes.set(await this.api.getClient().project().execute().ps(projectId, {}));
      } catch (error) {
        this.result.set(this.error.convert(error));
      }
      this.loading.set(false);
    });
  }

}
