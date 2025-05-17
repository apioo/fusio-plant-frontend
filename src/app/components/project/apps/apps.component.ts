import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectApp} from "../../../generated/ProjectApp";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {FusioSdkModule} from "ngx-fusio-sdk";
import {LinkComponent} from "./link/link.component";
import {VolumeComponent} from "./volume/volume.component";

@Component({
  selector: 'app-project-apps',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    FusioSdkModule,
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavOutlet,
    NgIf,
    LinkComponent,
    VolumeComponent
  ],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {

  @Input() apps!: Array<ProjectApp>
  @Output() dataChange = new EventEmitter<Array<ProjectApp>>();
  @Input() active?: number;
  @Input() disabled = false;

  add() {
    const length = this.apps.push({
      name: 'app-' + (this.apps.length + 1),
      image: '',
      domains: [],
      cache: false,
      port: 80,
      environment: {},
      volumes: [],
      links: [],
    });

    this.active = length - 1;

    this.dataChange.emit(this.apps);
  }

  remove(index: number) {
    this.apps.splice(index, 1);

    this.dataChange.emit(this.apps);

    this.active = this.apps.length - 1;
  }

  getContainerNames(self: ProjectApp): Array<string> {
    let names: Array<string> = [];
    this.apps.forEach((app) => {
      if (app.name && app.name != self.name) {
        names.push(app.name);
      }
    });
    return names;
  }

}
