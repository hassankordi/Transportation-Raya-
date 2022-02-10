import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-trip-monitor-chart',
  templateUrl: './trip-monitor-chart.component.html',
  styleUrls: ['./trip-monitor-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripMonitorChartComponent implements OnInit {
  public data: Object[] = [
    { x: '1/11/2021', y: 111 },
    { x: '2/11/2021', y: 127 },
    { x: '3/11/2021', y: 143 },
    { x: '4/11/2021', y: 159 },
    { x: '5/11/2021', y: 120 },
    { x: '6/11/2021', y: 115 },
    { x: '7/11/2021', y: 133},
    { x: '8/11/2021', y: 119 },
    { x: '9/11/2021', y: 150 },
    { x: '10/11/2021', y: 144 },
  ];

  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    title: 'Passenger',
    lineStyle: { width: 0 },
    interval: 30,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };
  public tooltip: Object = {
    enable: true,
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        'Dark'
      )
    );
  }
  // custom code end
  public title: string = 'Passenger Count';
  public chartArea: Object = {
    border: {
      width: 0,
    },
  };
  public radius: Object = {
    bottomLeft: 0,
    bottomRight: 0,
    topLeft: 5,
    topRight: 5,
  };
  @ViewChild('chartcolumn')
  public chartcolumn: ChartComponent;
  chartflag: boolean = false;
  constructor() {
    //code
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.chartflag = true;
      this.chartcolumn?.refresh();
    }, 800);
  }
}
