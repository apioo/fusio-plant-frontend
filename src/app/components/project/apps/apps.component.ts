import {Component, input, model, output} from '@angular/core';
import {ProjectApp} from "../../../generated/ProjectApp";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {LinkComponent} from "./link/link.component";
import {VolumeComponent} from "./volume/volume.component";
import {FormListComponent, FormMapComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-project-apps',
  standalone: true,
  imports: [
    FormsModule,
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavOutlet,
    LinkComponent,
    VolumeComponent,
    JsonPipe,
    FormListComponent,
    FormMapComponent
  ],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {

  apps = model.required<Array<ProjectApp>>();
  active = model<number | undefined>(undefined);
  readonly = input<boolean>(false);
  disabled = input<boolean>(false);

  add() {
    const newApp: ProjectApp = {
      name: 'app-' + (this.apps().length + 1),
      image: '',
      domains: [],
      cache: false,
      port: 80,
      environment: {},
      volumes: [],
      links: [],
    };

    const updatedApps = [...this.apps(), newApp];
    this.apps.set(updatedApps);
    this.active.set(updatedApps.length - 1);
  }

  remove(index: number) {
    const updatedApps = this.apps().filter((_, i) => i !== index);
    this.apps.set(updatedApps);
    this.active.set(updatedApps.length > 0 ? Math.max(0, updatedApps.length - 1) : undefined);
  }

  onChange() {
    // Re-assign array snapshot to trigger model state propagation on nested object changes
    this.apps.set([...this.apps()]);
  }

  getContainerNames(self: ProjectApp): Array<string> {
    return this.apps()
      .filter((app) => app.name && app.name !== self.name)
      .map((app) => app.name!);
  }

}
