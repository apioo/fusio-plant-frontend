import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../generated/Project";
import {ApiService} from "../../../api.service";
import {Preset} from "../../../generated/Preset";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<Project> {

  preset?: string;
  variant?: string;
  presets?: Array<Preset>;
  variants?: Array<Preset>;
  active?: number;
  loading = false;
  deleteProjectName = '';

  constructor(private service: ProjectService, private api: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  confirmDelete(content: any, entity: Project) {
    this.deleteProjectName = '';
    this.modal.open(content).result.then(async () => {
      const deletionConfirmed = this.deleteProjectName && entity.name === this.deleteProjectName;
      if (!deletionConfirmed) {
        this.response = {
          success: false,
          message: 'Project deletion was not confirmed, the project was not deleted',
        };
        return;
      }

      try {
        await this.doDelete(entity);
      } catch (e) {
        this.response = this.error.convert(e);
      }
    }, (reason) => {
    });
  }

  protected override async onLoad() {
    const collection = await this.api.getClient().preset().getAll();
    this.presets = collection.entry;
  }

  protected getService(): ProjectService {
    return this.service;
  }

  protected override beforeCreate(entity: Project): Project {
    this.loading = true;
    return super.beforeCreate(entity);
  }

  protected override beforeUpdate(entity: Project): Project {
    this.loading = true;
    return super.beforeUpdate(entity);
  }

  protected override beforeDelete(entity: Project): Project {
    this.loading = true;
    return super.beforeDelete(entity);
  }

  protected override onSubmit(): void
  {
    this.loading = false;
  }

  protected override onError(): void
  {
    this.loading = false;
  }

  async loadPreset() {
    const selectedPreset = this.preset;
    if (!this.entity || !selectedPreset) {
      return;
    }

    const preset = await this.api.getClient().preset().get(selectedPreset)
    this.entity.apps = preset.apps;

    const selected = this.getSelectedPreset();
    if (selected) {
      const variants: Array<Preset> = [];
      this.presets?.forEach((preset) => {
        if (selected.displayName && preset.displayName?.startsWith(selected.displayName + '-')) {
          variants.push(preset);
        }
      });
      this.variants = variants;
    }

    this.variant = selectedPreset;
    this.active = 0;
  }

  async loadVariant() {
    const selectedVariant = this.variant;
    if (!this.entity || !selectedVariant) {
      return;
    }

    const preset = await this.api.getClient().preset().get(selectedVariant)
    this.entity.apps = preset.apps;

    this.active = 0;
  }

  private getSelectedPreset(): Preset|undefined {
    let result: Preset|undefined = undefined;
    this.presets?.forEach((preset) => {
      if (preset.name === this.preset) {
        result = preset;
      }
    });

    return result;
  }

}
