import {Routes} from '@angular/router';
import {AccountContainerComponent, AccountRoute, EntityRoute, isAuthenticated, LoginComponent} from "ngx-fusio-sdk";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ListComponent as ProjectList} from "./components/project/list/list.component";
import {DetailComponent as ProjectDetail} from "./components/project/detail/detail.component";
import {FormComponent as ProjectForm} from "./components/project/form/form.component";
import {LogsComponent as ProjectLogsComponent} from "./components/project/logs/logs.component";
import {PsComponent as ProjectPsComponent} from "./components/project/ps/ps.component";
import {StatsComponent as ProjectStatsComponent} from "./components/project/stats/stats.component";
import {ImagesComponent} from "./components/insight/images/images.component";
import {PsComponent} from "./components/insight/ps/ps.component";
import {StatsComponent} from "./components/insight/stats/stats.component";
import {BackupComponent} from "./components/action/backup/backup.component";
import {CertbotComponent} from "./components/action/certbot/certbot.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [isAuthenticated] },
  { path: 'project', canActivate: [isAuthenticated], children: EntityRoute.getAll(ProjectList, ProjectDetail, ProjectForm) },
  { path: 'project/:id/logs', component: ProjectLogsComponent, canActivate: [isAuthenticated] },
  { path: 'project/:id/ps', component: ProjectPsComponent, canActivate: [isAuthenticated] },
  { path: 'project/:id/stats', component: ProjectStatsComponent, canActivate: [isAuthenticated] },
  { path: 'insight/images', component: ImagesComponent, canActivate: [isAuthenticated] },
  { path: 'insight/ps', component: PsComponent, canActivate: [isAuthenticated] },
  { path: 'insight/stats', component: StatsComponent, canActivate: [isAuthenticated] },
  { path: 'action/backup', component: BackupComponent, canActivate: [isAuthenticated] },
  { path: 'action/login', component: LoginComponent, canActivate: [isAuthenticated] },
  { path: 'action/certbot', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'munin/disk', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'munin/network', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'munin/processes', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'munin/radio', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'munin/system', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'account', component: AccountContainerComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll() },

];
