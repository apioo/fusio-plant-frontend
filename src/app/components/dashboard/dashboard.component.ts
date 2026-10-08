import {Component, inject, OnInit, signal} from '@angular/core';
import {ApiService} from "../../api.service";
import {ChartComponent} from "ngx-apexcharts";
import {ChartConverter, ChartOptions} from "../../services/chart-converter.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  cpuPerc = signal<ChartOptions|undefined>(undefined);
  memPerc = signal<ChartOptions|undefined>(undefined);
  netioReceived = signal<ChartOptions|undefined>(undefined);
  netioSent = signal<ChartOptions|undefined>(undefined);
  blockioWritten = signal<ChartOptions|undefined>(undefined);
  blockioRead = signal<ChartOptions|undefined>(undefined);

  private api = inject(ApiService);
  private chartConverter = inject(ChartConverter);

  async ngOnInit(): Promise<void> {
    const maxElements = 12;
    const dashboard = await this.api.getClient().dashboard().getAll();
    if (dashboard.cpuPerc) {
      this.cpuPerc.set(this.chartConverter.convert(dashboard.cpuPerc, maxElements));
    }
    if (dashboard.memPerc) {
      this.memPerc.set(this.chartConverter.convert(dashboard.memPerc, maxElements));
    }
    if (dashboard.netioReceived) {
      this.netioReceived.set(this.chartConverter.convert(dashboard.netioReceived, maxElements));
    }
    if (dashboard.netioSent) {
      this.netioSent.set(this.chartConverter.convert(dashboard.netioSent, maxElements));
    }
    if (dashboard.blockioWritten) {
      this.blockioWritten.set(this.chartConverter.convert(dashboard.blockioWritten, maxElements));
    }
    if (dashboard.blockioRead) {
      this.blockioRead.set(this.chartConverter.convert(dashboard.blockioRead, maxElements));
    }
  }

}
