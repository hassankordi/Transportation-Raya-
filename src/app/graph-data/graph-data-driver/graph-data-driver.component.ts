import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {
  ILoadedEventArgs,
  ChartTheme,
  ChartComponent,
} from '@syncfusion/ej2-angular-charts';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-graph-data-driver',
  templateUrl: './graph-data-driver.component.html',
  styleUrls: ['./graph-data-driver.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphDataDriverComponent implements OnInit {
  public graph: Object;

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
  xtitle: string = 'Compair';
  public primaryYAxis: Object = {
    lineStyle: { width: 0 },
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
  constructor(private apiService: ApiServiceService) {
    //code
  }
  public grid: Object;
  public initialPage: Object;

  ngOnInit(): void {
    this.initialPage = { pageSizes: true, pageCount: 4 };
    setTimeout(() => {
      this.chartflag = true;
      this.chartcolumn?.refresh();
    }, 1200);
  }
  compairName: string;
  compairData: string;
  // xName: string;
  yName: string;
  public filter: object[] = [
    { text: 'MaxSpeed', value: 4, field: 'maxSpeed' },
    { text: 'Trips', value: 5, field: 'trips' },
    { text: 'Passangers', value: 6, field: 'passanger' },
  ];
  @ViewChild('ddlelement')
  public dropDownListObject: DropDownListComponent;
  @ViewChild('contain')
  public contain: GridComponent;
  onChange(args): void {
    this.compairName = args.itemData.text;
    this.compairData = args.itemData.field;
    this.yName = args.itemData.field;
    this.xtitle = args.itemData.text;
    this.apiService.getDashboard(args.itemData.value).subscribe((res) => {
      console.log(res);
      this.grid = res;
      this.graph = res;
      this.contain.refresh();
      this.chartcolumn?.refresh();
    }, (err)=>{
      console.log(err);
      
    });
  }
}
