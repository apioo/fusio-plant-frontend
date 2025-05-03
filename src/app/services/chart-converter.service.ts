import {ApexAxisChartSeries, ApexXAxis} from "ngx-apexcharts";
import {Injectable} from "@angular/core";
import {DashboardChart} from "../generated/DashboardChart";
import {DashboardChartSeries} from "../generated/DashboardChartSeries";

@Injectable({
  providedIn: 'root'
})
export class ChartConverter {

  public convert(data: DashboardChart, maxElements?: number): ChartOptions {
    let labels = data.labels?.map((value) => {
      return value.substring(5);
    });

    if (maxElements) {
      labels = labels?.slice(maxElements * -1);
    }

    return {
      series: this.convertChartData(data.series, maxElements),
      xaxis: {
        categories: labels || []
      },
    };
  }

  private convertChartData(series?: Array<DashboardChartSeries>, maxElements?: number): ApexAxisChartSeries {
    if (!series) {
      return [];
    }

    let dataSets: Array<{ name: string, data: Array<number> }> = [];

    for (let i = 0; i < series.length; i++) {
      let values: Array<number> = [];
      if (Array.isArray(series[i].data)) {
        if (maxElements) {
          values = series[i].data?.slice(maxElements * -1) || [];
        } else {
          values = series[i].data || [];
        }
      }

      dataSets.push({
        name: series[i].name || '',
        data: values,
      })
    }

    return dataSets;
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries
  xaxis: ApexXAxis
};
