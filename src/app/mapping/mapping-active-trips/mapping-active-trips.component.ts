import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-mapping-active-trips',
  templateUrl: './mapping-active-trips.component.html',
  styleUrls: ['./mapping-active-trips.component.scss'],
})
export class MappingActiveTripsComponent implements OnInit {
  // public data: string[] = ['Snooker', 'Tennis', 'Cricket', 'Football', 'Rugby'];
  public data: any = [];
  public data2: any = [];

isDriver : boolean = true ;
isBus : boolean = false ;

  detailes:any = {
    tripID:"" , 
    rout:"",
    driver:"",
    bus:"",
    maxSpeed:""

  }
  
  allData = []
  allData2 = []

  filter(data){
    console.log('heeeeeeeey',data.value);
   this.allData.forEach(element => {
     if(element.driver == data.value){
       this.detailes = element ; 
      //  alert("yes");
      //  console.log(this.detailes);
    
     }
     else  if(element.bus == data.value){
      this.detailes = element ; 
     //  alert("yes");
     //  console.log(this.detailes);
      
    }
   });

    console.log(this.detailes.tripID);
    
    this.API.sendTripIdSub.next(this.detailes.tripID )

  } 
  
  constructor(private API: ApiServiceService) { 
   
    this.API.getActiveRides().subscribe((res: any) => {
    this.allData = res
  

    for (let i = 0; i < res.length; i++) {
      // console.log(res[i].bus);
      
      this.data2.push(res[i].bus)
    }

 

    for (let i = 0; i < res.length; i++) {
        // console.log(res[i].driver);
        
        this.data.push(res[i].driver)
      }


    }, (err) => {
      console.log(err);
    })

   }

  ngOnInit(): void { }
  activeDriver() {
    this.isDriver = true ;
    this.isBus = false ;
  }
  activeBus() {
    this.isDriver = false ;
    this.isBus = true;
 
  } 
  
} 
