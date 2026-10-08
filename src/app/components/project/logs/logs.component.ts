import {Component, inject, OnInit, signal} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute} from "@angular/router";
import {DockerLogs} from "../../../generated/DockerLogs";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-project-logs',
  templateUrl: './logs.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule
  ],
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {

  projectId = signal<string|undefined>(undefined);
  logs = signal<DockerLogs|undefined>(undefined);
  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.projectId.set(params['id']);

      await this.fetchLogs();
    });
  }

  async fetchLogs() {
    const projectId = this.projectId();
    if (!projectId) {
      return;
    }

    this.loading.set(true);
    try {
      this.logs.set(await this.api.getClient().project().execute().logs(projectId, {}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
