import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import {
  SelectionService,
  RowSelectEventArgs,
  GridComponent,
  FilterService,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { getData } from './data';
import { WebApiAdaptor } from '@syncfusion/ej2-data';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment.prod';




import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexAnnotations
} from "ng-apexcharts";
// import { dataSeries } from "./data-series"

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};


const SERVICE_URI: string =
  'https://ej2services.syncfusion.com/production/web-services/';

type carType = {
  CustomerID: string;
  CustomerName: string;
  ContactName: string;
};

@Component({
  selector: 'app-trip-monitor-active-grid',
  templateUrl: './trip-monitor-active-grid.component.html',
  styleUrls: ['./trip-monitor-active-grid.component.css'],
  providers: [SelectionService, FilterService, VirtualScrollService],
})
export class TripMonitorActiveGridComponent implements OnInit {
  @Input() childMessage: Object;
  public data: Object;
  public key: string = null;
  public dReady: boolean = false;
  flag: any = false;
  public dtTime: boolean = false;
  public isDataBound: boolean = false;
  public isDataChanged: boolean = true;
  public intervalFun: any;
  public clrIntervalFun: any;
  public clrIntervalFun1: any;
  public clrIntervalFun2: any;
  public dropSlectedIndex: number = null;
  public stTime: any;
  public filter: Object;
  public initialPage: Object;
  public filterSettings: Object;
  public selectionSettings: Object;
  public height: string = '240px';
  @ViewChild('overviewgrid')
  public gridInstance: GridComponent;
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];
  TripData: Object;






  

// chart variables
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;


  

  


  constructor(private apiService: ApiServiceService) {}

  public ngOnInit(): void {
    // this.openModal()
    this.data = new DataManager({
      url: SERVICE_URI + 'api/Trips/GetAllTrips',
      adaptor: new WebApiAdaptor(),
    });
    // this.data = getData(1000);
    this.filterSettings = { type: 'Menu' };
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.filter = { type: 'CheckBox' };
    this.stTime = performance.now();
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      checkboxOnly: true,
    };
  }

  ngAfterViewInit(args: any): void {}

  public onRowSelected(args: RowSelectEventArgs): void {

   
    const queryData: any = args.data;
    this.key = queryData.tripID;
    // get trip id
    console.log(this.key);

    // speed chart here
     this.apiService.getSpeedChart(this.key).subscribe((res) => {
      let arr = []
      for (let i = 0; i < res.length; i++) {
    
        let x = [res[i].timeStamp, res[i].speed]
        arr.push(x)
      }

      // alert("hi from getting chart")
      this.initChartData(arr);
      console.log(arr);
    }, (err) => {
      console.log(err);
    });
    // speed chart end


    this.apiService.onsendId.next(this.key)
    JSON.stringify(localStorage.setItem('dataSource',this.key))
    this.apiService.getCompletedTripsByBus(this.key).subscribe((Trip) => {
     
      this.TripData = Trip;

      console.log("hii",this.TripData);
      this.flag = true;
    });

    const dataSource: object[] = new DataManager().executeLocal(
      new Query().where('CustomerName', 'equal', queryData.ContactName)
    );
  }


  back() {
    this.flag = false;
  }




  public initChartData(array): void {
    // let ts2 = 1484418600000;
    let dates = array;
    // let dates = [];

    // for (let i = 0; i < 120; i++) {
    //   ts2 = ts2 + 86400000;
    //   dates.push([ts2, dataSeries[1][i].value]);
    // }

    // for (let i = 0; i < 40; i++) {
    //   ts2 = ts2 + 86400000;
    //   dates.push([ts2, array[i][1]]);
    // }

    


    // console.log(dates);


    this.series = [
      {
        name: "Speed",
        data: dates
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
     
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
       
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: "Trip Speed",
      align: "left"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter: function (val) {
          return (val ).toFixed(0);
        }
      },
      title: {
        text: "Speed"
      }
    };

    this.xaxis = {
      type: "datetime" , 
      labels: {
        show:true ,

        // formatter: function (val ) {

        //   alert(val)
        //   let m = Number(val);
          
        //   let x = (m/3600000).toFixed(0)
        //   // alert(m)
        //   // let my = ;
        //   // JSON.stringify(my)
        //   // val = val+2
        //   // alert(val)
        //   return (val);
          
        //   // // let my = Number(val).toFixed(0);
        //   // // JSON.stringify(my)
          
        //   // return (val).toFixed(0);
        // }

      },
     
    };
    // this.xaxis = {
    //   labels: {
    //     // formatter: function (val ) {

    //     //   // val = val+2
    //     //   alert(val)
    //     //   return (val);
          
    //     //   // // let my = Number(val).toFixed(0);
    //     //   // // JSON.stringify(my)
          
    //     //   // return (val).toFixed(0);
    //     // }

    //   },
      
    // };
    // this.xaxis.labels.format = 'HH:mm'
    // this.xaxis.labels.datetimeFormatter.hour = "2022-01-26T08:07:57"
    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          
          return (val).toFixed(0);
        }
      }
    };
  }

}
