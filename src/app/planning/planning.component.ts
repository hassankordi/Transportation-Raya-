import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  ColumnModel,
  GridComponent,
  ResizeService,
} from '@syncfusion/ej2-angular-grids';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { getInstance } from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { ListBox, ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ApiServiceService } from '../services/api-service.service';
import { car, driver, route } from './classitem';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ResizeService, DatePipe],
})
export class PlanningComponent implements OnInit {
  public route: Object;
  public car: Object;
  public driver: Object;
  public driverclass: driver;
  public carclass: car;
  public routeclass: route;
  routeSelected: string = '';
  carSelected: string = '';
  driverSelected: string = '';
  public record: any;
  dataTemp: any = null;
  weekDay: string[] = [];
  public value: string = 'Daily';
  plannedTrips: Object;
  completedTrips: Object;
  addDay(day) {
    if (this.weekDay.includes(day)) {
      const index = this.weekDay.indexOf(day);
      this.weekDay.splice(index, 1);
    } else {
      this.weekDay.push(day);
    }
  }
  @ViewChild('activegrid') public grid: GridComponent;
  @ViewChild('listroute') listroute: ListViewComponent;
  @ViewChild('listcar') listcar: ListViewComponent;
  @ViewChild('listdriver') listdriver: ListViewComponent;
  btnclick() {
    var val = Math.floor(10000 + Math.random() * 9000);
    this.record = {
      RideID: val,
      Route: this.routeSelected,
      Car: this.carSelected,
      Driver: this.driverSelected,
    };
    var newtrip = {
      // assignDate: new Date(),
      // cardUniID: this.driverclass.cardUniID,
      // endTimeStamp: null,
      // id: null,
      // latitude: this.routeclass.latitude,
      // longitude: this.routeclass.longitude,
      // passengerCount: 0,
      // routID: this.routeclass.id,
      // startTimeStamp: null,
      // status: 0,
      // terminalID: this.carclass.terminalID,
      // type: 0,
      // recurrentType: 0,
      // parentTripID: 0,
      // maxSpeed: 0,
      startTimeStamp: null,
      endTimeStamp: null,
      assignDate: new Date(),
      status: 0,
      cardUniID: this.driverclass.cardUniID,
      longitude: this.routeclass.latitude,
      latitude: this.routeclass.longitude,
      routID: this.routeclass.id,
      terminalID: this.carclass.terminalID,
      passengerCount: 0,
      type: 0,
      recurrentType: 0,
      parentTripID: 0,
      maxSpeed: 0,
    };
    this.activeGrid[this.activeGrid.length] = this.record;
    this.grid.refresh();
    // console.log(this.listroute.element);
    this.apiService.postTrip(newtrip).subscribe((x) => {});
    this.listcar.removeItem({ text: this.carSelected, id: 'car' });
    this.listdriver.removeItem({ text: this.driverSelected, id: 'driver' });
    this.routeSelected = '';
    this.carSelected = '';
    this.driverSelected = '';
  }
  change(args: ListBoxChangeEventArgs, name) {
    console.log(args.items[0]);
    if (name == 'route') {
      this.routeSelected = args.value[0];
      this.routeclass = args.items[0] as route;
    } else if (name == 'car') {
      this.carSelected = args.value[0];
      this.carclass = args.items[0] as car;
      console.log(this.carclass.terminalID);
    } else {
      this.driverSelected = args.value[0];
      this.driverclass = args.items[0] as driver;
      console.log(this.driverclass.cardUniID);
    }
  }

  public setfieldroute = { text: 'name' };
  public setfieldcar = { text: 'bassVendor' };
  public setfielddriver = { text: 'name' };
  constructor(private apiService: ApiServiceService) {
    // alert("hi")
    this.apiService.getRoutes().subscribe((routes) => {
      console.log("this is routes");
      console.log(routes);
      
      this.route = routes;
    },(err)=>{console.log(err);
    });
    // this.apiService.getnotActiveBuses().subscribe((Buses) => {
    //   this.car = Buses;
    // });
    this.apiService.getBuses().subscribe((Buses) => {
      console.log(Buses)
      this.car = Buses;
    });
    this.apiService.getDrivers().subscribe((drivers) => {
      console.log(drivers);
      
      this.driver = drivers;
    });
    this.apiService.getActiveRides().subscribe((activeRides) => {
      // console.log(activeRides);
    });
    this.apiService.getPlannedRides().subscribe((plannedRides) => {
      console.log("hkgymuf",plannedRides)
      this.plannedTrips = plannedRides;
    });
    this.apiService.getCompletedRides().subscribe((completedRides) => {
      console.log(completedRides);
      this.completedTrips = completedRides;
    });
  }

  public activeGrid: object[];
  public completedGrid: object[];
  public shipColumns: ColumnModel[];
  ngOnInit(): void {
    this.activeGrid = [];
    this.completedGrid = [
      { RideID: 10248, Route: 'Aswan', Driver: 'Adel', Car: 'bus 2' },
    ];
    this.shipColumns = [
      {
        field: 'rideID',
        headerText: 'Ride ID',
      },
      {
        field: 'route.name',
        headerText: 'Route',
      },
      {
        field: 'driver.name',
        headerText: 'Driver',
      },
      {
        field: 'car.bassVendor',
        headerText: 'Car',
      },
    ];
  }

  public year: number = new Date().getFullYear();
  public month: number = new Date().getMonth();
  public multiSelection: boolean = true;
  @ViewChild('calendar')
  public calendarObj: CalendarComponent;
  public dates: Date[] = [
    // new Date(this.year, this.month, 10),
    // new Date(this.year, this.month, 15),
    // new Date(this.year, this.month, 25),
  ];
  onValueChange(): void {
    console.log(this.calendarObj.values);
  }
}
