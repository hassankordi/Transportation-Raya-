import { Component, OnInit, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { FormControl } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-graph-data-time',
  templateUrl: './graph-data-time.component.html',
  styleUrls: ['./graph-data-time.component.scss']
})
export class GraphDataTimeComponent implements OnInit , OnInit {
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
  selectValues ? = [
    { value: 0 , viewValue: 'today' },
    { value: 1 , viewValue: 'Yesterday' },
    { value: 2 , viewValue: 'Last week' },
    { value: 3 , viewValue: 'Last Month' },
  ];


  constructor(private apiService: ApiServiceService) { }

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
    { text: 'Driver', value: 2, field: 'driver' },
    { text: 'maxSpeed', value: 11, field: 'maxSpeed' },
  ];
  @ViewChild('ddlelement')
  public dropDownListObject: DropDownListComponent;
  @ViewChild('contain')
  public contain: GridComponent;
  onChange(args): void {
    this.myArgs = args
    console.log(this.myArgs)
  }
  optionValue(elem) {
    this.duration = elem
    console.log(this.duration)

  }
  onSearch() {
    this.compairName = this.myArgs.itemData.text;
    this.compairData = this.myArgs.itemData.field;
    this.yName = this.myArgs.itemData.field;
    // this.xtitle = this.myArgs.itemData.text ;
    console.log('hey', this.myArgs)
    
    this.apiService.getDashboard(this.myArgs.itemData.value, this.duration).subscribe((res) => {
      console.log(res);
      this.grid = res;
      this.graph = res;
      this.contain.refresh();
      // this.chartcolumn?.refresh();
    },(err)=>{console.log(err);
    });

  }

}
