import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mapping-historic-trips',
  templateUrl: './mapping-historic-trips.component.html',
  styleUrls: ['./mapping-historic-trips.component.scss'],
})


export class MappingHistoricTripsComponent implements OnInit {

  isOpen: boolean = true
  reloadTextBtn = "Choose Another Date"
  public data: string[] = ['Snooker', 'Tennis', 'Cricket', 'Football', 'Rugby'];
  public data1: string[] = ['Hassan', 'Kordi', 'Cricket', 'Football', 'Rugby'];
  buses: any = [];
  drivers: any = []
  routes: any = []
  tripDate: any = []
  disabledFlag = true;
  driverChange = undefined
  routeChange = undefined
  busChange = undefined
  tripData: any = {}
  fatouh;
  checked: boolean = false;



  constructor(private _ApiServiceService: ApiServiceService, private date: DatePipe) {


  }

  ngOnInit(): void {


    this._ApiServiceService.getDrivers().subscribe(res => {
      this.drivers = res
    })

    this._ApiServiceService.getRoutes().subscribe(res => {
      this.routes = res

    })
    this._ApiServiceService.getBuses().subscribe((res: any) => {
      this.buses = res
      console.log(this.buses)
    })
  }
  onDriverChange(id) {
    this.driverChange = id
    this._ApiServiceService.getHestoricaltrip(this.driverChange, this.routeChange, this.busChange).subscribe(res => {
      this.tripDate = res
      this.disabledFlag = false
    })
  }
  onRouteChange(id) {
    this.routeChange = id
    this._ApiServiceService.getHestoricaltrip(this.driverChange, this.routeChange, this.busChange).subscribe(res => {
      this.tripDate = res
      this.disabledFlag = false
    })

  }
  onBusChange(id) {
    this.busChange = id
    this._ApiServiceService.getHestoricaltrip(this.driverChange, this.routeChange, this.busChange).subscribe(res => {
      this.tripDate = res
    })
  }
  // ngOnDestroy() {
  //   window.location.reload();
  // }
  reload() {
    // alert("reload")
    this.isOpen = !this.isOpen
    // alert(this.isOpen)
    // window.location.reload();
  }
  // onde
  onDateChange(tripId) {
    console.log(tripId)
    this.isOpen = false

    // alert(this.isOpen)
  //  if()
  setTimeout(() => {
     
    this.isOpen = true
    
  }, 50);
  
    setTimeout(() => {
     
      this._ApiServiceService.onDateChange.next(tripId)
      
    }, 100);
    // JSON.stringify(localStorage.setItem('dataSource',tripId))   
    // window.location.reload();
    this.checked = true;
    this._ApiServiceService.getTripById(tripId).subscribe(res => {
      this.tripData = res;
      this.fatouh = res;


    })
  }


}
