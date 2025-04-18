import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../generated/Project";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Project> {

  constructor(private service: ProjectService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

}
