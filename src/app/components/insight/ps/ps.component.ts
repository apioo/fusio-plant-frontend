import {Component, OnInit} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {DockerProcesses} from "../../../generated/DockerProcesses";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-system-ps',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.css'
})
export class PsComponent implements OnInit {

  processes?: DockerProcesses;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.processes = await this.api.getClient().execute().ps({});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
