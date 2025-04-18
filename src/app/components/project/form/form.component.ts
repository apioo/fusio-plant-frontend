import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../generated/Project";

@Component({
  selector: 'app-project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<Project> {

  type?: string;

  constructor(private service: ProjectService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ProjectService {
    return this.service;
  }

  loadPreset() {
    if (!this.entity) {
      return;
    }

    if (this.type === 'fusio') {
      this.entity.apps = [{
        name: 'fusio',
        image: 'fusio/fusio:5.2',
        environment: {
          FUSIO_TENANT_ID: '',
          FUSIO_PROJECT_KEY: '23400df2bc6ef7daa75c847c79b6419e6836b578',
          FUSIO_URL: '',
          FUSIO_APPS_URL: '',
          FUSIO_ENV: 'prod',
          FUSIO_DEBUG: 'false',
          FUSIO_CONNECTION: 'pdo-mysql://fusio:5ab46d406e19a0622628@mysql_fusio/fusio',
          FUSIO_BACKEND_USER: '',
          FUSIO_BACKEND_EMAIL: '',
          FUSIO_BACKEND_PW: '',
          FUSIO_MAILER: '',
          FUSIO_MAIL_SENDER: '',
          FUSIO_TRUSTED_IP_HEADER: 'X-Forwarded-For',
          STRIPE_API_KEY: '',
          STRIPE_WEBHOOK_KEY: '',
          RECAPTCHA_KEY: '',
          RECAPTCHA_SECRET: '',
        },
        links: [
          'mysql'
        ]
      }, {
        name: 'mysql',
        image: 'mysql:8.0',
        environment: {
          MYSQL_ROOT_PASSWORD: '5ab46d406e19a0622628',
          MYSQL_USER: 'fusio',
          MYSQL_PASSWORD: '5ab46d406e19a0622628',
          MYSQL_DATABASE: 'fusio',
        },
        volumes: [{
          source: '/var/lib/mysql',
          destination: './db',
        }]
      }];
    } else if (this.type === 'wordpress') {
    } else if (this.type === 'nextcloud') {
    } else if (this.type === 'drupal') {
    } else if (this.type === 'matomo') {
    } else if (this.type === 'joomla') {
    } else if (this.type === 'mediawiki') {
    } else if (this.type === 'plone') {

    }

  }

}
