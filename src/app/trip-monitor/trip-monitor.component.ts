import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { ApiServiceService } from '../services/api-service.service';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-trip-monitor',
  templateUrl: './trip-monitor.component.html',
  styleUrls: ['./trip-monitor.component.scss'],
})
export class TripMonitorComponent implements OnInit {
  @ViewChild('sample')
  public listObj: DropDownListComponent;
  // define the JSON of data
  public filterBy: Object[] = [
    { Id: 'Game1', Game: 'Bus' },
    { Id: 'Game2', Game: 'Route' },
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Game', value: 'Id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to DropDownList input element
  public waterMark: string = 'Filter by';
  // set the value to select an item based on mapped value at initial rendering
  public filtervalue: string;
  Buses: Object;
  routes: Object;
  // public onChange(args: any): void {
  //   let value: Element = document.getElementById('value');
  //   let text: Element = document.getElementById('text');
  //   // update the text and value property values in property panel based on selected item in DropDownList
  //   // value.innerHTML = this.listObj.value.toString();
  //   // text.innerHTML = this.listObj.text;
  // }
  @ViewChild('ddlelement')
  public dropDownListObject: DropDownListComponent;
  activeTrips: Object;
  completedTrips: Object;
  onChangebus(args): void {
    this.apiService.getCompletedTripsByBus(args?.value).subscribe((Trips) => {
      console.log('hassan', Trips);

      this.completedTrips = Trips;
    });
  }
  onChangeroute(args): void {
    console.log(args.value);
    this.apiService.getActiveTripsByroute(args?.value).subscribe((Trips) => {
      this.activeTrips = Trips;
      console.log(Trips);
    });
    this.apiService.getCompletedTripsByroute(args?.value).subscribe((Trips) => {
      this.completedTrips = Trips;
      console.log(Trips);
    });
  }
  ngAfterViewInit(e: any): void {
    // call the change event's function after initialized the component.
    setTimeout(() => {
      // this.onChange(e);
    });
  }

  public data: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' },
  ];
  // maps the appropriate column to fields property
  public fields1: Object = { text: 'terminalID', value: 'terminalID' };
  public fields2: Object = { text: 'name', value: 'id' };
  // set the height of the popup element
  public height1: string = '220px';
  // set the placeholder to DropDownList input element
  public watermark: string = 'Select a country';
  // set the placeholder to filter search box input element
  public filterPlaceholder: string = 'Search';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.data, query);
  };
  constructor(private apiService: ApiServiceService) {
    this.apiService.getBuses().subscribe((Buses) => {
      this.Buses = Buses;
    });
    this.apiService.getRoutes().subscribe((routes) => {
      this.routes = routes;
      console.log(routes);
    });
    this.apiService.getActiveTripsByBus().subscribe((Trips:any) => {
      console.log('kordi', Trips);
      this.activeTrips = Trips.reverse();
    });
  }

  ngOnInit(): void {
   
  }
}
