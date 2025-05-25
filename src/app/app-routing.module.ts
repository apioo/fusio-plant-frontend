import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountContainerComponent, AccountRoute, AuthorizationRoute, EntityRoute, isAuthenticated} from "ngx-fusio-sdk";
import {ListComponent as ProjectList} from "./components/project/list/list.component";
import {DetailComponent as ProjectDetail} from "./components/project/detail/detail.component";
import {FormComponent as ProjectForm} from "./components/project/form/form.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CertbotComponent} from "./components/system/certbot/certbot.component";
import {LoginComponent} from "./components/system/login/login.component";
import {ImagesComponent} from "./components/system/images/images.component";
import {PsComponent} from "./components/system/ps/ps.component";
import {StatsComponent} from "./components/system/stats/stats.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [isAuthenticated] },
  { path: 'project', canActivate: [isAuthenticated], children: EntityRoute.getAll(ProjectList, ProjectDetail, ProjectForm) },
  { path: 'system/certbot', component: CertbotComponent, canActivate: [isAuthenticated] },
  { path: 'system/images', component: ImagesComponent, canActivate: [isAuthenticated] },
  { path: 'system/login', component: LoginComponent, canActivate: [isAuthenticated] },
  { path: 'system/ps', component: PsComponent, canActivate: [isAuthenticated] },
  { path: 'system/stats', component: StatsComponent, canActivate: [isAuthenticated] },
  { path: 'account', component: AccountContainerComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll() },
];

routes.push(...AuthorizationRoute.getAll());

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
