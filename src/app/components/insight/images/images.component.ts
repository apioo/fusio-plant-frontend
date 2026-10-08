import {Component, inject, OnInit, signal} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {DockerImages} from "../../../generated/DockerImages";

@Component({
  selector: 'app-system-images',
  templateUrl: './images.component.html',
  imports: [
    MessageComponent
  ],
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {

  images = signal<DockerImages|undefined>(undefined);
  result = signal<Message|undefined>(undefined);
  loading = signal<boolean>(false);

  private api = inject(ApiService);
  private error = inject(ErrorService);

  async ngOnInit() {
    this.loading.set(true);
    try {
      this.images.set(await this.api.getClient().execute().images({}));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.loading.set(false);
  }

}
