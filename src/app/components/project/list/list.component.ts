import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../generated/Project";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Project> {

  constructor(private service: ProjectService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

}
