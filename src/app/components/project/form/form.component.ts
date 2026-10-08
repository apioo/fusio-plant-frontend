import {Component, computed, model, signal} from '@angular/core';
import {ErrorService, Form, FormBreadcrumbComponent, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../generated/Project";
import {ApiService} from "../../../api.service";
import {Preset} from "../../../generated/Preset";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {AppsComponent} from "../apps/apps.component";

@Component({
  selector: 'app-project-form',
  templateUrl: './form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    AppsComponent,
    FormBreadcrumbComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<Project> {

  preset = signal<string|undefined>(undefined);
  variant = signal<string|undefined>(undefined);
  presets = signal<Array<Preset>>([]);
  active = model<number|undefined>(undefined);
  deleteProjectName = model<string>('');

  selectedPreset = computed<Preset|undefined>(() => {
    let result: Preset|undefined = undefined;
    this.presets().forEach((preset) => {
      if (preset.name === this.preset()) {
        result = preset;
      }
    });

    return result;
  });

  variants = computed(() => {
    const presets = this.presets();
    const selected = this.selectedPreset();
    if (!selected) {
      return [];
    }

    const variants: Array<Preset> = [];
    presets.forEach((preset) => {
      if (selected.displayName && preset.displayName?.startsWith(selected.displayName + '-')) {
        variants.push(preset);
      }
    });
    return variants;
  });

  constructor(private service: ProjectService, private api: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  confirmDelete(content: any, entity: Project) {
    this.deleteProjectName.set('');
    this.modal.open(content).result.then(async () => {
      const deletionConfirmed = this.deleteProjectName() && entity.name === this.deleteProjectName();
      if (!deletionConfirmed) {
        this.response.set({
          success: false,
          message: 'Project deletion was not confirmed, the project was not deleted',
        });
        return;
      }

      try {
        await this.doDelete(entity);
      } catch (e) {
        this.response.set(this.error.convert(e));
      }
    }, (reason) => {
    });
  }

  protected override async onLoad() {
    const collection = await this.api.getClient().preset().getAll();
    this.presets.set(collection.entry || []);

    if (this.active() === undefined) {
      this.active.set(0);
    }
  }

  protected getService(): ProjectService {
    return this.service;
  }

  async loadPreset() {
    const selectedPreset = this.preset();
    if (!this.entity() || !selectedPreset) {
      return;
    }

    this.loading.set(true);

    try {
      const preset = await this.api.getClient().preset().get(selectedPreset);

      this.entity.update((entity) => {
        entity.apps = preset.apps;
        return entity;
      });

      this.active.set(0);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

  async loadVariant() {
    const selectedVariant = this.variant();
    if (!this.entity() || !selectedVariant) {
      return;
    }

    this.loading.set(true);

    try {
      const preset = await this.api.getClient().preset().get(selectedVariant)

      this.entity.update((entity) => {
        entity.apps = preset.apps;
        return entity;
      });

      this.active.set(0);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

}
