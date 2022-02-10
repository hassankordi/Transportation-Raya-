import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { environment } from 'src/environments/environment.prod';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { infiniteCrudCancel } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  id?:unknown;
  private map: L.Map;
  private centroid: L.LatLngExpression = [29.870541 ,31.289648]; //

  private initMap(array): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    }); 
    
    console.log(name);
    
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

//     latitude: "29.870541"
// longitude: "31.289648"
    // create 5 random jitteries and add them to map
    // const arr:L.LatLngExpression[] = [
    //   [29.870541 ,31.289648 ],
    //   [29.839090 ,31.319292 ],
    //   [29.839506 ,31.324560],
    // ]
    const arr:L.LatLngExpression[] =array
    // Array(2).fill(this.centroid)
    console.log(arr);
    
    const jittery = arr.map( 
        (x) =>{ 
          console.log(x);
          return[x[0] , x[1]  ]
      
        
      }).map(
        x => L.marker(x as L.LatLngExpression,{icon: greenIcon})
      ).forEach(
        x => x.addTo(this.map)
      );

    tiles.addTo(this.map);
  
  } 
  constructor(private http:HttpClient , private API : ApiServiceService ) { 
    
    this.API.sendTripAsync.subscribe(res=>{
      console.log('ll' , res)
      this.id = res;
      // this.api.onRecieveIdAsync.subscribe((res)=>
      //  {
      //  console.log(res);
      //   this.mm=res
      // })

      getLocation(this.id as number);
    })
    let arr = []
    const getLocation = (tripid: any)=>
   
    { 
      return this.http.get<any>(
        environment.sourceUrl + `/TripReads?TripID=${tripid as number}`).subscribe((res)=>{
          console.log(res.length);

        
          for(let i=0 ; i< res.length;i++){
            // console.log(i);: L.LatLngExpression
            let x =[res[i].latitude,res[i].longitude]
           arr.push(x)
          }

          console.log(arr);

          this.initMap(arr);
          
        })


        

    }
    //getLocation()
    
   }

  ngOnInit(): void {
   
  }

}
