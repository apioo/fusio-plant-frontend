import {Config} from "ngx-fusio-sdk/lib/config/config";

export class ConfigBuilder {

  public static build(): Config {
    let baseUrl: string = '';
    let appKey: string = '';

    if (typeof FUSIO_URL === 'string') {
      baseUrl = FUSIO_URL;
      if (typeof FUSIO_APP_KEY === 'string') {
        appKey = FUSIO_APP_KEY;
      }
    }

    return {
      baseUrl: baseUrl,
      title: 'Fusio Plant',
      version: '0.1',
      logo: 'fusio_64px.png',
      appKey: appKey && appKey !== '${APP_KEY}' ? appKey : undefined,
      homePath: '/',
      loginPath: '/login',
      helpUrl: 'https://docs.fusio-project.org/docs/plant/',
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
      }, {
        title: 'Insight',
        visible: false,
        children: [{
          title: 'Images',
          icon: 'bi-image-fill',
          path: '/insight/images',
        }, {
          title: 'Processes',
          icon: 'bi-cpu-fill',
          path: '/insight/ps',
        }, {
          title: 'Stats',
          icon: 'bi-bar-chart-fill',
          path: '/insight/stats',
        }]
      }, {
        title: 'Action',
        visible: false,
        children: [{
          title: 'Login',
          icon: 'bi-door-open',
          path: '/action/login',
        }, {
          title: 'Certbot',
          icon: 'bi-shield-lock-fill',
          path: '/action/certbot',
        }]
      }],
    }
  }

}
