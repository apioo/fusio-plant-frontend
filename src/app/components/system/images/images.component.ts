import {Component, OnInit} from '@angular/core';
import {Message} from "../../../generated/Message";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {DockerImages} from "../../../generated/DockerImages";

@Component({
  selector: 'app-system-images',
  standalone: true,
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {

  images?: DockerImages;
  result?: Message;
  loading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async ngOnInit() {
    this.loading = true;
    try {
      this.images = await this.api.getClient().execute().images({});
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.loading = false;
  }

}
