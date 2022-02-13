import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { environment } from 'src/environments/environment.prod';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historical-map',
  templateUrl: './historical-map.component.html',
  styleUrls: ['./historical-map.component.scss']
})
export class HistoricalMapComponent implements OnInit {
  @Input() MyId
  id?: unknown;
  private map: L.Map;
  private centroid: L.LatLngExpression = [29.870541, 31.289648]; //
  private initMap(array): void {

    this.map = undefined
    console.log(this.map);
    // this.map = undefined
    
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    // console.log(name);
    var greenIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const arr: L.LatLngExpression[] = array
    // Array(2).fill(this.centroid)
    console.log(arr);
    const jittery = arr.map(
      (x) => {
        return [x[0], x[1]]
      }).map(
        x => L.marker(x as L.LatLngExpression, { icon: greenIcon })
      ).forEach(
        x => x.addTo(this.map)
      );

    tiles.addTo(this.map);


  }
  constructor(private http: HttpClient, private API: ApiServiceService, private router: Router) {


// console.log(this.id);
// alert(this.id)

  }


//   ngOnDestroy() {
//     window.location.reload();
//  }

  ngOnInit(): void {
    let arr = [];
    const getLocation = (tripid: any) => {
      if (tripid != undefined) {
        // let ss = JSON.parse(localStorage.getItem('dataSource'))
        var container = L.DomUtil.get('map');
        if (container != null) {
          container.id = null;
          //  container.outerHTML=""

          //  console.log("map" , this.map);
          //  console.log("con" , container);


          //  alert("con")
          //  alert("Already There is a map here.")
          //  container.closest()
        }
        if (this.map != undefined) {
          // this.map.remove();
          // this.map = undefined
          // container.id = null
          // this.map.remove()
          // test this fun for update map
          // this.map.invalidateSize()
          // alert("map")
        }
        //this.router.onSameUrlNavigation = 'reload';
        // window.location.reload();
        //  alert(tripid)
        //  console.log(container.innerHTML);

        return this.http.get<any>(

          environment.sourceUrl + `/TripReads?TripID=${tripid as number}`).subscribe((res) => {
            console.log(res.length);


            for (let i = 0; i < res.length; i++) {
              let x = [res[i].latitude, res[i].longitude]
              arr.push(x)
            }

            console.log(tripid, arr.length);

            this.initMap(arr);

          })

      } else {
        console.log("hyyy");
        return "sdadas";
      }




    }
    this.API.onDateChangeAsync.subscribe(res => {
      console.log('ll', res)

      this.id = res

      getLocation(this.id as number);
    })
  }


}
