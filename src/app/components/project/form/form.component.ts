import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../generated/Project";
import {ApiService} from "../../../api.service";
import {Preset} from "../../../generated/Preset";

@Component({
  selector: 'app-project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<Project> {

  preset?: string;
  presets?: Array<Preset>;

  constructor(private service: ProjectService, private api: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected override async onLoad() {
    const collection = await this.api.getClient().preset().getAll();
    this.presets = collection.entry;
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async loadPreset() {
    if (!this.entity || !this.preset) {
      return;
    }

    const preset = await this.api.getClient().preset().get(this.preset)
    this.entity.apps = preset.apps;
  }

}
