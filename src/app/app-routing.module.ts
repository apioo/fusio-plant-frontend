import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountContainerComponent, AccountRoute, AuthorizationRoute, EntityRoute, isAuthenticated} from "ngx-fusio-sdk";
import {ListComponent as ProjectList} from "./components/project/list/list.component";
import {DetailComponent as ProjectDetail} from "./components/project/detail/detail.component";
import {FormComponent as ProjectForm} from "./components/project/form/form.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [isAuthenticated] },
  { path: 'project', canActivate: [isAuthenticated], children: EntityRoute.getAll(ProjectList, ProjectDetail, ProjectForm) },
  { path: 'account', component: AccountContainerComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll() },
];

routes.push(...AuthorizationRoute.getAll());

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
