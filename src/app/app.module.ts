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

@NgModule({
  declarations: [
    ProjectList,
    ProjectDetail,
    ProjectForm,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    FusioSdkModule.forRoot(ConfigBuilder.getConfig()),
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
