import {Config as SdkConfig} from "ngx-fusio-sdk/lib/config/config";
import {environment} from "../environments/environment";

export class ConfigBuilder {

  public static getConfig(): SdkConfig {
    return {
      baseUrl: environment.baseUrl,
      title: 'Fusio Plant',
      version: '0.1',
      logo: 'fusio_64px.png',
      homePath: '/',
      loginPath: '/login',
      navigation: [{
        title: 'Server',
        visible: true,
        children: [{
          title: 'Dashboard',
          icon: 'bi-server',
          path: '/',
        }, {
          title: 'Project',
          icon: 'bi-terminal-fill',
          path: '/project',
        }]
      }],
      helpUrl: 'https://plant.fusio-project.org/help/',
    };
  }

}
