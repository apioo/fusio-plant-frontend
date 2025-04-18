import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectApp} from "../../../generated/ProjectApp";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FusioSdkModule} from "ngx-fusio-sdk";

@Component({
  selector: 'app-project-apps',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgbPopover,
    FusioSdkModule
  ],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {

  @Input() apps!: Array<ProjectApp>
  @Output() dataChange = new EventEmitter<Array<ProjectApp>>();

  add() {
    this.apps.push({
      name: 'app-' + (this.apps.length + 1)
    });

    this.dataChange.emit(this.apps);
  }

  remove(index: number) {
    this.apps.splice(index, 1);

    this.dataChange.emit(this.apps);
  }

  getAllApps(): Array<string> {
    const appNames: Array<string> = [];
    this.apps.forEach((app) => {
      if (app.name) {
        appNames.push(app.name);
      }
    });
    return appNames;
  }

}
