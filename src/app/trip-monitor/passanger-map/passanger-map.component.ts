import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { environment } from 'src/environments/environment.prod';
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-passanger-map',
  templateUrl: './passanger-map.component.html',
  styleUrls: ['./passanger-map.component.scss']
})
export class PassangerMapComponent implements OnInit {

 
  private map: L.Map;
    private centroid: L.LatLngExpression = [29.870541 ,31.289648]; //
  
    private initMap(array): void {
      this.map = L.map('map', {
        center: this.centroid,
        zoom: 12
      }); 
      
      console.log(name); 
      
      
      var greenIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
      
     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     
       
      maxZoom: 18,
        minZoom: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      latitude: "29.870541"
      longitude: "31.289648"
      
      const arr:L.LatLngExpression[] =array
      
      console.log(arr);
      
      const jittery = arr.map( 
          (x) =>{ 
            console.log(x);
            return[x[0] , x[1]  ]
        
          
        }).map(
          x => L.marker(x as L.LatLngExpression,{icon: greenIcon})
        ).forEach(
          x => x.addTo(this.map).bindPopup("passanger")
        );
  
      tiles.addTo(this.map);
    
    } 
  mm?
    constructor(private http:HttpClient , private api : ApiServiceService ) {
      
    
      let arr = []
      const getLocation = ()=>
      { 
        this.api.onRecieveIdAsync.subscribe(res=>{ 
          this.mm=res
          console.log('123',res)
        }) ;  
        return this.http.get<any>(
          environment.sourceUrl + `/Passengers/GetPassengerPosition?TripID=${this.mm}`).subscribe((res)=>{
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
      getLocation()
      
     }
  
      ngOnInit(): void {
      this.api.onRecieveIdAsync.subscribe(res=>{
        console.log('123',res)
      })    
    }
  }
  