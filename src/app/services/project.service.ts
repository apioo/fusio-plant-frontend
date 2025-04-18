import {Injectable} from '@angular/core';
import {Service} from "ngx-fusio-sdk";
import {Project} from "../generated/Project";
import {ApiService} from "../api.service";
import {CommonCollection} from "../generated/CommonCollection";
import {Message} from "../generated/Message";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends Service<Project> {

  constructor(private fusio: ApiService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<Project>> {
    return this.fusio.getClient().project().getAll(...parameters);
  }

  async get(id: string): Promise<Project> {
    return this.fusio.getClient().project().get(id);
  }

  async create(entity: Project): Promise<Message> {
    return this.fusio.getClient().project().create(entity);
  }

  async update(entity: Project): Promise<Message> {
    return this.fusio.getClient().project().update('' + entity.id, entity);
  }

  async delete(entity: Project): Promise<Message> {
    return this.fusio.getClient().project().delete('' + entity.id);
  }

  newEntity(): Project {
    return {
      name: '',
      apps: [],
    };
  }

  getLink(): Array<string> {
    return ['/', 'project'];
  }

}
