import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectApp} from "../../../generated/ProjectApp";
import {FormsModule} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FusioSdkModule} from "ngx-fusio-sdk";

@Component({
  selector: 'app-project-apps',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgbPopover,
    FusioSdkModule,
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavOutlet,
    JsonPipe,
    NgIf
  ],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {

  @Input() apps!: Array<ProjectApp>
  @Output() dataChange = new EventEmitter<Array<ProjectApp>>();
  @Input() active?: number;

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

}
