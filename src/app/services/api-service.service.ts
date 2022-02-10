import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {

 sendTripIdSub = new Subject()
 sendTripAsync = this.sendTripIdSub.asObservable()


 onDateChange = new Subject()
 onDateChangeAsync = this.onDateChange.asObservable() 

  // onChangebus = new Subject()
  // onChangebusAsync = this.onChangebus.asObservable()

 onsendId = new Subject()
 onRecieveIdAsync = this.onsendId.asObservable()


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getSpeedChart(id):Observable<any>{
return this.http.get(`http://192.168.1.51/transport/api/Trips/TripSpeedGraph?TripId=${id as number}`)
  }



  getRoutes(): Observable<any> {
    return this.http.get(environment.sourceUrl + '/routs');
  } 
  getPassangerPostion(id:number): Observable<any> {
    return this.http.get(environment.sourceUrl + `/Passangers/GetPassangerPostion?TripID=${id}`);
  }

  addRoute(route) {
    return this.http.post<any>(
      environment.sourceUrl + `/routs`,
      route,
      this.httpOptions
    );
  }

  getHestoricaltrip(driverUniID : string , routeID : number , terminalID : string) {
    if(driverUniID !== undefined && routeID !== undefined && terminalID !== undefined) {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?driverUniID=${driverUniID}&routeID=${routeID}&terminalID=${terminalID}`)
    }else if(driverUniID !== undefined && routeID !== undefined ) {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?driverUniID=${driverUniID}&routeID=${routeID}`)
    } else if(routeID !== undefined && terminalID !== undefined) {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?routeID=${routeID}&terminalID=${terminalID}`)
    }else  if(driverUniID !== undefined && terminalID !== undefined) {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?driverUniID=${driverUniID}&terminalID=${terminalID}`)
    }else  if(driverUniID !== undefined ) {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?driverUniID=${driverUniID}`)
    }else {
      return this.http.get(environment.sourceUrl + `/Trips/GetHestoricalTripsFilter?routeID=${routeID}`)
    }
  }


  putRoutes(route) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.put<any>(
      environment.sourceUrl + `/routs/${route.id}`,
      route,
      this.httpOptions
    );
  }
  deleteRoute(route) {
    return this.http.delete(environment.sourceUrl + `/routs/${route.id}`);
  }

  /************** Passenger *****************/
  getPassenger(): Observable<any> {
    return this.http.get(environment.sourceUrl + '/passengers');
  }
  addPassenger(passenger) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.post<any>(
      environment.sourceUrl + `/passengers`,
      passenger,
      this.httpOptions
    );
  }
  putPassenger(passenger: any) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.put<any>(
      environment.sourceUrl + `/passengers/${passenger.id}`,
      passenger,
      this.httpOptions
    );
  }
  DeletePassenger(passenger: any) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.delete<any>(
      environment.sourceUrl + `/passengers/${passenger.id}`,
      this.httpOptions
    );
  }
  addPoints(data){
    return this.http.post<any>(
      environment.sourceUrl + `/RechargeTransActions`,
      data,
      this.httpOptions
    );
  }
  getPassengerTransAction(): Observable<any> {
    return this.http.get(environment.sourceUrl + '/RechargeTransActions');
  }

  /************ Driver ***************/
  getDrivers() {
    return this.http.get(environment.sourceUrl + '/drivers');
  }

  getDashboard(filter?  , Duration?) {
    
    console.log("service" ,filter   , Duration );
    
    if(filter !== undefined  && Duration !== undefined ){
     
      return this.http.get(environment.sourceUrl + `/DashBoard?Filter=${filter}&Duration=${Duration}`);
    }else {
      
      return this.http.get(environment.sourceUrl + `/DashBoard?Filter=${filter}`);
    }
  }
  addDriver(driver) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.post<any>(
      environment.sourceUrl + `/drivers`,
      driver,
      this.httpOptions
    );
  }
  putDriver(driver: any) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.put<any>(
      environment.sourceUrl + `/drivers/${driver.id}`,
      driver,
      this.httpOptions
    );
  }
  DeleteDriver(driver: any) {
    // http://192.168.1.51/transport/api/routs/1
    return this.http.delete<any>(
      environment.sourceUrl + `/drivers/${driver.id}`,
      this.httpOptions
    );
  }

  /**************Vehicle ************* */
  getBuses() {
    return this.http.get(environment.sourceUrl + '/buses');
  }
  addVehicle(Vehicle) {
    return this.http.post<any>(
      environment.sourceUrl + `/buses`,
      Vehicle,
      this.httpOptions
    );
  }
  putVehicle(Vehicle: any) {
    return this.http.put<any>(
      environment.sourceUrl + `/buses/${Vehicle.id}`,
      Vehicle,
      this.httpOptions
    );
  }
  DeleteVehicle(Vehicle: any) {
    return this.http.delete<any>(
      environment.sourceUrl + `/buses/${Vehicle.id}`,
      this.httpOptions
    );
  }

  getnotActiveBuses() {
    return this.http.get(environment.sourceUrl + '/Buses/GetNotActiveBuses');
  }


  getActiveRides() {
    return this.http.get(environment.sourceUrl + '/trips/Getactivetrips');
  }
  getPlannedRides() {
    return this.http.get(environment.sourceUrl + '/trips');
  }
  getCompletedRides() {
    return this.http.get(environment.sourceUrl + '/Trips/GetCompletedTrips');
  }
  /**/ // */
  getActiveTripsByBus() {
    return this.http.get(
      // /Trips/GetActiveTripsByRouteID/123
      environment.sourceUrl + `/Trips/GetAllTrips`
    );
  }
  /**/ // */

  getCompletedTripsByBus(TerminalID) {
    return this.http.get(
      environment.sourceUrl +
        `/Passengers/GetPassengerByTripID?tripid=${TerminalID}`
    );
  }

  /******konna 48aleen hena */
  getActiveTripsByroute(TerminalID) {
    console.log(TerminalID);
    // (TerminalID)
    return this.http.get(
      environment.sourceUrl + `/Trips/GetActiveTripsByRouteID/${TerminalID}`
    );
  }
  getCompletedTripsByroute(TerminalID) {
    return this.http.get(
      environment.sourceUrl + `/Trips/GetCompletedTripsByRouteID/${TerminalID}`
    );
  }
  postTrip(trip) {
    return this.http.post<any>(
      environment.sourceUrl + `/trips`,
      trip,
      this.httpOptions
    );
  }
  getTripById(id) {
    return this.http.get(environment.sourceUrl + `/Trips/${id}`)
  }
  // putChangePassword(ChangePassword) {
  //   return this.http.post(
  //     environment.sourceUrl + `/users/change-password`,
  //     ChangePassword,
  //     this.httpOptions
  //   );
  // }
  // putUsers(newUser) {
  //   return this.http.post<any>(
  //     environment.sourceUrl + `/users`,
  //     newUser,
  //     this.httpOptions
  //   );
  // }
  // AddRoles(newRole) {
  //   return this.http.post<any>(
  //     environment.sourceUrl + `/users/AddRole`,
  //     newRole,
  //     this.httpOptions
  //   );
  // }
  // DeleteRoles(roleId) {
  //   return this.http.delete(
  //     environment.sourceUrl + `/users/DeleteRole/${roleId}`
  //   );
  // }
}
