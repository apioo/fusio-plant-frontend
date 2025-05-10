import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {ChartComponent} from "ngx-apexcharts";
import {ChartConverter, ChartOptions} from "../../services/chart-converter.service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  cpuPerc?: ChartOptions
  memPerc?: ChartOptions
  netioReceived?: ChartOptions
  netioSent?: ChartOptions
  blockioWritten?: ChartOptions
  blockioRead?: ChartOptions

  constructor(private api: ApiService, private chartConverter: ChartConverter) {
  }

  async ngOnInit(): Promise<void> {
    const maxElements = 12;
    const dashboard = await this.api.getClient().dashboard().getAll();
    if (dashboard.cpuPerc) {
      this.cpuPerc = this.chartConverter.convert(dashboard.cpuPerc, maxElements);
    }
    if (dashboard.memPerc) {
      this.memPerc = this.chartConverter.convert(dashboard.memPerc, maxElements);
    }
    if (dashboard.netioReceived) {
      this.netioReceived = this.chartConverter.convert(dashboard.netioReceived, maxElements);
    }
    if (dashboard.netioSent) {
      this.netioSent = this.chartConverter.convert(dashboard.netioSent, maxElements);
    }
    if (dashboard.blockioWritten) {
      this.blockioWritten = this.chartConverter.convert(dashboard.blockioWritten, maxElements);
    }
    if (dashboard.blockioRead) {
      this.blockioRead = this.chartConverter.convert(dashboard.blockioRead, maxElements);
    }
  }

}
