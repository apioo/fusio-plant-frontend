import {Config} from "ngx-fusio-sdk";

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
      version: '0.2',
      logo: 'assets/fusio_64px.png',
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
          title: 'Backup',
          icon: 'bi-building-fill-lock',
          path: '/action/backup',
        }, {
          title: 'Login',
          icon: 'bi-door-open',
          path: '/action/login',
        }, {
          title: 'Certbot',
          icon: 'bi-shield-lock-fill',
          path: '/action/certbot',
        }]
      }, {
        title: 'Munin',
        visible: false,
        children: [{
          title: 'Disk',
          icon: 'bi-image-fill',
          path: '/munin/disk',
        }, {
          title: 'Network',
          icon: 'bi-cpu-fill',
          path: '/munin/network',
        }, {
          title: 'Processes',
          icon: 'bi-bar-chart-fill',
          path: '/munin/processes',
        }, {
          title: 'Radio',
          icon: 'bi-bar-chart-fill',
          path: '/munin/radio',
        }, {
          title: 'System',
          icon: 'bi-bar-chart-fill',
          path: '/munin/system',
        }]
      }],
    }
  }

}
