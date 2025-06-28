import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {ApiService as SDK, BootstrapComponent, FusioSdkModule} from "ngx-fusio-sdk";
import {ConfigBuilder} from "./config-builder";
import {ApiService} from "./api.service";
import {ListComponent as ProjectList} from "./components/project/list/list.component";
import {DetailComponent as ProjectDetail} from "./components/project/detail/detail.component";
import {FormComponent as ProjectForm} from "./components/project/form/form.component";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {AppsComponent} from "./components/project/apps/apps.component";
import {LogsComponent as ProjectLogsComponent} from "./components/project/logs/logs.component";
import {PsComponent as ProjectPsComponent} from "./components/project/ps/ps.component";
import {StatsComponent as ProjectStatsComponent} from "./components/project/stats/stats.component";
import {ImagesComponent} from "./components/insight/images/images.component";
import {PsComponent} from "./components/insight/ps/ps.component";
import {StatsComponent} from "./components/insight/stats/stats.component";
import {CertbotComponent} from "./components/action/certbot/certbot.component";
import {LoginComponent} from "./components/action/login/login.component";
import {BackupComponent} from "./components/action/backup/backup.component";

@NgModule({
  declarations: [
    BackupComponent,
    CertbotComponent,
    LoginComponent,
    ImagesComponent,
    PsComponent,
    StatsComponent,
    ProjectList,
    ProjectDetail,
    ProjectForm,
    ProjectLogsComponent,
    ProjectPsComponent,
    ProjectStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    FusioSdkModule.forRoot(ConfigBuilder.build()),
    TypeschemaEditorModule,
    AppsComponent,
  ],
  providers: [
    {
      provide: SDK,
      useExisting: ApiService
    },
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
