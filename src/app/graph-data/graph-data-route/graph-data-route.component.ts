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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-graph-data-route',
  templateUrl: './graph-data-route.component.html',
  styleUrls: ['./graph-data-route.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphDataRouteComponent implements OnInit {
  public graph: Object = {};
  values: any;
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
  chartflag ?: boolean = false;
  constructor(private apiService: ApiServiceService) {
    //code
  }
  public grid ?: Object={};
  public initialPage ?: Object = {};
  myArgs ? : any = {};
  argsValue ? : string = '';
  picker ? : any;
  picker2 ? : any;
  dateControl = new FormControl('');
  dateControl2 = new FormControl('');
  date1 ? : string = '';
  date2 ? : string = '';
  duration ? : number;



  ngOnInit(): void {

    this.initialPage = { pageSizes: true, pageCount: 4 };
    setTimeout(() => {
      this.chartflag = true;
      // this.chartcolumn?.refresh();
    }, 1200);
  }
  compairName: string = '';
  compairData: string = '';
  // xName: string;
  yName: string = '';
  public filter: any = [
    { text: 'Stops', value: 0, field: 'stopsCount' },
    { text: 'Passanger', value: 1, field: 'passangerCount' },
    { text: 'Trips', value: 2, field: 'tripCount' },
    { text: 'Driver', value: 3, field: 'driver' },
  ];
  @ViewChild('ddlelement')
  public dropDownListObject: DropDownListComponent;
  @ViewChild('contain')
  public contain: GridComponent;
  // onChange(args): void {
  //   this.myArgs = args
  //   console.log(this.myArgs)
  // }
  fromDate(event) {
    this.date1 = new Date(
      event.target.value.setHours(new Date(event.target.value).getHours() + 2)
    ).toISOString();
    this.date1.substring(0, this.date1.length - 1);
    console.log(typeof(this.date1) )
  }
  endDate(event) {
    this.date2 = new Date(
      event.target.value.setHours(new Date(event.target.value).getHours() + 2)
    ).toISOString();
    this.date2.substring(0, this.date2.length - 1);
    console.log(this.date2)
  }
  optionValue(elem) {
    this.duration = elem
    console.log(this.duration)

  }

  onChange(args) {
  console.log(event)
  this.compairName = args.itemData.text;
  this.compairData = args.itemData.field;
  this.yName = args.itemData.field;
  this.xtitle = args.itemData.text;

  this.apiService.getDashboard(args.itemData.value).subscribe((res) => {
    console.log(res);
    this.grid = res;
    this.graph = res;
    this.contain.refresh();
    //this.chartcolumn?.refresh();
  });
    

   }

}
