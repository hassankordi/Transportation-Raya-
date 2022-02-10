import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment.prod';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-pass-map',
  templateUrl: './pass-map.component.html',
  styleUrls: ['./pass-map.component.scss']
})
export class PassMapComponent implements OnInit { 
  


  id?:unknown;
  private map: L.Map;
  private centroid: L.LatLngExpression = [30.013056 ,31.208853]; //
  route: any;
 
  private initMap(array): void {
    
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

   
    const arr:L.LatLngExpression[] =array
  
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

  mm? : any

  
  test(){
    
  }
  constructor(private http:HttpClient ,  private API : ApiServiceService ) {
   let ss = JSON.parse(localStorage.getItem('dataSource'))
   console.log("okkk",ss)

    this.API.onRecieveIdAsync.subscribe(res=>{
      console.log('ll' , res)
      this.id = res;  
    
    })
    
  //   this.API.onRecieveIdAsync.subscribe((res)=>
  //   {
  //   console.log(res);
  //    this.mm=res
  //    console.log( this.mm);
  //  })
   let arr = []
   
    const getLocation = ()=>
    { 
       
     
    
      return this.http.get<any>( 
        
        environment.sourceUrl + `/Passengers/GetPassengerPosition?TripID=${ss}`).subscribe((res)=>{
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
      
  }
}
