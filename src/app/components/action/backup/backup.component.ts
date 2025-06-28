import {Component} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {Message} from "../../../generated/Message";

@Component({
  selector: 'app-system-backup',
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {

  export = '';
  import = '';

  result?: Message;
  exportLoading = false;
  importLoading = false;

  constructor(private api: ApiService, private error: ErrorService) {
  }

  async doExport() {
    this.exportLoading = true;
    try {
      const backup = await this.api.getClient().backup().export({});
      this.export = backup.export || '';
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.exportLoading = false;
  }

  async doImport() {
    if (!this.import) {
      return;
    }
    this.importLoading = true;
    try {
      this.result = await this.api.getClient().backup().import({
        import: this.import,
      });
    } catch (error) {
      this.result = this.error.convert(error);
    }
    this.importLoading = false;
  }

}
