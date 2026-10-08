import {Component, signal} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {Message} from "../../../generated/Message";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-system-backup',
  templateUrl: './backup.component.html',
  imports: [
    NgbAlert,
    MessageComponent,
    EditorComponent,
    FormsModule
  ],
  styleUrl: './backup.component.css'
})
export class BackupComponent {

  export = signal<string>('');
  import = signal<string>('');

  result = signal<Message|undefined>(undefined);
  exportLoading = signal<boolean>(false);
  importLoading = signal<boolean>(false);

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doExport() {
    this.exportLoading.set(true);
    try {
      const backup = await this.api.getClient().backup().export({});
      this.export.set(backup.export || '');
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.exportLoading.set(false);
  }

  async doImport() {
    const importData = this.import();
    if (!importData) {
      return;
    }
    this.importLoading.set(true);
    try {
      this.result.set(await this.api.getClient().backup().import({
        import: importData,
      }));
    } catch (error) {
      this.result.set(this.error.convert(error));
    }
    this.importLoading.set(false);
  }

}
